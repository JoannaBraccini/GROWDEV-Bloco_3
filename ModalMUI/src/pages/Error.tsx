import { Button, Container } from "@mui/material";
import ErrorImage from "../assets/404.svg";
import { Link } from "react-router-dom";

export function Error() {
  return (
    <Container
      component={"body"}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        minWidth: "100vw",
        backgroundColor: "#A8C2B7",
      }}
    >
      <Link to={"/"}>
        <Button
          variant="contained"
          size="large"
          color="warning"
          title="Para Home"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Voltar
        </Button>
      </Link>
      <img src={ErrorImage} style={{ height: "100%", width: "auto" }} />
    </Container>
  );
}
