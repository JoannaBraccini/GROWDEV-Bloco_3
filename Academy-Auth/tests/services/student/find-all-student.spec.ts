import { Student, StudentType } from "@prisma/client";
import { QueryFilterDto } from "../../../src/dtos";
import { StudentService } from "../../../src/services/student.service";
import { prismaMock } from "../../config/prisma.mock";
import { StudentMock } from "../mock/student.mock";

describe("Find All Student Service", () => {
  /**
   * Busca com parâmetros
   * Busca sem parâmetros
   * Erro no db
   */
  const createSut = () => new StudentService();

  it("Deve retornar 'Nenhum estudante encontrado!' quando as queries fornecidas não forem encontradas no banco", async () => {
    const sut = createSut();
    const queries: QueryFilterDto = {
      name: "Nome Inválido",
    };

    prismaMock.student.findMany.mockResolvedValueOnce([]);

    const result = await sut.findAll(queries);

    expect(result.ok).toBeFalsy;
    expect(result.code).toBe(404);
    expect(result.message).toMatch("Nenhum estudante encontrado.");
    expect(result.data).toBeUndefined();
  });

  it("Deve retornar um estudante quando for buscado um cpf", async () => {
    const sut = createSut();
    const queries: QueryFilterDto = {
      cpf: "cpf-0",
    };

    const studentsMock = Array.from({ length: 1 }, (_, index) => {
      return StudentMock.build({
        email: `email${index}@gmail.com`,
        cpf: `cpf-${index}`,
      });
    });

    prismaMock.student.findMany.mockResolvedValueOnce(studentsMock);

    const result = await sut.findAll(queries);

    expect(result).toEqual({
      ok: true,
      code: 200,
      message: "Estudantes buscados com sucesso.",
      data: [
        {
          id: expect.any(String),
          name: "any_name",
          email: expect.any(String),
          cpf: "cpf-0",
          age: 20,
          studentType: "T",
          registeredAt: expect.any(Date),
          assessments: undefined,
        },
      ],
    });
  });

  it("Deve retornar uma lista de estudantes quando for buscado um nome com múltiplos registros", async () => {
    const sut = createSut();
    const queries: QueryFilterDto = {
      name: "Nome de Aluno",
    };

    const studentsMock = Array.from({ length: 3 }, (_, index) => {
      return StudentMock.build({
        email: `email${index}@gmail.com`,
        cpf: `cpf-${index}`,
      });
    });

    prismaMock.student.findMany.mockResolvedValueOnce(studentsMock);

    const result = await sut.findAll(queries);

    expect(result.code).toBe(200);
    expect(result.ok).toBeTruthy;
    expect(result.message).toMatch("Estudantes buscados com sucesso.");
    expect(result.data).toHaveLength(3);
    result.data.forEach((student: Student, index: number) => {
      expect(student).toEqual({
        id: expect.any(String),
        name: "any_name",
        email: `email${index}@gmail.com`,
        cpf: expect.any(String),
        age: 20,
        studentType: "T",
        registeredAt: expect.any(Date),
        assessments: undefined,
      });
    });
  });

  it("Deve retornar todos os estudantes quando nenhuma query for fornecida", async () => {
    const sut = createSut();

    const studentsMock = Array.from({ length: 10 }, (_, index) => {
      return StudentMock.build({
        email: `email${index}@gmail.com`,
        cpf: `cpf-${index}`,
      });
    });

    prismaMock.student.findMany.mockResolvedValueOnce(studentsMock);

    const result = await sut.findAll();

    expect(result.data).toHaveLength(10);
    expect(result.code).toBe(200);
    expect(result.message).toMatch("Estudantes buscados com sucesso.");
    result.data.forEach((student: Student) => {
      expect(student).toHaveProperty("id");
    });
  });

  it("Deve retornar 500 quando ocorrer um erro de exceção", async () => {
    const sut = createSut();
    const queries: QueryFilterDto = {
      name: "Nome de Aluno",
    };

    prismaMock.student.findMany.mockRejectedValueOnce(new Error("Exceção"));

    const result = await sut.findAll(queries);

    expect(result.ok).toBeFalsy;
    expect(result.code).toBe(500);
    expect(result.message).toMatch("Erro do servidor: Exceção");
    expect(result.data).toBeUndefined();
  });
});
