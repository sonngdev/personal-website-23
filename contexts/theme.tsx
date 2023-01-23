import { SoundManager } from 'lib/SoundManager';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

type Theme = 'light' | 'dark';

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
  const [state, setState] = useState<ThemeState>({ theme: null });
  const audioRef = useRef<AudioRef>({ switchOn: null, switchOff: null });

  const toggleTheme = () => {
    if (state.theme === 'dark') {
      setState({ ...state, theme: 'light' });
      SoundManager.play(audioRef.current.switchOn);
    } else {
      setState({ ...state, theme: 'dark' });
      SoundManager.play(audioRef.current.switchOff);
    }
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
