import supertest from "supertest";
import { createServer } from "../../../src/express.server";
import { StudentType } from "@prisma/client";
import { StudentService } from "../../../src/services";
import { makeToken } from "../make-token";

describe("GET /students", () => {
  const server = createServer();
  const endpoint = "/students";

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

  it("Deve retornar 200 quando informado o token válido e nenhuma query", async () => {
    const token = makeToken({ studentType: StudentType.M });
    const mockService = {
      ok: true,
      code: 200,
      message: "Estudantes buscados com sucesso.",
      data: [],
    };

    const { code, ...respondeBody } = mockService;

    jest
      .spyOn(StudentService.prototype, "findAll")
      .mockResolvedValue(mockService);

    const response = await supertest(server)
      .get(endpoint)
      .set("Authorization", `Bearer ${token}`);

    expect(response).toHaveProperty("statusCode", 200);
    expect(response.body).toEqual(respondeBody);
  });

  it("Deve retornar 200 quando informado o token válido e queries válidas", async () => {
    const token = makeToken({ studentType: StudentType.M });
    const query = { name: "NomeDoAluno" };
    const mockService = {
      ok: true,
      code: 200,
      message: "Estudantes buscados com sucesso.",
      data: [],
    };

    const { code, ...respondeBody } = mockService;

    jest
      .spyOn(StudentService.prototype, "findAll")
      .mockResolvedValue(mockService);

    const response = await supertest(server)
      .get(`${endpoint}?name=${query.name}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response).toHaveProperty("statusCode", 200);
    expect(response.body).toEqual(respondeBody);
  });
});
