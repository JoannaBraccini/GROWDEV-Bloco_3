import { combineReducers } from "@reduxjs/toolkit";
import { userLoggedReducer } from "./user/userLoggedSlice";
import { signupReducer } from "./user/authSlice";

export const rootReducer = combineReducers({
  userLogged: userLoggedReducer,
  signup: signupReducer,
});
