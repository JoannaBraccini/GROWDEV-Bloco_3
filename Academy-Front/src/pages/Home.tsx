import { Grid2, Typography } from "@mui/material";
import HomeList from "../components/TechHelperHome";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import StudentHome from "../components/StudentHome";

export function Home() {
  const navigate = useNavigate();
  const userLogged = useAppSelector((state) => state.userLogged);

  useEffect(() => {
    if (!userLogged.token) {
      navigate("/login");
    }
  }, [userLogged, navigate]);

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography variant="h6">
          Olá,{" "}
          <Typography component="span" variant="h6" sx={{ fontWeight: "bold" }}>
            {userLogged.student.name}
          </Typography>
        </Typography>
      </Grid2>
      {userLogged.student.type === "T" ? <HomeList /> : <StudentHome />}
    </Grid2>
  );
}
