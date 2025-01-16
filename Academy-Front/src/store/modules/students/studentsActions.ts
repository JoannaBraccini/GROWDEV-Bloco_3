import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStudentsService } from "../../../configs/services/student.service";
import { showAlert } from "../alert/alertSlice";
import { QueryStudentRequest } from "../../../utils/types";
import { RootState } from "../..";

export const fetchStudentsAsyncThunk = createAsyncThunk(
  "students/fetchAll",
  async (query: QueryStudentRequest, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    const response = await fetchStudentsService({ ...query, token });

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
