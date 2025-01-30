import { AssessmentService } from "../../../src/services/assessments.service";
import { prismaMock } from "../../config/prisma.mock";
import { AssessmentMock } from "../mock/assessment.mock";

describe("Remove Assessment Service", () => {
  const createSut = () => new AssessmentService();

  it("Deve retornar 404 quando o id fornecido não for localizado no banco de dados", async () => {
    const sut = createSut();
    const dto = { id: "assess-id" };

    prismaMock.assessment.findUnique.mockResolvedValueOnce(null);

    const result = await sut.remove(dto.id);

    expect(result).toEqual({
      ok: false,
      code: 404,
      message: "Avaliação não encontrada.",
    });
  });

  it("Deve retornar 200 quando a avaliação for removida", async () => {
    const sut = createSut();
    const dto = { id: "assess-id" };
    const assessmentMock = AssessmentMock.build({ id: "assess-id" });

    prismaMock.assessment.findUnique.mockResolvedValueOnce(assessmentMock);

    const result = await sut.remove(dto.id);

    expect(result).toEqual({
      ok: true,
      code: 200,
      message: "Avaliação excluída com sucesso.",
      data: assessmentMock,
    });
  });

  it("Deve retornar 500 quando houver uma exceção - erro", async () => {
    const sut = createSut();
    const dto = { id: "assess-id" };
    const assessmentMock = AssessmentMock.build({ id: "assess-id" });

    prismaMock.assessment.findUnique.mockResolvedValueOnce(assessmentMock);
    prismaMock.assessment.delete.mockRejectedValueOnce(new Error("Exceção"));

    const result = await sut.remove(dto.id);

    expect(result).toEqual({
      ok: false,
      code: 500,
      message: `Erro do servidor: Exceção`,
    });
  });
});
