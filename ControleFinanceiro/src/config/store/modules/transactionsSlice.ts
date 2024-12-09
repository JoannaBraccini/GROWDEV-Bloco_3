import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../../types/Transaction";
import { rows } from "../../../mock/Transactions";

interface InitialState {
  transactions: Transaction[];
  balance: number;
}

const initialState: InitialState = {
  transactions: rows,
  balance: rows.reduce((prev, transaction) => {
    return (
      prev +
      (transaction.type === "Entrada"
        ? transaction.amount
        : -transaction.amount)
    );
  }, 0),
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    //Adicionar
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload);
      state.balance +=
        action.payload.type === "Entrada"
          ? action.payload.amount
          : -action.payload.amount;
    },
    //Alterar
    editTransaction(state, action: PayloadAction<Transaction>) {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        const prevTransaction = state.transactions[index];
        state.transactions[index] = action.payload;

        // Atualizar o saldo
        state.balance +=
          (action.payload.type === "Entrada"
            ? action.payload.amount
            : -action.payload.amount) -
          (prevTransaction.type === "Entrada"
            ? prevTransaction.amount
            : -prevTransaction.amount);
      }
    },
    //Excluir
    deleteTransaction(state, action: PayloadAction<string>) {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload
      );
      if (index !== -1) {
        const transactionToDelete = state.transactions[index];
        state.transactions.splice(index, 1);

        // Atualizar o saldo
        state.balance -=
          transactionToDelete.type === "Entrada"
            ? transactionToDelete.amount
            : -transactionToDelete.amount;
      }
    },

    resetTransactions() {
      return initialState;
    },
  },
});

export const {
  addTransaction,
  editTransaction,
  deleteTransaction,
  resetTransactions,
} = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;
