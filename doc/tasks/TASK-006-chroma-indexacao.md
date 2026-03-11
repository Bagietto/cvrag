# TASK-006 - Integracao com Chroma (Indexacao)

## Meta
- **ID**: `TASK-006`
- **Status**: `todo`
- **Prioridade**: `P0`
- **Dependencias**: `[TASK-005]`

## Contexto
Chroma sera o vector store do MVP com isolamento por `profileId`.

## Objetivo
Persistir embeddings dos chunks com metadado de perfil e permitir consultas por similaridade com filtro por `profileId`.

## Escopo
- Cliente Chroma.
- Criacao/uso de collection.
- Upsert de documentos e metadados (`profileId`, `chunkId`, `source`).
- Busca com filtro estrito por `profileId`.

## Fora de escopo
- Migracao para vector store cloud.

## Entregaveis
- `chroma-client.js` e `upsert-chunks.js` com filtro por perfil.

## Criterios de aceite
- [ ] Chunks sao persistidos com `profileId` na collection.
- [ ] Consulta por embedding respeita filtro `profileId`.

## Plano tecnico
1. Configurar conexao via `CHROMA_URL` (Docker local) e collection.
2. Implementar upsert idempotente por `profileId + chunkId`.
3. Expor search utilitario com filtro por `profileId`.

## Riscos
- Falha no filtro pode misturar resultados entre perfis.

## Validacao
- Ingerir e consultar dados de teste com 2 perfis.

## Contexto Obrigatorio
- Ler `doc/tasks/STACK-BASELINE.md`.
- Ler `doc/tasks/ENV-CONTRACT.md`.
- Cumprir `doc/tasks/DOD.md` para fechar a task.

## Refinamento de Aceite (Mensuravel)
- Upsert de N chunks retorna sucesso sem duplicacao quando reexecutado para o mesmo `profileId`.
- Consulta top-k (`k=5`) retorna ate 5 resultados ordenados por score e todos com `profileId` esperado.
- Collection definida por `CHROMA_COLLECTION` e criada automaticamente se ausente.

## Evidencias Obrigatorias
- Execucao de ingestao dupla (idempotencia) para um mesmo perfil.
- Exemplo de query com retorno top-k filtrado por perfil.
- Prova de nao mistura entre 2 perfis.
- Log de criacao/uso de collection.

## Referencias Complementares
- `doc/tasks/EVAL-RUBRIC.md`
- `doc/tasks/DATA-POLICY.md`
- `doc/tasks/OPENROUTER-FALLBACK.md`
- `doc/tasks/API-ERROR-CONTRACT.md`
- `doc/tasks/CONTEXT7-USAGE.md`
