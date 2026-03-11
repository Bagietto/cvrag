import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const configSchema = z.object({
  OPENROUTER_API_KEY: z.string().min(1, "OPENROUTER_API_KEY is required"),
  OPENROUTER_BASE_URL: z.string().url().default("https://openrouter.ai/api/v1"),
  OPENROUTER_MODEL_CHAT: z.string().min(1).default("openrouter/free"),
  OPENROUTER_MODEL_EMBED: z
    .string()
    .min(1)
    .default("nvidia/llama-nemotron-embed-vl-1b-v2:free"),
  OPENROUTER_REQUEST_TIMEOUT_MS: z.coerce.number().int().positive().default(10000),
  OPENROUTER_MAX_RETRIES: z.coerce.number().int().min(0).default(2),
  OPENROUTER_FALLBACK_CHAT: z.string().optional().default(""),
  OPENROUTER_FALLBACK_EMBED: z.string().optional().default(""),

  CHROMA_URL: z.string().url().default("http://localhost:8000"),
  CHROMA_COLLECTION: z.string().min(1).default("cv_chunks"),
  CHROMA_PERSIST_DIR: z.string().min(1).default("./data/chroma"),

  PROFILE_ID_MAX_LENGTH: z.coerce.number().int().positive().default(64),
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string().min(1).default("0.0.0.0"),
  MAX_UPLOAD_MB: z.coerce.number().int().positive().default(10),

  CHUNK_SIZE: z.coerce.number().int().positive().default(900),
  CHUNK_OVERLAP: z.coerce.number().int().min(0).default(120),
  TOP_K: z.coerce.number().int().positive().default(5),

  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

function formatIssues(issues) {
  return issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
}

export function loadConfig() {
  const result = configSchema.safeParse(process.env);

  if (!result.success) {
    throw new Error(`Invalid environment configuration: ${formatIssues(result.error.issues)}`);
  }

  return result.data;
}
