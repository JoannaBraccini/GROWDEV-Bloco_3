import supertest from "supertest";
import { createServer } from "../../../src/express.server";
import { StudentType } from "@prisma/client";
import { makeToken } from "../make-token";
import { AssessmentService } from "../../../src/services/assessments.service";
import { AssessmentMock } from "../../services/mock/assessment.mock";
import { StudentMock } from "../../services/mock/student.mock";
import { StudentService } from "../../../src/services";
import { prismaMock } from "../../config/prisma.mock";

describe("POST /assessments", () => {
  const server = createServer();
  const endpoint = "/assessments";
  //Auth
  it("Deve retornar 401 quando não for informado token", async () => {
    const response = await supertest(server).post(endpoint);

    expect(response).toHaveProperty("statusCode", 401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Usuário não autenticado.",
    });
  });

  it("Deve retornar 401 quando for informado token sem Bearer", async () => {
    const response = await supertest(server)
      .post(endpoint)
      .set("Authorization", "any_token");

    expect(response).toHaveProperty("statusCode", 401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Token ausente ou inválido.",
    });
  });

  it("Deve retornar 401 quando for informado token inválido", async () => {
    const response = await supertest(server)
      .post(endpoint)
      .set("Authorization", "Bearer any_token");

    expect(response.statusCode).toBe(401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Token inválido ou expirado.",
    });
  });
  //StudentType
  it("Deve retornar 401 quando for informado token válido mas tipo do estudante não for autorizado", async () => {
    const token = makeToken({ studentType: StudentType.F });

    const response = await supertest(server)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(401);
    expect(response).toHaveProperty("body", {
      ok: false,
      message:
        "Somente estudantes do(s) tipo(s) T e M podem acessar essa funcionalidade.",
    });
  });
  //Required
  it("Deve retornar 400 quando Título não for fornecido", async () => {
    const token = makeToken({ studentType: StudentType.T });

    const response = await supertest(server)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: null, grade: null, description: null });

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Título é obrigatório.",
    });
  });

  it("Deve retornar 400 quando Nota não for fornecida", async () => {
    const token = makeToken({ studentType: StudentType.T });

    const response = await supertest(server)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Any Title", grade: null, description: null });

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Nota é obrigatória.",
    });
  });
  //Types
  it("Deve retornar 400 quando tipo do título for inválido", async () => {
    const token = makeToken({ studentType: StudentType.T });

    const response = await supertest(server)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: 1234, grade: 9, description: null });

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Título deve ser uma string.",
    });
  });

  it("Deve retornar 400 quando tipo da descrição for inválido", async () => {
    const token = makeToken({ studentType: StudentType.T });

    const response = await supertest(server)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Novo Título", grade: 9, description: 1234 });

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Descrição deve ser uma string.",
    });
  });

  it("Deve retornar 400 quando tipo da nota for inválido", async () => {
    const token = makeToken({ studentType: StudentType.T });

    const response = await supertest(server)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Novo Título", grade: "9", description: null });

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Nota deve ser um number.",
    });
  });
  //Data
  it("Deve retornar 400 quando title.length for inválido", async () => {
    // const id = "f7a2f963-9ab0-4a24-a55d-f24911565993";
    const token = makeToken({ studentType: StudentType.T });

    const response = await supertest(server)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Nov", grade: 9 });
    console.log(response.body);

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Título deve conter no mínimo 4 caracteres.",
    });
  });

  it("Deve retornar 400 quando description.length for inválido", async () => {
    const token = makeToken({ studentType: StudentType.T });

    const response = await supertest(server)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Novo Título", grade: 9, description: "Descr" });

    expect(response.statusCode).toBe(400);
    expect(response).toHaveProperty("body", {
      ok: false,
      message: "Descrição deve conter no minimo 6 caracteres.",
    });
  });
  //Service Mock
  it("Deve retornar 201 quando informado o token e body válidos", async () => {
    const token = makeToken({ studentType: StudentType.M });
    const mockAssessment = AssessmentMock.build();
    const mockService = {
      ok: true,
      code: 201,
      message: "Avaliação cadastrada com sucesso.",
      data: mockAssessment,
    };

    const { code, ...responseBody } = mockService;

    jest
      .spyOn(AssessmentService.prototype, "create")
      .mockResolvedValue(mockService);

    const response = await supertest(server)
      .post(endpoint)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: mockAssessment.title, grade: 9 });

    expect(response).toHaveProperty("statusCode", 201);
    expect(response.body).toEqual(responseBody);
  });
});
