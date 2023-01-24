import Head from 'next/head';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { SoundManager } from 'lib/SoundManager';

type Theme = 'light' | 'dark' | 'system';
type ActualTheme = 'light' | 'dark';

interface ThemeState {
  theme: Theme | null;
  actualTheme: ActualTheme | null;
}

interface ThemeValue {
  theme: Theme | null;
  toggleTheme: () => void;
}

interface AudioRef {
  switchOn: HTMLAudioElement | null;
  switchOff: HTMLAudioElement | null;
}

const ThemeContext = createContext<ThemeValue | undefined>(undefined);

export function ThemeProvider({ children }) {
  const THEMES_ORDER: Theme[] = ['light', 'dark', 'system'];
  const [state, setState] = useState<ThemeState>({ theme: null, actualTheme: null });
  const audioRef = useRef<AudioRef>({ switchOn: null, switchOff: null });

  const toggleTheme = () => {
    const currentIndex = THEMES_ORDER.findIndex((theme) => theme === state.theme);
    const nextTheme = THEMES_ORDER[(currentIndex + 1) % THEMES_ORDER.length];
    const actualTheme = getActualTheme(nextTheme);
    setState({ ...state, theme: nextTheme, actualTheme });

    localStorage.setItem('theme', nextTheme);
    if (actualTheme === 'light') {
      SoundManager.play(audioRef.current.switchOn);
    } else {
      SoundManager.play(audioRef.current.switchOff);
    }
  };

  const getActualTheme = (theme: Theme): ActualTheme => {
    if (theme !== 'system') {
      return theme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme') as Theme;
    const actualTheme = getActualTheme(theme);

    setState((oldTheme) => ({
      ...oldTheme,
      theme,
      actualTheme,
    }));
    audioRef.current.switchOn = SoundManager.createSound('/sounds/switch-on.mp3');
    audioRef.current.switchOff = SoundManager.createSound('/sounds/switch-off.mp3');
  }, []);

  useEffect(() => {
    const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const detectSystemThemeChange = (event: MediaQueryListEvent) => {
      if (state.theme === 'system') {
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
  }, [state.theme]);

  useEffect(() => {
    if (state.actualTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (state.actualTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, [state.actualTheme]);

  const value = {
    theme: state.theme,
    toggleTheme,
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
