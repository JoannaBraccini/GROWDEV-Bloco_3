import { Divider, Grid2, Typography } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatButton } from "../components/FloatButton";
import { UpsertAssessmentModal } from "../components/UpsertAssessmentModal";
import { TableAssessments } from "../components/TableAssessments";
import SnackbarAlert from "../components/SnackbarAlert";

export function Assessments() {
  const navigate = useNavigate();
  const userLogged = useAppSelector((state) => state.userLogged);
  const assessmentDetail = useAppSelector((state) => state.assessmentDetail);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!userLogged.token) {
      navigate("/login");
    }
  }, [userLogged, navigate]);

  useEffect(() => {
    setOpenModal(!!assessmentDetail.id); //  {} = undefined undefined.id
  }, [assessmentDetail]);

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography component="span" variant="h6" sx={{ fontWeight: "bold" }}>
          Assessments List
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Divider />
      </Grid2>
      <Grid2 size={12}>
        <TableAssessments />
      </Grid2>

      <FloatButton onClick={() => setOpenModal(true)} />

      <UpsertAssessmentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <SnackbarAlert />
    </Grid2>
  );
}
