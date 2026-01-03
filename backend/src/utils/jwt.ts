import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { JWTPayload } from "../interface/authInterface";

export function signJwt(payload: JWTPayload): string {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: "7d",
  });
}

export function verifyJwt(token: string): JWTPayload {
  try {
    return jwt.verify(token, env.jwtSecret) as JWTPayload;
  } catch {
    throw new Error("Invalid or expired JWT");
  }
}
