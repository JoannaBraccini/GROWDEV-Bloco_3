import { useEffect, useState } from "react";
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

const generateUniqueId = (): string => {
  return "xxxxxx".replace(/[x]/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  );
};

export function Modal({
  isOpen,
  onClose,
  onConfirm,
  type,
  transaction,
}: ModalProps) {
  //estado inicial
  const emptyTransaction: Transaction = {
    id: generateUniqueId(),
    type: "",
    description: "",
    amount: 0,
    date: new Date(),
  };

  const [formData, setFormData] = useState<Transaction>(
    transaction || emptyTransaction
  );

  useEffect(() => {
    if (type === "edit" && transaction) {
      setFormData(transaction); // Atualiza com os dados da transação quando editar
    } else if (type === "add") {
      setFormData(emptyTransaction); // Reseta o formulário quando adicionar
    }
  }, [type, transaction, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "amount") {
        return { ...prev, [name]: parseFloat(value) }; // Converte para número
      }

      return { ...prev, [name]: value };
    });
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

            <SelectType
              onChange={handleTypeChange}
              title="Tipo"
              value={formData.type}
            />
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
