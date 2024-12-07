import { useMemo, useState } from "react";
import { PanelTable } from "../components/PanelTable";
import { DefaultLayout } from "../config/layout/DefaultLayout";
import { rows } from "../mock/Transactions";
import { Transaction } from "../types/Transaction";
import { Modal } from "../components/Modal";
import { Toast } from "../components/Toast";
import { Add } from "@mui/icons-material";
import { Box, Fab, Tooltip } from "@mui/material";
import { BalanceCard } from "../components/BalanceCard";

export function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>(rows);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >(undefined);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastProps, setToastProps] = useState({
    type: "success" as "success" | "error",
    message: "",
  });

  function validate(transaction: Transaction) {
    if (
      !transaction.type ||
      (transaction.type !== "Entrada" && transaction.type !== "Saída")
    ) {
      setToastProps({
        message: "Selecione o tipo correto da transação",
        type: "error",
      });
      setToastOpen(true);
      return false;
    }

    if (!transaction.description || transaction.description.length < 3) {
      setToastProps({
        message: "Insira uma descrição maior",
        type: "error",
      });
      setToastOpen(true);
      return false;
    }

    const inputDate = new Date(transaction.date).toLocaleDateString("pt-BR");
    const currentDate = new Date().toLocaleDateString("pt-BR");

    // Se a data da transação for no futuro
    if (inputDate > currentDate) {
      setToastProps({
        message: "A data da transação não pode ser no futuro",
        type: "error",
      });
      setToastOpen(true);
      return false;
    }

    if (!transaction.amount || transaction.amount <= 0) {
      setToastProps({
        message: "Valor deve ser maior que ZERO",
        type: "error",
      });
      setToastOpen(true);
      return false;
    }

    return true;
  }

  //CRUD
  function handleAddTransaction(newTransaction: Transaction) {
    //Validação
    if (!validate(newTransaction)) return;

    setTransactions((prev) => [...prev, newTransaction]);
    setToastProps({
      message: "Transação adicionada com sucesso",
      type: "success",
    });
    setToastOpen(true);
    handleModalClose();
  }

  function handleEditTransaction(updatedTransaction: Transaction) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
    setToastProps({
      message: "Transação alterada com sucesso",
      type: "success",
    });
    setToastOpen(true);
    handleModalClose();
  }

  function handleDeleteTransaction(transactionToDelete: Transaction) {
    setTransactions((prev) =>
      prev.filter((t) => t.id !== transactionToDelete.id)
    );
    setToastProps({
      message: "Transação excluída com sucesso",
      type: "success",
    });
    setToastOpen(true);
    handleModalClose();
  }

  const balance = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === "Entrada") {
        return acc + transaction.amount;
      } else {
        return acc - transaction.amount;
      }
    }, 0);
  }, [transactions]);

  function handleOpenAddModal() {
    setModalType("add");
    setSelectedTransaction(undefined);
    setModalOpen(true);
  }

  function handleOpenEditModal(transaction: Transaction) {
    setModalType("edit");
    setSelectedTransaction(transaction);
    setModalOpen(true);
  }

  function handleOpenDeleteModal(transaction: Transaction) {
    setModalType("delete");
    setSelectedTransaction(transaction);
    setModalOpen(true);
  }

  function handleModalClose() {
    setSelectedTransaction(undefined);
    setModalOpen(false);
  }

  function handleToastClose() {
    setToastProps({
      message: "",
      type: "success",
    });
    setToastOpen(false);
  }

  return (
    <DefaultLayout>
      <BalanceCard balance={balance} />
      <PanelTable
        transactions={transactions}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />
      <Box
        position="fixed"
        bottom={70}
        sx={{
          right: {
            xs: 20,
            sm: 50,
          },
        }}
      >
        <Fab
          aria-label="adicionar"
          color="secondary"
          onClick={handleOpenAddModal}
        >
          <Tooltip title="Adicionar">
            <Add />
          </Tooltip>
        </Fab>
      </Box>
      <Modal
        isOpen={modalOpen}
        onConfirm={
          modalType === "add"
            ? handleAddTransaction
            : modalType === "edit"
            ? handleEditTransaction
            : handleDeleteTransaction
        }
        type={modalType}
        transaction={selectedTransaction}
        onClose={handleModalClose}
      />
      {toastOpen && (
        <Toast
          message={toastProps.message}
          type={toastProps.type}
          isOpen={toastOpen}
          onClose={handleToastClose}
        />
      )}
    </DefaultLayout>
  );
}
