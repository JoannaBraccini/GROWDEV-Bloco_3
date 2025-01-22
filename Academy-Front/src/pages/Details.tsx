import { Box, Grid2 } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SnackbarAlert from "../components/SnackbarAlert";
import { DetailsAcordion } from "../components/DetailsAcordion";
import DetailsCard from "../components/DetailsCard";
import { showAlert } from "../store/modules/alert/alertSlice";

export function Details() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const userLogged = useAppSelector((state) => state.userLogged);
  const { studentDetail } = useAppSelector((state) => state.studentDetail);
  const { assessmentDetail } = useAppSelector(
    (state) => state.assessmentDetail
  );

  useEffect(() => {
    if (!userLogged.token) {
      navigate("/login");
    }
  }, [userLogged, navigate]);

  useEffect(() => {
    if (!id || !assessmentDetail || !studentDetail) {
      dispatch(
        showAlert({
          message: "Nenhum dado a ser buscado",
          type: "error",
        })
      );
    }
    navigate("/home");
  }, [id, assessmentDetail, studentDetail]);

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Box>
          <DetailsCard />
          <DetailsAcordion />
        </Box>
      </Grid2>
      <SnackbarAlert />
    </Grid2>
  );
}
