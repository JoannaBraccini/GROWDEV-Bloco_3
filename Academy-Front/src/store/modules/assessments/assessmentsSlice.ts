import { createSlice } from "@reduxjs/toolkit";
import { Assessment } from "../../../utils/types/assessment";
import {
  createAssessmentAsyncThunk,
  deleteAssessmentAsyncThunk,
  findAllAssessmentsAsyncThunk,
  updateAssessmentAsyncThunk,
} from "./assessments.action";

interface InitialState {
  count: number; // Total de registro (paginação)
  assessments: Array<Assessment>;
  message: string;
  ok: boolean;
  loading: boolean;
  loadingList: boolean;
}

const initialState: InitialState = {
  assessments: [],
  count: 0,
  loading: false,
  loadingList: false,
  message: "",
  ok: false,
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
      .addCase(findAllAssessmentsAsyncThunk.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(findAllAssessmentsAsyncThunk.fulfilled, (state, action) => {
        state.loadingList = false;
        state.message = action.payload.message;
        state.ok = action.payload.ok;

        if (action.payload.ok) {
          // data => { count, assessments }
          state.assessments = action.payload.data.assessments;
          if (action.payload.data.count > 0) {
            state.count = action.payload.data.count;
          } else {
            state.count = 0;
          }
        }
      })
      .addCase(findAllAssessmentsAsyncThunk.rejected, (state) => {
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
          console.log(action.payload);
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

export const assessmentsReduce = assessmentsSlice.reducer;