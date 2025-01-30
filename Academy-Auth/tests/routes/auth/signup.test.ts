import supertest from "supertest";
import { createServer } from "../../../src/express.server";
import { AuthService } from "../../../src/services";
import { prismaMock } from "../../config/prisma.mock";
// SUT
const server = createServer();
const endpoint = "/signup";

describe("POST /signup", () => {
  //Required:
  it("Deve retornar 400 quando não informado um nome no body", async () => {
    // Arrange - empty body
    const body = {};
    // Act
    const response = await supertest(server).post(endpoint).send(body);
    // Asserts
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      ok: false,
      message: "Nome é obrigatório.",
    });
  });

  it("Deve retornar 400 quando não informado um e-mail no body", async () => {
    // Arrange - empty body
    const body = { name: "Nome do aluno" };
    // Act
    const response = await supertest(server).post(endpoint).send(body);
    // Asserts
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      ok: false,
      message: "E-mail é obrigatório.",
    });
  });

  it("Deve retornar 400 quando não informado uma senha no body", async () => {
    // Arrange - empty body
    const body = { name: "Nome do aluno", email: "email@email.com" };
    // Act
    const response = await supertest(server).post(endpoint).send(body);
    // Asserts
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      ok: false,
      message: "Senha é obrigatória.",
    });
  });

  it("Deve retornar 400 quando não informado um StudentType no body", async () => {
    // Arrange - empty body
    const body = {
      name: "Nome do aluno",
      email: "email@email.com",
      password: "senha123",
    };
    // Act
    const response = await supertest(server).post(endpoint).send(body);
    // Asserts
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      ok: false,
      message: "Tipo é obrigatório.",
    });
  });

  it("Deve retornar 400 quando não informado um CPF no body", async () => {
    // Arrange - empty body
    const body = {
      name: "Nome do aluno",
      email: "email@email.com",
      password: "senha123",
      studentType: "T",
    };
    // Act
    const response = await supertest(server).post(endpoint).send(body);
    // Asserts
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      ok: false,
      message: "CPF é obrigatório.",
    });
  });

  //Types
  it("Deve retornar BadRequest quando não informado um nome do tipo string", async () => {
    // Arrange
    const body = {
      name: 12,
      email: "email@email.com",
      password: "senha123",
      studentType: "T",
      cpf: "12345678901",
    };
    // Act
    const response = await supertest(server).post(endpoint).send(body);
    // Asserts
    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body.ok).toBeFalsy();
    expect(response.body.message).toBe("Nome deve ser uma string.");
  });

  it("Deve retornar BadRequest quando não informado um email do tipo string", async () => {
    // Arrange
    const body = {
      name: "Nome do Aluno",
      email: 12,
      password: "senha123",
      studentType: "T",
      cpf: "12345678901",
    };
    // Act
    const response = await supertest(server).post(endpoint).send(body);
    // Asserts
    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body.ok).toBeFalsy();
    expect(response.body.message).toBe("E-mail deve ser uma string.");
  });

  it("Deve retornar BadRequest quando não informado uma senha do tipo string", async () => {
    // Arrange
    const body = {
      name: "Nome do Aluno",
      email: "email@email.com",
      password: 12,
      studentType: "T",
      cpf: "12345678901",
    };
    // Act
    const response = await supertest(server).post(endpoint).send(body);
    // Asserts
    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body.ok).toBeFalsy();
    expect(response.body.message).toBe("Senha deve ser uma string.");
  });

  it("Deve retornar BadRequest quando não informado um CPF do tipo string", async () => {
    // Arrange
    const body = {
      name: "Nome do Aluno",
      email: "email@email.com",
      password: "senha123",
      studentType: "T",
      cpf: 12,
    };
    // Act
    const response = await supertest(server).post(endpoint).send(body);
    // Asserts
    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body.ok).toBeFalsy();
    expect(response.body.message).toBe("CPF deve ser uma string.");
  });

  it("Deve retornar BadRequest quando não informado um Tipo do tipo StudentType", async () => {
    // Arrange
    const body = {
      name: "Nome do Aluno",
      email: "email@email.com",
      password: "senha123",
      studentType: "J",
      cpf: "12345678901",
    };
    // Act
    const response = await supertest(server).post(endpoint).send(body);
    // Asserts
    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body.ok).toBeFalsy();
    expect(response.body.message).toBe("Tipo deve ser T, M, F.");
  });

  it("Deve retornar BadRequest quando não informado uma idade do tipo Number", async () => {
    // Arrange
    const body = {
      name: "Nome do Aluno",
      email: "email@email.com",
      password: "senha123",
      studentType: "T",
      cpf: "12345678901",
      age: "20",
    };
    // Act
    const response = await supertest(server).post(endpoint).send(body);
    // Asserts
    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body.ok).toBeFalsy();
    expect(response.body.message).toBe("Idade deve ser um number.");
  });

  //Data
  it("Deve retornar 400 quando nome informado tiver menos de 3 caracteres", async () => {
    const body = {
      name: "No",
      email: "email@email.com",
      password: "senha123",
      studentType: "T",
      cpf: "12345678901",
    };

    const response = await supertest(server).post(endpoint).send(body);

    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body.ok).toBeFalsy();
    expect(response.body.message).toBe(
      "Nome deve conter no minimo 3 caracteres."
    );
  });

  it("Deve retornar 400 quando e-mail informado não tiver @ ou  .com", async () => {
    const body = {
      name: "Nome do Aluno",
      email: "email@email",
      password: "senha123",
      studentType: "T",
      cpf: "12345678901",
    };

    const response = await supertest(server).post(endpoint).send(body);

    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body.ok).toBeFalsy();
    expect(response.body.message).toBe("E-mail inválido.");
  });

  it("Deve retornar 400 quando senha informada tiver menos de 4 caracteres", async () => {
    const body = {
      name: "Nome do Aluno",
      email: "email@email.com",
      password: "123",
      studentType: "T",
      cpf: "12345678901",
    };

    const response = await supertest(server).post(endpoint).send(body);

    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body.ok).toBeFalsy();
    expect(response.body.message).toBe(
      "Senha deve conter no minimo 4 caracteres."
    );
  });

  it("Deve retornar 400 quando CPF informado não tiver 11 caracteres", async () => {
    const body = {
      name: "Nome do Aluno",
      email: "email@email.com",
      password: "senha123",
      studentType: "T",
      cpf: "1234567",
    };

    const response = await supertest(server).post(endpoint).send(body);

    expect(response).toHaveProperty("statusCode", 400);
    expect(response.body.ok).toBeFalsy();
    expect(response.body.message).toBe("CPF inválido.");
  });

  //Controller
  // Exemplo mockando o `Service`
  it("Deve retornar 200 quando fornecido um body válido - Mock Service", async () => {
    // Arrange
    const body = {
      name: "Nome do Aluno",
      email: "email@email.com",
      password: "senha123",
      studentType: "T",
      cpf: "12345678901",
    };
    // Mock do serviço
    const mockAuth = {
      ok: true,
      code: 200,
      message: "Estudante cadastrado com sucesso.",
      data: {
        id: "any_id",
        name: "Nome do Aluno",
        email: "email@email.com",
        studentType: "T",
        createdAt: new Date(),
      },
    };
    jest.spyOn(AuthService.prototype, "signup").mockResolvedValueOnce(mockAuth);

    // Act
    const response = await supertest(server).post(endpoint).send(body);

    // Asserts
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      ok: true,
      message: "Estudante cadastrado com sucesso.",
      data: {
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        studentType: expect.any(String),
        createdAt: expect.any(String),
      },
    });
  });

  it("Deve retornar 500 quando houver uma exceção - erro", async () => {
    // Arrange
    const body = {
      name: "Nome do Aluno",
      email: "email@email.com",
      password: "senha123",
      studentType: "T",
      cpf: "12345678901",
    };

    // Exemplo Error no Prisma (método)
    prismaMock.student.create.mockRejectedValueOnce(new Error("Exceção"));

    // Act
    const response = await supertest(server).post(endpoint).send(body);

    // Asserts
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      ok: false,
      message: "Erro do servidor: Exceção",
    });
  });
});
