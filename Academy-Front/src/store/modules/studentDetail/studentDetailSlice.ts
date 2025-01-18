import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "../../../utils/types";
import { ResponseAPI } from "../../../configs/services/api.service";
import { findStudentAsyncThunk } from "../students/studentsActions";

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  studentDetail: Student;
}

const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  studentDetail: {
    id: "",
    name: "",
    cpf: "",
    age: null,
    email: "",
    type: "M",
    registeredAt: "",
  },
};

const studentDetailSlice = createSlice({
  name: "studentDetail",
  initialState,
  reducers: {
    setStudentDetail(state, action: PayloadAction<Student>) {
      return {
        ...state, // {}
        ...action.payload, // {}
        registeredAt: new Date(action.payload.registeredAt).toISOString(), // Converte para string ISO
      };
    },
    // Reset
    resetStudentDetail() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(findStudentAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        findStudentAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseAPI>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;
          if (action.payload.ok) {
            return {
              ...state,
              ...action.payload.data,
              registeredAt: new Date(
                action.payload.data.registeredAt
              ).toISOString(),
            };
          }
        }
      )
      .addCase(findStudentAsyncThunk.rejected, (state) => {
        state.loading = false;
        state.ok = false;
      });
  },
});

export const { resetStudentDetail, setStudentDetail } =
  studentDetailSlice.actions;

export const studentDetailReducer = studentDetailSlice.reducer;
