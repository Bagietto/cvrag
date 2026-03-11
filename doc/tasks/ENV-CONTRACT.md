# ENV CONTRACT - CVRAG MVP

## Obrigatorias
- `OPENROUTER_API_KEY`: chave de API do OpenRouter.
- `OPENROUTER_BASE_URL`: ex `https://openrouter.ai/api/v1`.
- `OPENROUTER_MODEL_CHAT`: modelo para resposta (`/ask`). Default MVP: `openrouter/free`.
- `OPENROUTER_MODEL_EMBED`: modelo para embeddings. Default MVP: `nvidia/llama-nemotron-embed-vl-1b-v2:free`.

## OpenRouter Resiliencia
- `OPENROUTER_REQUEST_TIMEOUT_MS`: timeout por chamada (default: `10000`).
- `OPENROUTER_MAX_RETRIES`: retries para erros transientes (default: `2`).
- `OPENROUTER_FALLBACK_CHAT`: fallback opcional para chat (default: vazio).
- `OPENROUTER_FALLBACK_EMBED`: fallback opcional para embeddings (default: vazio).

## Chroma
- `CHROMA_URL`: URL da instancia Chroma. Default MVP local: `http://localhost:8000`.
- `CHROMA_COLLECTION`: nome da collection (ex: `cv_chunks`).
- `CHROMA_PERSIST_DIR`: caminho local do volume Docker (default: `./data/chroma`).

## Chroma Local (Docker)
- Imagem sugerida: `chromadb/chroma:latest`.
- Comando sugerido (com persistencia):
  - `docker run -d --name cvrag-chroma -p 8000:8000 -v ./data/chroma:/chroma/chroma chromadb/chroma:latest`

## API`r`n- `PROFILE_ID_MAX_LENGTH`: tamanho maximo aceito para `profileId` (default: `64`).`r`n- `PORT`: porta HTTP (default: `3000`).
- `HOST`: host de bind (default: `0.0.0.0`).
- `MAX_UPLOAD_MB`: limite de upload (default: `10`).

## RAG Tuning
- `CHUNK_SIZE`: tamanho do chunk (default: `900`).
- `CHUNK_OVERLAP`: sobreposicao (default: `120`).
- `TOP_K`: numero de chunks recuperados (default: `5`).

## Operacao
- `LOG_LEVEL`: `info|warn|error|debug` (default: `info`).
- `NODE_ENV`: `development|test|production`.

## Regras
- App deve falhar no bootstrap se variaveis obrigatorias faltarem.
- Defaults devem ser aplicados somente nas variaveis opcionais.

## Migracao recomendada (futuro)
- Chat: `openai/gpt-4o-mini`.
- Embedding: `openai/text-embedding-3-small`.
- A migracao deve ocorrer apenas alterando `.env`, sem mudanca de codigo.

