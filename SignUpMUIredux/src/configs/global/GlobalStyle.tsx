import { CssBaseline, CSSObject, GlobalStyles } from "@mui/material";
import bg from "../../assets/bg.jpg";

const styles: Record<string, CSSObject> = {
  "*": {
    verticalAlign: "baseline",
  },
  body: {
    background: `url(${bg}) no-repeat center`,
    backgroundSize: "cover",
    minHeight: "100vh",
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
