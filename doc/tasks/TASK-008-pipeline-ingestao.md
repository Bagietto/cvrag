# TASK-008 - Orquestracao da Pipeline de Ingestao

## Meta
- **ID**: `TASK-008`
- **Status**: `todo`
- **Prioridade**: `P0`
- **Dependencias**: `[TASK-003, TASK-004, TASK-005, TASK-006, TASK-007]`

## Contexto
Precisamos conectar upload -> parse -> chunk -> embedding -> indexacao com isolamento por perfil.

## Objetivo
Finalizar fluxo ponta a ponta do `POST /ingest` por `profileId`.

## Escopo
- Integrar modulos de ingestao/indexacao.
- Resposta padrao com `profileId`, `filename` e `chunksIndexed`.
- Logs de etapas e falhas.

## Fora de escopo
- Processamento assinc em fila.

## Entregaveis
- Fluxo E2E funcional de ingestao por perfil.

## Criterios de aceite
- [ ] Upload de CV indexa chunks no Chroma com `profileId`.
- [ ] Endpoint retorna quantidade indexada e `profileId`.

## Plano tecnico
1. Orquestrar servico de ingestao com `profileId`.
2. Adicionar tratamento de excecao.
3. Padronizar resposta JSON.

## Riscos
- Pipeline lenta para arquivos maiores.

## Validacao
- Teste manual completo com 2 perfis distintos.

## Contexto Obrigatorio
- Ler `doc/tasks/STACK-BASELINE.md`.
- Ler `doc/tasks/ENV-CONTRACT.md`.
- Cumprir `doc/tasks/DOD.md` para fechar a task.

## Refinamento de Aceite (Mensuravel)
- `POST /ingest` executa fluxo completo e retorna:
  - status `200`
  - `{ "ok": true, "profileId": "...", "filename": "...", "chunksIndexed": <int> }`
- `chunksIndexed` > `0` para CV valido.
- Tempo total do endpoint <= `10s` para arquivo ate `2MB`.
- Reingestao do mesmo perfil nao cria mistura com outros perfis.

## Evidencias Obrigatorias
- Requisicao real de upload com retorno completo incluindo `profileId`.
- Confirmacao de dados no Chroma apos ingestao.
- Teste com 2 perfis sem mistura de metadados.
- Log de cada etapa: parse, chunk, embed, upsert.

## Referencias Complementares
- `doc/tasks/EVAL-RUBRIC.md`
- `doc/tasks/DATA-POLICY.md`
- `doc/tasks/OPENROUTER-FALLBACK.md`
- `doc/tasks/API-ERROR-CONTRACT.md`
- `doc/tasks/CONTEXT7-USAGE.md`
