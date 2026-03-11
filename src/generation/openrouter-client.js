function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableStatus(status) {
  return status === 429 || status === 503;
}

async function requestOpenRouter(config, path, payload, model, request, purpose) {
  const attempts = config.OPENROUTER_MAX_RETRIES + 1;
  const modelsToTry = [model].concat(
    purpose === "chat" && config.OPENROUTER_FALLBACK_CHAT
      ? [config.OPENROUTER_FALLBACK_CHAT]
      : purpose === "embed" && config.OPENROUTER_FALLBACK_EMBED
        ? [config.OPENROUTER_FALLBACK_EMBED]
        : []
  );

  let lastError;

  for (const candidateModel of modelsToTry) {
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), config.OPENROUTER_REQUEST_TIMEOUT_MS);

      try {
        const response = await fetch(`${config.OPENROUTER_BASE_URL}${path}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...payload, model: candidateModel }),
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (response.ok) {
          return await response.json();
        }

        const text = await response.text();
        lastError = {
          statusCode: response.status,
          code: response.status === 429 ? "RATE_LIMITED" : "UPSTREAM_UNAVAILABLE",
          message: `OpenRouter request failed (${response.status}).`,
          details: text.slice(0, 400),
        };

        request.log.warn(
          { purpose, model: candidateModel, attempt, statusCode: response.status },
          "openrouter request failed"
        );

        if (!isRetryableStatus(response.status) || attempt >= attempts) {
          break;
        }

        await wait(attempt * 250);
      } catch (error) {
        clearTimeout(timeout);
        lastError = {
          statusCode: 503,
          code: "UPSTREAM_UNAVAILABLE",
          message: "OpenRouter request failed due to timeout/network error.",
          details: error instanceof Error ? error.message : String(error),
        };

        request.log.warn(
          { purpose, model: candidateModel, attempt, error: lastError.details },
          "openrouter request threw"
        );

        if (attempt >= attempts) {
          break;
        }

        await wait(attempt * 250);
      }
    }
  }

  throw lastError ?? {
    statusCode: 503,
    code: "UPSTREAM_UNAVAILABLE",
    message: "OpenRouter request failed.",
    details: null,
  };
}

export async function embedTexts(config, request, texts) {
  const payload = { input: texts };
  const data = await requestOpenRouter(
    config,
    "/embeddings",
    payload,
    config.OPENROUTER_MODEL_EMBED,
    request,
    "embed"
  );

  return (data.data ?? []).map((item) => item.embedding);
}

export async function generateCompletion(config, request, question, context) {
  const payload = {
    messages: [
      {
        role: "system",
        content:
          "You are a CV assistant. Answer only with provided context. If information is missing, say you do not have enough evidence.",
      },
      {
        role: "user",
        content: `Question: ${question}\n\nContext:\n${context}`,
      },
    ],
    temperature: 0.1,
  };

  const data = await requestOpenRouter(
    config,
    "/chat/completions",
    payload,
    config.OPENROUTER_MODEL_CHAT,
    request,
    "chat"
  );

  return data.choices?.[0]?.message?.content?.trim() || "I do not have enough evidence in the indexed CV.";
}
