import { Box, Container } from "@mui/material";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
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
          margin: "4.5rem auto",
          maxWidth: "1067px",
          display: "flex",
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
