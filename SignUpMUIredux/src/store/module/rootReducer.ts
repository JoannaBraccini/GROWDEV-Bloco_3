import { combineReducers } from "@reduxjs/toolkit";
import { userLoggedReducer } from "./user/userLoggedSlice";

export const rootReducer = combineReducers({
  userLogged: userLoggedReducer,
});
