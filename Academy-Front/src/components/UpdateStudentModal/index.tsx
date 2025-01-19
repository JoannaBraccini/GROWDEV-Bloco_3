import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid2,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { style } from "./styles";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetStudentDetail } from "../../store/modules/studentDetail/studentDetailSlice";
import { updateStudentAsyncThunk } from "../../store/modules/students/studentsActions";
import { showAlert } from "../../store/modules/alert/alertSlice";
import {
  StudentFieldsErrors,
  validateFormStudent,
} from "../../utils/validators/student.validator";
import { StudentType } from "../../utils/types";

interface UpsertModalProps {
  open: boolean;
  onClose: () => void;
}

export function UpdateStudentModal({ open, onClose }: UpsertModalProps) {
  const dispatch = useAppDispatch();

  const { ok, message, loading } = useAppSelector((state) => state.students);
  const { studentDetail } = useAppSelector(
    ({ studentDetail }) => studentDetail
  );
  const [fieldsErrors, setFieldsErrors] = useState<StudentFieldsErrors>({
    name: "",
    age: null,
    passwordOld: "",
    passwordNew: "",
    type: "",
  });

  const [type, setType] = useState<StudentType>(
    studentDetail ? studentDetail.type : "M"
  );

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = event.currentTarget["name-student"].value;
    const age = Number(event.currentTarget["age-student"].value);
    const passwordOld = event.currentTarget["password-old"].value;
    const passwordNew = event.currentTarget["password-new"].value;
    const type = event.currentTarget["type-student"].value;

    const errors = validateFormStudent(name, passwordOld, passwordNew);
    // Converter um objeto em array
    const hasError = Object.keys(errors);
    if (hasError.length) {
      setFieldsErrors(errors);
      return;
    }

    // Se passar, limpar os errors
    setFieldsErrors({} as StudentFieldsErrors);

    dispatch(
      updateStudentAsyncThunk({
        id: studentDetail ? studentDetail.id : "",
        name,
        age,
        passwordOld,
        passwordNew,
        type,
      })
    );
  }

  function handleClose() {
    dispatch(resetStudentDetail());
    onClose();
  }

  useEffect(() => {
    if (ok) {
      dispatch(showAlert({ message: message, type: "success" }));
      onClose();
    }
  }, [ok, message, dispatch]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-update-student"
      aria-describedby="update-student"
    >
      <Box sx={style}>
        <form onSubmit={onSubmit}>
          <Grid2 container spacing={1}>
            <Grid2 size={12}>
              <Typography variant="h6">
                Editar Informações do Estudante
              </Typography>
            </Grid2>

            {/** Type */}
            <Grid2 size={12}>
              <FormControl fullWidth error={!!fieldsErrors.type}>
                <FormLabel htmlFor="type-student">Tipo</FormLabel>
                <Select
                  id="type"
                  name="type"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={!!fieldsErrors.type}
                  value={type}
                  onChange={(e) => setType(e.target.value as StudentType)}
                >
                  <MenuItem value="M">Matriculado</MenuItem>
                  <MenuItem value="F">Formado</MenuItem>
                  <MenuItem value="T">Tech-Helper</MenuItem>
                </Select>
              </FormControl>
            </Grid2>

            {/** Name */}
            <Grid2 size={12}>
              <FormControl fullWidth error={!!fieldsErrors.name}>
                <FormLabel htmlFor="name-student">Nome</FormLabel>
                <TextField
                  id="name-student"
                  name="name-student"
                  type="text"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!fieldsErrors.name}
                  helperText={fieldsErrors.name}
                  defaultValue={studentDetail ? studentDetail.name : ""}
                />
              </FormControl>
            </Grid2>

            {/** Idade */}
            <Grid2 size={12}>
              <FormControl fullWidth error={!!fieldsErrors.age}>
                <FormLabel htmlFor="age-student">Idade</FormLabel>
                <TextField
                  id="age-student"
                  name="age-student"
                  type="number"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!fieldsErrors.age}
                  helperText={fieldsErrors.age}
                  defaultValue={studentDetail ? studentDetail.age : null}
                />
              </FormControl>
            </Grid2>

            {/** Senha */}
            <Grid2 size={12} mb={2}>
              <FormControl fullWidth error={!!fieldsErrors.passwordOld}>
                <FormLabel htmlFor="password-old">Senha Antiga</FormLabel>
                <TextField
                  id="password-old"
                  name="password-old"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!fieldsErrors.passwordOld}
                  helperText={fieldsErrors.passwordOld}
                  defaultValue={"********"}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={12} mb={2}>
              <FormControl fullWidth error={!!fieldsErrors.passwordNew}>
                <FormLabel htmlFor="password-new">Senha Nova</FormLabel>
                <TextField
                  id="password-new"
                  name="password-new"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!fieldsErrors.passwordNew}
                  helperText={fieldsErrors.passwordNew}
                  defaultValue={""}
                />
              </FormControl>
            </Grid2>

            <Grid2 size={6}>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                type="reset"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </Grid2>
            <Grid2 size={6}>
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                fullWidth
              >
                {loading ? "Aguarde..." : "Enviar"}
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Modal>
  );
}
