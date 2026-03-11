import { ChromaClient } from "chromadb";

let cachedClient;
const collections = new Map();

function getClient(config) {
  if (!cachedClient) {
    cachedClient = new ChromaClient({ path: config.CHROMA_URL });
  }
  return cachedClient;
}

export async function getCollection(config) {
  const key = `${config.CHROMA_URL}:${config.CHROMA_COLLECTION}`;
  if (collections.has(key)) {
    return collections.get(key);
  }

  const client = getClient(config);
  const collection = await client.getOrCreateCollection({ name: config.CHROMA_COLLECTION });
  collections.set(key, collection);
  return collection;
}
