import { CssBaseline, CSSObject, GlobalStyles } from "@mui/material";
import hogwarts from "../../assets/hogwarts.jpg";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

const styles: Record<string, CSSObject> = {
  body: {
    fontFamily: "Poppins, sans-serif",
    background: `url(${hogwarts}) center`,
    backgroundSize: "cover",
    height: "100vh",
  },
  a: {
    textDecoration: "none",
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
