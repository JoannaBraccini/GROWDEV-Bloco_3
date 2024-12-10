import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  email: string;
}

interface UserState {
  id: number;
  email: string;
  errors: string;
  users: User[];
}
const initialState: UserState = {
  id: 0,
  email: "",
  errors: "",
  users: [],
};
interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  passwordConfirm: string;
}

const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState,
  reducers: {
    signup(state, action: PayloadAction<SignupRequest>) {
      const { email, password, passwordConfirm } = action.payload;

      if (password !== passwordConfirm) {
        state.errors = "As senhas não coincidem";
        return;
      }

      const emailExists = state.users.some((user) => user.email === email);
      if (emailExists) {
        state.errors = "E-mail já cadastrado";
        return;
      }

      const newUser: User = {
        id: state.users.length + 1,
        email,
      };
      state.users.push(newUser);
      state.errors = "";
    },

    login(state, action: PayloadAction<LoginRequest>) {
      const { email } = action.payload;

      const userFound = state.users.find((user) => user.email === email);

      if (!userFound) {
        state.errors = "Usuário não encontrado";
        return state;
      }

      state.id = userFound.id;
      state.email = userFound.email;
      state.errors = "";

      return state;
    },
    // Logout
    logout(state) {
      state.id = 0;
      state.email = "";
    },
  },
});

export const { signup, login, logout } = userLoggedSlice.actions;
export const userLoggedReducer = userLoggedSlice.reducer;
