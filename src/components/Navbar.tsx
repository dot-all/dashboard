// src/components/Navbar.tsx
import React from 'react';
import { AppBar } from '@mui/material';
import ThemeSelector from './ThemeSelector';

const Navbar: React.FC = () => {
  return (
    <AppBar position="fixed" className="flex items-end h-[60px] justify-center pr-2 drop-shadow">
        <ThemeSelector />
    </AppBar>
  );
};

export default Navbar;
