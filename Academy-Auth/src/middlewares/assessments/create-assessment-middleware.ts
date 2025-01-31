import { NextFunction, Request, Response } from "express";

export class CreateAssessmentMiddleware {
  public static validateRequired(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { title, grade } = req.body;

    if (!title) {
      res.status(400).json({ ok: false, message: "Título é obrigatório." });
      return;
    }

    if (!grade) {
      res.status(400).json({ ok: false, message: "Nota é obrigatória." });
      return;
    }

    next();
  }

  public static validateTypes(req: Request, res: Response, next: NextFunction) {
    const { title, description, grade } = req.body;

    if (typeof title !== "string") {
      res
        .status(400)
        .json({ ok: false, message: "Título deve ser uma string." });
      return;
    }

    if (description && typeof description !== "string") {
      res
        .status(400)
        .json({ ok: false, message: "Descrição deve ser uma string." });
      return;
    }

    if (typeof grade !== "number") {
      res.status(400).json({ ok: false, message: "Nota deve ser um number." });
      return;
    }

    next();
  }

  public static validateData(req: Request, res: Response, next: NextFunction) {
    const { title, description } = req.body;

    if (title.length < 4) {
      res.status(400).json({
        ok: false,
        message: "Título deve conter no mínimo 4 caracteres.",
      });
      return;
    }

    if (description && description.length < 6) {
      res.status(400).json({
        ok: false,
        message: "Descrição deve conter no minimo 6 caracteres.",
      });
      return;
    }

    next();
  }
}
