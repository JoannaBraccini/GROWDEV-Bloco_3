import supertest from "supertest";
import { createServer } from "../../../src/express.server";
import { StudentType } from "@prisma/client";
import { makeToken } from "../make-token";
import { AssessmentService } from "../../../src/services/assessments.service";
import { AssessmentMock } from "../../services/mock/assessment.mock";

describe("GET /assessments/:id", () => {
  const server = createServer();
  const endpoint = "/assessments";

  // Auth
  it("Deve retornar 401 quando não for informado token", async () => {
    const response = await supertest(server).get(`${endpoint}/any_id`);

    expect(response).toHaveProperty("statusCode", 401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Usuário não autenticado.",
    });
  });

  it("Deve retornar 401 quando for informado token sem Bearer", async () => {
    const response = await supertest(server)
      .get(`${endpoint}/any_id`)
      .set("Authorization", "any_token");

    expect(response).toHaveProperty("statusCode", 401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Token ausente ou inválido.",
    });
  });

  it("Deve retornar 401 quando for informado token inválido", async () => {
    const response = await supertest(server)
      .get(`${endpoint}/any_id`)
      .set("Authorization", "Bearer any_token");

    expect(response.statusCode).toBe(401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Token inválido ou expirado.",
    });
  });

  // UUID
  it("Deve retornar 400 quando for informado  UUID inválido", async () => {
    const token = makeToken({ studentType: StudentType.T });
    const id = "invalid_uuid";

    const response = await supertest(server)
      .get(`${endpoint}/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Identificador precisa ser um UUID.",
    });
  });

  // Service Mock
  it("Deve retornar 200 quando informado token e ID válidos", async () => {
    const token = makeToken({ studentType: StudentType.T });
    const id = "f7a2f963-9ab0-4a24-a55d-f24911565993";
    const mockAssessment = AssessmentMock.build({
      id: "f7a2f963-9ab0-4a24-a55d-f24911565993",
    });
    const mockService = {
      ok: true,
      code: 200,
      message: "Avaliação encontrada.",
      data: mockAssessment,
    };

    jest
      .spyOn(AssessmentService.prototype, "findOneById")
      .mockResolvedValue(mockService);

    const response = await supertest(server)
      .get(`${endpoint}/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.ok).toBeTruthy();
    expect(response.body.message).toMatch("Avaliação encontrada.");
    expect(response.body.data).toEqual({
      ...mockAssessment,
      createdAt: mockAssessment.createdAt.toISOString(),
      updatedAt: mockAssessment.updatedAt.toISOString(),
    });
  });
});
