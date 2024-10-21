// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Color principal del tema
    },
    background: {
      default: '#ffffff', // Color de fondo por defecto
      paper: '#ffffff', // Color de papel (para componentes como Card)
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', // Color del AppBar para el tema claro
          color: '#000000', // Color del texto en el AppBar
          boxShadow: 'none', // Remover la sombra
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc', // Color principal del tema oscuro
    },
    background: {
      default: '#121212',
      paper: '#121212',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#333333', // Color del AppBar para el tema oscuro
          color: '#ffffff', // Color del texto en el AppBar
          boxShadow: 'none', // Remover la sombra
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
