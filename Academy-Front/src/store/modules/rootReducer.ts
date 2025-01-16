import { combineReducers } from "@reduxjs/toolkit";
import { userLoggedReducer } from "./auth/userLoggedSlice";
import { assessmentsReducer } from "./assessments/assessmentsSlice";
import { assessmentDetailReducer } from "./assessmentDetail/assessmentDetailSlice";
import { alertReducer } from "./alert/alertSlice";
import { settingsReduce } from "./settings/settingsSlice";
import { studentsReducer } from "./students/studentsSlice";
import { userCreatedReducer } from "./auth/signupSlice";

export const rootReducer = combineReducers({
  // Todos os novos estados globais criado, devem ser chamados aqui...
  userLogged: userLoggedReducer,
  userCreated: userCreatedReducer,
  students: studentsReducer,
  assessments: assessmentsReducer,
  assessmentDetail: assessmentDetailReducer,
  alert: alertReducer,
  settings: settingsReduce,
});
