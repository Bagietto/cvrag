import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import { loadConfig } from "../shared/config.js";
import { registerHealthRoute } from "./routes/health.route.js";
import { registerIngestRoute } from "./routes/ingest.route.js";
import { registerAskRoute } from "./routes/ask.route.js";

export function buildServer() {
  const config = loadConfig();

  const app = Fastify({
    logger: {
      level: config.LOG_LEVEL,
      redact: ["req.headers.authorization", "req.headers.cookie"],
    },
    requestIdHeader: "x-request-id",
    genReqId: () => `req-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  });

  app.decorate("config", config);
  app.decorate("indexedProfiles", new Set());

  app.register(cors, { origin: true });
  app.register(multipart, {
    limits: {
      fileSize: config.MAX_UPLOAD_MB * 1024 * 1024,
      files: 1,
      fields: 10,
    },
  });

  registerHealthRoute(app);
  registerIngestRoute(app);
  registerAskRoute(app);

  return app;
}
