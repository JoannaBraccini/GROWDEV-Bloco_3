import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteStudentService,
  fetchStudentsService,
  updateStudentService,
} from "../../../configs/services/student.service";
import { showAlert } from "../alert/alertSlice";
import {
  DeleteStudentRequest,
  QueryStudentRequest,
  UpdateStudentRequest,
} from "../../../utils/types";
import { RootState } from "../..";

export const fetchStudentsAsyncThunk = createAsyncThunk(
  "students/findAll",
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

export const updateStudentAsyncThunk = createAsyncThunk(
  "students/update",
  async (data: UpdateStudentRequest, { dispatch, getState }) => {
    // userLogged
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    const response = await updateStudentService({ ...data, token });

    if (!response.ok) {
      dispatch(
        showAlert({
          type: "error",
          message: response.message,
        })
      );
      return response;
    }

    dispatch(
      showAlert({
        type: "success",
        message: response.message,
      })
    );

    return response;
  }
);

export const deleteStudentAsyncThunk = createAsyncThunk(
  "students/delete",
  async (data: DeleteStudentRequest, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    const response = await deleteStudentService({ ...data, token });

    if (!response.ok) {
      dispatch(
        showAlert({
          type: "error",
          message: response.message,
        })
      );

      return response;
    }

    dispatch(
      showAlert({
        type: "success",
        message: response.message,
      })
    );

    // return algumaCoisa
    return response;
  }
);
