import Head from 'next/head';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { SoundManager } from 'lib/SoundManager';

type DisplayTheme = 'light' | 'dark' | 'system';
type ActualTheme = 'light' | 'dark';

interface ThemeState {
  displayTheme: DisplayTheme | null;
  actualTheme: ActualTheme | null;
}

interface ThemeValue {
  displayTheme: DisplayTheme | null;
  switchTheme: () => void;
}

interface AudioRef {
  switchOn: AudioBuffer | null;
  switchOff: AudioBuffer | null;
}

const ThemeContext = createContext<ThemeValue | undefined>(undefined);

export function ThemeProvider({ children }) {
  const DISPLAY_THEMES_ORDER: DisplayTheme[] = ['light', 'dark', 'system'];
  const [state, setState] = useState<ThemeState>({ displayTheme: null, actualTheme: null });
  const audioRef = useRef<AudioRef>({ switchOn: null, switchOff: null });

  const getActualTheme = (displayTheme: DisplayTheme): ActualTheme => {
    if (displayTheme !== 'system') {
      return displayTheme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const switchTheme = () => {
    const currentIndex = DISPLAY_THEMES_ORDER.findIndex((theme) => theme === state.displayTheme);
    const displayTheme = DISPLAY_THEMES_ORDER[(currentIndex + 1) % DISPLAY_THEMES_ORDER.length];
    const actualTheme = getActualTheme(displayTheme);
    setState({ ...state, displayTheme, actualTheme });

    localStorage.setItem('theme', displayTheme);
    if (actualTheme === 'light' && audioRef.current.switchOn) {
      SoundManager.play(audioRef.current.switchOn);
    } else if (audioRef.current.switchOff) {
      SoundManager.play(audioRef.current.switchOff);
    }
  };

  useEffect(() => {
    SoundManager.loadSound('/sounds/switch-on.mp3').then((buffer) => {
      audioRef.current.switchOn = buffer;
    });
    SoundManager.loadSound('/sounds/switch-off.mp3').then((buffer) => {
      audioRef.current.switchOff = buffer;
    });

    const theme = localStorage.getItem('theme') as DisplayTheme;
    const actualTheme = getActualTheme(theme);
    setState((oldState) => ({
      ...oldState,
      displayTheme: theme,
      actualTheme,
    }));
  }, []);

  useEffect(() => {
    const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const detectSystemThemeChange = (event: MediaQueryListEvent) => {
      if (state.displayTheme === 'system') {
        setState((oldState) => ({
          ...oldState,
          actualTheme: event.matches ? 'dark' : 'light',
        }));
      }
    };
    systemThemeQuery.addEventListener('change', detectSystemThemeChange);
    return () => {
      systemThemeQuery.removeEventListener('change', detectSystemThemeChange);
    };
  }, [state.displayTheme]);

  useEffect(() => {
    if (state.actualTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (state.actualTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, [state.actualTheme]);

  const value = {
    displayTheme: state.displayTheme,
    switchTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <Head>
        {state.actualTheme === 'light' && (
          <meta name="theme-color" content="#f7f7f7" />
        )}
        {state.actualTheme === 'dark' && (
          <meta name="theme-color" content="#1b1d22" />
        )}
      </Head>

      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
