import { LoginDto } from "../../../src/dtos";
import { AuthService } from "../../../src/services/auth.service";
import { Bcrypt } from "../../../src/utils/bcrypt";
import { JWT } from "../../../src/utils/jwt";
import { prismaMock } from "../../config/prisma.mock";
import { StudentMock } from "../mock/student.mock";

describe("Login Auth Service", () => {
  /**
   * Validar erro email
   * Validar erro senha
   * Validar token/bcrypt
   * Validar erro interno
   * Validar sucesso
   */

  const createSut = () => new AuthService();

  it("Deve retornar 'E-mail ou senha incorretos' quando fornecido email não cadastrado", async () => {
    const sut = createSut();
    const dto: LoginDto = {
      email: "wrong_email",
      password: "any_pass",
    };

    prismaMock.student.findUnique.mockResolvedValueOnce(null);

    const result = await sut.login(dto);

    expect(result).toEqual({
      ok: false,
      code: 400,
      message: "E-mail ou senha incorretos.",
    });
  });

  it("Deve retornar 'E-mail ou senha incorretos' quando fornecida senha não cadastrada", async () => {
    const sut = createSut();
    const dto: LoginDto = {
      email: "valid_email",
      password: "wrong_pass",
    };

    const studentMock = StudentMock.build({
      email: "valid_email",
      password: "hashed_password",
    });
    prismaMock.student.findUnique.mockResolvedValueOnce(studentMock); // Email encontrado

    jest.spyOn(Bcrypt.prototype, "verify").mockResolvedValueOnce(false); // Senha inválida

    const result = await sut.login(dto);

    expect(result.code).toBe(400);
    expect(result.ok).toBeFalsy;
    expect(result.message).toMatch("E-mail ou senha incorretos.");
  });

  it("Deve retornar 'Erro interno do servidor' quando ocorrer erro no banco de dados", async () => {
    const sut = createSut();
    const dto = { email: "any_email", password: "any_pass" };

    prismaMock.student.findUnique.mockRejectedValueOnce(
      new Error("Database Error")
    );

    const result = await sut.login(dto);

    expect(result).toEqual({
      ok: false,
      code: 500,
      message: "Erro interno do servidor.",
    });
  });

  it("Deve retornar 'Login efetuado com sucesso!' quando fornecidos dados válidos", async () => {
    const sut = createSut();
    const dto: LoginDto = {
      email: "valid_email",
      password: "valid_pass",
    };

    const studentMock = StudentMock.build({
      email: "valid_email",
      password: "hashed_password",
    });

    prismaMock.student.findUnique.mockResolvedValueOnce(studentMock); // Email encontrado

    const bcrypt = jest
      .spyOn(Bcrypt.prototype, "verify")
      .mockResolvedValueOnce(true); // Senha válida
    const jwt = jest
      .spyOn(JWT.prototype, "generateToken")
      .mockReturnValue("valid_token"); // Geração de token

    const result = await sut.login(dto);

    expect(bcrypt).toHaveBeenCalled();
    expect(jwt).toHaveBeenCalledTimes(1);
    expect(result.code).toBe(200);
    expect(result.ok).toBeTruthy;
    expect(result.message).toMatch("Login efetuado com sucesso!");
    expect(result).toHaveProperty("data");
    expect(result.data).toEqual({
      student: {
        id: studentMock.id,
        name: studentMock.name,
        email: studentMock.email,
        studentType: studentMock.studentType,
      },
      token: "valid_token",
    });
  });
});
