import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Assessment } from "../../../utils/types/assessment";

const initialState: Assessment = {
  studentId: "",
  id: "",
  title: "",
  description: "",
  grade: 0,
  createdAt: "",
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
});

export const { resetAssessmentDetail, setAssessentDetail } =
  assessmentDetailSlice.actions;

export const assessmentDetailReducer = assessmentDetailSlice.reducer;
