import {
  Box,
  CircularProgress,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { FloatButton } from "../components/FloatButton";
import { setStudentDetail } from "../store/modules/studentDetail/studentDetailSlice";
import { Student } from "../utils/types";
import { UpdateStudentModal } from "../components/UpdateStudentModal";
import { findStudentAsyncThunk } from "../store/modules/students/studentsActions";

export function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userLogged = useAppSelector((state) => state.userLogged);
  const { studentDetail, loading } = useAppSelector(
    (state) => state.studentDetail
  );
  //   const studentDetail = useAppSelector((state) => state.studentDetail);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!userLogged.token) {
      navigate("/login");
    }
  }, [userLogged, navigate]);

  function handleEdit(studentDetail: Student) {
    dispatch(findStudentAsyncThunk(userLogged.student.id));
    dispatch(setStudentDetail(studentDetail));
    setOpenModal(true);
  }
  useEffect(() => {
    if (!studentDetail || studentDetail.id !== userLogged.student.id) {
      dispatch(findStudentAsyncThunk(userLogged.student.id));
    }
    setOpenModal(!!studentDetail.id);
  }, [studentDetail]);

  return (
    <Grid2 container spacing={2}>
      <Box>
        {loading ? (
          <CircularProgress />
        ) : !studentDetail ? (
          <Typography>Erro ao buscar dados do Usuário.</Typography>
        ) : (
          <>
            <Typography variant="h6">Perfil</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Nome" secondary={studentDetail.name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="CPF" secondary={studentDetail.cpf} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="idade"
                  secondary={
                    studentDetail.age ? studentDetail.age : "Não informado"
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="E-mail"
                  secondary={studentDetail.email}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Tipo" secondary={studentDetail.type} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Data de Registro"
                  secondary={new Date(
                    studentDetail.registeredAt
                  ).toLocaleDateString()}
                />
              </ListItem>
            </List>
            <FloatButton onClick={() => handleEdit(studentDetail)} />
          </>
        )}
        <UpdateStudentModal
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      </Box>
    </Grid2>
  );
}
