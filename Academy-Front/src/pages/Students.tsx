import { Divider, Grid2, Typography } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatButton } from "../components/FloatButton";
import { UpsertModal } from "../components/UpsertAssessmentModal";
import SnackbarAlert from "../components/SnackbarAlert";
import { TableStudents } from "../components/TableStudents";

export function Students() {
  const navigate = useNavigate();
  const userLogged = useAppSelector((state) => state.userLogged);
  const studentDetail = useAppSelector((state) => state.studentDetail);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!userLogged.token) {
      navigate("/login");
    }
  }, [userLogged, navigate]);

  useEffect(() => {
    setOpenModal(!!studentDetail.id); //  {} = undefined undefined.id
  }, [studentDetail]);

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography component="span" variant="h6" sx={{ fontWeight: "bold" }}>
          Students List
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Divider />
      </Grid2>
      <Grid2 size={12}>
        <TableStudents />
      </Grid2>

      <FloatButton onClick={() => setOpenModal(true)} />

      <UpsertModal open={openModal} onClose={() => setOpenModal(false)} />

      <SnackbarAlert />
    </Grid2>
  );
}
