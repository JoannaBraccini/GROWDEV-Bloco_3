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

  // '.vertical-tab input[name="sections"]:checked+label': {
  //   background: "#00ad45",
  //   borderRight: "1px solid #000",
  //   color: "#fff",
  // },

  // '.vertical-tab input[name="sections"]:checked~article': {
  //   display: "block",
  // },

  // ".submit:hover": {
  //   opacity: 0.8,
  //   transition: "0.5s all",
  // },
};

export function GlobalStyle() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={styles} />
    </>
  );
}
