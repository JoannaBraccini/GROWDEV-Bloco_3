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
  public async findAll(query?: QueryFilterDto): Promise<ResponseApi> {
    try {
      const where: Prisma.StudentWhereInput = {};

      if (query?.name) {
        where.name = { contains: query?.name, mode: "insensitive" };
      }

      if (query?.cpf) {
        where.cpf = { contains: query.cpf };
      }

      const students = await prisma.student.findMany({
        where,
      });

      if (!students || students.length < 1) {
        return {
          ok: false,
          code: 404,
          message: "Nenhum estudante encontrado.",
        };
      }

      return {
        ok: true,
        code: 200,
        message: "Estudantes buscados com sucesso.",
        data: students.map((student) => this.mapToDto(student)), // StudentDto[]
      };
    } catch (error) {
      return {
        ok: false,
        code: 500,
        message: "Erro interno ao processar a solicitação.",
      };
    }
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
          "Não autorizado. Somente Tech-Helpers podem acessar os dados de outros alunos.",
      };
    }

    try {
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
          message: "Estudante não encontrado.",
        };
      }

      // 3 - Retornar o dado
      return {
        ok: true,
        code: 200,
        message: "Estudante encontrado.",
        data: this.mapToDto(student),
      };
    } catch (error) {
      return {
        ok: false,
        code: 500,
        message: "Erro interno ao processar a solicitação.",
      };
    }
  }

  public async update(
    id: string,
    updateStudent: UpdateStudentDto
  ): Promise<ResponseApi> {
    // 1 - Verificar se o id informado existe
    const { name, age, passwordOld, passwordNew } = updateStudent;

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

    try {
      const student = await prisma.student.findUnique({
        where: { id },
      });

      if (!student) {
        return {
          ok: false,
          code: 404,
          message: "Estudante não encontrado.",
        };
      }

      if (name && name === student.name) {
        return {
          ok: false,
          code: 400,
          message: "O novo nome não pode ser igual ao nome atual.",
        };
      }

      if (age && age === student.age) {
        return {
          ok: false,
          code: 400,
          message: "A nova idade não pode ser igual à idade atual.",
        };
      }

      let newPassword: string | undefined;
      if (passwordOld && passwordNew) {
        const bcrypt = new Bcrypt();
        const passwordValid = await bcrypt.verify(
          passwordOld,
          student.password
        );

        if (!passwordValid) {
          return {
            ok: false,
            code: 400,
            message: "Senha incorreta.",
          };
        }

        const passwordCompare = await bcrypt.verify(
          passwordNew,
          student.password
        );

        if (passwordCompare) {
          return {
            ok: false,
            code: 400,
            message: "A nova senha não pode ser igual à senha anterior.",
          };
        }

        newPassword = await bcrypt.generateHash(passwordNew);
      }

      // 2 - Atualizar (prisma)
      const studentUpdated = await prisma.student.update({
        where: { id },
        data: {
          ...filteredStudent, // Espalha as propriedades
          ...(passwordNew && { password: newPassword }),
        },
      });

      // 3 - Retornar o dado att.
      return {
        ok: true,
        code: 200,
        message: "Estudante atualizado com sucesso.",
        data: this.mapToDto(studentUpdated),
      };
    } catch (error) {
      return {
        ok: false,
        code: 500,
        message: "Erro interno ao processar a solicitação.",
      };
    }
  }

  public async remove(id: string): Promise<ResponseApi> {
    try {
      // 1 - Validar se o id informado é válido
      const student = await prisma.student.findUnique({ where: { id } });

      if (!student) {
        return {
          ok: false,
          code: 404,
          message: "Estudante não encontrado.",
        };
      }

      // 2 - Remover o dado
      await prisma.student.delete({
        where: { id },
      });

      // include => JOIN
      // 3 - Retornar o dado/feeback
      return {
        ok: true,
        code: 200,
        message: "Estudante removido com sucesso.",
        data: this.mapToDto(student), //dados que foram removidos
      };
    } catch (error) {
      return {
        ok: false,
        code: 500,
        message: "Erro interno ao processar a solicitação.",
      };
    }
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
