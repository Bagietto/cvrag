# STACK BASELINE - CVRAG MVP

## Runtime e Linguagem
- Node.js: `22.x LTS`
- JavaScript: `ESM`

## API
- Fastify: `^5.0.0`
- @fastify/multipart: `^9.0.0`
- @fastify/cors: `^10.0.0`

## RAG e Integracoes
- OpenRouter API: HTTP REST
- Chroma client: `chromadb` (JS)
- Embeddings/LLM via OpenRouter (modelos definidos por env)

## Parsing de Arquivos
- PDF: `pdf-parse`
- DOCX: `mammoth`
- MD: parser proprio por leitura de texto

## Qualidade
- Vitest: `^2.0.0`
- Supertest: `^7.0.0`
- Pino (logging): `^9.0.0`
- Zod (config validation): `^3.0.0`

## Observacoes
- Evitar trocar bibliotecas no MVP sem atualizar tasks e spec.
- Mudancas de stack devem ser registradas em `doc/CVRAG.md`.
