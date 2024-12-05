import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ModalProps {
  openModal: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (data: {
    description: string;
    type: string;
    date: string;
    amount: number;
  }) => void;
}

export function Modal({ openModal, title, onClose, onSubmit }: ModalProps) {
  return (
    <>
      <Dialog
        open={openModal}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: onSubmit,
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>Adicione suas transações aqui.</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Descrição"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="date"
            name="date"
            label="Data"
            type="date"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="amount"
            name="amount"
            label="Valor"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
