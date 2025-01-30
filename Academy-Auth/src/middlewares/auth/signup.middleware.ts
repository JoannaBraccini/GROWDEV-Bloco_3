import { StudentType } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export class SignupMiddleware {
  public static validateRequired(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { name, email, password, studentType, cpf } = req.body;

    if (!name || name.length === 0) {
      res.status(400).json({ ok: false, message: "Nome é obrigatório." });
      return;
    }

    if (!email) {
      res.status(400).json({ ok: false, message: "E-mail é obrigatório." });
      return;
    }

    if (!password) {
      res.status(400).json({ ok: false, message: "Senha é obrigatória." });
      return;
    }

    if (!studentType) {
      res.status(400).json({ ok: false, message: "Tipo é obrigatório." });
      return;
    }

    if (!cpf) {
      res.status(400).json({ ok: false, message: "CPF é obrigatório." });
      return;
    }

    next();
  }

  public static validateTypes(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, studentType, age, cpf } = req.body;

    if (typeof name !== "string") {
      res.status(400).json({ ok: false, message: "Nome deve ser uma string." });
      return;
    }

    if (typeof email !== "string") {
      res
        .status(400)
        .json({ ok: false, message: "E-mail deve ser uma string." });
      return;
    }

    if (typeof password !== "string") {
      res
        .status(400)
        .json({ ok: false, message: "Senha deve ser uma string." });
      return;
    }

    if (typeof cpf !== "string") {
      res.status(400).json({ ok: false, message: "CPF deve ser uma string." });
      return;
    }

    if (!["T", "M", "F"].includes(studentType)) {
      res.status(400).json({ ok: false, message: "Tipo deve ser T, M, F." });
      return;
    }

    if (age) {
      if (typeof age !== "number") {
        res
          .status(400)
          .json({ ok: false, message: "Idade deve ser um number." });
        return;
      }
    }

    next();
  }

  public static validateData(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, cpf } = req.body;

    if (name.length < 3) {
      res.status(400).json({
        ok: false,
        message: "Nome deve conter no minimo 3 caracteres.",
      });
      return;
    }

    if (!email.includes("@") || !email.includes(".com")) {
      res.status(400).json({ ok: false, message: "E-mail inválido." });
      return;
    }

    if (password.length < 4) {
      res.status(400).json({
        ok: false,
        message: "Senha deve conter no minimo 4 caracteres.",
      });
      return;
    }

    if (cpf.length !== 11) {
      res.status(400).json({ ok: false, message: "CPF inválido." });
      return;
    }

    next();
  }
}

// function meuMiddleware(req, res, next) {}
