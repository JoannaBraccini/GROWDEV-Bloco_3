import { Assessment } from "@prisma/client";
import { AssessmentDto, UpdateAssessmentDto } from "../../../src/dtos";
import { AssessmentService } from "../../../src/services/assessments.service";
import { prismaMock } from "../../config/prisma.mock";
import { AssessmentMock } from "../mock/assessment.mock";

describe("Update Assessment Service", () => {
  const createSut = () => new AssessmentService();

  it("Deve retornar 400 quando query estiver vazia", async () => {
    const sut = createSut();
    const dto: UpdateAssessmentDto = {
      title: undefined,
      description: undefined,
      grade: undefined,
    };

    const result = await sut.update("assess-id", dto);

    expect(result).toEqual({
      ok: false,
      code: 400,
      message: "Nenhum campo válido para atualizar.",
    });
  });

  it("Deve retornar 404 id fornecido não for encontrado no banco de dados", async () => {
    const sut = createSut();
    const dto: UpdateAssessmentDto = {
      title: "updated_title",
    };

    prismaMock.assessment.findUnique.mockResolvedValueOnce(null);
    const result = await sut.update("invalid-id", dto);

    expect(result).toEqual({
      ok: false,
      code: 404,
      message: "Avaliação não encontrada.",
    });
  });

  it("Deve retornar 200 quando avaliação for atualizada", async () => {
    const sut = createSut();
    const dto: UpdateAssessmentDto = {
      title: "updated_title",
      grade: 9.5,
    };

    const assessmentMock = AssessmentMock.build({
      id: "assess-id",
      studentId: "stud-id",
      title: "updated_title",
      grade: 9.5,
    });

    prismaMock.assessment.findUnique.mockResolvedValueOnce(assessmentMock);

    prismaMock.assessment.update.mockResolvedValueOnce(assessmentMock);

    const result = await sut.update("assess_id", dto);

    expect(result.code).toBe(200);
    expect(result.ok).toBeTruthy();
    expect(result.message).toContain("Avaliação atualizada com sucesso.");
    expect(result.data).toEqual(assessmentMock);
  });

  it("Deve retornar 500 quando houver uma exceção - erro", async () => {
    const sut = createSut();
    const dto: UpdateAssessmentDto = {
      title: "updated_title",
    };

    const assessmentMock = AssessmentMock.build({
      id: "assess-id",
      studentId: "stud-id",
      title: "updated_title",
    });

    prismaMock.assessment.findUnique.mockResolvedValueOnce(assessmentMock);

    prismaMock.assessment.update.mockRejectedValueOnce(new Error("Exceção"));

    const result = await sut.update("assess_id", dto);

    expect(result).toEqual({
      ok: false,
      code: 500,
      message: `Erro do servidor: Exceção`,
    });
  });
});
