import { Router } from "express";
import { loginController, signupController } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.use("/signup", signupController)
authRouter.use("/login", loginController)

