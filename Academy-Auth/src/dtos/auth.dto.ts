import { StudentType } from "@prisma/client";

export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto {
  name: string;
  email: string;
  password: string;
  studentType: StudentType;
  cpf: string;
  age?: number;
}

export type IdStudentDto = Pick<SignupDto, "studentType"> & {
  studentId: string;
};
