import { StudentType } from "@prisma/client";
import { SignupDto } from "../../../src/dtos";
import { AuthService } from "../../../src/services/auth.service";
import { StudentMock } from "../mock/student.mock";
import { prismaMock } from "../../config/prisma.mock";
import { Bcrypt } from "../../../src/utils/bcrypt";

describe("Signup Auth Service", () => {
  /**
   * Validar Email em uso
   * Validar CPF em uso
   * Validar bcrypt
   * Validar sucesso
   * Validar falha
   */

  const makeSignup = (params?: Partial<SignupDto>) => ({
    name: params?.name || "new_name",
    email: params?.email || "new_email",
    password: params?.password || "new_password",
    cpf: params?.cpf || "new_cpf",
    studentType: params?.studentType || StudentType.T,
    age: 20,
  });

  //SUT
  const createSut = () => new AuthService();
  it("Deve retornar 'E-mail já está em uso' quando fornecido email já cadastrado", async () => {
    //Arrange
    const sut = createSut(); //ambiente onde ocorre o teste
    const dto = makeSignup({ email: "any_email" });
    const studentMock = StudentMock.build({ email: "any_email" }); //resultado a ser provideniado para a busca do service

    prismaMock.student.findFirst.mockResolvedValueOnce(studentMock);

    //Act
    const result = await sut.signup(dto);

    //Assert
    expect(result.ok).toBeFalsy();
    expect(result.code).toBe(409);
    expect(result.message).toMatch("E-mail já está em uso.");
  });

  it("Deve retornar 'CPF já está em uso' quando fornecido email já cadastrado", async () => {
    const sut = createSut();
    const dto = makeSignup({ cpf: "any_cpf" });

    const studentMock = StudentMock.build({ cpf: "any_cpf" });
    prismaMock.student.findFirst.mockResolvedValueOnce(studentMock);

    const result = await sut.signup(dto);

    expect(result).toEqual({
      ok: false,
      code: 409,
      message: "CPF já está em uso.",
    });
  });

  it("Deve retornar 'Erro interno ao processar a solicitação.' quando não puder gerar o hash da senha", async () => {
    const sut = createSut();
    const dto = makeSignup();
    prismaMock.student.findFirst.mockResolvedValueOnce(null);
    jest
      .spyOn(Bcrypt.prototype, "generateHash")
      .mockRejectedValueOnce(new Error("Exceção"));

    const result = await sut.signup(dto);

    expect(result).toEqual({
      ok: false,
      code: 500,
      message: "Erro do servidor: Exceção",
    });
  });

  it("Deve retornar 'Erro interno ao processar a solicitação.' quando não puder cadastrar no banco", async () => {
    const sut = createSut();
    const dto = makeSignup();
    prismaMock.student.findFirst.mockResolvedValueOnce(null);
    jest
      .spyOn(Bcrypt.prototype, "generateHash")
      .mockResolvedValueOnce("hashed_pass");

    prismaMock.student.create.mockRejectedValueOnce(new Error("Exceção"));

    const result = await sut.signup(dto);

    expect(result).toEqual({
      ok: false,
      code: 500,
      message: "Erro do servidor: Exceção",
    });
  });

  it("Deve retornar 'Estudante cadastrado com sucesso!' quando fornecidos dados válidos", async () => {
    const sut = createSut();
    const dto = makeSignup();

    prismaMock.student.findFirst.mockResolvedValueOnce(null); //Sem conflito no cpf e email
    prismaMock.student.create.mockResolvedValue({
      ...dto,
      id: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      password: "hashed_pass",
    });

    const bcrypt = jest
      .spyOn(Bcrypt.prototype, "generateHash")
      .mockResolvedValueOnce("hashed_pass");

    const result = await sut.signup(dto);

    expect(bcrypt).toHaveBeenCalledWith(dto.password);
    expect(result).toEqual({
      ok: true,
      code: 201,
      message: "Estudante cadastrado com sucesso.",
      data: {
        id: expect.any(String),
        name: dto.name,
        email: dto.email,
        studentType: dto.studentType,
        createdAt: expect.any(Date),
      },
    });
  });
});
