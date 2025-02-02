import { ArrowBack, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  MenuItem,
  Pagination,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useMemo, useState } from "react";
import {
  deleteAssessmentAsyncThunk,
  fetchAssessmentsAsyncThunk,
} from "../../store/modules/assessments/assessments.action";
import { setAssessentDetail } from "../../store/modules/assessmentDetail/assessmentDetailSlice";
import { Assessment } from "../../utils/types";
import { ActionsMenu } from "../ActionsMenu";
import { useNavigate } from "react-router-dom";
import {
  fetchStudentsAsyncThunk,
  findStudentAsyncThunk,
} from "../../store/modules/students/studentsActions";
const LIMIT = 20; // Variavel de ambiente

export function TableAssessments() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { assessments, count, loadingList } = useAppSelector(
    (state) => state.assessments
  );
  const { students } = useAppSelector((state) => state.students);
  const { student } = useAppSelector((state) => state.userLogged);
  const [page, setPage] = useState(1); // URL

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const numberPages = useMemo(() => {
    return Math.ceil(count / LIMIT);
  }, [count]);

  const handleEdit = (assessment: Assessment) => {
    dispatch(setAssessentDetail(assessment));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteAssessmentAsyncThunk({ id }));
  };

  const handleRowClick = (assessment: Assessment) => {
    dispatch(findStudentAsyncThunk(assessment.studentId)).then(() => {
      dispatch(setAssessentDetail(assessment));
      setTimeout(() => {
        navigate(`/details/${assessment.studentId}`);
      }, 1000);
    });
  };

  useEffect(() => {
    dispatch(fetchStudentsAsyncThunk({}));
    dispatch(fetchAssessmentsAsyncThunk({ page: page, take: LIMIT }));
  }, [page]);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Título
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Descrição
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Estudante
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Nota
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
            >
              Criada Em
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
            >
              Criada Por
            </TableCell>
            <TableCell
              align="right"
              onClick={() => navigate("/home")}
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              Voltar
              <ArrowBack sx={{ margin: 1 }} />
            </TableCell>
          </TableRow>
        </TableHead>
        {loadingList ? (
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row" colSpan={8} align="center">
              <CircularProgress />
            </TableCell>
          </TableRow>
        ) : !assessments || assessments.length < 1 ? (
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row" colSpan={8} align="center">
              <Typography variant="subtitle2" textAlign="center">
                Nenhuma avaliação registrada. Crie uma!
              </Typography>
            </TableCell>
          </TableRow>
        ) : (
          <TableBody>
            {assessments
              .filter((row) => row?.id)
              .map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                    {students.find((stud) => stud.id === row.studentId)?.name}
                  </TableCell>
                  <TableCell align="right">{row.grade}</TableCell>
                  <TableCell align="right">
                    {new Date(row.createdAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                    {students.find((user) => user.id === row.createdBy)?.name ||
                      "Desconhecido"}
                  </TableCell>
                  <TableCell align="right">
                    {student.studentType === "T" && (
                      <ActionsMenu>
                        <MenuItem onClick={() => handleEdit(row)} disableRipple>
                          <Edit />
                          Editar
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleDelete(row.id)}
                          disableRipple
                        >
                          <Delete />
                          Excluir
                        </MenuItem>
                      </ActionsMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        )}
      </Table>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Pagination
          color="primary"
          count={numberPages}
          page={page}
          onChange={handleChange}
        />
      </Box>
    </TableContainer>
  );
}
