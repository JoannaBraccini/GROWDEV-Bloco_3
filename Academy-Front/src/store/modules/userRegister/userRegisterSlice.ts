import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseAPI } from "../../../configs/services/api.service";
import { SignupRequest } from "../../../utils/types/auth";
import { signupService } from "../../../configs/services/auth.service";
import { showAlert } from "../alert/alertSlice";

export const signupAsyncThunk = createAsyncThunk(
  "userRegister/signupAsyncThunk",
  async (data: SignupRequest, { dispatch }) => {
    const { name, cpf, age, email, password, type } = data;

    const response = await signupService({
      name,
      cpf,
      age,
      email,
      password,
      type,
    });

    if (!response.ok) {
      dispatch(
        showAlert({
          message: response.message,
          type: "error",
        })
      );
    }

    return response.data;
  }
);

interface InitialState {
  ok: boolean;
  message: string;
  student: {
    id: string;
    name: string;
    cpf: string;
    age: number | null;
    email: string;
    type: "M" | "F" | "T";
  };
}

const initialState: InitialState = {
  ok: false,
  message: "",
  student: {
    id: "",
    name: "",
    cpf: "",
    age: null,
    email: "",
    type: "M",
  },
};

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: initialState,
  reducers: {
    logout() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signupAsyncThunk.pending, () => {})
      .addCase(
        signupAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseAPI>) => {
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (action.payload.ok) {
            state.student = action.payload.data;
          }
        }
      )
      .addCase(signupAsyncThunk.rejected, (state) => {
        state.ok = false;
        state.message = "Error Signup";
      });
  },
});

export const userRegisterReducer = userRegisterSlice.reducer;
