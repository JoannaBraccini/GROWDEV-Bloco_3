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
import { useState } from "react";
import {
  FieldsErrors,
  validateFormAssessment,
} from "../../utils/validators/assessment.validator";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetAssessmentDetail } from "../../store/modules/assessmentDetail/assessmentDetailSlice";
import {
  createAssessmentAsyncThunk,
  updateAssessmentAsyncThunk,
} from "../../store/modules/assessments/assessments.action";

interface UpsertModalProps {
  open: boolean;
  onClose: () => void;
}

export function UpsertAssessmentModal({ open, onClose }: UpsertModalProps) {
  const dispatch = useAppDispatch();

  const userLogged = useAppSelector((state) => state.userLogged);
  const { students } = useAppSelector((state) => state.students);
  const { ok, message, loading } = useAppSelector((state) => state.assessments);
  const { assessmentDetail } = useAppSelector(
    ({ assessmentDetail }) => assessmentDetail
  );

  const [fieldsErrors, setFieldsErrors] = useState<FieldsErrors>({
    title: "",
    description: "",
    grade: "",
    studentId: "",
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = event.currentTarget["title-assessment"].value;
    const grade = Number(event.currentTarget["grade-assessment"].value);
    const description = event.currentTarget["desc-assessment"].value;
    const studentId = event.currentTarget["student"].value;

    const errors = validateFormAssessment(title, description, grade, studentId);
    // Converter um objeto em array
    const hasError = Object.keys(errors);
    if (hasError.length) {
      setFieldsErrors(errors);
      return;
    }

    // Se passar, limpar os errors
    setFieldsErrors({} as FieldsErrors);

    // dispatch => estado avaliações
    const data = {
      title,
      grade,
      description,
      studentId,
      createdBy: userLogged.student.id,
    };

    if (assessmentDetail.id) {
      // MODO EDIT
      dispatch(
        updateAssessmentAsyncThunk({
          id: assessmentDetail.id,
          description,
          grade,
          title,
        })
      );
    } else {
      // MODO CREATE
      dispatch(createAssessmentAsyncThunk(data));
    }

    if (ok && message) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }

  function handleClose() {
    dispatch(resetAssessmentDetail());
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-upsert-assessment"
      aria-describedby="create-update-assessment"
    >
      <Box sx={style}>
        <form onSubmit={onSubmit}>
          <Grid2 container spacing={1}>
            <Grid2 size={12}>
              <Typography variant="h6">
                {assessmentDetail.id ? "Editar" : "Nova"} Avaliação
              </Typography>
            </Grid2>

            {/** Titulo */}
            <Grid2 size={12}>
              <FormControl fullWidth error={!!fieldsErrors.title}>
                <FormLabel htmlFor="title-assessment">Título</FormLabel>
                <TextField
                  id="title-assessment"
                  name="title-assessment"
                  type="text"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!fieldsErrors.title}
                  helperText={fieldsErrors.title}
                  defaultValue={assessmentDetail.title}
                />
              </FormControl>
            </Grid2>

            {/** Nota */}
            <Grid2 size={12}>
              <FormControl fullWidth error={!!fieldsErrors.grade}>
                <FormLabel htmlFor="grade-assessment">Nota</FormLabel>
                <TextField
                  id="grade-assessment"
                  name="grade-assessment"
                  type="number"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!fieldsErrors.grade}
                  helperText={fieldsErrors.grade}
                  defaultValue={assessmentDetail.grade}
                />
              </FormControl>
            </Grid2>

            {/** Descrição */}
            <Grid2 size={12} mb={2}>
              <FormControl fullWidth error={!!fieldsErrors.description}>
                <FormLabel htmlFor="desc-assessment">Descrição</FormLabel>
                <TextField
                  id="desc-assessment"
                  name="desc-assessment"
                  type="text"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  required
                  error={!!fieldsErrors.description}
                  helperText={fieldsErrors.description}
                  defaultValue={assessmentDetail.description}
                />
              </FormControl>
            </Grid2>

            {/** Estudante avaliado */}
            <Grid2 size={12} mb={2}>
              <FormControl fullWidth error={!!fieldsErrors.studentId}>
                <FormLabel htmlFor="student">Estudante</FormLabel>
                <TextField
                  id="student"
                  name="student"
                  select
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  error={!!fieldsErrors.studentId}
                  helperText={fieldsErrors.studentId}
                  slotProps={{
                    select: {
                      native: true,
                    },
                  }}
                >
                  {assessmentDetail.id ? (
                    <option
                      key={assessmentDetail.studentId}
                      value={assessmentDetail.studentId}
                    >
                      {
                        students.find(
                          (stud) => stud.id === assessmentDetail.studentId
                        )?.name
                      }
                    </option>
                  ) : (
                    <>
                      <option value="">Selecionar Estudante</option>
                      {userLogged.student.studentType !== "T" ? (
                        <option
                          key={userLogged.student.id}
                          value={userLogged.student.id}
                        >
                          {userLogged.student.name}
                        </option>
                      ) : (
                        students.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.name}
                          </option>
                        ))
                      )}
                    </>
                  )}
                </TextField>
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
