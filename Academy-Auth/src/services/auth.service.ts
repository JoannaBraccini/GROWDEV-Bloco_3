import { prisma } from "../database/prisma.database";
import { LoginDto, SignupDto } from "../dtos";
import { ResponseApi } from "../types";
import { Bcrypt } from "../utils/bcrypt";
import { JWT } from "../utils/jwt";
import { AuthStudent } from "../types/student.type";

export class AuthService {
  public async login(data: LoginDto): Promise<ResponseApi> {
    const { email, password } = data;

    // 1 - Verificar o email
    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student) {
      return {
        ok: false,
        code: 404,
        message: "E-mail ou senha incorretos. (email)",
      };
    }

    // 2 - Verficar a senha (hash - bcrypt)
    const hash = student.password;
    const bcrypt = new Bcrypt();
    const isValidPassword = await bcrypt.verify(password, hash);

    if (!isValidPassword) {
      return {
        ok: false,
        code: 404,
        message: "E-mail ou senha incorretos. (password)",
      };
    }

    // 3 - Gerar o token (uid)
    const jwt = new JWT();

    const payload: AuthStudent = {
      id: student.id,
      name: student.name,
      email: student.email,
      type: student.type,
    };

    const token = jwt.generateToken(payload);

    // 4 - Feed de sucesso retornando o token (uid)
    return {
      ok: true,
      code: 200,
      message: "Login efetuado com sucesso!",
      data: {
        student: payload,
        token,
      },
    };
  }

  public async signup(data: SignupDto): Promise<ResponseApi> {
    const { name, email, password, type, age, cpf } = data;

    // 2 - Verificarmos as colunas unicas
    const student = await prisma.student.findFirst({
      where: {
        OR: [{ email: email }, { cpf: cpf }], // = // EMAIL OU CPF
      },
    });

    // Valida E-mail e CPF unicos
    if (student) {
      if (student.email === email) {
        return {
          ok: false,
          code: 409,
          message: "E-mail já está em uso.",
        };
      }

      if (student.cpf === cpf) {
        return {
          ok: false,
          code: 409,
          message: "CPF já está em uso.",
        };
      }
    }

    // 3 - Criação do nosso hash (password)
    const bcrypt = new Bcrypt();
    const passwordHash = await bcrypt.generateHash(password);

    // 4 - Criação do nosso estudante no banco de dados
    const studentCreated = await prisma.student.create({
      data: {
        name: name,
        cpf: cpf,
        email: email,
        password: passwordHash,
        type: type,
        age: age,
      },
    });

    return {
      ok: true,
      code: 201,
      message: "Estudante cadastrado com sucesso!",
      data: studentCreated,
    };
  }
}