import { combineReducers } from "@reduxjs/toolkit";
import { userLoggedReducer } from "./userLoggedSlice";
import { transactionsReducer } from "./transactionsSlice";

export const rootReducer = combineReducers({
  // Todos os novos estados globais criado, devem ser chamados aqui...
  userLogged: userLoggedReducer,
  transactions: transactionsReducer,
});
