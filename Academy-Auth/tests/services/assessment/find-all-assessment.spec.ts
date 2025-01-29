import { Assessment } from "@prisma/client";
import { AssessmentService } from "../../../src/services/assessments.service";
import { prismaMock } from "../../config/prisma.mock";
import { AssessmentMock } from "../mock/assessment.mock";

describe("Find All Assessment Service", () => {
  const createSut = () => new AssessmentService();

  it("Deve retornar 404 quando o estudante logado (se não 'T') não tiver avaliações cadastradas no banco", async () => {
    const sut = createSut();
    prismaMock.assessment.findMany.mockResolvedValueOnce([]);

    const result = await sut.findAll("student_id", "M");

    expect(result).toEqual({
      ok: false,
      code: 404,
      message: "Avaliações do estudante não encontradas",
    });
  });

  it("Deve retornar uma lista com todas avaliações quando o estudante logado for do tipo 'T'", async () => {
    const sut = createSut();

    const assessmentsMock = Array.from({ length: 5 }, (_, index) => {
      return AssessmentMock.build({
        title: `Title${index}`,
        description: `description-${index}`,
        grade: index + 5,
        studentId: `${index}-id`,
      });
    });

    prismaMock.assessment.findMany.mockResolvedValueOnce(assessmentsMock);

    const result = await sut.findAll("student_id", "T");

    expect(result.code).toBe(200);
    expect(result.ok).toBeTruthy();
    expect(result.message).toContain("Avaliações buscadas com sucesso.");
    expect(result.data).toHaveLength(5);
    result.data.forEach((assessment: Assessment) => {
      expect(assessment).toHaveProperty("studentId");
    });
  });

  it("Deve retornar uma lista com as avaliações do estudante logado quando este não for do tipo 'T'", async () => {
    const sut = createSut();

    const assessmentsMock = Array.from({ length: 3 }, (_, index) => {
      return AssessmentMock.build({
        title: `Title-${index}`,
        description: `description-${index}`,
        grade: index + 5,
        studentId: "student_id",
      });
    });

    prismaMock.assessment.findMany.mockResolvedValueOnce(assessmentsMock);

    const result = await sut.findAll("student_id", "M");

    expect(result.code).toBe(200);
    expect(result.ok).toBeTruthy();
    expect(result.message).toContain("Avaliações buscadas com sucesso.");
    expect(result.data).toHaveLength(3);
    result.data.forEach((assessment: Assessment) => {
      expect(assessment).toHaveProperty("studentId");
    });
  });

  it("Deve retornar 500 quando ocorrer erro no banco de dados", async () => {
    const sut = createSut();
    prismaMock.assessment.findMany.mockRejectedValueOnce(
      new Error("Erro no banco de dados")
    );

    const result = await sut.findAll("student_id", "T");

    expect(result).toEqual({
      ok: false,
      code: 500,
      message: "Erro interno ao processar a solicitação.",
    });
  });
});
