import { createSlice } from "@reduxjs/toolkit";
import {
  deleteStudentAsyncThunk,
  fetchStudentsAsyncThunk,
  updateStudentAsyncThunk,
} from "./studentsActions";
import { Student } from "../../../utils/types";

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  loadingList: boolean;
  count: number;
  students: Student[];
}

const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  loadingList: false,
  count: 0,
  students: [],
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //FETCH ALL
    builder
      .addCase(fetchStudentsAsyncThunk.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(fetchStudentsAsyncThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.ok = action.payload.ok;
        state.message = action.payload.message;

        if (action.payload.ok) {
          state.students = action.payload.data;

          if (action.payload.data.count > 0) {
            state.count = action.payload.data.count;
          } else {
            state.count = 0;
          }
        }
      })
      .addCase(fetchStudentsAsyncThunk.rejected, (state) => {
        state.loadingList = false;
        state.ok = false;
      });

    //FIND ONE -> StudentDetail

    // UPDATE
    builder
      .addCase(updateStudentAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudentAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.message = action.payload.message;

        if (action.payload.ok) {
          const index = state.students.findIndex(
            (stud) => stud.id === action.payload.data.id
          );

          if (index !== -1) {
            state.students[index] = {
              ...state.students[index],
              ...action.payload.data,
            };
          }
        }
      })
      .addCase(updateStudentAsyncThunk.rejected, (state) => {
        state.loading = false;
        state.ok = false;
      });

    // DELTE
    builder
      .addCase(deleteStudentAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudentAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.message = action.payload.message;

        if (action.payload.ok) {
          const index = state.students.findIndex(
            (stud) => stud.id === action.payload.data.id
          );

          if (index !== -1) {
            state.students.splice(index, 1);
          }
        }
      })
      .addCase(deleteStudentAsyncThunk.rejected, (state) => {
        state.loading = false;
        state.ok = false;
      });
  },
});

export const studentsReducer = studentsSlice.reducer;
