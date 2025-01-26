import jwt, { SignOptions } from "jsonwebtoken";
import { AuthStudent } from "../types/student.type";

/**
 *  jwt.sign(dados, palavraSecreta, configs) // Gerar um token
 *  jwt.decode() // Decodificar o token
 *  jwt.verify() // Verificarmos e decodificarmos o token
 */

export class JWT {
  // Gerar o token
  public generateToken(data: AuthStudent): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("Secret not defined");
    }

    const options: SignOptions = {
      algorithm: "HS256",
      // expiresIn: process.env.JWT_EXPIRES_IN, --> verificar!
    };

    try {
      const token = jwt.sign(data, secret, options);
      return token;
    } catch (err: any) {
      throw new Error(`Error generating token: ${err.message}`);
    }
  }

  // Verificar o token
  public verifyToken(token: string): AuthStudent | null {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("Secret not defined");
    }
    try {
      const data = jwt.verify(token, secret) as AuthStudent;
      return data;
    } catch {
      return null;
    }
  }
}
