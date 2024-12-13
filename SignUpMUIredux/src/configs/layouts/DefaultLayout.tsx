import { Box, Container } from "@mui/material";
import { Header } from "../../components/Header/index.tsx";
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
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Header />
      <Container
        sx={{
          margin: { xs: "0", sm: "3rem auto", lg: "5rem auto" },
          maxWidth: "1067px",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
