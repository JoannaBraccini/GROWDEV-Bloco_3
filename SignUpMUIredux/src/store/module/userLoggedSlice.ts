import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const users: UserState[] = [];

interface LoginRequest {
  email: string;
  password: string;
}

interface UserState {
  id: string;
  email: string;
  errors: string;
}

const initialState: UserState = {
  id: "",
  email: "",
  errors: "",
};

const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginRequest>) {
      const { email } = action.payload;

      const userFound = users.find((user) => user.email === email && user.id);

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
    logout() {
      return initialState;
    },
  },
});

export const { login, logout } = userLoggedSlice.actions;
export const userLoggedReducer = userLoggedSlice.reducer;
