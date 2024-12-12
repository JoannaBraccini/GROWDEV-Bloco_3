import { Box } from "@mui/material";
import welcome from "../assets/welcome.png";
import { useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { WelcomeBar } from "../components/WelcomeBar";

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
      }}
    >
      <WelcomeBar user={userLoggedRedux.email} />
    </Box>
  );
}
