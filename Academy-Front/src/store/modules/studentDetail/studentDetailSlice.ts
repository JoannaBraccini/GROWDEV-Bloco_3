import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "../../../utils/types";

const initialState: Student = {
  id: "",
  name: "",
  cpf: "",
  age: null,
  email: "",
  type: "M",
  registeredAt: "",
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
});

export const { resetStudentDetail, setStudentDetail } =
  studentDetailSlice.actions;

export const studentDetailReducer = studentDetailSlice.reducer;
