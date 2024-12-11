import { Box, Button, Link } from "@mui/material";
import welcome from "../assets/welcome.png";

export function Home() {
  return (
    <Box
      sx={{
        background: `url(${welcome}) no-repeat center`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/">
        <Button variant="contained" color="secondary">
          Back to Sign Page
        </Button>
      </Link>
    </Box>
  );
}
