# TASK-007 - Cliente OpenRouter (Embeddings e Geracao)

## Meta
- **ID**: `TASK-007`
- **Status**: `todo`
- **Prioridade**: `P0`
- **Dependencias**: `[TASK-002]`

## Contexto
OpenRouter e o provider principal para embeddings/LLM.

## Objetivo
Criar cliente unico para chamadas ao OpenRouter com tratamento de erro e timeout.

## Escopo
- `embedder.js` para embeddings.
- `openrouter-client.js` para completion/chat.
- Config de modelo por env.

## Fora de escopo
- Fallback multi-provider (entre vendors distintos).

## Entregaveis
- SDK interno reutilizavel.

## Criterios de aceite
- [ ] Gera embedding de texto simples.
- [ ] Gera resposta com prompt de teste.
- [ ] Erros de rate limit sao tratados com mensagem clara.

## Plano tecnico
1. Definir contratos de entrada/saida.
2. Implementar cliente HTTP.
3. Adicionar retries basicos.

## Riscos
- Variacao de latencia por modelo.

## Validacao
- Testes de smoke com chave valida.

## Contexto Obrigatorio
- Ler `doc/tasks/STACK-BASELINE.md`.
- Ler `doc/tasks/ENV-CONTRACT.md`.
- Cumprir `doc/tasks/DOD.md` para fechar a task.

## Refinamento de Aceite (Mensuravel)
- Embedding de texto curto retorna vetor numerico nao vazio.
- Geracao de resposta retorna texto nao vazio.
- Timeout configuravel respeitado (ex.: `10s`).
- Erro `429` (rate limit) tratado com mensagem funcional clara.

## Evidencias Obrigatorias
- Teste de smoke para embeddings.
- Teste de smoke para chat/completion.
- Simulacao de erro (mock) para `429`.

## Regras de Fallback do MVP
- Seguir doc/tasks/OPENROUTER-FALLBACK.md.
- Implementar retry para 429, 503 e timeout.
- Suportar fallback opcional por env (OPENROUTER_FALLBACK_CHAT, OPENROUTER_FALLBACK_EMBED).



## Referencias Complementares
- `doc/tasks/EVAL-RUBRIC.md`
- `doc/tasks/DATA-POLICY.md`
- `doc/tasks/OPENROUTER-FALLBACK.md`

- `doc/tasks/API-ERROR-CONTRACT.md`
- `doc/tasks/CONTEXT7-USAGE.md`

