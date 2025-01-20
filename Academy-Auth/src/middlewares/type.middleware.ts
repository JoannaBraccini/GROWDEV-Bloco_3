import { StudentType } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export class TypeMiddleware {
  public static validate(allowedTypes?: StudentType[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const type = req.authStudent.studentType;

      if (!allowedTypes) {
        return next();
      }

      if (type && !allowedTypes.includes(type)) {
        const alloweds = allowedTypes.join(", ");

        res.status(401).json({
          ok: false,
          message: `Somente estudantes do(s) tipo(s) ${alloweds} podem acessar essa funcionalidade.`,
        });
      }

      next();
    };
  }
}
