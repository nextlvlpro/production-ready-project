import { Request } from "express";

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  is_active: boolean;
  created_at: Date;
}

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}
