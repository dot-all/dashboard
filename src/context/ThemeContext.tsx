// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../styles/theme';

const ThemeContext = createContext<any>(null);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.localStorage.getItem('theme') === 'dark'; 
  });

  const handleToggle = (darkMode: boolean) => {
    setIsDarkMode(darkMode);
    window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  };

  // Crear el tema según el modo
  const theme = createTheme(isDarkMode ? darkTheme : lightTheme);

  return (
    <ThemeProvider theme={theme}> {/* Envuelve a los children con el ThemeProvider */}
      <ThemeContext.Provider value={{ isDarkMode, handleToggle }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
