import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeId } from '../types.ts';

export interface ThemeConfig {
  id: ThemeId;
  label: string;
  number: string;
  description: string;
  logo: string;
  colors: {
    bg: string;
    text: string;
    accent: string;
    accentHover: string;
    muted: string;
    border: string;
    borderSubtle: string;
    surface: string;
    surfaceSubtle: string;
    darkBar: string;
    darkBarText: string;
  };
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  white: {
    id: 'white',
    number: '01',
    label: 'PURE WHITE',
    description: 'Pure white canvas seamlessly matching white branding',
    logo: '/atharv_logo_white.png',
    colors: {
      bg: '#FFFFFF',
      text: '#0A0A0A',
      accent: '#8B0000',
      accentHover: '#B91C1C',
      muted: '#6B7280',
      border: '#E5E7EB',
      borderSubtle: '#F3F4F6',
      surface: '#F9FAFB',
      surfaceSubtle: '#F3F4F6',
      darkBar: '#000000',
      darkBarText: '#FFFFFF',
    },
  },
  black: {
    id: 'black',
    number: '02',
    label: 'PURE BLACK',
    description: 'Pure black canvas seamlessly matching black branding',
    logo: '/atharv_logo_black.png',
    colors: {
      bg: '#000000',
      text: '#FFFFFF',
      accent: '#EF4444',
      accentHover: '#F87171',
      muted: '#9CA3AF',
      border: '#1F2937',
      borderSubtle: '#111827',
      surface: '#0A0A0A',
      surfaceSubtle: '#141414',
      darkBar: '#000000',
      darkBarText: '#FFFFFF',
    },
  },
};

interface ThemeContextType {
  themeId: ThemeId;
  theme: ThemeConfig;
  setThemeId: (id: ThemeId) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeId: 'white',
  theme: THEMES.white,
  setThemeId: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem('arb_theme');
      if (saved === 'black') return 'black';
      if (saved === 'white') return 'white';
    } catch {
      // ignore
    }
    return 'white';
  });

  const setThemeId = (id: ThemeId) => {
    if (THEMES[id]) {
      setThemeIdState(id);
      try {
        localStorage.setItem('arb_theme', id);
      } catch {
        // ignore
      }
    }
  };

  const toggleTheme = () => {
    const nextId: ThemeId = themeId === 'white' ? 'black' : 'white';
    setThemeId(nextId);
  };

  const theme = THEMES[themeId] || THEMES.white;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-parchment', theme.colors.bg);
    root.style.setProperty('--text-charcoal', theme.colors.text);
    root.style.setProperty('--accent-maroon', theme.colors.accent);
    root.style.setProperty('--accent-maroon-hover', theme.colors.accentHover);
    root.style.setProperty('--muted-grey', theme.colors.muted);
    root.style.setProperty('--hairline-gray', theme.colors.border);
    root.style.setProperty('--surface-ivory', theme.colors.surface);
    document.body.style.backgroundColor = theme.colors.bg;
    document.body.style.color = theme.colors.text;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ themeId, theme, setThemeId, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
