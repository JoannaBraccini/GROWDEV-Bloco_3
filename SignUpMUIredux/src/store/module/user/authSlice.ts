import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupRequest, User } from "../../../utils/types/user";

interface UserState {
  users: User[];
  message: string;
  success: boolean;
}

const initialState: UserState = {
  users: [],
  message: "",
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup(state, action: PayloadAction<SignupRequest>) {
      const userFound = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (userFound) {
        state.message = "Usuário já cadastrado. Faça seu login.";
        state.success = false;
      } else {
        state.users.push({
          id: crypto.randomUUID(),
          email: action.payload.email,
          password: action.payload.password,
        });
        state.message = "Usuário cadastrado com sucesso!";
        state.success = true;

        return state;
      }
    },

    clearMessage(state) {
      state.message = "";
      state.success = false;
    },
  },
});

export const { signup, clearMessage } = authSlice.actions;
export const authReducer = authSlice.reducer;
