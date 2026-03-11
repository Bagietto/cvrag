# TASK-012 - Observabilidade e Documentacao Operacional

## Meta
- **ID**: `TASK-012`
- **Status**: `todo`
- **Prioridade**: `P2`
- **Dependencias**: `[TASK-011]`

## Contexto
Para manter e evoluir o projeto, precisamos de logs claros e docs de execucao.

## Objetivo
Adicionar logging estruturado e atualizar README com runbook do MVP.

## Escopo
- Logs de ingestao e ask (inicio/fim/erro).
- README com setup, `.env`, comandos e exemplos de chamada.

## Fora de escopo
- Observabilidade com stack externa (ELK, Datadog, etc).

## Entregaveis
- Logger basico + guia operacional.

## Criterios de aceite
- [ ] Fluxos criticos possuem logs.
- [ ] README permite subir e testar API do zero.

## Plano tecnico
1. Definir padrao de log.
2. Instrumentar pontos criticos.
3. Escrever documentacao final.

## Riscos
- Logs excessivos com dados sensiveis.

## Validacao
- Revisao manual de logs e passo a passo do README.

## Contexto Obrigatorio
- Ler `doc/tasks/STACK-BASELINE.md`.
- Ler `doc/tasks/ENV-CONTRACT.md`.
- Cumprir `doc/tasks/DOD.md` para fechar a task.

## Refinamento de Aceite (Mensuravel)
- Logs incluem `requestId`, rota, duracao e status final.
- Erros nao vazam segredo/chaves.
- README contem:
  - setup
  - `.env`
  - execucao
  - exemplos `curl` para `/ingest` e `/ask`

## Evidencias Obrigatorias
- Exemplo real de log de sucesso e erro.
- Trechos do README com comandos validados.


## Referencias Complementares
- `doc/tasks/EVAL-RUBRIC.md`
- `doc/tasks/DATA-POLICY.md`
- `doc/tasks/OPENROUTER-FALLBACK.md`

- `doc/tasks/API-ERROR-CONTRACT.md`
- `doc/tasks/CONTEXT7-USAGE.md`

