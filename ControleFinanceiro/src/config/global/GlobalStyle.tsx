import { GlobalStyles, CSSObject } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const styles: Record<string, CSSObject> = {
  "*": {
    margin: 0,
    padding: 0,
  },
  a: {
    textDecoration: "none",
    color: "black",
  },

  // Outros estilos compartilhados...
};

export function GlobalStyle() {
  return <GlobalStyles styles={styles} />;
}
