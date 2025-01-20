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
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetStudentDetail } from "../../store/modules/studentDetail/studentDetailSlice";
import { updateStudentAsyncThunk } from "../../store/modules/students/studentsActions";
import {
  StudentFieldsErrors,
  validateFormStudent,
} from "../../utils/validators/student.validator";
import { StudentType, UpdateStudentRequest } from "../../utils/types";

interface UpsertModalProps {
  open: boolean;
  onClose: () => void;
}

export function UpdateStudentModal({ open, onClose }: UpsertModalProps) {
  const dispatch = useAppDispatch();
  const { studentDetail } = useAppSelector(
    ({ studentDetail }) => studentDetail
  );
  const { ok, message, loading } = useAppSelector((state) => state.students);
  const [fieldsErrors, setFieldsErrors] = useState<StudentFieldsErrors>({
    name: "",
    age: "",
    passwordOld: "",
    passwordNew: "",
    type: "",
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = event.currentTarget["name-student"].value;
    const age = Number(event.currentTarget["age-student"].value);
    const passwordOld = event.currentTarget["password-old"].value;
    const passwordNew = event.currentTarget["password-new"].value;
    const type = event.currentTarget["type"].value as StudentType;

    const errors = validateFormStudent(name, passwordOld, passwordNew);
    // Converter um objeto em array
    const hasError = Object.keys(errors);
    if (hasError.length) {
      setFieldsErrors(errors);
      return;
    }
    // Se passar, limpar os errors
    setFieldsErrors({} as StudentFieldsErrors);

    // Criar um objeto contendo apenas os campos que foram modificados
    const updatedFields: Partial<UpdateStudentRequest> = {};
    if (name !== studentDetail.name) updatedFields.name = name;
    if (age !== studentDetail.age) updatedFields.age = age;
    if (passwordOld) updatedFields.passwordOld = passwordOld;
    if (passwordNew) updatedFields.passwordNew = passwordNew;
    if (type !== studentDetail.type) updatedFields.type = type;

    dispatch(
      updateStudentAsyncThunk({
        id: studentDetail.id,
        ...updatedFields,
      })
    );

    if (ok && message) {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }

  function handleClose() {
    dispatch(resetStudentDetail());
    onClose();
  }

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
                  defaultValue={studentDetail.type}
                  onChange={(e) => e.target.value as StudentType}
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
                  error={!!fieldsErrors.name}
                  helperText={fieldsErrors.name}
                  defaultValue={studentDetail.name}
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
                  error={!!fieldsErrors.age}
                  helperText={fieldsErrors.age}
                  defaultValue={studentDetail.age}
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
                  error={!!fieldsErrors.passwordOld}
                  helperText={fieldsErrors.passwordOld}
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
                disabled={!!loading}
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
