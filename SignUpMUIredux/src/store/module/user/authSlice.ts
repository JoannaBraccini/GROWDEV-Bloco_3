import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, SignupRequest } from "../../../utils/types/user";

interface InitialState {
  users: User[];
  errors: "";
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
      const newUser: User = {
        id: crypto.randomUUID(),
        email: action.payload.email,
        password: action.payload.password,
        createdAt: new Date(),
      };

      state.users.push(newUser);
      state.errors = "";
      return state;
    },
  },
});

export const { signup } = authSlice.actions;
export const signupReducer = authSlice.reducer;
