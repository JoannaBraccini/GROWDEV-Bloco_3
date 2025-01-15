import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStudentsService } from "../../../configs/services/student.service";
import { showAlert } from "../alert/alertSlice";

export const fetchStudentsAsyncThunk = createAsyncThunk(
  "students/fetchAll",
  async (_, { dispatch }) => {
    const response = await fetchStudentsService();

    if (!response.ok) {
      dispatch(
        showAlert({
          message: response.message,
          type: "error",
        })
      );
    }
    return response;
  }
);
