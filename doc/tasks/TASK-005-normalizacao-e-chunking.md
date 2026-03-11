# TASK-005 - Normalizacao e Chunking

## Meta
- **ID**: `TASK-005`
- **Status**: `todo`
- **Prioridade**: `P0`
- **Dependencias**: `[TASK-004]`

## Contexto
RAG depende de chunks de boa qualidade para recuperar contexto relevante.

## Objetivo
Normalizar texto e gerar chunks com sobreposicao configuravel.

## Escopo
- Limpeza de whitespace/quebras.
- Chunking por tamanho e overlap.
- Metadados por chunk (origem, indice).

## Fora de escopo
- Reranking avancado.

## Entregaveis
- Modulos `normalize-text.js` e `chunk-text.js`.

## Criterios de aceite
- [ ] Chunks respeitam tamanho maximo configurado.
- [ ] Overlap aplicado corretamente.

## Plano tecnico
1. Definir estrategia de split.
2. Implementar configuracao.
3. Gerar IDs estaveis de chunk.

## Riscos
- Chunk grande demais prejudicar relevancia.

## Validacao
- Testes unitarios de limites e overlap.

## Contexto Obrigatorio
- Ler `doc/tasks/STACK-BASELINE.md`.
- Ler `doc/tasks/ENV-CONTRACT.md`.
- Cumprir `doc/tasks/DOD.md` para fechar a task.

## Refinamento de Aceite (Mensuravel)
- Nenhum chunk excede `CHUNK_SIZE`.
- Overlap efetivo entre chunks consecutivos igual a `CHUNK_OVERLAP` (+/- 10%).
- IDs de chunk estaveis para mesma entrada (execucoes repetidas).

## Evidencias Obrigatorias
- Teste unitario de limite de tamanho.
- Teste unitario de overlap.
- Teste unitario de estabilidade de ID.


## Referencias Complementares
- `doc/tasks/EVAL-RUBRIC.md`
- `doc/tasks/DATA-POLICY.md`
- `doc/tasks/OPENROUTER-FALLBACK.md`

- `doc/tasks/API-ERROR-CONTRACT.md`
- `doc/tasks/CONTEXT7-USAGE.md`

