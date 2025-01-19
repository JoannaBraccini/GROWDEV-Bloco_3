import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseAPI } from "../../../configs/services/api.service";
import { LoginRequest } from "../../../utils/types/auth";
import { loginService } from "../../../configs/services/auth.service";
import { showAlert } from "../alert/alertSlice";
import { StudentType } from "../../../utils/types";

export const loginAsyncThunk = createAsyncThunk(
  "userLogged/login",
  async (data: LoginRequest, { dispatch }) => {
    const { email, password, remember } = data;

    const response = await loginService({ email, password });
    if (!response.ok) {
      dispatch(
        showAlert({
          message: response.message,
          type: "error",
        })
      );
    }

    const responseWithRemember = {
      ...response, // { ok, message }
      data: {
        token: response.data.token, //  { token }
        student: {
          ...response.data.student, // { id, name....}
          remember,
        },
      },
    };

    dispatch(
      showAlert({
        message: response.message,
        type: "success",
      })
    );

    // Vai virar o paylod lá no builder
    return responseWithRemember; // Data da requisição { ok, message, data }
  }
);

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  token: string;
  student: {
    id: string;
    name: string;
    email: string;
    type: StudentType;
    remember: boolean;
  };
}

const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  token: "",
  student: {
    id: "",
    name: "",
    email: "",
    type: "M",
    remember: false,
  },
};

const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState,
  reducers: {
    logout() {
      return initialState;
    },
  },
  extraReducers(builder) {
    // LOGIN USER
    builder
      .addCase(loginAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loginAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseAPI>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (action.payload.ok) {
            state.token = action.payload.data.token;
            state.student = action.payload.data.student;
          }
        }
      )
      .addCase(loginAsyncThunk.rejected, (state) => {
        state.loading = false;
        state.ok = false;
        state.message = "Erro no Login";
      });
  },
});

export const { logout } = userLoggedSlice.actions;
export const userLoggedReducer = userLoggedSlice.reducer;
