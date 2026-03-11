# CVRAG - Project Spec (Planning & Discovery)

## 1. Visao do Projeto
Construir um sistema RAG (Retrieval-Augmented Generation) em JavaScript para responder perguntas sobre o CV do Thiag com alta precisao, contexto verificavel e facilidade de manutencao.

## 2. Objetivos
- Permitir perguntas em linguagem natural sobre experiencia, habilidades, projetos e formacao.
- Responder com base em dados do CV (evitar alucinacao).
- Possibilitar evolucao para multiplas fontes (LinkedIn, GitHub, portfolio, certificados).
- Ter arquitetura simples para rodar localmente e escalar depois.

## 3. Escopo Inicial (MVP)
- Ingestao de CV por perfil: upload do arquivo do CV (PDF, MD ou DOCX) com `profileId` obrigatorio.
- Pipeline de chunking + embeddings + indexacao vetorial.
- API de perguntas e respostas com citacoes de trechos recuperados.
- Interface simples por endpoint HTTP para consulta.
- Observabilidade basica: logs de ingestao e consulta.

## 4. Fora de Escopo (MVP)
- Multiusuario com autenticacao.
- Painel admin completo.
- Treinamento de modelo proprio.
- Deploy multi-regiao.

## 5. Requisitos Funcionais
1. Receber upload do CV com `profileId` e extrair texto.
2. Quebrar o texto em chunks com sobreposicao.
3. Gerar embeddings e salvar no vector store.
4. Receber pergunta do usuario com `profileId`.
5. Recuperar os chunks mais relevantes filtrando por `profileId`.
6. Montar prompt com contexto recuperado.
7. Gerar resposta via LLM.
8. Retornar resposta + fontes usadas.

## 6. Requisitos Nao Funcionais
- Precisao: respostas devem vir com evidencias (citacoes).
- Performance: resposta alvo <= 4s em ambiente local para perguntas comuns.
- Confiabilidade: pipeline de ingestao idempotente.
- Seguranca: chaves de API via variaveis de ambiente.
- Manutenibilidade: estrutura modular e testavel.
- Isolamento de contexto: respostas devem usar somente dados do profileId informado.

## 7. Arquitetura Proposta (JavaScript)
### 7.1 Stack Sugerida
- Runtime: Node.js LTS.
- Linguagem: JavaScript (com JSDoc para contratos) ou TypeScript no futuro.
- Framework API: Fastify (simples e performatico).
- Orquestracao RAG (MVP): pipeline propria com cliente HTTP (sem LangChain no MVP).
- Embeddings/LLM: OpenRouter (provider principal) com suporte a provider configuravel.
- Vector DB:
  - MVP local: Chroma (executado via Docker local).
  - Evolucao cloud: Pinecone, Qdrant ou Weaviate.
- Config: dotenv + schema validation (ex: zod).
- Testes: Vitest.

### 7.2 Componentes
- `ingestion/`: parser, normalizacao e chunking.
- `indexing/`: embeddings e persistencia vetorial.
- `retrieval/`: busca semantica (top-k) + reranking opcional.
- `generation/`: prompt template, chamada de LLM, pos-processamento.
- `api/`: endpoints HTTP (`/health`, `/ingest`, `/ask`).
- `shared/`: config, logger, tipos e utilitarios.

### 7.3 Fluxo de Dados
1. `upload file + profileId -> parser -> text cleaner -> chunker`
2. `chunks + metadata(profileId) -> embedding model -> vector store`
3. `question + profileId -> query embedding -> similarity search (top-k, filter by profileId)`
4. `top-k context -> prompt -> LLM -> answer + citations`

## 8. Estrutura Inicial de Pastas
```txt
CVRAG/
  doc/
    CVRAG.md
  src/
    api/
    ingestion/
    indexing/
    retrieval/
    generation/
    shared/
  data/
    raw/
    processed/
  tests/
  .env.example
  package.json
  README.md
```

## 9. Contrato de API (MVP)
### POST `/ingest`
- Input: `multipart/form-data` com campos: `file` (PDF, MD ou DOCX) e `profileId` (string obrigatoria).
- Exemplo (conceitual): upload direto do arquivo do CV.
- Output:
```json
{ "ok": true, "profileId": "thiag", "filename": "cv.pdf", "chunksIndexed": 124 }
```

### POST `/ask`
- Input:
```json
{ "profileId": "thiag", "question": "Quais projetos de IA ele ja desenvolveu?" }
```
- Erros esperados (MVP):
  - `400` para `profileId` ou `question` ausente/vazio
  - `404` para `profileId` sem dados indexados
  - `503` para indisponibilidade temporaria de modelos/infra (apos retries/fallback)
  - `500` para erro interno nao transitorio
- Output:
```json
{
  "answer": "Resposta gerada...",
  "citations": [
    { "chunkId": "cv-42", "score": 0.87, "snippet": "..." }
  ]
}
```

## 10. Qualidade e Validacao
- Testes unitarios:
  - chunking
  - normalizacao
  - montagem de prompt
- Testes de integracao:
  - ingestao completa
  - pergunta e resposta com citacao
- Avaliacao de RAG (amostra manual):
  - 20 perguntas alvo sobre o CV
  - taxa de resposta correta
  - taxa de citacao relevante

## 11. Roadmap
1. Fase 1 - Fundacao
   - setup Node.js
   - parser + chunking
   - vector store local
2. Fase 2 - RAG Basico
   - retrieval + generation
   - endpoint `/ask`
3. Fase 3 - Qualidade
   - citacoes, logs, testes
   - ajustes de prompt e chunking
4. Fase 4 - Evolucao
   - multiplas fontes (GitHub/LinkedIn)
   - reranking e memoria de sessao

## 12. Riscos e Mitigacoes
- CV em PDF com extracao ruim:
  - mitigacao: suportar Markdown e pipeline de limpeza.
- Custo/latencia de API:
  - mitigacao: cache de respostas e tuning de top-k.
- Alucinacao:
  - mitigacao: resposta sempre ancorada em citacoes.

## 13. Convencoes de Trabalho
- Sempre registrar decisoes arquiteturais neste documento.
- Alteracoes de escopo devem atualizar secoes 3, 4 e 11.
- Em caso de duvida de produto/arquitetura, fazer 1 pergunta por vez.

## 14. Pendencias de Discovery
- Nenhuma pendencia critica aberta para iniciar implementacao do MVP.
- Itens futuros (nao bloqueantes):
  - avaliacao de fallback pago no OpenRouter
  - possivel adocao de GraphRAG/Neo4j em fase posterior

---

## Decisoes Assumidas Neste Draft
- Vector store inicial do MVP: Chroma.
- Chroma rodando localmente via Docker (CHROMA_URL=http://localhost:8000).
- Projeto sera iniciado em JavaScript (Node.js).
- Provider principal: OpenRouter.
- Modelo inicial de chat: openrouter/free.
- Modelo inicial de embedding: nvidia/llama-nemotron-embed-vl-1b-v2:free.
- Troca futura para modelos pagos sera feita apenas por variaveis de ambiente (.env).
- Fontes iniciais suportadas: PDF, MD e DOCX.
- Interface inicial: API HTTP (Fastify).
- Foco inicial em 1 fonte principal por ingestao (seu CV).
- Arquitetura modular para facilitar migracao para cloud.
- Isolamento por profileId obrigatorio para ingestao e consulta.





## 15. Baseline Operacional do MVP
- MAX_UPLOAD_MB: 10
- CHUNK_SIZE: 900
- CHUNK_OVERLAP: 120
- TOP_K: 5


## 16. Baseline de Qualidade do MVP
- Conjunto de validacao: 20 perguntas reais sobre o CV.
- Meta de respostas corretas: >= 80% (16/20).
- Meta de citacoes relevantes: >= 80% (16/20).
- Criterio de aprovacao do MVP: atingir as duas metas acima.


## 17. Politica de Dados do MVP
- Upload usado apenas para processamento de ingestao.
- Arquivo bruto nao e persistido apos parse bem-sucedido.
- Logs nao devem conter conteudo integral do CV nem segredos.

## 18. Resiliencia de Modelos Free (OpenRouter)
- Aplicar retry com backoff para 429, 503 e timeout.
- Suportar fallback opcional por env para chat e embeddings.
- Em indisponibilidade total, retornar erro funcional claro (503).

## 19. Rubrica Oficial de Avaliacao do MVP
- Seguir doc/tasks/EVAL-RUBRIC.md para o conjunto de 20 perguntas.
- Aprovacao exige >=80% de acuracia e >=80% de citacoes relevantes.




## 20. Padrao de Erro da API (MVP)
- Contrato padrao de erro em `doc/tasks/API-ERROR-CONTRACT.md`.
- Erros devem retornar JSON com `ok=false`, `error.code`, `error.message` e `requestId`.

## 21. Uso de Context7 no Desenvolvimento
- Antes de implementar cada task, validar API/assinaturas nas docs oficiais via Context7.
- Registrar referencias usadas nas evidencias da task.
- Em mudanca de versao/lib, atualizar `doc/tasks/STACK-BASELINE.md`.

## 22. Isolamento Multi-Perfil (MVP)
- profileId e obrigatorio em /ingest e /ask.
- Chunks devem ser indexados com metadado profileId.
- Retrieval deve aplicar filtro estrito por profileId para evitar mistura de CVs.
- Pergunta para profileId sem indexacao deve retornar 404 (PROFILE_NOT_INDEXED).


