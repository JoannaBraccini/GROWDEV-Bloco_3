import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest } from "../../../utils/types/user";
interface UserState {
  id: string;
  email: string;
  message: string;
  success: boolean;
}
const initialState: UserState = {
  id: "",
  email: "",
  message: "",
  success: false,
};
const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginRequest>) {
      if (action.payload.id) {
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.message = "Usuário logado com sucesso";
        state.success = true;
      }
      return state;
    },
    // Logout
    logout() {
      return initialState;
    },

    clearUserMessage(state) {
      state.message = "";
      state.success = false;
    },
  },
});

export const { login, logout, clearUserMessage } = userLoggedSlice.actions;
export const userLoggedReducer = userLoggedSlice.reducer;
