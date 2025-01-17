import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../..";
import {
  createAssessmentService,
  deleteAssessmentService,
  fetchAssessmentsService,
  updateAssessmentService,
} from "../../../configs/services/assessment.service";
import {
  CreateAssessmentRequest,
  DeleteAssessmentRequest,
  QueryAssessmentRequest,
  UpdateAssessmentRequest,
} from "../../../utils/types/assessment";
import { showAlert } from "../alert/alertSlice";

export const createAssessmentAsyncThunk = createAsyncThunk(
  "assessments/create",
  async (data: CreateAssessmentRequest, { getState, dispatch }) => {
    const { userLogged } = getState() as RootState;

    const response = await createAssessmentService({
      ...data,
      token: userLogged.token,
    });
    if (!response.ok) {
      dispatch(
        showAlert({
          message: response.message,
          type: "error",
        })
      );

      return response;
    }

    dispatch(
      showAlert({
        message: response.message,
        type: "success",
      })
    );
    return response;
  }
);

export const fetchAssessmentsAsyncThunk = createAsyncThunk(
  "assessments/findAll",
  async (query: QueryAssessmentRequest, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    const response = await fetchAssessmentsService({ ...query, token });

    if (!response.ok) {
      dispatch(
        showAlert({
          message: response.message,
          type: "error",
        })
      );
    }

    // Retornar (payload)
    return response;
  }
);

export const updateAssessmentAsyncThunk = createAsyncThunk(
  "assessments/update",
  async (data: UpdateAssessmentRequest, { dispatch, getState }) => {
    // userLogged
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    const response = await updateAssessmentService({ ...data, token });

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

export const deleteAssessmentAsyncThunk = createAsyncThunk(
  "assessments/delete",
  async (data: DeleteAssessmentRequest, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    const response = await deleteAssessmentService({ ...data, token });

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
