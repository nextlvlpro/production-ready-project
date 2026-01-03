import { Pool } from "pg";
import { env } from "./config/env";
import { logger } from "./utils/logger";

export const db = new Pool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
})

db.connect()
    .then(client => {
        logger.info("Database connected")
        client.release()
    })
    .catch(error => {
        logger.error({ error }, "Database connection error",)
        process.exit(1);
    })
