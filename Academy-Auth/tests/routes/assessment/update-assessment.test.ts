import supertest from "supertest";
import { createServer } from "../../../src/express.server";
import { StudentType } from "@prisma/client";
import { makeToken } from "../make-token";
import { AssessmentService } from "../../../src/services/assessments.service";
import { AssessmentMock } from "../../services/mock/assessment.mock";

describe("PUT /assessments/:id", () => {
  const server = createServer();
  const endpoint = "/assessments";

  // Auth
  it("Deve retornar 401 quando não for informado token", async () => {
    const response = await supertest(server).put(`${endpoint}/any_id`);

    expect(response).toHaveProperty("statusCode", 401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Usuário não autenticado.",
    });
  });

  it("Deve retornar 401 quando for informado token sem Bearer", async () => {
    const response = await supertest(server)
      .put(`${endpoint}/any_id`)
      .set("Authorization", "any_token");

    expect(response).toHaveProperty("statusCode", 401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Token ausente ou inválido.",
    });
  });

  it("Deve retornar 401 quando for informado token inválido", async () => {
    const response = await supertest(server)
      .put(`${endpoint}/any_id`)
      .set("Authorization", "Bearer any_token");

    expect(response.statusCode).toBe(401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Token inválido ou expirado.",
    });
  });

  // UUID
  it("Deve retornar 400 quando for informado UUID inválido", async () => {
    const token = makeToken({ studentType: StudentType.T });
    const id = "invalid_uuid";

    const response = await supertest(server)
      .put(`${endpoint}/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Identificador precisa ser um UUID.",
    });
  });

  // Validation
  it("Deve retornar 400 quando o título for inválido", async () => {
    const token = makeToken({ studentType: StudentType.T });
    const id = "f7a2f963-9ab0-4a24-a55d-f24911565993";
    const payload = { title: 123 };

    const response = await supertest(server)
      .put(`${endpoint}/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(payload);

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Titulo deve ser uma string",
    });
  });

  it("Deve retornar 400 quando a descrição for inválida", async () => {
    const token = makeToken({ studentType: StudentType.T });
    const id = "f7a2f963-9ab0-4a24-a55d-f24911565993";
    const payload = { description: 123 };

    const response = await supertest(server)
      .put(`${endpoint}/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(payload);

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Descrição deve ser uma string.",
    });
  });

  it("Deve retornar 400 quando a nota for inválida", async () => {
    const token = makeToken({ studentType: StudentType.T });
    const id = "f7a2f963-9ab0-4a24-a55d-f24911565993";
    const payload = { grade: "invalid_grade" };

    const response = await supertest(server)
      .put(`${endpoint}/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(payload);

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Nota deve ser um number.",
    });
  });

  it("Deve retornar 400 quando o título tiver menos de 4 caracteres", async () => {
    const token = makeToken({ studentType: StudentType.T });
    const id = "f7a2f963-9ab0-4a24-a55d-f24911565993";
    const payload = { title: "abc" };

    const response = await supertest(server)
      .put(`${endpoint}/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(payload);

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Título deve conter no mínimo 4 caracteres.",
    });
  });

  it("Deve retornar 400 quando a descrição tiver menos de 6 caracteres", async () => {
    const token = makeToken({ studentType: StudentType.T });
    const id = "f7a2f963-9ab0-4a24-a55d-f24911565993";
    const payload = { description: "abcde" };

    const response = await supertest(server)
      .put(`${endpoint}/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(payload);

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Descrição deve conter no minimo 6 caracteres.",
    });
  });

  // Service Mock
  it("Deve retornar 200 quando informado token e ID válidos", async () => {
    const token = makeToken({ studentType: StudentType.T });
    const id = "f7a2f963-9ab0-4a24-a55d-f24911565993";
    const payload = {
      title: "new_title",
      description: "new_description",
      grade: 9,
    };
    const mockAssessment = AssessmentMock.build({
      id: "f7a2f963-9ab0-4a24-a55d-f24911565993",
      ...payload,
    });
    const mockService = {
      ok: true,
      code: 200,
      message: "Avaliação atualizada.",
      data: mockAssessment,
    };

    jest
      .spyOn(AssessmentService.prototype, "update")
      .mockResolvedValue(mockService);

    const response = await supertest(server)
      .put(`${endpoint}/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body.ok).toBeTruthy();
    expect(response.body.message).toMatch("Avaliação atualizada.");
    expect(response.body.data).toEqual({
      ...mockAssessment,
      createdAt: mockAssessment.createdAt.toISOString(),
      updatedAt: mockAssessment.updatedAt.toISOString(),
    });
  });
});
