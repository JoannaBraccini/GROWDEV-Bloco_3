import { GlobalStyle } from "./config/global/GlobalStyle";
import { AppRoutes } from "./config/routes/AppRoutes";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline enableColorScheme />
      <GlobalStyle />
      <AppRoutes />
    </>
  );
}

export default App;
