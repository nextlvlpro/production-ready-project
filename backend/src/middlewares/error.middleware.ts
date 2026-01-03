import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(
    {
      err,
      requestId: (req as any).requestId,
      path: req.path,
      method: req.method,
    },
    "Unhandled error"
  );

  res.status(500).json({
    message: "Internal Server Error",
    requestId: (req as any).requestId,
  });
}
