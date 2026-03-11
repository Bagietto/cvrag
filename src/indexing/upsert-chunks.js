import { getCollection } from "./chroma-client.js";

export async function upsertChunks(config, chunks, embeddings) {
  const collection = await getCollection(config);

  await collection.upsert({
    ids: chunks.map((chunk) => chunk.id),
    documents: chunks.map((chunk) => chunk.content),
    metadatas: chunks.map((chunk) => chunk.metadata),
    embeddings,
  });
}
