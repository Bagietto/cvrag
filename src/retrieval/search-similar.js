import { getCollection } from "../indexing/chroma-client.js";

export async function searchSimilar(config, profileId, queryEmbedding) {
  const collection = await getCollection(config);

  const result = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: config.TOP_K,
    where: { profileId },
    include: ["metadatas", "documents", "distances"],
  });

  const ids = result.ids?.[0] ?? [];
  const documents = result.documents?.[0] ?? [];
  const metadatas = result.metadatas?.[0] ?? [];
  const distances = result.distances?.[0] ?? [];

  return ids.map((id, index) => ({
    id,
    document: documents[index] ?? "",
    metadata: metadatas[index] ?? {},
    distance: typeof distances[index] === "number" ? distances[index] : null,
  }));
}
