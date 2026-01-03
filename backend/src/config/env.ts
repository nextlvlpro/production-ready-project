import dotenv from "dotenv";
dotenv.config();    


function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
}

export const env = {
  nodeEnv: required("NODE_ENV"),
  port: Number(required("PORT")),
  serviceName: required("SERVICE_NAME"),
  logLevel: process.env.LOG_LEVEL || "info",
  db: {
    host: required("DB_HOST"),
    port: Number(required("DB_PORT")),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    database: required("DB_NAME"),
  },
  jwtSecret: required("JWT_SECRET"),

};