import { StudentType } from "@prisma/client";

export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto {
  name: string;
  email: string;
  password: string;
  type: StudentType;
  cpf: string;
  age?: number;
}
