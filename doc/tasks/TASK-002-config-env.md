# TASK-002 - Configuracao e Variaveis de Ambiente

## Meta
- **ID**: `TASK-002`
- **Status**: `todo`
- **Prioridade**: `P0`
- **Dependencias**: `[TASK-001]`

## Contexto
O MVP depende de chaves e parametros configuraveis (OpenRouter, Chroma, limites de chunking).

## Objetivo
Centralizar config e validar env vars na inicializacao.

## Escopo
- Criar `.env.example`.
- Criar `src/shared/config.js` com validacao.
- Expor configs para modulos.

## Fora de escopo
- Secrets manager em cloud.

## Entregaveis
- Config loader com erro claro para variaveis faltantes.

## Criterios de aceite
- [ ] App falha com mensagem clara sem `OPENROUTER_API_KEY`.
- [ ] App sobe com `.env` valido.

## Plano tecnico
1. Definir chaves minimas.
2. Implementar validacao.
3. Documentar no README.

## Riscos
- Ambientes inconsistentes dev/prod.

## Validacao
- Testes manuais com e sem variaveis obrigatorias.

## Contexto Obrigatorio
- Ler `doc/tasks/STACK-BASELINE.md`.
- Ler `doc/tasks/ENV-CONTRACT.md`.
- Cumprir `doc/tasks/DOD.md` para fechar a task.

## Refinamento de Aceite (Mensuravel)
- Sem `OPENROUTER_API_KEY`: bootstrap falha com status de processo != 0 e mensagem clara.
- Com `.env` valido: bootstrap concluido sem warnings criticos.
- Variaveis opcionais usam default documentado em `ENV-CONTRACT.md`.

## Evidencias Obrigatorias
- Execucao sem chave obrigatoria e mensagem capturada.
- Execucao com `.env` valido.
- Trecho atualizado de `.env.example`.


## Referencias Complementares
- `doc/tasks/EVAL-RUBRIC.md`
- `doc/tasks/DATA-POLICY.md`
- `doc/tasks/OPENROUTER-FALLBACK.md`

- `doc/tasks/API-ERROR-CONTRACT.md`
- `doc/tasks/CONTEXT7-USAGE.md`

