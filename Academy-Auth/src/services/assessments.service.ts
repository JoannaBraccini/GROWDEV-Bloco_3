import { Assessment, Prisma, StudentType } from "@prisma/client";
import { prisma } from "../database/prisma.database";
import {
  AssessmentDto,
  CreateAssessmentDto,
  UpdateAssessmentDto,
} from "../dtos/assessment.dto";
import { ResponseApi } from "../types";

export class AssessmentService {
  public async create(
    createAssessment: CreateAssessmentDto
  ): Promise<ResponseApi> {
    const { title, description, grade, studentId, studentType } =
      createAssessment;

    // studentId = Existe no banco
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return {
        ok: false,
        code: 404,
        message: "Estudante não encontrado!",
      };
    }

    if (studentType !== "T" && student.id !== studentId) {
      return {
        ok: false,
        code: 401,
        message: "Estudante não autorizado!",
      };
    }

    const assessmentCreated = await prisma.assessment.create({
      data: {
        title: title,
        description: description,
        grade: grade,
        //caso seja TechHelper, pega o Id fornecido na requisição, senão busca do registro do aluno
        studentId: studentType === "T" ? studentId : student.id,
        createdBy: student.id,
      },
    });

    return {
      ok: true,
      code: 201,
      message: "Avaliação cadastrada com sucesso!",
      data: this.mapToDto(assessmentCreated),
    };
  }

  public async findAll(
    id: string,
    studentType: StudentType,
    query?: { page?: number; take?: number }
  ): Promise<ResponseApi> {
    try {
      let where: Prisma.AssessmentWhereInput = {};
      if (studentType !== "T") {
        where = { studentId: id };
      }

      const assessmentList = await prisma.assessment.findMany({
        skip: query?.page, // 1 page
        take: query?.take, // quantidade
        where: where,
      });

      if (!assessmentList) {
        return {
          ok: false,
          code: 404,
          message: "Avaliação do estudante não encontrada",
        };
      }

      return {
        ok: true,
        code: 200,
        message: "Avaliações buscadas com sucesso !!!",
        data: assessmentList.map((ass) => this.mapToDto(ass)),
      };
    } catch (error) {
      return {
        ok: false,
        code: 500,
        message: `Erro do servidor: ${error}`,
      };
    }
  }

  public async findOneById(
    id: string,
    studentId: string,
    studentType: StudentType
  ): Promise<ResponseApi> {
    const assessment = await prisma.assessment.findUnique({
      where: { id },
    });

    if (!assessment) {
      return {
        ok: false,
        code: 404, // Not Found
        message: "Avaliaçao não encontrado!",
      };
    }

    if (studentType !== "T" && studentId !== assessment.studentId) {
      return {
        ok: false,
        code: 401,
        message: "Usuário não autorizado!",
      };
    }

    return {
      ok: true,
      code: 200,
      message: "Avaliação buscada com sucesso!",
      data: assessment,
    };
  }

  public async update(
    id: string,
    updateAssessment: UpdateAssessmentDto
  ): Promise<ResponseApi> {
    const assessment = await prisma.assessment.findUnique({
      where: { id },
    });

    if (!assessment) {
      return {
        ok: false,
        code: 404,
        message: "Avaliação não encontrada!",
      };
    }

    // Filtrar campos vazios ou inválidos
    const filteredAssessment = removeEmptyFields(updateAssessment);
    // Verificar se restam campos para atualizar
    if (Object.keys(filteredAssessment).length === 0) {
      return {
        ok: false,
        code: 400,
        message: "Nenhum campo válido para atualizar.",
      };
    }

    const updatedAssessment = await prisma.assessment.update({
      where: { id },
      data: { ...filteredAssessment },
    });

    return {
      ok: true,
      code: 200,
      message: "Avaluação atualizada com sucesso!",
      data: this.mapToDto(updatedAssessment),
    };
  }

  public async remove(id: string): Promise<ResponseApi> {
    const assessment = await prisma.assessment.findUnique({
      where: { id },
    });

    if (!assessment) {
      return {
        ok: false,
        code: 404,
        message: "Avaliação não encontrada!",
      };
    }

    const removeAssessment = await prisma.assessment.delete({
      where: { id },
    });
    return {
      ok: true,
      code: 200,
      message: "Avaliação excluída com sucesso!",
      data: this.mapToDto(removeAssessment),
    };
  }

  private mapToDto(assessment: Assessment): AssessmentDto {
    return {
      id: assessment.id,
      title: assessment.title,
      description: assessment.description,
      grade: Number(assessment.grade),
      studentId: assessment.studentId,
      createdBy: assessment.createdBy,
      createdAt: assessment.createdAt,
    };
  }
}

//Função para remover campos vazios das requisições
function removeEmptyFields<T extends object>(data: T): Partial<T> {
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined && value !== "") {
      result[key as keyof T] = value;
    }
  }
  return result;
}
