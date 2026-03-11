import pino from "pino";

export function buildLogger(level = "info") {
  return pino({
    level,
    redact: ["req.headers.authorization", "req.headers.cookie"],
  });
}
