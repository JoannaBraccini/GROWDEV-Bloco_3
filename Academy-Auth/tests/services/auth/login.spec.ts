import { LoginDto } from "../../../src/dtos";
import { AuthService } from "../../../src/services/auth.service";
import { prismaMock } from "../../config/prisma.mock";
import { StudentMock } from "../mock/student.mock";

describe("Login Auth Service", () => {
  /**
   * Validar erro email
   * Validar erro senha
   * Validar sucesso
   */

  const createSut = () => new AuthService();

  it("Deve retornar E-mail ou senha incorretos quando fornecido email não cadastrado", async () => {
    const sut = createSut();
    const body: LoginDto = {
      email: "email@email.com",
      password: "pass123",
    };

    const studentMock = StudentMock.build({ email: "any_email" });

    prismaMock.student.findFirst.mockResolvedValue(studentMock);

    const result = await sut.login(body);

    expect(result).toEqual({
      ok: false,
      code: 400,
      message: "E-mail ou senha incorretos.",
    });
  });
});
