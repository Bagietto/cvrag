# DATA POLICY - Upload e Privacidade (MVP)

## Politica de Retencao (MVP)
- Arquivo enviado no `POST /ingest` sera usado apenas para processamento.
- Padrao MVP: **nao persistir arquivo bruto** apos parse bem-sucedido.
- Persistencia de texto/chunks/index vetorial: permitida para funcionamento do RAG.

## Excecoes de Retencao
- Em caso de erro de parser, reter somente metadados tecnicos minimos para debug:
  - nome do arquivo
  - extensao
  - tamanho
  - codigo de erro
- Nao registrar conteudo integral do CV em log.

## Logging Seguro
- Nao logar:
  - API keys
  - conteudo completo do CV
  - payload sensivel integral
- Logar apenas:
  - `requestId`
  - rota
  - status
  - duracao
  - contadores (ex.: `chunksIndexed`)

## Configuracao Futura (opcional)
- Se for necessario armazenar arquivo bruto para auditoria, usar flag explicita por env e documentar impacto de privacidade.

## Isolamento por profileId
- Cada documento ingerido deve ser associado a um profileId.
- Retrieval deve ser filtrado estritamente pelo profileId informado na consulta.
- Nao pode haver mistura de contexto entre perfis diferentes.

