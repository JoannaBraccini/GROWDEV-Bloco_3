import { StudentService } from "../../../src/services/student.service";
import { prismaMock } from "../../config/prisma.mock";
import { StudentMock } from "../mock/student.mock";

describe("Remove Student Service", () => {
  const createSut = () => new StudentService();

  it("Deve retornar 404 quando id fornecido não for localizado", async () => {
    const sut = createSut();
    const dto = { id: "id-invalido" };

    prismaMock.student.findUnique.mockResolvedValueOnce(null);

    const result = await sut.remove("id-invalido");

    expect(result).toEqual({
      ok: false,
      code: 404,
      message: "Estudante não encontrado.",
    });
  });

  it("Deve retornar 200 quando deletar estudante", async () => {
    const sut = createSut();
    const dto = { id: "id-do-aluno" };
    const studentMock = StudentMock.build(dto);

    prismaMock.student.findUnique.mockResolvedValueOnce(studentMock);

    const result = await sut.remove(studentMock.id);

    expect(result.code).toBe(200);
    expect(result.ok).toBeTruthy;
    expect(result.message).toMatch("Estudante removido com sucesso.");
    expect(result.data).toHaveProperty("id", studentMock.id);
  });

  it("Deve retornar 500 quando ocorrer erro interno", async () => {
    const sut = createSut();
    const dto = { id: "id-do-aluno" };
    const studentMock = StudentMock.build(dto);

    prismaMock.student.findUnique.mockResolvedValueOnce(studentMock);
    prismaMock.student.delete.mockRejectedValueOnce(
      new Error("Internal Server Error")
    );

    const result = await sut.remove(studentMock.id);

    expect(result).toEqual({
      ok: false,
      code: 500,
      message: "Erro interno ao processar a solicitação.",
    });
  });
});
