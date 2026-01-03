import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { AuthenticatedRequest } from "../interface/authInterface";

const userVerifyRouter = Router();

userVerifyRouter.get("/me", authMiddleware, (req:AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(500).json({ message: "Auth state invalid" });
  }
  return res.json({
    message: "You are authenticated",
    user:{id:req.user.userId, email:req.user.email}
  });
});

export default userVerifyRouter;
