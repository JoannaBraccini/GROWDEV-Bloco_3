import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest, User } from "../../../utils/types/user";
interface UserState {
  users: User[];
  id: string;
  email: string;
  errors: string;
}
const initialState: UserState = {
  users: [],
  id: "",
  email: "",
  errors: "",
};
const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginRequest>) {
      const { email, password } = action.payload;

      const userFound = state.users.find(
        (user) => user.email === email && user.password === password
      );

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
