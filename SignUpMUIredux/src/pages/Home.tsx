import { Box, Button, Link } from "@mui/material";
import welcome from "../assets/welcome.png";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function Home() {
  const userLoggedRedux = useAppSelector((state) => state.userLogged);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedRedux.id) {
      navigate("/");
    }
  }, [userLoggedRedux, navigate]);

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
