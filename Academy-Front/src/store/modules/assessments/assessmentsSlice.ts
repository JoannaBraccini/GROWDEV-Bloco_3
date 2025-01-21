import { createSlice } from "@reduxjs/toolkit";
import { Assessment } from "../../../utils/types/assessment";
import {
  createAssessmentAsyncThunk,
  deleteAssessmentAsyncThunk,
  fetchAssessmentsAsyncThunk,
  updateAssessmentAsyncThunk,
} from "./assessments.action";

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  loadingList: boolean;
  count: number; // Total de registro (paginação)
  assessments: Assessment[];
}

const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  loadingList: false,
  count: 0,
  assessments: [],
};

const assessmentsSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {},

  // Ciclos = pending , fullfiled, rejected
  extraReducers(builder) {
    // CREATE
    builder
      .addCase(createAssessmentAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAssessmentAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.message = action.payload.message;

        if (action.payload.ok) {
          state.assessments.push(action.payload.data);
        }
      })
      .addCase(createAssessmentAsyncThunk.rejected, (state) => {
        state.loading = false;
        state.ok = false;
      });

    // FIND ALL
    builder
      .addCase(fetchAssessmentsAsyncThunk.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(fetchAssessmentsAsyncThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.ok = action.payload.ok;
        state.message = action.payload.message;

        if (action.payload.ok) {
          // data => { count, assessments }
          console.log("assess");

          state.assessments = action.payload.data;

          if (action.payload.data.count > 0) {
            state.count = action.payload.data.count;
          } else {
            state.count = 0;
          }
        }
      })
      .addCase(fetchAssessmentsAsyncThunk.rejected, (state) => {
        state.loadingList = false;
        state.ok = false;
      });

    // UPDATE
    builder
      .addCase(updateAssessmentAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAssessmentAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.message = action.payload.message;

        // Evitar um req, encontrar a avaliação na lista, e vamos sub pelo o que a api retornar
        if (action.payload.ok) {
          const index = state.assessments.findIndex(
            (ass) => ass.id === action.payload.data.id
          );

          if (index !== -1) {
            state.assessments[index] = {
              ...state.assessments[index],
              ...action.payload.data,
            };
          }
        }
      })
      .addCase(updateAssessmentAsyncThunk.rejected, (state) => {
        state.loading = false;
        state.ok = false;
      });

    // DELTE
    builder
      .addCase(deleteAssessmentAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAssessmentAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.message = action.payload.message;

        if (action.payload.ok) {
          const index = state.assessments.findIndex(
            (ass) => ass.id === action.payload.data.id
          );

          if (index !== -1) {
            state.assessments.splice(index, 1);
          }
        }
      })
      .addCase(deleteAssessmentAsyncThunk.rejected, (state) => {
        state.loading = false;
        state.ok = false;
      });
  },
});

export const assessmentsReducer = assessmentsSlice.reducer;
