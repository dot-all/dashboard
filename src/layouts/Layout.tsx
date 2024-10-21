// src/layout/Layout.tsx
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      <Sidebar />

      <Box
        component="main"
        className="w-full h-screen"
        sx={{
          marginTop: '64px', // Ajusta según la altura de tu AppBar
          padding: '16px', // Puedes ajustar el padding según tu diseño
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
