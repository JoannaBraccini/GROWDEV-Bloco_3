import { Request, response, Response } from "express";
import { CreateAssessmentDto } from "../dtos/assessment.dto";
import { AssessmentService } from "../services/assessments.service";
import { log } from "console";

export class AssessmentController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, grade, studentId, student } = req.body; // Validado

      const data: CreateAssessmentDto = {
        title,
        description,
        grade,
        studentId, //envia o valor preenchido na requisição e troca no service caso não seja TechHelper
        studentType: student.type,
      };

      const service = new AssessmentService();
      const result = await service.create(data);

      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { student } = req.body; // TOKEN => { student: { id, type } } QUERY => ?studentId=
      const { page, take } = req.query; // string

      const service = new AssessmentService();
      const result = await service.findAll(student.id, student.type, {
        page: page ? Number(page) - 1 : undefined, // converter p/ number
        take: take ? Number(take) : undefined,
      });

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
      const { id } = req.params;
      const { student } = req.body;

      const service = new AssessmentService();
      const result = await service.findOneById(id, student.id, student.type);

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
      const { id } = req.params;
      const { title, description, grade, student } = req.body;

      const service = new AssessmentService();
      const result = await service.update(id, student.id, student.type, {
        title,
        description,
        grade,
      });

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
      const { id } = req.params;
      const { student } = req.body;

      const service = new AssessmentService();
      const result = await service.remove(id, student.id, student.type);

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
