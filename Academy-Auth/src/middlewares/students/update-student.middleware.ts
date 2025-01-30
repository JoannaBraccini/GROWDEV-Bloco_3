import { StudentType } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export class UpdateStudentMiddleware {
  public static validateTypes(req: Request, res: Response, next: NextFunction) {
    const { name, passwordNew, studentType, age } = req.body;

    if (name && typeof name !== "string") {
      res.status(400).json({ ok: false, message: "Nome deve ser uma string." });
      return;
    }

    if (passwordNew && typeof passwordNew !== "string") {
      res
        .status(400)
        .json({ ok: false, message: "Senha deve ser uma string." });
      return;
    }

    if (studentType && !Object.values(StudentType).includes(studentType)) {
      res.status(400).json({ ok: false, message: "Tipo deve ser T, M, F." });
      return;
    }

    if (age && typeof age !== "number") {
      res.status(400).json({ ok: false, message: "Idade deve ser um number." });
      return;
    }

    return next();
  }

  public static validateData(req: Request, res: Response, next: NextFunction) {
    const { name, passwordNew } = req.body;

    if (name && name.length < 3) {
      res.status(400).json({
        ok: false,
        message: "Nome deve conter no minimo 3 caracteres.",
      });
      return;
    }

    if (passwordNew && passwordNew.length < 4) {
      res.status(400).json({
        ok: false,
        message: "Senha deve conter no minimo 4 caracteres.",
      });
      return;
    }

    return next();
  }
}
