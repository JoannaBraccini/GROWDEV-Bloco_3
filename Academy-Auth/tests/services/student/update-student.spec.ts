import { UpdateStudentDto } from "../../../src/dtos";
import { StudentService } from "../../../src/services/student.service";
import { Bcrypt } from "../../../src/utils/bcrypt";
import { prismaMock } from "../../config/prisma.mock";
import { StudentMock } from "../mock/student.mock";

describe("Update Student Service", () => {
  const createSut = () => new StudentService();
  it("Deve retornar 'Nenhum campo válido para atualizar.' quando dados necessários não forem fornecidos", async () => {
    const sut = createSut();
    const dto: UpdateStudentDto = {
      age: undefined,
      name: undefined,
      passwordOld: undefined,
      passwordNew: undefined,
    };

    const result = await sut.update("id-do-aluno", dto);

    expect(result.code).toBe(400);
    expect(result.ok).not.toBeTruthy; //só pra testar xD
    expect(result.message).toContain("Nenhum campo válido para atualizar.");
  });

  it("Deve retornar 'Estudante não encontrado.' quando o id do estudante a ser atualizado não for encontrado no banco de dados", async () => {
    const sut = createSut();
    const dto: UpdateStudentDto = {
      age: undefined,
      name: "Novo Nome",
      passwordOld: undefined,
      passwordNew: undefined,
    };
    prismaMock.student.findUnique.mockResolvedValueOnce(null);

    const result = await sut.update("id-do-aluno", dto);

    expect(result.code).toBe(404);
    expect(result.ok).toBeFalsy();
    expect(result.message).toContain("Estudante não encontrado.");
  });

  it("Deve retornar 'Senha incorreta.' quando a senha fornecida for diferente do hash armazenado", async () => {
    const sut = createSut();
    const dto: UpdateStudentDto = {
      age: undefined,
      name: undefined,
      passwordOld: "senha_errada",
      passwordNew: "nova_senha",
    };
    const studentMock = StudentMock.build({
      id: "id-do-aluno",
      password: "senha_antiga",
    });
    prismaMock.student.findUnique.mockResolvedValueOnce(studentMock);

    const bcrypt = jest
      .spyOn(Bcrypt.prototype, "verify")
      .mockResolvedValueOnce(false);

    const result = await sut.update("id-do-aluno", dto);

    expect(bcrypt).toHaveBeenCalledWith("senha_errada", "senha_antiga");
    expect(result).toEqual({
      ok: false,
      code: 400,
      message: "Senha incorreta.",
    });
  });

  it("Deve retornar 'A nova senha não pode ser igual à senha anterior.' quando a senha fornecida for igual ao hash já armazenado", async () => {
    const sut = createSut();
    const dto: UpdateStudentDto = {
      age: undefined,
      name: undefined,
      passwordOld: "senha",
      passwordNew: "senha_hash",
    };
    const studentMock = StudentMock.build({
      id: "id-do-aluno",
      password: "senha_hash",
    });
    prismaMock.student.findUnique.mockResolvedValueOnce(studentMock);

    let bcrypt;
    //primeira vez para verificar a senha antiga
    jest.spyOn(Bcrypt.prototype, "verify").mockResolvedValueOnce(true);
    //segunda vez para verificar a senha nova
    jest.spyOn(Bcrypt.prototype, "verify").mockResolvedValueOnce(true);

    const result = await sut.update("id-do-aluno", dto);

    expect(result).toEqual({
      ok: false,
      code: 400,
      message: "A nova senha não pode ser igual à senha anterior.",
    });
  });

  it("Deve retornar 200 ao atualizar o estudante com sucesso", async () => {
    const sut = createSut();
    const dto: UpdateStudentDto = {
      age: 25,
    };
    const studentMock = StudentMock.build({
      id: "id-do-aluno",
      age: 20,
    });
    prismaMock.student.findUnique.mockResolvedValueOnce(studentMock);

    const updatedStudentMock = { ...studentMock, ...dto };
    prismaMock.student.update.mockResolvedValueOnce(updatedStudentMock);

    const result = await sut.update("id-do-aluno", dto);

    expect(result.code).toBe(200);
    expect(result.ok).toBeTruthy();
    expect(result.message).toContain("Estudante atualizado com sucesso.");
    expect(result.data).toMatchObject({
      id: updatedStudentMock.id,
      email: updatedStudentMock.email,
      name: updatedStudentMock.name,
      cpf: updatedStudentMock.cpf,
      studentType: updatedStudentMock.studentType,
      age: updatedStudentMock.age,
      registeredAt: updatedStudentMock.createdAt,
      assessments: undefined,
    });
  });

  it("Deve retornar 500 quando houver uma exceção - erro", async () => {
    const sut = createSut();
    const dto: UpdateStudentDto = {
      age: 25,
    };
    const studentMock = StudentMock.build({
      id: "id-do-aluno",
      age: 20,
    });
    prismaMock.student.findUnique.mockResolvedValueOnce(studentMock);

    prismaMock.student.update.mockRejectedValueOnce(new Error("Exceção"));

    const result = await sut.update("id-do-aluno", dto);

    expect(result.code).toBe(500);
    expect(result.ok).toBeFalsy();
    expect(result.message).toContain(`Erro do servidor: Exceção`);
  });
});
