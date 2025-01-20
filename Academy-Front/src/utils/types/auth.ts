import { StudentType } from "./student";

export interface LoginRequest {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignupRequest {
  name: string;
  cpf: string;
  age: number | null;
  email: string;
  password: string;
  studentType: StudentType;
}
