# TASK-001 - Bootstrap da API

## Meta
- **ID**: `TASK-001`
- **Status**: `todo`
- **Prioridade**: `P0`
- **Dependencias**: `[]`

## Contexto
Precisamos da base da API HTTP para suportar ingestao e perguntas no MVP.

## Objetivo
Criar projeto Node.js com Fastify e estrutura inicial modular.

## Escopo
- Inicializar `package.json`.
- Criar `src/api/server.js`.
- Criar rotas base e startup.

## Fora de escopo
- Integracao completa com RAG.

## Entregaveis
- Estrutura inicial de pastas em `src/`.
- Servidor rodando com endpoint `GET /health`.

## Criterios de aceite
- [ ] Projeto inicia sem erros.
- [ ] `GET /health` retorna `200` e `{ ok: true }`.

## Plano tecnico
1. Setup Node.js e scripts npm.
2. Configurar Fastify.
3. Registrar rota health.

## Riscos
- Dependencias inconsistentes de versao.

## Validacao
- Rodar servidor local e testar health endpoint.

## Contexto Obrigatorio
- Ler `doc/tasks/STACK-BASELINE.md`.
- Ler `doc/tasks/ENV-CONTRACT.md`.
- Cumprir `doc/tasks/DOD.md` para fechar a task.

## Refinamento de Aceite (Mensuravel)
- `npm run dev` sobe servidor sem excecao.
- `GET /health` responde em <= `500ms` local.
- Resposta exata: status `200`, body `{ "ok": true }`.

## Evidencias Obrigatorias
- Comando executado: `npm run dev`.
- Request de validacao: `GET /health`.
- Response registrada com status/body.


## Referencias Complementares
- `doc/tasks/EVAL-RUBRIC.md`
- `doc/tasks/DATA-POLICY.md`
- `doc/tasks/OPENROUTER-FALLBACK.md`

- `doc/tasks/API-ERROR-CONTRACT.md`
- `doc/tasks/CONTEXT7-USAGE.md`

