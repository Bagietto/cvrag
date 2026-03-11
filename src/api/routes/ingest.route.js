import { sendError } from "../../shared/error-response.js";
import { extractTextFromFile } from "../../ingestion/extract-text.js";
import { normalizeText } from "../../ingestion/normalize-text.js";
import { chunkText } from "../../ingestion/chunk-text.js";
import { embedTexts } from "../../generation/openrouter-client.js";
import { upsertChunks } from "../../indexing/upsert-chunks.js";

const allowedExtensions = new Set(["pdf", "md", "docx"]);

function getExtension(filename = "") {
  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex < 0) return "";
  return filename.slice(dotIndex + 1).toLowerCase();
}

/** @param {import("fastify").FastifyInstance} app */
export function registerIngestRoute(app) {
  app.post("/ingest", async (request, reply) => {
    let filePart;

    try {
      filePart = await request.file();
    } catch (_error) {
      return sendError(reply, 400, "INVALID_INPUT", "Missing multipart payload or file field.");
    }

    if (!filePart) {
      return sendError(reply, 400, "INVALID_INPUT", "Field `file` is required.");
    }

    const filename = filePart.filename ?? "upload";
    const extension = getExtension(filename);

    const profileIdRaw = filePart.fields?.profileId?.value;
    const profileId = typeof profileIdRaw === "string" ? profileIdRaw.trim() : "";

    if (!profileId) {
      filePart.file.resume();
      return sendError(reply, 400, "INVALID_INPUT", "Field `profileId` is required.");
    }

    if (profileId.length > request.server.config.PROFILE_ID_MAX_LENGTH) {
      filePart.file.resume();
      return sendError(
        reply,
        400,
        "INVALID_INPUT",
        `Field \`profileId\` exceeds max length (${request.server.config.PROFILE_ID_MAX_LENGTH}).`
      );
    }

    if (!allowedExtensions.has(extension)) {
      filePart.file.resume();
      return sendError(reply, 415, "UNSUPPORTED_FILE_TYPE", `Unsupported file type: .${extension || "unknown"}`);
    }

    const chunks = [];
    let bytes = 0;
    for await (const chunk of filePart.file) {
      bytes += chunk.length;
      chunks.push(chunk);
    }

    const maxBytes = request.server.config.MAX_UPLOAD_MB * 1024 * 1024;
    if (bytes > maxBytes) {
      return sendError(reply, 413, "PAYLOAD_TOO_LARGE", "Uploaded file exceeds configured limit.");
    }

    const fileBuffer = Buffer.concat(chunks);

    try {
      const rawText = await extractTextFromFile(fileBuffer, extension);
      const normalizedText = normalizeText(rawText);

      if (!normalizedText) {
        return sendError(reply, 400, "INVALID_INPUT", "Could not extract text from uploaded file.");
      }

      const textChunks = chunkText(normalizedText, {
        chunkSize: request.server.config.CHUNK_SIZE,
        chunkOverlap: request.server.config.CHUNK_OVERLAP,
        profileId,
        filename,
      });

      if (textChunks.length === 0) {
        return sendError(reply, 400, "INVALID_INPUT", "No chunks were generated from uploaded CV.");
      }

      const embeddings = await embedTexts(
        request.server.config,
        request,
        textChunks.map((chunk) => chunk.content)
      );

      if (embeddings.length !== textChunks.length) {
        return sendError(reply, 503, "UPSTREAM_UNAVAILABLE", "Embedding response size mismatch.");
      }

      await upsertChunks(request.server.config, textChunks, embeddings);

      request.server.indexedProfiles.add(profileId);

      request.log.info(
        { profileId, filename, bytes, chunksIndexed: textChunks.length },
        "ingest pipeline completed"
      );

      return reply.status(200).send({
        ok: true,
        profileId,
        filename,
        chunksIndexed: textChunks.length,
      });
    } catch (error) {
      request.log.error({ err: error, profileId, filename }, "ingest pipeline failed");

      if (error && typeof error === "object" && "statusCode" in error && "code" in error) {
        return sendError(
          reply,
          Number(error.statusCode) || 503,
          String(error.code),
          String(error.message || "Upstream error"),
          error.details ?? null
        );
      }

      return sendError(reply, 500, "INTERNAL_ERROR", "Failed to ingest CV file.");
    }
  });
}
