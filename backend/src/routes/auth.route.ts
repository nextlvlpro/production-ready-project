import { Router } from "express";
import { loginController, logoutController, signupController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const authRouter = Router();

authRouter.use("/signup", signupController)
authRouter.use("/login", loginController)
authRouter.use("/logout", authMiddleware, logoutController)

