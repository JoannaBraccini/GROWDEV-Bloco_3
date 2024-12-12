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
      if (action.payload.id) {
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.errors = "";
      }

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
