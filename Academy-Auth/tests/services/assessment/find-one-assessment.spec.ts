import { StudentType } from "@prisma/client";
import { AssessmentService } from "../../../src/services/assessments.service";
import { prismaMock } from "../../config/prisma.mock";
import { AssessmentMock } from "../mock/assessment.mock";

describe("Find One Assessment Service", () => {
  const createSut = () => new AssessmentService();

  it("Deve retornar 404 quando o id fornecido não for localizado no banco de dados", async () => {
    const sut = createSut();
    const dto = {
      id: "invalid_assess_id",
      studentId: "aluno-logado",
      studentType: StudentType.M,
    };

    prismaMock.assessment.findUnique.mockResolvedValueOnce(null);

    const result = await sut.findOneById(
      dto.id,
      dto.studentId,
      dto.studentType
    );

    expect(result).toEqual({
      ok: false,
      code: 404,
      message: "Avaliação não encontrada.",
    });
  });

  it("Deve retornar 401 quando um estudante (não 'T') tentar buscar avaliações de outro estudante", async () => {
    const sut = createSut();

    const assessmentMock = AssessmentMock.build({
      id: "assessment-id",
      studentId: "student-id01",
    });

    prismaMock.assessment.findUnique.mockResolvedValueOnce(assessmentMock);

    const result = await sut.findOneById("assessment-id", "student-id05", "M");

    expect(result).toEqual({
      ok: false,
      code: 401,
      message: "Usuário não autorizado.",
    });
  });

  it("Deve retornar 200 quando o id fornecido for encontrado", async () => {
    const sut = createSut();
    const assessmentMock = AssessmentMock.build({
      id: "assess-id",
      studentId: "student-id",
    });
    prismaMock.assessment.findUnique.mockResolvedValueOnce(assessmentMock);

    const result = await sut.findOneById("assess-id", "tech-id", "T");

    expect(result).toHaveProperty("data");
    expect(result.data).toMatchObject(assessmentMock);
    expect(result).toEqual({
      ok: true,
      code: 200,
      message: "Avaliação buscada com sucesso.",
      data: assessmentMock,
    });
  });

  it("Deve retornar 500 quando houver uma exceção - erro", async () => {
    const sut = createSut();

    prismaMock.assessment.findUnique.mockRejectedValueOnce(
      new Error("Exceção")
    );

    const result = await sut.findOneById("assess-id", "stud-id", "T");

    expect(result).toEqual({
      ok: false,
      code: 500,
      message: "Erro do servidor: Exceção",
    });
  });
});
