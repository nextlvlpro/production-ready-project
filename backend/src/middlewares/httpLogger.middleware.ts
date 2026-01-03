import pinoHttp from "pino-http";
import { logger } from "../utils/logger";

export const httpLogger = pinoHttp({
  logger,
  customProps: (req: any) => ({
    requestId: req.requestId,
  }),
});
