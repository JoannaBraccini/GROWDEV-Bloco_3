import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Assessment } from "../../../utils/types/assessment";
import { findAssessmentAsyncThunk } from "../assessments/assessments.action";
import { ResponseAPI } from "../../../configs/services/api.service";

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  assessmentDetail: Assessment;
}
const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  assessmentDetail: {
    studentId: "",
    id: "",
    title: "",
    description: "",
    grade: null,
    createdBy: "",
    createdAt: "",
  },
};

const assessmentDetailSlice = createSlice({
  name: "assessmentDetail",
  initialState,
  reducers: {
    setAssessentDetail(state, action: PayloadAction<Assessment>) {
      return {
        ...state, // {}
        ...action.payload, // {}
        createdAt: new Date(action.payload.createdAt).toISOString(), // Converte para string ISO
      };
    },
    // Reset
    resetAssessmentDetail() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(findAssessmentAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        findAssessmentAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseAPI>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;
          if (action.payload.ok) {
            return {
              ...state,
              ...action.payload.data,
              createdAt: new Date(action.payload.data.createdAt).toISOString(),
            };
          }
        }
      )
      .addCase(findAssessmentAsyncThunk.rejected, (state) => {
        state.loading = false;
        state.ok = false;
      });
  },
});

export const { resetAssessmentDetail, setAssessentDetail } =
  assessmentDetailSlice.actions;

export const assessmentDetailReducer = assessmentDetailSlice.reducer;
