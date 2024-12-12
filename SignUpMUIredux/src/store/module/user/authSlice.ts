import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, SignupRequest } from "../../../utils/types/user";
import { FieldsErrors } from "../../../utils/validations/sign.validation";

interface InitialState {
  users: User[];
  errors: string;
}

const initialState: InitialState = {
  users: [],
  errors: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup(state, action: PayloadAction<SignupRequest>) {
      const errors: FieldsErrors = {} as FieldsErrors;
      const { email } = action.payload;

      const userFound = state.users.find((user) => user.email === email);
      if (userFound) {
        errors.email = "Usuário já cadastrado. Faça seu login.";
        return;
      }

      const newUser: User = {
        id: crypto.randomUUID(),
        email: action.payload.email,
        password: action.payload.password,
      };
      state.users.push(newUser);
      state.errors = "";

      return state;
    },

    resetState(state) {
      state.errors = "";
    },
  },
});

export const { signup, resetState } = authSlice.actions;
export const authReducer = authSlice.reducer;
