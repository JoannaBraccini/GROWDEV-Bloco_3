import { Assessment } from "./assessment";

export interface Student {
  id: string;
  name: string;
  cpf: string;
  age: number | null;
  email: string;
  studentType: StudentType;
  registeredAt: string;
  assessments: Assessment[];
}

export type StudentType = "M" | "F" | "T";

export type QueryStudentRequest = Partial<Pick<Student, "name" | "cpf">>;

export type UpdateStudentRequest = Partial<
  Pick<Student, "name" | "age" | "studentType">
> & {
  id: string;
  passwordOld?: string;
  passwordNew?: string;
};

export type DeleteStudentRequest = {
  id: string;
};
