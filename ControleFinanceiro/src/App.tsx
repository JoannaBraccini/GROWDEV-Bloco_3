import { GlobalStyle } from "./config/global/GlobalStyle";
import { AppRoutes } from "./config/routes/AppRoutes";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme>
        <GlobalStyle />
        <AppRoutes />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
