import { Router } from "express";
import { LoginMiddleware } from "../middlewares/auth/login.middleware";
import { AuthController } from "../controllers/auth.controller";
import { SignupMiddleware } from "../middlewares/auth/signup.middleware";

export class AuthRoutes {
  public static execute(): Router {
    const router = Router();

    router.post(
      "/login",
      [LoginMiddleware.validateRequired, LoginMiddleware.validateTypes],
      AuthController.login
    );

    // CREATE - POST
    router.post(
      "/signup",
      [
        SignupMiddleware.validateRequired,
        SignupMiddleware.validateTypes,
        SignupMiddleware.validateData,
      ],
      AuthController.signup
    );

    return router;
  }
}
