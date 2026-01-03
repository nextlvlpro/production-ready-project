import { Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { AuthenticatedRequest } from "../interface/authInterface";


export function authMiddleware(req:AuthenticatedRequest, res:Response, next:NextFunction) {
  const token = req.cookies?.access_token;  

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    req.user = verifyJwt(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}