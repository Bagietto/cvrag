# CVRAG API (MVP)

## Status atual
- Bootstrap da API concluido.
- Ingestao com upload (`PDF`, `MD`, `DOCX`) e `profileId` obrigatorio.
- Pipeline de ingestao implementada:
  - parse -> normalize -> chunk -> embeddings (OpenRouter) -> upsert (Chroma)
- Endpoint `/ask` implementado:
  - embedding da pergunta -> retrieval top-k por `profileId` -> geracao de resposta -> citacoes
- Contrato de erro padronizado (`ok=false`, `error`, `requestId`).

## Endpoints
- `GET /health`
- `POST /ingest`
  - `multipart/form-data`: `file`, `profileId`
- `POST /ask`
  - JSON: `{ "profileId": "thiag", "question": "..." }`

## Setup
1. Instale dependencias:
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
4. Defina uma chave valida de OpenRouter em `.env`.
5. Rode a API:
```bash
npm run dev
```

## Testes
```bash
npm test
```

### Teste manual do fluxo `/ask` (MVP na pratica)
Antes de perguntar, garanta que o `profileId` foi indexado via `/ingest`.

Exemplo de ingestao:
```bash
curl -X POST "http://127.0.0.1:3000/ingest" \
  -F "profileId=thiag" \
  -F "file=@./seu-cv.pdf"
```

Exemplo 1 (pergunta analitica equilibrada):
```bash
curl -X POST "http://127.0.0.1:3000/ask" \
  -H "Content-Type: application/json" \
  -d '{
    "profileId": "thiag",
    "question": "Quais sao os principais pontos fortes do candidato e quais pontos de atencao podem ser desenvolvidos para aumentar aderencia a uma vaga de lideranca tecnica?"
  }'
```

O retorno esperado inclui:
- `ok: true`
- `answer` com analise de forcas + pontos de desenvolvimento
- `citations` com trechos que embasaram a resposta

Exemplo 2 (melhoria pratica do CV):
```bash
curl -X POST "http://127.0.0.1:3000/ask" \
  -H "Content-Type: application/json" \
  -d '{
    "profileId": "thiag",
    "question": "Com base nas lacunas identificadas, o que precisa melhorar no CV para reduzir duvidas de recrutadores e aumentar a chance de aprovacao em vagas senior/lideranca? Liste melhorias praticas e priorizadas."
  }'
```

O retorno esperado inclui recomendacoes praticas como:
- adicionar metricas objetivas de impacto
- explicitar lideranca tecnica com exemplos
- estruturar experiencias em formato desafio-acao-resultado
- destacar impacto de negocio

### Ideias de analises que o usuario pode obter sobre candidatos
Exemplos de perguntas uteis para extrair valor pratico do CV com RAG:

- **Resumo executivo do perfil**
  - "Resuma o candidato em ate 5 linhas para uma vaga de Tech Lead."
- **Pontos fortes com evidencias**
  - "Quais sao os principais pontos fortes e quais trechos do CV sustentam isso?"
- **Pontos de atencao e riscos**
  - "Quais riscos de contratacao voce identifica para uma vaga senior?"
- **Aderencia a vaga especifica**
  - "Qual o grau de aderencia para vaga backend .NET com microsservicos e mensageria?"
- **Senioridade e evolucao de carreira**
  - "Ha evolucao clara de senioridade e responsabilidade ao longo do tempo?"
- **Estabilidade e permanencia**
  - "A permanencia nas empresas foi razoavel? Existe padrao de alta rotatividade?"
- **Impacto de negocio**
  - "Quais resultados mensuraveis de negocio aparecem no historico?"
- **Lacunas do CV e melhorias**
  - "O que falta explicitar no CV para aumentar aprovacao em vagas de lideranca?"

Resultados que normalmente a API retorna:
- resposta sintetica e contextualizada em `answer`
- evidencias em `citations` (trechos usados na fundamentacao)
- maior rastreabilidade da analise para evitar resposta "no escuro"

## Observacoes
- O isolamento por `profileId` e estrito para evitar mistura de contexto entre pessoas.
- Se um `profileId` nao estiver indexado, `/ask` retorna `404 PROFILE_NOT_INDEXED`.
- Em Chroma mais recente, o healthcheck funcional e `GET /api/v2/heartbeat` (o endpoint `v1` pode retornar `410`).

## Troubleshooting
- Windows PowerShell pode bloquear `npm`/`npx` (`.ps1` nao assinado):
  - use `npm.cmd` e `npx.cmd`.
- Ambientes restritos/sandbox podem falhar testes com `spawn EPERM` (Vitest):
  - execute testes fora do sandbox/permissao restrita.
- `package.json` com BOM pode quebrar parser (erro de JSON inesperado):
  - salvar arquivos JSON em UTF-8 sem BOM.
- Fastify v5 aceita `logger` como objeto de configuracao:
  - nao passar instancia de logger diretamente no bootstrap.
