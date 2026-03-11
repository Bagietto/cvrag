function normalizeScore(distance) {
  if (typeof distance !== "number" || Number.isNaN(distance)) {
    return 0;
  }

  const score = 1 / (1 + distance);
  return Number(score.toFixed(4));
}

export function buildContextAndCitations(matches, profileId) {
  const safeMatches = matches.filter((match) => match?.metadata?.profileId === profileId);

  const context = safeMatches
    .map((match, index) => `#${index + 1}\n${match.document}`)
    .join("\n\n");

  const citations = safeMatches.map((match) => ({
    chunkId: String(match.id),
    score: normalizeScore(match.distance),
    snippet: String(match.document ?? "").slice(0, 280),
  }));

  return { context, citations };
}
