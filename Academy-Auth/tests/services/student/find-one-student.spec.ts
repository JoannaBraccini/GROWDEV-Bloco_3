import { StudentType } from "@prisma/client";
import { StudentService } from "../../../src/services/student.service";
import { prismaMock } from "../../config/prisma.mock";
import { StudentMock } from "../mock/student.mock";

describe("Find One By ID Student Service", () => {
  const createSut = () => new StudentService();

  it("Deve retornar Erro 403 quando um aluno (não tech-helper) tentar acessar perfil de outro aluno", async () => {
    const sut = createSut();

    const result = await sut.findOneById(
      "id-do-aluno-logado",
      "id-do-aluno-buscado",
      "M"
    );

    expect(result.code).toBe(403);
    expect(result.ok).toBeFalsy;
    expect(result.message).toMatch(
      "Não autorizado. Somente Tech-Helpers podem acessar os dados de outros alunos."
    );
  });

  it("Deve retornar 'Estudante não encontrado!' quando as queries fornecidas não forem encontradas no banco", async () => {
    const sut = createSut();
    prismaMock.student.findUnique.mockResolvedValueOnce(null);

    const result = await sut.findOneById(
      "id-inexistente",
      "id-do-aluno-logado",
      "T"
    );

    expect(result.ok).toBeFalsy;
    expect(result.code).toBe(404);
    expect(result.message).toMatch("Estudante não encontrado.");
  });

  it("Deve retornar os dados do estudante buscado quando o estudante existir", async () => {
    const sut = createSut();
    const studentMock = StudentMock.build({
      id: "id-do-aluno",
      studentType: "M",
    });

    prismaMock.student.findUnique.mockResolvedValueOnce(studentMock);

    const result = await sut.findOneById("id-do-aluno", "id-do-aluno", "M");

    expect(result).toEqual({
      ok: true,
      code: 200,
      message: "Estudante encontrado.",
      data: {
        id: "id-do-aluno",
        name: "any_name",
        email: "any_email",
        age: expect.any(Number),
        cpf: "any_cpf",
        studentType: "M",
        registeredAt: expect.any(Date),
        assessments: undefined,
      },
    });
  });

  it("Deve retornar 'Erro interno ao processar a solicitação.' quando ocorrer um erro no banco de dados", async () => {
    const sut = createSut();
    prismaMock.student.findUnique.mockRejectedValueOnce(
      new Error("Erro no banco de dados")
    );

    const result = await sut.findOneById("id-do-aluno", "id-do-aluno", "M");

    expect(result.ok).toBeFalsy;
    expect(result.code).toBe(500);
    expect(result.message).toMatch("Erro interno ao processar a solicitação.");
    expect(result.data).toBeUndefined();
  });
});
