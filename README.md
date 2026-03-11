# CVRAG API (MVP)

## Status atual
- Bootstrap da API concluído.
- Ingestão com upload (`PDF`, `MD`, `DOCX`) e `profileId` obrigatório.
- Pipeline de ingestão implementada:
  - parse -> normalize -> chunk -> embeddings (OpenRouter) -> upsert (Chroma)
- Endpoint `/ask` implementado:
  - embedding da pergunta -> retrieval top-k por `profileId` -> geração de resposta -> citações
- Contrato de erro padronizado (`ok=false`, `error`, `requestId`).

## Endpoints
- `GET /health`
- `POST /ingest`
  - `multipart/form-data`: `file`, `profileId`
- `POST /ask`
  - JSON: `{ "profileId": "thiag", "question": "..." }`

## Setup
1. Instale dependências:
```bash
npm install
```
2. Configure `.env`:
```bash
cp .env.example .env
```
3. Suba o Chroma local (Docker):
```bash
docker run -d --name cvrag-chroma -p 8000:8000 -v ./data/chroma:/chroma/chroma chromadb/chroma:latest
```
4. Defina uma chave válida de OpenRouter em `.env`.
5. Rode a API:
```bash
npm run dev
```

## Testes
```bash
npm test
```

### Teste manual do fluxo `/ask` (MVP na prática)
Antes de perguntar, garanta que o `profileId` foi indexado via `/ingest`.

Exemplo de ingestão:
```bash
curl -X POST "http://127.0.0.1:3000/ingest" \
  -F "profileId=thiag" \
  -F "file=@./seu-cv.pdf"
```

Exemplo 1 (pergunta analítica equilibrada):
```bash
curl -X POST "http://127.0.0.1:3000/ask" \
  -H "Content-Type: application/json" \
  -d '{
    "profileId": "thiag",
    "question": "Quais são os principais pontos fortes do candidato e quais pontos de atenção podem ser desenvolvidos para aumentar aderência a uma vaga de liderança técnica?"
  }'
```

O retorno esperado inclui:
- `ok: true`
- `answer` com análise de forças + pontos de desenvolvimento
- `citations` com trechos que embasaram a resposta

Exemplo 2 (melhoria prática do CV):
```bash
curl -X POST "http://127.0.0.1:3000/ask" \
  -H "Content-Type: application/json" \
  -d '{
    "profileId": "thiag",
    "question": "Com base nas lacunas identificadas, o que precisa melhorar no CV para reduzir dúvidas de recrutadores e aumentar a chance de aprovação em vagas sênior/liderança? Liste melhorias práticas e priorizadas."
  }'
```

O retorno esperado inclui recomendações práticas como:
- adicionar métricas objetivas de impacto
- explicitar liderança técnica com exemplos
- estruturar experiências em formato desafio-ação-resultado
- destacar impacto de negócio

### Ideias de análises que o usuário pode obter sobre candidatos
Exemplos de perguntas úteis para extrair valor prático do CV com RAG:

- **Resumo executivo do perfil**
  - "Resuma o candidato em até 5 linhas para uma vaga de Tech Lead."
- **Pontos fortes com evidências**
  - "Quais são os principais pontos fortes e quais trechos do CV sustentam isso?"
- **Pontos de atenção e riscos**
  - "Quais riscos de contratação você identifica para uma vaga sênior?"
- **Aderência à vaga específica**
  - "Qual o grau de aderência para vaga backend .NET com microsserviços e mensageria?"
- **Senioridade e evolução de carreira**
  - "Há evolução clara de senioridade e responsabilidade ao longo do tempo?"
- **Estabilidade e permanência**
  - "A permanência nas empresas foi razoável? Existe padrão de alta rotatividade?"
- **Impacto de negócio**
  - "Quais resultados mensuráveis de negócio aparecem no histórico?"
- **Lacunas do CV e melhorias**
  - "O que falta explicitar no CV para aumentar aprovação em vagas de liderança?"

Resultados que normalmente a API retorna:
- resposta sintética e contextualizada em `answer`
- evidências em `citations` (trechos usados na fundamentação)
- maior rastreabilidade da análise para evitar resposta "no escuro"

## Observações
- O isolamento por `profileId` é estrito para evitar mistura de contexto entre pessoas.
- Se um `profileId` não estiver indexado, `/ask` retorna `404 PROFILE_NOT_INDEXED`.
- Em versões mais recentes do Chroma, o healthcheck funcional é `GET /api/v2/heartbeat` (o endpoint `v1` pode retornar `410`).
- Este projeto **não usa LangChain**. A orquestração do fluxo RAG (ingestão, embeddings, busca vetorial, montagem de contexto e geração da resposta) foi implementada diretamente no código para manter o MVP simples e transparente.

## Troubleshooting
- Windows PowerShell pode bloquear `npm`/`npx` (`.ps1` não assinado):
  - use `npm.cmd` e `npx.cmd`.
- Ambientes restritos/sandbox podem falhar testes com `spawn EPERM` (Vitest):
  - execute testes fora do sandbox/permissão restrita.
- `package.json` com BOM pode quebrar parser (erro de JSON inesperado):
  - salvar arquivos JSON em UTF-8 sem BOM.
- Fastify v5 aceita `logger` como objeto de configuração:
  - não passar instância de logger diretamente no bootstrap.
