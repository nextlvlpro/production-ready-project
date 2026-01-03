import express from "express";
import cookieParser from "cookie-parser";
import { healthRouter } from "./routes/health.route";
import { requestIdMiddleware } from "./middlewares/requestId.middleware";
import { httpLogger } from "./middlewares/httpLogger.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import cors from "cors";
import { authRouter } from "./routes/auth.route";
import userVerifyRouter from "./routes/user.routes";

export function createApp () {
  const app = express();

  app.use(express.json());

  app.use(requestIdMiddleware)
  app.use(httpLogger)
  app.use(cookieParser())
  app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
  }))

  app.use("/api", healthRouter)

  app.use("/api/auth", authRouter)
  app.use("/api/verify", userVerifyRouter)

  app.use(errorMiddleware)

  return app;
}