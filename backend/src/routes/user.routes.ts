import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";

const userVerifyRouter = Router();

userVerifyRouter.get("/me", requireAuth, (req, res) => {
  return res.json({
    message: "You are authenticated",
    user: {
      id: (req as any).userId,
      email: (req as any).email,
    },
  });
});

export default userVerifyRouter;
