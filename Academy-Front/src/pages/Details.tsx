import { Divider, Grid2, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FloatButton } from "../components/FloatButton";
import { UpsertAssessmentModal } from "../components/UpsertAssessmentModal";
import SnackbarAlert from "../components/SnackbarAlert";
import { TableDetails } from "../components/TableDetails";
import { findStudentAsyncThunk } from "../store/modules/students/studentsActions";
import { Loading } from "../components/Loading";

export function Details() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const userLogged = useAppSelector((state) => state.userLogged);
  const { assessmentDetail, loading } = useAppSelector(
    (state) => state.assessmentDetail
  );
  const { studentDetail } = useAppSelector((state) => state.studentDetail);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!userLogged.token) {
      navigate("/login");
    }
  }, [userLogged, navigate]);

  useEffect(() => {
    if (id) {
      dispatch(findStudentAsyncThunk(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    setOpenModal(!!assessmentDetail.id);
  }, [assessmentDetail]);

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography component="span" variant="h6" sx={{ fontWeight: "bold" }}>
          Lista de Avaliações de {studentDetail.name}
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Divider />
      </Grid2>
      <Grid2 size={12}>{loading ? <Loading /> : <TableDetails />}</Grid2>

      <FloatButton onClick={() => setOpenModal(true)} />

      <UpsertAssessmentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <SnackbarAlert />
    </Grid2>
  );
}
