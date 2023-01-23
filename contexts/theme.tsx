import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
}

interface ThemeValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeValue | undefined>(undefined);

export function ThemeProvider({ children }) {
  const [state, setState] = useState<ThemeState>({
    theme: 'light',
  });

  const toggleTheme = useCallback(() => {
    setState((oldState) => {
      if (oldState.theme === 'dark') {
        return { ...oldState, theme: 'light' };
      } else {
        return { ...oldState, theme: 'dark' };
      }
    });
  }, []);

  useEffect(() => {
    let currentTheme = localStorage.getItem('theme') as Theme;
    if (!currentTheme) {
      currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    setState((oldTheme) => ({
      ...oldTheme,
      theme: currentTheme,
    }));
  }, []);

  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', state.theme);
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
