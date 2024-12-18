import { GlobalStyles, CSSObject, CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const styles: Record<string, CSSObject> = {
  "*": {
    fontFamily: "Roboto",
  },
  a: {
    textDecoration: "none",
    color: "black",
  },
};

export function GlobalStyle() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={styles} />
    </>
  );
}
