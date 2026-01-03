import {createApp} from "./app";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import http from "http";
const PORT = env.port

const app = createApp();

const server = http.createServer(app);

server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});


function shutdown (signal: string) {
    logger.info(`Shutdown Signal Received: ${signal}`);

    server.close(() => {
        logger.info("Server closed");

        //cose db connections later when added
        process.exit(0);
    });


    setTimeout(() => {
        logger.error("Server hangup, Forcing Shutdown");
        
        process.exit(1);
    }, 10000);
} 


process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("uncaughtException", (err) => {
  logger.fatal({ err }, "Uncaught exception");
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.fatal({ reason }, "Unhandled promise rejection");
  process.exit(1);
});

