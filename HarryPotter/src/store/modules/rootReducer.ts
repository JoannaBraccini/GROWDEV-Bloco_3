import { combineReducers } from "@reduxjs/toolkit";
import { alertReducer } from "./alert/AlertSlice";

export const rootReducer = combineReducers({
  alert: alertReducer,
});
