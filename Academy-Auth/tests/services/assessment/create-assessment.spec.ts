import { StudentType } from "@prisma/client";
import { CreateAssessmentDto } from "../../../src/dtos/assessment.dto";
import { AssessmentService } from "../../../src/services/assessments.service";
import { prismaMock } from "../../config/prisma.mock";
import { StudentMock } from "../mock/student.mock";
import { AssessmentMock } from "../mock/assessment.mock";

const makeCreateAssessment = (params?: Partial<CreateAssessmentDto>) => ({
  title: params?.title || "new_title",
  description: params?.description || "new_desc",
  grade: params?.grade || 10,
  studentId: params?.studentId || "student_id",
  studentType: params?.studentType || StudentType.T,
});

describe("Create Assessment Service", () => {
  const createSut = () => new AssessmentService();

  it("Deve retornar 404 quando id fornecido não for encontrado no banco", async () => {
    const sut = createSut();
    const dto = makeCreateAssessment({ studentId: "id-invalido" });

    prismaMock.student.findUnique.mockResolvedValueOnce(null);

    const result = await sut.create(dto);

    expect(result).toEqual({
      ok: false,
      code: 404,
      message: "Estudante não encontrado.",
    });
  });

  it("Deve retornar 401 quando estudante não autorizado tentar criar avaliação para outro estudante", async () => {
    const sut = createSut();
    const dto = makeCreateAssessment({
      studentId: "id-aluno",
      studentType: "M",
    });
    const studentMock = StudentMock.build({
      id: "id-aluno-logado",
      studentType: "M",
    });

    prismaMock.student.findUnique.mockResolvedValueOnce(studentMock);

    const assessmentMock = AssessmentMock.build(dto);

    const result = await sut.create({
      studentType: studentMock.studentType,
      title: assessmentMock.title,
      description: "new_desc",
      grade: 10,
      studentId: assessmentMock.studentId,
    });

    expect(result).toEqual({
      ok: false,
      code: 401,
      message: "Estudante não autorizado.",
    });
  });

  it("Deve retornar 201 quando avaliação for cadastrada", async () => {
    const sut = createSut();
    const dto = makeCreateAssessment();
    const studentMock = StudentMock.build();
    prismaMock.student.findUnique.mockResolvedValueOnce(studentMock);
    const assessmentMock = AssessmentMock.build(dto);
    prismaMock.assessment.create.mockResolvedValueOnce(assessmentMock);

    const result = await sut.create(dto);

    expect(result.code).toBe(201);
    expect(result.ok).toBeTruthy();
    expect(result.message).toMatch("Avaliação cadastrada com sucesso.");
    expect(result.data).toEqual({
      id: expect.any(String),
      title: dto.title,
      description: dto.description,
      grade: dto.grade,
      studentId: dto.studentId,
      createdBy: assessmentMock.createdBy,
      createdAt: expect.any(Date),
    });
  });

  it("Deve retornar 500 quando houver uma exceção - erro", async () => {
    const sut = createSut();
    const dto = makeCreateAssessment();
    const studentMock = StudentMock.build();
    prismaMock.student.findUnique.mockResolvedValueOnce(studentMock);
    prismaMock.assessment.create.mockRejectedValueOnce(new Error("Exceção"));
    const result = await sut.create(dto);

    expect(result).toEqual({
      ok: false,
      code: 500,
      message: `Erro do servidor: Exceção`,
    });
  });
});
