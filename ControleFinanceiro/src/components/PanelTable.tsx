import React, { useState } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { blue, pink } from "@mui/material/colors";
import { SelectType } from "./SelectType";
import { Transaction } from "../types/Transaction";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 18,
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: pink[600],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface PanelTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export function PanelTable({
  transactions,
  onEdit,
  onDelete,
}: PanelTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedType, setSelectedType] = useState<string>("Todos");

  const filteredRows =
    selectedType === "Todos"
      ? transactions
      : transactions.filter((t) => t.type === selectedType);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <SelectType onChange={(selection) => setSelectedType(selection)} />
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 5,
          borderRadius: 2,
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="controle financeiro">
          <TableHead>
            <TableRow>
              <StyledTableCell>Descrição</StyledTableCell>
              <StyledTableCell align="right">Tipo</StyledTableCell>
              <StyledTableCell align="right">Data</StyledTableCell>
              <StyledTableCell align="right">Valor</StyledTableCell>
              <StyledTableCell align="right">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredRows
            ).map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="right">{row.type}</StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(row.date).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{
                    color: row.type === "Saída" ? "red" : "inherit",
                  }}
                >
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(row.amount)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    onClick={() => onEdit(row)}
                    aria-label="Editar"
                    sx={{ color: blue[900] }}
                  >
                    <Tooltip title="Editar">
                      <Edit />
                    </Tooltip>
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(row)}
                    aria-label="Excluir"
                    sx={{ color: blue[900] }}
                  >
                    <Tooltip title="Excluir">
                      <Delete onClick={() => onDelete(row)} />
                    </Tooltip>
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
                colSpan={5}
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
