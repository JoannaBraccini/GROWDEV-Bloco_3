import { Grid2, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import StudentHome from "../components/StudentHome";
import TechHelperHome from "../components/TechHelperHome";
import { Loading } from "../components/Loading";
import SnackbarAlert from "../components/SnackbarAlert";

export function Home() {
  const navigate = useNavigate();
  const { student, token, loading } = useAppSelector(
    (state) => state.userLogged
  );

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <Grid2 container spacing={2}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Grid2 size={12}>
            <Typography variant="h6">
              Olá,{" "}
              <Typography
                component="span"
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                {student.name}
              </Typography>
            </Typography>
          </Grid2>
          {student.type === "T" ? <TechHelperHome /> : <StudentHome />}
        </>
      )}
      <SnackbarAlert />
    </Grid2>
  );
}
