import {
  Assessment as AssessmentPrisma,
  Prisma,
  Student as StudentPrisma,
} from "@prisma/client";
import { prisma } from "../database/prisma.database";
import { QueryFilterDto, StudentDto, UpdateStudentDto } from "../dtos";
import { ResponseApi } from "../types";
import { Bcrypt } from "../utils/bcrypt";

export class StudentService {
  public async findAll({ name, cpf }: QueryFilterDto): Promise<ResponseApi> {
    const where: Prisma.StudentWhereInput = {};

    if (name) {
      where.name = { contains: name, mode: "insensitive" };
    }

    if (cpf) {
      where.cpf = { contains: cpf };
    }

    const students = await prisma.student.findMany({
      where,
    });

    return {
      ok: true,
      code: 200,
      message: "Estudantes buscados com sucesso!",
      data: students.map((student) => this.mapToDto(student)), // StudentDto[]
    };
  }

  public async findOneById(
    id: string,
    studentId: string,
    studentType: string
  ): Promise<ResponseApi> {
    if (studentType !== "T" && id !== studentId) {
      return {
        ok: false,
        code: 403, // Forbidden
        message:
          "Não autorizado! Somente Tech-Helpers podem acessar os dados de outros alunos.",
      };
    }

    // 1 - Buscar => id é pk, id é unico
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        assessments: true,
      },
    });

    // 2 - Validar se existe
    if (!student) {
      return {
        ok: false,
        code: 404, // Not Found
        message: "Estudante não encontrado!",
      };
    }

    // 3 - Retornar o dado
    return {
      ok: true,
      code: 200,
      message: "Estudante encontrado!",
      data: this.mapToDto(student),
    };
  }

  public async update(
    id: string,
    updateStudent: UpdateStudentDto
  ): Promise<ResponseApi> {
    // 1 - Verificar se o id informado existe
    const { passwordOld, passwordNew } = updateStudent;

    // Filtrar campos vazios ou inválidos
    const filteredStudent = removeEmptyFields(updateStudent);
    // Verificar se restam campos para atualizar
    if (Object.keys(filteredStudent).length === 0) {
      return {
        ok: false,
        code: 400,
        message: "Nenhum campo válido para atualizar.",
      };
    }

    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      return {
        ok: false,
        code: 404,
        message: "Estudante não encontrado!",
      };
    }

    if (passwordOld && passwordNew) {
      const bcrypt = new Bcrypt();
      const passwordValid = bcrypt.verify(passwordOld, student.password);
      if (!passwordValid) {
        return {
          ok: false,
          code: 400,
          message: "Senha incorreta!",
        };
      } else if (passwordNew === passwordOld) {
        return {
          ok: false,
          code: 400,
          message: "Nova senha não pode ser igual à senha anterior!",
        };
      }
    }

    // 2 - Atualizar (prisma)
    const studentUpdated = await prisma.student.update({
      where: { id },
      data: { ...filteredStudent }, // Espalha as propriedades
    });

    // 3 - Retornar o dado att.
    return {
      ok: true,
      code: 200,
      message: "Estudante atualizado com sucesso!",
      data: this.mapToDto(studentUpdated),
    };
  }

  public async remove(id: string): Promise<ResponseApi> {
    // 1 - Validar se o id informado é válido
    const student = await prisma.student.findUnique({ where: { id } });

    if (!student) {
      return {
        ok: false,
        code: 404,
        message: "Estudante não encontrado!",
      };
    }

    // 2 - Remover o dado
    const studentDeleted = await prisma.student.delete({
      where: { id },
    });

    // include => JOIN
    // 3 - Retornar o dado/feeback
    return {
      ok: true,
      code: 200,
      message: "Estudante removido com sucesso!",
      data: this.mapToDto(studentDeleted),
    };
  }

  private mapToDto(
    student: StudentPrisma & { assessments?: AssessmentPrisma[] }
  ): StudentDto {
    return {
      id: student.id,
      email: student.email,
      name: student.name,
      cpf: student.cpf,
      studentType: student.studentType,
      age: student.age,
      registeredAt: student.createdAt,
      assessments: student.assessments?.map((assessment) => ({
        id: assessment.id,
        title: assessment.title,
        grade: Number(assessment.grade), // Decimal(4, 2) => number (Number())
        description: assessment?.description,
        createdBy: assessment.createdBy,
        createdAt: assessment.createdAt,
        studentId: assessment.studentId,
      })),
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
