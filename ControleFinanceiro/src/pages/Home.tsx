import { useMemo, useState } from "react";
import { PanelTable } from "../components/PanelTable";
import { DefaultLayout } from "../config/layout/DefaultLayout";
import { rows } from "../mock/Transactions";
import { Transaction } from "../types/Transaction";
import { Modal } from "../components/Modal";
import { Toast } from "../components/Toast";
import { Add } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
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

  function handleAddTransaction(newTransaction: Transaction) {
    setTransactions((prev) => [...prev, newTransaction]);
    setToastProps({
      message: "Transação adicionada com sucesso",
      type: "success",
    });
    setToastOpen(true);
    setModalOpen(false);
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
    setModalOpen(false);
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
    setModalOpen(false);
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
    setModalOpen(false);
  }

  function handleToastClose() {
    setToastOpen(false); // Fecha o Toast
  }

  return (
    <DefaultLayout>
      <BalanceCard balance={balance} />
      <PanelTable
        transactions={transactions}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />
      <Box position="fixed" bottom={70} right={50}>
        <Fab
          aria-label="adicionar"
          color="secondary"
          onClick={handleOpenAddModal}
        >
          <Add />
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
