# API ERROR CONTRACT - CVRAG MVP

## Objetivo
Padronizar respostas de erro para facilitar debug, testes e consumo da API.

## Formato padrao de erro
```json
{
  "ok": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Campo question e obrigatorio.",
    "details": null
  },
  "requestId": "req-123"
}
```

## Campos
- `ok`: sempre `false` em erro.
- `error.code`: codigo estavel para tratamento programatico.
- `error.message`: mensagem clara para humanos.
- `error.details`: contexto tecnico opcional (sem dados sensiveis).
- `requestId`: correlacao de logs.

## Mapeamento minimo (MVP)
- `400` -> `INVALID_INPUT`
- `413` -> `PAYLOAD_TOO_LARGE`
- `415` -> `UNSUPPORTED_FILE_TYPE`
- `429` -> `RATE_LIMITED` (quando exposto ao cliente)
- `500` -> `INTERNAL_ERROR`
- `503` -> `UPSTREAM_UNAVAILABLE`

## Regras
- Nao vazar stack trace em ambiente `production`.
- Nao incluir segredo/chaves em `message` ou `details`.
- Sempre retornar JSON no formato padrao.
