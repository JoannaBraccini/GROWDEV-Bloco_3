import { StudentType } from "@prisma/client";
import { AssessmentDto } from "./assessment.dto";

// DTO - Data Transfer Object
export interface StudentDto {
  id: string;
  name: string;
  email: string;
  studentType: StudentType;
  cpf: string;
  age?: number | null;
  registeredAt: Date;
  assessments?: Array<AssessmentDto>;
}

export interface QueryFilterDto {
  name?: string;
  cpf?: string;
}

export interface UpdateStudentDto {
  name?: string;
  passwordOld?: string;
  passwordNew?: string;
  studentType?: StudentType;
  age?: number;
}
