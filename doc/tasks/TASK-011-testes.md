# TASK-011 - Testes Unitarios e de Integracao

## Meta
- **ID**: `TASK-011`
- **Status**: `todo`
- **Prioridade**: `P1`
- **Dependencias**: `[TASK-008, TASK-009, TASK-010]`

## Contexto
Precisamos garantir estabilidade do MVP e isolamento entre perfis.

## Objetivo
Cobrir componentes criticos (chunking, parsers, endpoints principais e isolamento por `profileId`).

## Escopo
- Unitarios: normalizacao/chunking/prompt.
- Integracao: `/ingest` e `/ask`.
- Testes de nao mistura entre dois perfis.

## Fora de escopo
- Testes de carga.

## Entregaveis
- Suite de testes com Vitest.

## Criterios de aceite
- [ ] Testes unitarios passando.
- [ ] Testes de integracao principais passando.
- [ ] Teste de isolamento por `profileId` passando.

## Plano tecnico
1. Configurar runner.
2. Criar fixtures de CV.
3. Cobrir cenarios de erro e isolamento.

## Riscos
- Flakiness em testes com chamadas externas.

## Validacao
- Executar `npm test` em ambiente limpo.

## Contexto Obrigatorio
- Ler `doc/tasks/STACK-BASELINE.md`.
- Ler `doc/tasks/ENV-CONTRACT.md`.
- Cumprir `doc/tasks/DOD.md` para fechar a task.

## Refinamento de Aceite (Mensuravel)
- Cobertura minima por arquivo critico: `>= 80%` (unitario) em chunking/config.
- Testes de integracao para `/ingest` e `/ask` passando.
- Pelo menos 1 teste automatizado com 2 perfis comprovando isolamento.
- Pipeline de testes executa em <= `60s` local.

## Evidencias Obrigatorias
- Saida do `npm test`.
- Relatorio resumido de cobertura.
- Lista de cenarios cobertos.
- Evidencia do teste de isolamento por perfil.

## Referencias Complementares
- `doc/tasks/EVAL-RUBRIC.md`
- `doc/tasks/DATA-POLICY.md`
- `doc/tasks/OPENROUTER-FALLBACK.md`
- `doc/tasks/API-ERROR-CONTRACT.md`
- `doc/tasks/CONTEXT7-USAGE.md`
