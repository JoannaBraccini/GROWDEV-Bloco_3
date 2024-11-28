import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export function ModalBox({ open, onClose }: ModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Dialog
        open={open}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            onClose();
          },
        }}
      >
        <DialogTitle>Inscreva-se</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Informe seu e-mail para receber promoções de pacotes de viagens!
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="E-mail"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">Inscrever</Button>
        </DialogActions>
      </Dialog>
    </Modal>
  );
}
