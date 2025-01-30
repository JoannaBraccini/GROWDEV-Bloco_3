import supertest from "supertest";
import { createServer } from "../../../src/express.server";
import * as studentService from "../../../src/services/student.service";
import { StudentType } from "@prisma/client";
import { makeToken } from "../make-token";
import { StudentMock } from "../../services/mock/student.mock";

describe("GET /students/id", () => {
  const server = createServer();
  const endpoint = "/students";
  //Auth
  it("Deve retornar 401 quando não for informado token", async () => {
    const response = await supertest(server).get(endpoint);

    expect(response).toHaveProperty("statusCode", 401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Usuário não autenticado.",
    });
  });

  it("Deve retornar 401 quando for informado token sem Bearer", async () => {
    const response = await supertest(server)
      .get(endpoint)
      .set("Authorization", "any_token");

    expect(response).toHaveProperty("statusCode", 401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Token ausente ou inválido.",
    });
  });

  it("Deve retornar 401 quando for informado token inválido", async () => {
    const response = await supertest(server)
      .get(endpoint)
      .set("Authorization", "Bearer any_token");

    expect(response.statusCode).toBe(401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Token inválido ou expirado.",
    });
  });
  //UUID
  it("Deve retornar 400 quando for informado token válido mas ID inválido", async () => {
    const token = makeToken({ studentType: StudentType.M });
    const id = "f7a2f963-9ab0-4a24-a55d-65993";

    const response = await supertest(server)
      .get(`${endpoint}/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Identificador precisa ser um UUID.",
    });
  });

  it("Deve retornar 200 quando informado token e ID válidos", async () => {
    const token = makeToken({ studentType: StudentType.T });
    const id = "f7a2f963-9ab0-4a24-a55d-f24911565993";
    const mockStudent = StudentMock.build({
      id: "f7a2f963-9ab0-4a24-a55d-f24911565993",
    });
    const mockService = {
      ok: true,
      code: 200,
      message: "Estudante encontrado.",
      data: mockStudent,
    };
    jest
      .spyOn(studentService.StudentService.prototype, "findOneById")
      .mockResolvedValue(mockService);

    const response = await supertest(server)
      .get(`${endpoint}/${id}`)
      .set("Authorization", `Bearer ${token}`);
    console.log(response);

    expect(response.status).toBe(200);
    expect(response.body.ok).toBeTruthy;
    expect(response.body.message).toMatch("Estudante encontrado.");
    expect(response.body.data).toEqual({
      ...mockStudent,
      createdAt: mockStudent.createdAt.toISOString(),
      updatedAt: mockStudent.updatedAt.toISOString(),
    });
  });
});
