import supertest from "supertest";
import { createServer } from "../../../src/express.server";
import { StudentService } from "../../../src/services/student.service";
import { StudentType } from "@prisma/client";
import { makeToken } from "../make-token";
import { StudentMock } from "../../services/mock/student.mock";

describe("DELETE /students/id", () => {
  const server = createServer();
  const endpoint = "/students";
  //Auth
  it("Deve retornar 401 quando não for informado token", async () => {
    const id = "f7a2f963-9ab0-4a24-a55d-f24911565993";
    const response = await supertest(server).delete(`${endpoint}/${id}`);

    expect(response).toHaveProperty("statusCode", 401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Usuário não autenticado.",
    });
  });

  it("Deve retornar 401 quando for informado token sem Bearer", async () => {
    const id = "f7a2f963-9ab0-4a24-a55d-f24911565993";
    const response = await supertest(server)
      .delete(`${endpoint}/${id}`)
      .set("Authorization", "any_token");

    expect(response).toHaveProperty("statusCode", 401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Token ausente ou inválido.",
    });
  });

  it("Deve retornar 401 quando for informado token inválido", async () => {
    const id = "f7a2f963-9ab0-4a24-a55d-f24911565993";
    const response = await supertest(server)
      .delete(`${endpoint}/${id}`)
      .set("Authorization", "Bearer any_token");

    expect(response.statusCode).toBe(401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Token inválido ou expirado.",
    });
  });
  //UUID
  it("Deve retornar 400 quando for informado  UUID inválido", async () => {
    const token = makeToken({ studentType: StudentType.M });
    const id = "f7a2f963-9ab0-4a24-a55d-65993";

    const response = await supertest(server)
      .delete(`${endpoint}/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Identificador precisa ser um UUID.",
    });
  });
  //Service Mock
  it("Deve retornar 200 quando informados dados válidos", async () => {
    const id = "f7a2f963-9ab0-4a24-a55d-f24911565993";
    const token = makeToken({
      id: id,
      studentType: "T",
    });
    const mockStudent = StudentMock.build({ id: id });
    const mockService = {
      ok: true,
      code: 200,
      message: "Estudante removido com sucesso.",
      data: mockStudent,
    };
    jest
      .spyOn(StudentService.prototype, "remove")
      .mockResolvedValue(mockService);

    const response = await supertest(server)
      .delete(`${endpoint}/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.ok).toBeTruthy();
    expect(response.body.message).toMatch("Estudante removido com sucesso.");
    expect(response.body.data).toEqual({
      ...mockStudent,
      createdAt: mockStudent.createdAt.toISOString(),
      updatedAt: mockStudent.updatedAt.toISOString(),
    });
  });
});
