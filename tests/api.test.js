import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { buildServer } from "../src/api/server.js";

let app;

beforeAll(async () => {
  process.env.OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "test-key";
  process.env.NODE_ENV = "test";
  app = buildServer();
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe("API bootstrap", () => {
  it("GET /health should return ok", async () => {
    const response = await app.inject({ method: "GET", url: "/health" });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ ok: true });
  });

  it("POST /ask should return 400 when fields are missing", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/ask",
      payload: {},
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe("INVALID_INPUT");
  });

  it("POST /ask should return 404 when profile is not indexed", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/ask",
      payload: { profileId: "thiag", question: "Qual experiencia?" },
    });

    expect(response.statusCode).toBe(404);
    expect(response.json().error.code).toBe("PROFILE_NOT_INDEXED");
  });

  it("POST /ingest should return 400 without multipart file", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/ingest",
      headers: { "content-type": "application/json" },
      payload: { profileId: "thiag" },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe("INVALID_INPUT");
  });
});
