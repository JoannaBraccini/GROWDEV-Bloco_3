import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseAPI } from "../../../configs/services/api.service";
import { fetchStudentsAsyncThunk, signupAsyncThunk } from "./studentsActions";
import { Student } from "../../../utils/types";

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  students: Student[];
}

const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  students: [],
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    logout() {
      return initialState;
    },
  },
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
        state.message = "Error Signup";
      });

    //FETCH ALL
    builder
      .addCase(fetchStudentsAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentsAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.ok = action.payload.ok;

        if (action.payload.ok) {
          state.student;
        }
      });
  },
});

export const studentsReducer = studentsSlice.reducer;
