# OPENROUTER FALLBACK POLICY (MVP)

## Contexto
Modelos `:free` podem ficar temporariamente indisponiveis ou limitados.

## Politica de Fallback
1. Tentar requisicao no modelo configurado (`OPENROUTER_MODEL_CHAT` / `OPENROUTER_MODEL_EMBED`).
2. Em erro transiente (`429`, `503`, timeout):
   - aplicar retry com backoff (max `OPENROUTER_MAX_RETRIES`).
3. Se retries falharem:
   - chat: tentar `OPENROUTER_FALLBACK_CHAT` (quando definido).
   - embed: tentar `OPENROUTER_FALLBACK_EMBED` (quando definido).
4. Se fallback nao estiver definido ou falhar:
   - retornar erro funcional claro para cliente (`503` com mensagem orientativa).

## Defaults MVP
- `OPENROUTER_MAX_RETRIES=2`
- `OPENROUTER_REQUEST_TIMEOUT_MS=10000`
- Fallbacks opcionais (podem ficar vazios no MVP).

## Observabilidade
- Logar tentativa principal, retries e fallback usado.
- Nao logar prompt completo ou dados sensiveis.
