import { SoundManager } from 'lib/SoundManager';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
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
  const [state, setState] = useState<ThemeState>({ theme: null });
  const audioRef = useRef<AudioRef>({ switchOn: null, switchOff: null });

  const toggleTheme = () => {
    const currentIndex = THEMES_ORDER.findIndex((theme) => theme === state.theme);
    const nextTheme = THEMES_ORDER[(currentIndex + 1) % THEMES_ORDER.length];
    setState({ ...state, theme: nextTheme });
  };

  useEffect(() => {
    setState((oldTheme) => ({
      ...oldTheme,
      theme: localStorage.getItem('theme') as Theme,
    }));
    audioRef.current.switchOn = SoundManager.createSound('/sounds/switch-on.mp3');
    audioRef.current.switchOff = SoundManager.createSound('/sounds/switch-off.mp3');
  }, []);

  useEffect(() => {
    if (state.theme === 'light') {
      document.documentElement.classList.remove('dark');
      SoundManager.play(audioRef.current.switchOn);
    } else if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
      SoundManager.play(audioRef.current.switchOff);
    } else if (state.theme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        SoundManager.play(audioRef.current.switchOff);
      } else {
        document.documentElement.classList.remove('dark');
        SoundManager.play(audioRef.current.switchOn);
      }
    }
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    const detectSystemThemeChange = (event: MediaQueryListEvent) => {
      if (state.theme !== 'system') {
        return;
      }
      if (event.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    systemThemeQuery.addEventListener('change', detectSystemThemeChange);

    return () => {
      systemThemeQuery.removeEventListener('change', detectSystemThemeChange);
    };
  }, [state.theme]);

  const value = {
    theme: state.theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
