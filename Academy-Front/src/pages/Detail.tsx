import { Button, Grid2, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { resetAssessmentDetail } from "../store/modules/assessmentDetail/assessmentDetailSlice";
import SnackbarAlert from "../components/SnackbarAlert";

export function Detail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { students } = useAppSelector((state) => state.students);
  const assessmentDetailRedux = useAppSelector(
    (state) => state.assessmentDetail
  );

  const student = students.find(
    (student) => student.id === assessmentDetailRedux.studentId
  );

  function handleReturn() {
    dispatch(resetAssessmentDetail());
    navigate("/assessments");
  }

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography>Detalhes da avaliação</Typography>
      </Grid2>
      <Grid2 size={12}>
        <Typography>Aluno: {student?.name}</Typography>
      </Grid2>
      <Grid2 size={12} key={assessmentDetailRedux.id}>
        <Typography>{assessmentDetailRedux.title}</Typography>
        <Typography>{assessmentDetailRedux.description}</Typography>
        <Typography>{assessmentDetailRedux.grade}</Typography>
        <Typography>{assessmentDetailRedux.createdBy}</Typography>
        <Typography>{assessmentDetailRedux.createdAt}</Typography>
      </Grid2>

      <Grid2 size={12}>
        <Button onClick={handleReturn}>Voltar</Button>
      </Grid2>

      <SnackbarAlert />
    </Grid2>
  );
}
