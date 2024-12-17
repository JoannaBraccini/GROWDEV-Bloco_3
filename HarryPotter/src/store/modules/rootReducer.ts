import { combineReducers } from "@reduxjs/toolkit";
import { alertReducer } from "./alert/AlertSlice";
import { charactersReducer } from "./characters/charactersSlice";

export const rootReducer = combineReducers({
  alert: alertReducer,
  characters: charactersReducer,
});
