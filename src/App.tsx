import AppRouter from './router';
import { CustomThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <>
      <CustomThemeProvider>
        <AppRouter />
      </CustomThemeProvider>
    </>
  );
}

export default App;
