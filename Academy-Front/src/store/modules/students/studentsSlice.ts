import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentsAsyncThunk } from "./studentsActions";
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
    //FETCH ALL
    builder
      .addCase(fetchStudentsAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentsAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.message = action.payload.message;

        if (action.payload.ok) {
          state.students.push(action.payload.data);
        }
      })
      .addCase(fetchStudentsAsyncThunk.rejected, (state) => {
        state.loading = false;
        state.ok = false;
      });
  },
});

export const studentsReducer = studentsSlice.reducer;
