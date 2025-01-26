import { Student, StudentType } from "@prisma/client";
import { randomUUID } from "crypto";

interface StudentMockParams {
  email?: string;
  cpf?: string;
  password?: string;
  studentType?: StudentType;
}

export class StudentMock {
  // Método para construir um estudante mockado
  public static build(params?: StudentMockParams): Student {
    return {
      id: randomUUID(),
      name: "any_name",
      email: params?.email || "any_email",
      cpf: params?.cpf || "any_cpf",
      age: 20,
      password: params?.password || "any_pass",
      studentType: params?.studentType || StudentType.T,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
