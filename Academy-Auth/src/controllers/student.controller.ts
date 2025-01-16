import { Request, Response } from "express";
import { StudentService } from "../services/student.service";

export class StudentController {
  public static async findAll(req: Request, res: Response): Promise<void> {
    try {
      // 1- Pegar do query
      const { name, cpf } = req.query;

      // 2 - Chamar o responsável
      const service = new StudentService();
      const result = await service.findAll({
        name: name as string,
        cpf: cpf as string,
      });

      // 3 - Reponder para o cliente
      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public static async findOneById(req: Request, res: Response): Promise<void> {
    try {
      // 1- Pegar o identificador
      const studentLogged = req.authStudent;
      const { id } = req.params;

      // 2 - Chamar o responsável
      const service = new StudentService();
      const result = await service.findOneById(
        id,
        studentLogged.id,
        studentLogged.type
      );

      // 3 - Responder ao cliente
      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      // 1 - Pegar os dados (params e do body)
      const { id } = req.params;
      const { name, password, type, age } = req.body;

      // 2 - Chamar o responsável (service)
      const service = new StudentService();
      const result = await service.update(id, { name, password, type, age });

      // 3 - Retornar para o cliente
      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public static async remove(req: Request, res: Response): Promise<void> {
    try {
      // 1 - Pegar os dados (params id)
      const { id } = req.params;

      // 2 - Chamar o responsável (service)
      const service = new StudentService();
      const result = await service.remove(id);

      // 3 - Retornar para o cliente
      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }
}
