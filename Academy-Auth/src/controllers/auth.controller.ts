import { Response, Request } from "express";
import { AuthService } from "../services";
import { SignupDto } from "../dtos";

export class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      // 1 - Pegar os dados
      const { email, password } = req.body;

      // 2 - Chamara o responsável
      const service = new AuthService();
      const result = await service.login({ email, password });

      // 3 - Response para cliente
      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, type, age, cpf } = req.body;

      const data: SignupDto = {
        name,
        email,
        password,
        cpf,
        type,
        age,
      };

      // Chamar o serviço responsável
      const service = new AuthService();
      const result = await service.signup(data);

      // Retornar para o cliente as informações que o serviço retorna.
      // code | ok, message...
      const { code, ...response } = result;
      res.status(code).json(response); // { ok, message, data? }
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }
}
