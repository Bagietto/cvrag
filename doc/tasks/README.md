# Tasks - CVRAG MVP Backlog

Este diretorio contem a decomposicao da spec em tarefas executaveis.

## Convencoes
- Arquivo por tarefa: `TASK-XXX-nome-curto.md`
- Status permitidos: `todo`, `in_progress`, `blocked`, `done`
- Prioridade: `P0` (critico), `P1` (importante), `P2` (melhoria)
- Sempre incluir criterios de aceite verificaveis.

## Contexto obrigatorio (antes de iniciar qualquer task)
1. Ler `STACK-BASELINE.md`.
2. Ler `ENV-CONTRACT.md`.
3. Ler `DOD.md`.
4. Ler `EVAL-RUBRIC.md`.
5. Ler `DATA-POLICY.md`.
6. Ler `OPENROUTER-FALLBACK.md`.
7. Ler `API-ERROR-CONTRACT.md`.
8. Ler `CONTEXT7-USAGE.md`.
9. Confirmar dependencias da task atual.

## Ordem sugerida
1. TASK-001-bootstrap-api
2. TASK-002-config-env
3. TASK-003-upload-ingest-endpoint
4. TASK-004-parsers-multiformato
5. TASK-005-normalizacao-e-chunking
6. TASK-006-chroma-indexacao
7. TASK-007-openrouter-client
8. TASK-008-pipeline-ingestao
9. TASK-009-endpoint-ask-rag
10. TASK-010-citations-response
11. TASK-011-testes
12. TASK-012-observabilidade-e-docs

## Gate de qualidade minimo por task
- Criterios de aceite da task atendidos.
- Logs de erro claros nos caminhos criticos.
- Atualizacao de docs afetadas.
- Sem regressao em testes existentes.

## Notas Tecnicas de Execucao
- Em Windows PowerShell, prefira `npm.cmd`/`npx.cmd` para evitar bloqueio de execucao de `.ps1`.
- Em ambiente sandbox/restrito, testes que exigem spawn de processo podem falhar com `EPERM`.
- Arquivos JSON de projeto devem ser salvos em UTF-8 sem BOM.
