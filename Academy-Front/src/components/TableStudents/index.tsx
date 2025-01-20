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
  deleteStudentAsyncThunk,
  fetchStudentsAsyncThunk,
} from "../../store/modules/students/studentsActions";
import { ActionsMenu } from "../ActionsMenu";
import { ArrowBack, Delete, Edit } from "@mui/icons-material";
import { Student } from "../../utils/types";
import { setStudentDetail } from "../../store/modules/studentDetail/studentDetailSlice";
import { useNavigate } from "react-router-dom";
import { fetchAssessmentsAsyncThunk } from "../../store/modules/assessments/assessments.action";

const LIMIT = 20; // Variavel de ambiente

export function TableStudents() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { students, count, loadingList } = useAppSelector(
    (state) => state.students
  );
  const { assessments } = useAppSelector((state) => state.assessments);
  const [page, setPage] = useState(1); // URL

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const numberPages = useMemo(() => {
    return Math.ceil(count / LIMIT);
  }, [count]);

  function handleEdit(student: Student) {
    dispatch(setStudentDetail(student));
  }

  function handleDelete(id: string) {
    dispatch(deleteStudentAsyncThunk({ id }));
  }

  const handleRowClick = (id: string) => {
    navigate(`/students/${id}`);
  };

  useEffect(() => {
    dispatch(fetchStudentsAsyncThunk({ page: page, take: LIMIT }));
    dispatch(fetchAssessmentsAsyncThunk({ page: page, take: LIMIT }));
  }, [page]);

  return (
    <TableContainer>
      {loadingList ? (
        <CircularProgress />
      ) : !students || students.length < 1 ? (
        <Typography variant="subtitle2" textAlign="center">
          Nenhum estudante registrado.
        </Typography>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Nome
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                CPF
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Idade
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                E-mail
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Tipo
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Data de Registro
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Avaliações
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
          <TableBody>
            {loadingList ? (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  colSpan={6}
                  rowSpan={LIMIT}
                  align="center"
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              students
                .filter((row) => row?.id)
                .map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    onClick={() => handleRowClick(row.id)}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.cpf}</TableCell>
                    <TableCell align="right">
                      {row.age ? row.age : "Not informed"}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">
                      {new Date(row.registeredAt).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell align="right" sx={{ cursor: "pointer" }}>
                      {
                        assessments.filter(
                          (assessment) => assessment.studentId === row.id
                        ).length
                      }
                    </TableCell>
                    <TableCell align="right">
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
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      )}
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
