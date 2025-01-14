import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseAPI } from "../../../configs/services/api.service";
import { LoginRequest } from "../../../utils/types/auth";
import { loginService } from "../../../configs/services/auth.service";
import { showAlert } from "../alert/alertSlice";

export const loginAsyncThunk = createAsyncThunk(
  "userLogged/loginAsyncThunk",
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

    const responseWithRemenber = {
      ...response, // { ok, message }
      data: {
        ...response.data.token, //  { token }
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
    return responseWithRemenber; // Data da requisição { ok, message, data }
  }
);

interface InitialState {
  ok: boolean;
  message: string;
  token: string;
  student: {
    id: string;
    name: string;
    email: string;
    remember: boolean;
  };
}

const initialState: InitialState = {
  ok: false,
  message: "",
  token: "",
  student: {
    email: "",
    id: "",
    name: "",
    remember: false,
  },
};

const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState: initialState,
  reducers: {
    logout() {
      return initialState;
    },
  },
  extraReducers(builder) {
    // LOGIN USER
    builder
      .addCase(loginAsyncThunk.pending, () => {
        console.log("Estou em estado de pending na função loginAsyncThunk");
      })
      .addCase(
        loginAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseAPI>) => {
          console.log("Estou em estado de fulfilled na função loginAsyncThunk");
          console.log({ state, payload: action.payload });

          state.ok = action.payload.ok;
          state.message = action.payload.message;

          // Só posso atribuir token e student quando o ok for true
          if (action.payload.ok) {
            state.token = action.payload.data.token;
            state.student = action.payload.data.student;
          }
        }
      )
      .addCase(loginAsyncThunk.rejected, (state) => {
        state.ok = false;
        state.message = "Error login";
      });
  },
});

export const { logout } = userLoggedSlice.actions;
export const userLoggedReducer = userLoggedSlice.reducer;
