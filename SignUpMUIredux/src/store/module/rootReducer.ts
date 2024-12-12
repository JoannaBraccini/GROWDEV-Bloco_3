import { combineReducers } from "@reduxjs/toolkit";
import { userLoggedReducer } from "./user/userLoggedSlice";
import { authReducer } from "./user/authSlice";

export const rootReducer = combineReducers({
  userLogged: userLoggedReducer,
  auth: authReducer,
});
