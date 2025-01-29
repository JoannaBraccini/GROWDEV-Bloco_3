import { StudentType } from "@prisma/client";

export interface CreateAssessmentDto {
  title: string;
  description?: string;
  grade: number;
  studentId: string;
  studentType: StudentType;
}

export interface UpdateAssessmentDto {
  title?: string;
  description?: string;
  grade?: number;
}

export interface AssessmentDto {
  id: string;
  title: string;
  description?: string | null;
  grade: number;
  studentId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt?: Date;
}
