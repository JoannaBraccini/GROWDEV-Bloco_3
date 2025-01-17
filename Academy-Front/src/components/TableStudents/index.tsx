import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useMemo, useState } from "react";
import { fetchStudentsAsyncThunk } from "../../store/modules/students/studentsActions";
import { ActionsMenu } from "../ActionsMenu";

const LIMIT = 20; // Variavel de ambiente

export function TableStudents() {
  const dispatch = useAppDispatch();
  const { students, count, loadingList } = useAppSelector(
    (state) => state.students
  );
  const [page, setPage] = useState(1); // URL

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const numberPages = useMemo(() => {
    return Math.ceil(count / LIMIT);
  }, [count]);

  // Toda vez que esse componente renderizar, preciso buscar as avaliações
  useEffect(() => {
    dispatch(fetchStudentsAsyncThunk({ page: page, take: LIMIT }));
  }, [page]);

  return (
    <TableContainer>
      {!students || students.length < 1 ? (
        <Typography variant="subtitle2" textAlign="center">
          No students to show. Register one!
        </Typography>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                CPF
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Age
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Type
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Registered at
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
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.cpf}</TableCell>
                    <TableCell align="right">
                      {row.age ? row.age : "Not informed"}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">
                      {new Date(row.createdAt).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell align="right">
                      <ActionsMenu
                        key={row.id}
                        onDelete={row.id}
                        onEdit={row}
                      />
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
