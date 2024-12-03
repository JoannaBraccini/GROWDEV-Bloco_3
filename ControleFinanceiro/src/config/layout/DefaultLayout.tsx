import { Box, Container } from "@mui/material";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <Container sx={{ py: 10, flexGrow: 1 }}>{children}</Container>
      <Footer />
    </Box>
  );
}
