import { useState } from "react";
import { Transaction } from "../types/Transaction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { SelectType } from "./SelectType";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (transaction: Transaction) => void;
  type: "add" | "edit" | "delete";
  transaction?: Transaction;
}

export function Modal({
  isOpen,
  onClose,
  onConfirm,
  type,
  transaction,
}: ModalProps) {
  //estado inicial
  const [formData, setFormData] = useState<Transaction>(
    transaction || {
      id: "",
      type: "",
      description: "",
      amount: 0,
      date: new Date(),
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {type === "add"
          ? "Adicionar Transação"
          : type === "edit"
          ? "Editar Transação"
          : "Excluir Transação"}
      </DialogTitle>
      <DialogContent>
        {type !== "delete" ? (
          <>
            <DialogContentText>
              {type === "add"
                ? "Adicione uma nova transação."
                : "Edite os dados da transação abaixo."}
            </DialogContentText>

            <SelectType onChange={handleTypeChange} title="Tipo" />
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
              value={formData.description}
              onChange={handleChange}
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
              value={formData.date}
              onChange={handleChange}
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
              value={formData.amount}
              onChange={handleChange}
            />
          </>
        ) : (
          <DialogContentText>
            Tem certeza que deseja excluir esta transação?
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={() =>
            type === "delete" ? onConfirm(transaction!) : onConfirm(formData)
          }
        >
          {type === "delete" ? "Excluir" : "Confirmar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
