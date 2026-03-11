import { createHash } from "node:crypto";

export function chunkText(text, options) {
  const { chunkSize, chunkOverlap, profileId, filename } = options;

  if (!text) return [];
  if (chunkSize <= 0) return [];

  const chunks = [];
  let start = 0;
  let index = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    const content = text.slice(start, end).trim();

    if (content.length > 0) {
      const idSource = `${profileId}:${filename}:${index}:${content}`;
      const chunkId = createHash("sha1").update(idSource).digest("hex");
      chunks.push({
        id: chunkId,
        content,
        metadata: {
          profileId,
          filename,
          chunkIndex: index,
          start,
          end,
        },
      });
    }

    if (end >= text.length) break;
    start = Math.max(0, end - chunkOverlap);
    index += 1;
  }

  return chunks;
}
