import { StudentType } from "../types";

export interface StudentFieldsErrors {
  name: string;
  age: number | null;
  passwordOld: string;
  passwordNew: string;
  type: StudentType | "";
}

export function validateFormStudent(
  name: string,
  passwordOld: string,
  passwordNew: string
) {
  const errors: StudentFieldsErrors = {} as StudentFieldsErrors;

  if (name.length < 3) {
    errors.name = "Name must have min 3 characters";
  }

  if (passwordNew === passwordOld) {
    errors.passwordNew = "New password cannot be equal to previous password";
  }

  if (passwordNew.length < 4) {
    errors.passwordNew = "Password must have min 4 characters";
  }
  return errors;
}
