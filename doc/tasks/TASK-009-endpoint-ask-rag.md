# TASK-009 - Endpoint `/ask` com Retrieval + Generation

## Meta
- **ID**: `TASK-009`
- **Status**: `todo`
- **Prioridade**: `P0`
- **Dependencias**: `[TASK-006, TASK-007, TASK-008]`

## Contexto
Depois da indexacao, precisamos responder perguntas sobre o CV sem mistura entre perfis.

## Objetivo
Implementar `POST /ask` com busca top-k no Chroma filtrada por `profileId` e geracao de resposta contextual.

## Escopo
- Receber `profileId` e `question`.
- Gerar embedding da pergunta.
- Buscar chunks relevantes com filtro por `profileId`.
- Montar prompt e chamar LLM.

## Fora de escopo
- Memoria de conversa multi-turno.

## Entregaveis
- Endpoint funcional com resposta textual isolada por perfil.

## Criterios de aceite
- [ ] Pergunta valida retorna `200` com `answer` nao vazio.
- [ ] `profileId` ou pergunta vazia retorna `400`.
- [ ] `profileId` sem dados indexados retorna `404`.
- [ ] Indisponibilidade temporaria apos retries/fallback retorna `503`.

## Plano tecnico
1. Implementar busca semantica com filtro por `profileId`.
2. Construir prompt template.
3. Padronizar retorno.

## Riscos
- Falha no filtro pode causar vazamento de contexto entre perfis.

## Validacao
- Bateria manual de perguntas para 2 perfis.

## Contexto Obrigatorio
- Ler `doc/tasks/STACK-BASELINE.md`.
- Ler `doc/tasks/ENV-CONTRACT.md`.
- Cumprir `doc/tasks/DOD.md` para fechar a task.

## Contrato Tecnico da Rota
- Metodo/rota: `POST /ask`
- Body: `{ "profileId": "string", "question": "string" }`
- Erros esperados:
  - `400` para `profileId` ou `question` ausente/vazio
  - `404` para `profileId` sem dados indexados (`PROFILE_NOT_INDEXED`)
  - `503` para indisponibilidade temporaria de modelos/infra (apos retries/fallback)
  - `500` para falhas internas nao transitorias

## Refinamento de Aceite (Mensuravel)
- Pergunta valida retorna `200` com campo `answer` nao vazio.
- Endpoint responde em <= `4s` local em caso comum.
- `TOP_K` aplicado conforme env.
- Todos os chunks usados na resposta pertencem ao `profileId` informado.

## Evidencias Obrigatorias
- Request valida com resposta para `profileId` existente.
- Request invalida (`profileId` ou `question` vazio) com `400`.
- Request para `profileId` nao indexado com `404`.
- Simulacao de indisponibilidade com retorno `503`.
- Log de top-k utilizado e do `profileId`.

## Contrato de erro aplicado
- Seguir `doc/tasks/API-ERROR-CONTRACT.md` para `400`, `404`, `503` e `500` da rota.

## Referencias Complementares
- `doc/tasks/EVAL-RUBRIC.md`
- `doc/tasks/DATA-POLICY.md`
- `doc/tasks/OPENROUTER-FALLBACK.md`
- `doc/tasks/API-ERROR-CONTRACT.md`
- `doc/tasks/CONTEXT7-USAGE.md`
