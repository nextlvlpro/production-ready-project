import pino from "pino";
import { env } from "../config/env";

export const logger = pino({
    level: env.logLevel,
    base:{
        service: env.serviceName
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,   
    
});