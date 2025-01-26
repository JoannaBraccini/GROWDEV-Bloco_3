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

  it("Deve retornar 'Erro interno do servidor' quando não puder gerar o hash da senha", async () => {
    const sut = createSut();
    const dto = makeSignup();
    prismaMock.student.findFirst.mockResolvedValueOnce(null);
    jest
      .spyOn(Bcrypt.prototype, "generateHash")
      .mockRejectedValueOnce(new Error("Erro ao gerar hash"));

    const result = await sut.signup(dto);

    expect(result).toEqual({
      ok: false,
      code: 500,
      message: "Erro interno ao do servidor.",
    });
  });

  it("Deve retornar 'Erro interno do servidor' quando não puder cadastrar no banco", async () => {
    const sut = createSut();
    const dto = makeSignup();
    prismaMock.student.findFirst.mockResolvedValueOnce(null);
    jest
      .spyOn(Bcrypt.prototype, "generateHash")
      .mockResolvedValueOnce("hashed_pass");

    prismaMock.student.create.mockRejectedValueOnce(
      new Error("Erro ao salvar no banco")
    );

    const result = await sut.signup(dto);

    expect(result).toEqual({
      ok: false,
      code: 500,
      message: "Erro interno do servidor.",
    });
  });

  it("Deve retornar 'Estudante cadastrado com sucesso!' quando fornecidos dados válidos", async () => {
    const sut = createSut();
    const dto = makeSignup();
    const studentMock = StudentMock.build();
    prismaMock.student.findFirst.mockResolvedValueOnce(null); //Sem conflito no cpf e email

    const bcrypt = jest
      .spyOn(Bcrypt.prototype, "generateHash")
      .mockResolvedValueOnce("hashed_pass");

    prismaMock.student.create.mockResolvedValue(studentMock);

    const result = await sut.signup(dto);
    console.log("Data recebido no signup:", result.data);

    expect(bcrypt).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      ok: true,
      code: 201,
      message: "Estudante cadastrado com sucesso!",
      data: expect.objectContaining({
        id: expect.any(String),
        name: dto.name,
        email: dto.email,
        studentType: dto.studentType,
        age: dto.age,
        cpf: dto.cpf,
      }),
    });
  });
});
