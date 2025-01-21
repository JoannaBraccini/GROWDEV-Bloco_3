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
import { useMemo, useState } from "react";
import { deleteAssessmentAsyncThunk } from "../../store/modules/assessments/assessments.action";
import { setAssessentDetail } from "../../store/modules/assessmentDetail/assessmentDetailSlice";
import { Assessment } from "../../utils/types";
import { ActionsMenu } from "../ActionsMenu";
import { useNavigate } from "react-router-dom";

export function TableDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { students } = useAppSelector((state) => state.students);
  const { studentDetail, loading } = useAppSelector(
    (state) => state.studentDetail
  );
  const userLogged = useAppSelector((state) => state.userLogged);
  const [page, setPage] = useState(1); // URL
  const LIMIT = import.meta.env.LIMIT;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const numberPages = useMemo(() => {
    return Math.ceil(studentDetail.assessments.length / LIMIT);
  }, [studentDetail.assessments.length]);

  function handleEdit(assessment: Assessment) {
    dispatch(setAssessentDetail(assessment));
  }

  function handleDelete(id: string) {
    dispatch(deleteAssessmentAsyncThunk({ id }));
  }

  return (
    <TableContainer>
      {(!loading && !studentDetail.assessments) ||
      studentDetail.assessments.length < 1 ? (
        <Typography variant="subtitle2" textAlign="center">
          Nenhuma avaliação registrada. Crie uma!
        </Typography>
      ) : (
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
                Nota
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Criada Em
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Criada Por
              </TableCell>
              <TableCell
                align="right"
                onClick={() => navigate(-1)} //Voltar para a página anterior
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
            {loading ? (
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
              studentDetail.assessments.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.grade}</TableCell>
                  <TableCell align="right">
                    {new Date(row.createdAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                    {students.find((user) => user.id === row.createdBy)?.name}
                  </TableCell>
                  <TableCell align="right">
                    {userLogged.student.studentType === "T" && (
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
