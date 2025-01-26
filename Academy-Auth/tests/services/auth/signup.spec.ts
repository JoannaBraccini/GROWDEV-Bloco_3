import { StudentType } from "@prisma/client";
import { SignupDto } from "../../../src/dtos";
import { AuthService } from "../../../src/services/auth.service";
import { StudentMock } from "../mock/student.mock";
import { prismaMock } from "../../config/prisma.mock";

describe("Signup Auth Service", () => {
  //SUT
  const createSut = () => new AuthService();
  it("Deve retornar 'E-mail já está em uso' quando fornecido email já cadastrado", async () => {
    //Arrange
    console.log("entrou no arrange");
    const sut = createSut(); //ambiente onde ocorre o teste
    const dto: SignupDto = {
      name: "any_name",
      email: "email@email.com",
      password: "any_password",
      studentType: StudentType.T,
      age: 20,
      cpf: "any_cpf",
    };
    const studentMock = StudentMock.build({ email: "email@email.com" }); //resultado a ser provideniado para a busca do service

    prismaMock.student.findFirst.mockResolvedValueOnce(studentMock);

    //Act
    const result = await sut.signup(dto);

    //Assert
    expect(result.ok).toBeFalsy();
    expect(result.code).toBe(409);
    expect(result.message).toMatch("E-mail já está em uso.");
  });
});
