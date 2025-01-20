import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseAPI } from "../../../configs/services/api.service";
import { SignupRequest, Student } from "../../../utils/types";
import { signupService } from "../../../configs/services/auth.service";
import { showAlert } from "../alert/alertSlice";

export const signupAsyncThunk = createAsyncThunk(
  "userCreated/signup",
  async (data: SignupRequest, { dispatch }) => {
    const { name, cpf, age, email, password, studentType } = data;

    const response = await signupService({
      name,
      cpf,
      age,
      email,
      password,
      studentType,
    });

    if (!response.ok) {
      dispatch(
        showAlert({
          message: response.message,
          type: "error",
        })
      );
    }

    dispatch(
      showAlert({
        message: response.message,
        type: "success",
      })
    );

    return response;
  }
);

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  student: Student;
}

const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  student: {
    id: "",
    name: "",
    cpf: "",
    age: null,
    email: "",
    studentType: "M",
    registeredAt: "",
    assessments: [],
  },
};

const userCreatedSlice = createSlice({
  name: "userSignup",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //SIGNUP/CREATE
    builder
      .addCase(signupAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        signupAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseAPI>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (action.payload.ok) {
            state.student = action.payload.data;
          }
        }
      )
      .addCase(signupAsyncThunk.rejected, (state) => {
        state.loading = false;
        state.ok = false;
        state.message = "Erro no Registro";
      });
  },
});

export const userCreatedReducer = userCreatedSlice.reducer;
