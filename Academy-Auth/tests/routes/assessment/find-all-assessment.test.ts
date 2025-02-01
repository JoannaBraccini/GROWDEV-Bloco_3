import supertest from "supertest";
import { createServer } from "../../../src/express.server";
import { StudentType } from "@prisma/client";
import { makeToken } from "../make-token";
import { AssessmentService } from "../../../src/services/assessments.service";
import { AssessmentMock } from "../../services/mock/assessment.mock";

describe("GET /assessments", () => {
  const server = createServer();
  const endpoint = "/assessments";

  // Auth
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

  // Service Mock
  it("Deve retornar 200 quando informado o token válido", async () => {
    const token = makeToken({ studentType: StudentType.T });
    const mockService = {
      ok: true,
      code: 200,
      message: "Avaliações encontradas com sucesso.",
      data: [],
    };

    const { code, ...responseBody } = mockService;

    jest
      .spyOn(AssessmentService.prototype, "findAll")
      .mockResolvedValue(mockService);

    const response = await supertest(server)
      .get(endpoint)
      .set("Authorization", `Bearer ${token}`);

    expect(response).toHaveProperty("statusCode", 200);
    expect(response.body).toEqual(responseBody);
  });

  it("Deve retornar 200 com paginação quando informado o token válido e query params", async () => {
    const token = makeToken({ studentType: StudentType.T });
    const mockService = {
      ok: true,
      code: 200,
      message: "Avaliações encontradas com sucesso.",
      data: [],
    };

    const { code, ...responseBody } = mockService;

    jest
      .spyOn(AssessmentService.prototype, "findAll")
      .mockResolvedValue(mockService);

    const response = await supertest(server)
      .get(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .query({ page: 1, take: 2 });

    expect(response).toHaveProperty("statusCode", 200);
    expect(response.body).toEqual(responseBody);
  });
});
