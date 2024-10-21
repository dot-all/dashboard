// src/components/ThemeSelector.tsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeSelector: React.FC = () => {
  const { isDarkMode, handleToggle } = useTheme();

  const handleChangeTheme = () => {
    handleToggle(!isDarkMode);
  };

  return (
    <IconButton onClick={handleChangeTheme} color="inherit">
      {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default ThemeSelector;
