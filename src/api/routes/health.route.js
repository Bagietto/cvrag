import { sendError } from "../../shared/error-response.js";

/** @param {import("fastify").FastifyInstance} app */
export function registerHealthRoute(app) {
  app.get("/health", async (_request, reply) => {
    return reply.status(200).send({ ok: true });
  });

  app.setNotFoundHandler((request, reply) => {
    return sendError(reply, 404, "NOT_FOUND", `Route not found: ${request.method} ${request.url}`);
  });
}
