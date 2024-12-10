import { Box, Container } from "@mui/material";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import img from "../../assets/img.jpg";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header />
      <Container
        sx={{
          margin: "5vw auto",
          maxWidth: "1067px",
        }}
      >
        <Box
          sx={{
            background: `url(${img}) no-repeat center`,
            backgroundSize: "cover",
            minHeight: "371px",
            float: "left",
            width: "25%",
          }}
        ></Box>
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
