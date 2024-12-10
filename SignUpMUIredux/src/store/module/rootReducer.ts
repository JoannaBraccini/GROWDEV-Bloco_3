import { combineReducers } from "@reduxjs/toolkit";
import { userLoggedReducer } from "./userLoggedSlice";

export const rootReducer = combineReducers({
  userLogged: userLoggedReducer,
});
