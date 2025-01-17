export interface Student {
  id: string;
  name: string;
  cpf: string;
  age: number | null;
  email: string;
  type: StudentType;
  createdAt: string;
}

export type StudentType = "M" | "F" | "T";

export type QueryStudentRequest = Partial<Pick<Student, "name" | "cpf">> & {
  page?: number | null;
  take?: number | null;
};

export type UpdateStudentRequest = Partial<
  Pick<Student, "name" | "age" | "type">
> & {
  id: string;
  password?: string;
};

export type DeleteStudentRequest = {
  id: string;
};
