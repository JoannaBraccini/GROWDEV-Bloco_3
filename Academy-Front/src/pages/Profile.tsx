import {
  Box,
  Button,
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
import { Student, StudentType } from "../utils/types";
import { UpdateStudentModal } from "../components/UpdateStudentModal";
import { findStudentAsyncThunk } from "../store/modules/students/studentsActions";
import SnackbarAlert from "../components/SnackbarAlert";
import { Loading } from "../components/Loading";

const typeText = (studentType: StudentType) => {
  switch (studentType) {
    case "T":
      return "Tech-Helper";
    case "M":
      return "Aluno Matriculado";
    case "F":
      return "Aluno Formado";
    default:
      return "Tipo Desconhecido";
  }
};

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

  useEffect(() => {
    if (!studentDetail || studentDetail.id !== userLogged.student.id) {
      dispatch(findStudentAsyncThunk(userLogged.student.id));
    }
  }, [studentDetail, dispatch, userLogged.student.id]);

  function handleEdit(studentDetail: Student) {
    dispatch(findStudentAsyncThunk(userLogged.student.id));
    dispatch(setStudentDetail(studentDetail));
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <Grid2 container spacing={2}>
      <Box>
        {loading ? (
          <Loading />
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
                <ListItemText
                  primary="Tipo"
                  secondary={typeText(studentDetail.studentType)}
                />
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
            <Button
              variant="contained"
              color="info"
              onClick={() => navigate("/home")}
            >
              Voltar
            </Button>
            <FloatButton
              iconType="edit"
              onClick={() => handleEdit(studentDetail)}
            />
          </>
        )}
        <UpdateStudentModal open={openModal} onClose={handleCloseModal} />
        <SnackbarAlert />
      </Box>
    </Grid2>
  );
}
