import { Box, Button, Container, Typography } from "@mui/material";
import image404 from "../assets/404.jpg";
import { useNavigate } from "react-router-dom";

export function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${image404})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "1rem",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: { xs: "2rem", sm: "3rem", md: "4rem" },
        }}
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          color="warning"
          sx={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
            lineHeight: 1.5,
          }}
        >
          Oops! Algo deu errado.
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            padding: { xs: "0.8rem 2rem", sm: "1rem 3rem" },
            fontSize: { xs: "1rem", sm: "1.2rem" },
          }}
          onClick={() => navigate("/")}
        >
          Voltar
        </Button>
      </Container>
    </Box>
  );
}
