import { sendError } from "../../shared/error-response.js";
import { embedTexts } from "../../generation/openrouter-client.js";
import { searchSimilar } from "../../retrieval/search-similar.js";
import { buildContextAndCitations } from "../../retrieval/build-context.js";
import { answerQuestion } from "../../generation/answer-question.js";

/** @param {import("fastify").FastifyInstance} app */
export function registerAskRoute(app) {
  app.post("/ask", async (request, reply) => {
    const profileId = String(request.body?.profileId ?? "").trim();
    const question = String(request.body?.question ?? "").trim();

    if (!profileId || !question) {
      return sendError(
        reply,
        400,
        "INVALID_INPUT",
        "Fields `profileId` and `question` are required."
      );
    }

    if (profileId.length > request.server.config.PROFILE_ID_MAX_LENGTH) {
      return sendError(
        reply,
        400,
        "INVALID_INPUT",
        `Field \`profileId\` exceeds max length (${request.server.config.PROFILE_ID_MAX_LENGTH}).`
      );
    }

    if (!request.server.indexedProfiles.has(profileId)) {
      return sendError(reply, 404, "PROFILE_NOT_INDEXED", "No indexed CV found for this profileId.");
    }

    try {
      const [questionEmbedding] = await embedTexts(request.server.config, request, [question]);
      const matches = await searchSimilar(request.server.config, profileId, questionEmbedding);

      if (!matches.length) {
        return sendError(reply, 404, "PROFILE_NOT_INDEXED", "No indexed CV found for this profileId.");
      }

      const { context, citations } = buildContextAndCitations(matches, profileId);

      if (!context) {
        return sendError(reply, 404, "PROFILE_NOT_INDEXED", "No indexed CV found for this profileId.");
      }

      const answer = await answerQuestion(request.server.config, request, question, context);

      request.log.info({ profileId, questionLength: question.length, citations: citations.length }, "ask completed");

      return reply.status(200).send({
        ok: true,
        profileId,
        answer,
        citations,
      });
    } catch (error) {
      request.log.error({ err: error, profileId }, "ask pipeline failed");

      if (error && typeof error === "object" && "statusCode" in error && "code" in error) {
        return sendError(
          reply,
          Number(error.statusCode) || 503,
          String(error.code),
          String(error.message || "Upstream error"),
          error.details ?? null
        );
      }

      return sendError(reply, 500, "INTERNAL_ERROR", "Failed to process ask request.");
    }
  });
}
