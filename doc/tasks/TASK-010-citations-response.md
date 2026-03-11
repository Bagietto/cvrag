# TASK-010 - Citacoes e Contrato de Resposta

## Meta
- **ID**: `TASK-010`
- **Status**: `todo`
- **Prioridade**: `P1`
- **Dependencias**: `[TASK-009]`

## Contexto
Confiabilidade do MVP depende de transparencia de fontes e rastreabilidade por perfil.

## Objetivo
Retornar `citations` com `chunkId`, `score` e `snippet` junto da resposta, garantindo que as citacoes pertencem ao `profileId` consultado.

## Escopo
- Incluir metadados relevantes no retorno.
- Garantir formato estavel da API.

## Fora de escopo
- UI de visualizacao de fontes.

## Entregaveis
- Payload final do `/ask` com citacoes.

## Criterios de aceite
- [ ] Resposta inclui array `citations`.
- [ ] Cada citacao contem `chunkId`, `score`, `snippet`.

## Plano tecnico
1. Mapear resultados de retrieval.
2. Inserir citacoes no output.
3. Atualizar schema/documentacao.

## Riscos
- Payload muito grande por snippet extenso.

## Validacao
- Teste manual e snapshots de resposta JSON.

## Contexto Obrigatorio
- Ler `doc/tasks/STACK-BASELINE.md`.
- Ler `doc/tasks/ENV-CONTRACT.md`.
- Cumprir `doc/tasks/DOD.md` para fechar a task.
- Ler `doc/tasks/EVAL-RUBRIC.md`.
- Ler `doc/tasks/DATA-POLICY.md`.
- Ler `doc/tasks/OPENROUTER-FALLBACK.md`.

## Contrato Tecnico de Resposta
- Resposta de `/ask` deve conter:
  - `answer: string`
  - `citations: Array<{ chunkId: string, score: number, snippet: string }>`

## Regra Oficial de Score (MVP)
- Entrada do Chroma: `distance` (quanto menor, melhor).
- Formula de normalizacao para resposta da API:
  - `score = 1 / (1 + distance)`
- Arredondamento na resposta: `4` casas decimais.
- Se `distance` vier ausente/invalido, usar `score = 0`.

## Refinamento de Aceite (Mensuravel)
- `citations` sempre presente (mesmo vazio).
- `score` normalizado entre `0` e `1` usando a formula oficial.
- `snippet` com limite maximo de `280` caracteres.
- Nenhuma citacao pode vir de `profileId` diferente do solicitado no `/ask`.

## Evidencias Obrigatorias
- Snapshot JSON de resposta com citacoes.
- Caso com citacoes vazias e comportamento documentado.
- Caso com distance real e score calculado conforme formula.
- Caso de 2 perfis provando que citacoes nao misturam perfis.

## Referencias Complementares
- `doc/tasks/EVAL-RUBRIC.md`
- `doc/tasks/DATA-POLICY.md`
- `doc/tasks/OPENROUTER-FALLBACK.md`
- `doc/tasks/API-ERROR-CONTRACT.md`
- `doc/tasks/CONTEXT7-USAGE.md`
