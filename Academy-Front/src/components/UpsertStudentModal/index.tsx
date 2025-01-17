import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid2,
  Modal,
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

interface UpsertModalProps {
  open: boolean;
  onClose: () => void;
}

export function UpsertAssessmentModal({ open, onClose }: UpsertModalProps) {
  const dispatch = useAppDispatch();

  const userLogged = useAppSelector((state) => state.userLogged);
  const { students, ok, message, loading } = useAppSelector(
    (state) => state.students
  );
  const studentDetail = useAppSelector(({ studentDetail }) => studentDetail);

  const [fieldsErrors, setFieldsErrors] = useState<StudentFieldsErrors>({
    name: "",
    passwordOld: "",
    passwordNew: "",
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = event.currentTarget["name-student"].value;
    const age = Number(event.currentTarget["age-student"].value);
    const passwordOld = event.currentTarget["password-old"].value;
    const passwordNew = event.currentTarget["password-new"].value;
    const type = event.currentTarget["type-student"].value;
    const id = event.currentTarget["student"].value;

    const errors = validateFormStudent(name, passwordOld, passwordNew);
    // Converter um objeto em array
    const hasError = Object.keys(errors);
    if (hasError.length) {
      setFieldsErrors(errors);
      return;
    }

    // Se passar, limpar os errors
    setFieldsErrors({} as StudentFieldsErrors);

    if (studentDetail.id) {
      // MODO EDIT
      dispatch(
        updateStudentAsyncThunk({
          id: studentDetail.id,
          name,
          age,
          password,
          type,
        })
      );
    } else {
      // MODO CREATE
      dispatch(
        showAlert({
          type: "warning",
          message: "Student registration should be done on the signup screen.",
        })
      );
    }
  }

  function handleClose() {
    dispatch(resetStudentDetail());
    onClose();
  }

  useEffect(() => {
    if (ok && message) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }, [students]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-name"
      aria-describedby="modal-modal-password"
    >
      <Box sx={style}>
        <form onSubmit={onSubmit}>
          <Grid2 container spacing={1}>
            <Grid2 size={12}>
              <Typography variant="h6">Edit Student Data</Typography>
            </Grid2>

            {/** Titulo */}
            <Grid2 size={12}>
              <FormControl fullWidth error={!!fieldsErrors.name}>
                <FormLabel htmlFor="name-student">Name</FormLabel>
                <TextField
                  id="name-student"
                  name="name-student"
                  type="text"
                  placeholder=""
                  variant="outlined"
                  fullWidth
                  required
                  error={!!fieldsErrors.name}
                  helperText={fieldsErrors.name}
                  defaultValue={studentDetail.name}
                />
              </FormControl>
            </Grid2>

            {/** Nota */}
            <Grid2 size={12}>
              <FormControl fullWidth error={!!fieldsErrors.age}>
                <FormLabel htmlFor="age-student">age</FormLabel>
                <TextField
                  id="age-student"
                  name="age-student"
                  type="number"
                  placeholder="10"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!fieldsErrors.age}
                  helperText={fieldsErrors.age}
                  defaultValue={studentDetail.age}
                />
              </FormControl>
            </Grid2>

            {/** Senha */}
            <Grid2 size={12} mb={2}>
              <FormControl fullWidth error={!!fieldsErrors.password}>
                <FormLabel htmlFor="password-old">Password</FormLabel>
                <TextField
                  id="password-old"
                  name="password-old"
                  type="password"
                  placeholder="Old password"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  required
                  error={!!fieldsErrors.password}
                  helperText={fieldsErrors.password}
                  defaultValue={"*******"}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={12} mb={2}>
              <FormControl fullWidth error={!!fieldsErrors.password}>
                <FormLabel htmlFor="password-new">Password</FormLabel>
                <TextField
                  id="password-new"
                  name="password-new"
                  type="password"
                  placeholder="New password"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  required
                  error={!!fieldsErrors.password}
                  helperText={fieldsErrors.password}
                  defaultValue={"*******"}
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
                Cancel
              </Button>
            </Grid2>
            <Grid2 size={6}>
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                fullWidth
              >
                {loading ? "Awaiting..." : "Submit"}
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Modal>
  );
}
