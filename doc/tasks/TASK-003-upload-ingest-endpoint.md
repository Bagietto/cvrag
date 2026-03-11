# TASK-003 - Endpoint de Upload para Ingestao

## Meta
- **ID**: `TASK-003`
- **Status**: `todo`
- **Prioridade**: `P0`
- **Dependencias**: `[TASK-001, TASK-002]`

## Contexto
A ingestao do CV sera via upload de arquivo (`PDF`, `MD`, `DOCX`) com isolamento por perfil.

## Objetivo
Criar `POST /ingest` com multipart/form-data, `profileId` obrigatorio e validacao basica de tipo/tamanho.

## Escopo
- Configurar parser multipart no Fastify.
- Receber campos `file` e `profileId`.
- Validar `profileId`, extensao/MIME e tamanho.

## Fora de escopo
- Processamento completo de conteudo.

## Entregaveis
- Rota `POST /ingest` aceitando upload por perfil.

## Criterios de aceite
- [ ] Upload valido com `profileId` retorna `200`.
- [ ] Sem campo `file` retorna `400`.
- [ ] Sem `profileId` retorna `400`.
- [ ] Tipo nao suportado retorna `415`.
- [ ] Tamanho acima de `MAX_UPLOAD_MB` retorna `413`.

## Plano tecnico
1. Adicionar plugin de multipart.
2. Implementar validadores de `file` e `profileId`.
3. Retornar payload padrao com `profileId`.

## Riscos
- Inconsistencia entre MIME e extensao.

## Validacao
- Testar upload com PDF/MD/DOCX e formatos invalidos.

## Contexto Obrigatorio
- Ler `doc/tasks/STACK-BASELINE.md`.
- Ler `doc/tasks/ENV-CONTRACT.md`.
- Cumprir `doc/tasks/DOD.md` para fechar a task.

## Contrato Tecnico da Rota
- Metodo/rota: `POST /ingest`
- Content-Type: `multipart/form-data`
- Campos obrigatorios: `file`, `profileId`
- Tipos aceitos: `.pdf`, `.md`, `.docx`
- Erros esperados:
  - `400` para ausencia de `file` ou `profileId`
  - `413` para tamanho excedido (`MAX_UPLOAD_MB`)
  - `415` para tipo nao suportado

## Refinamento de Aceite (Mensuravel)
- Upload valido retorna `200` em <= `2s` para arquivo ate `2MB`.
- Payload minimo: `{ "ok": true, "profileId": "...", "filename": "..." }`.
- Mensagens de erro padronizadas em JSON.

## Evidencias Obrigatorias
- 1 teste para upload valido com `profileId`.
- 1 teste para ausencia de `profileId` (`400`).
- 1 teste para tipo invalido (`415`).
- 1 teste para arquivo sem campo `file` (`400`).

## Politica de dados (MVP)
- Seguir `doc/tasks/DATA-POLICY.md`.
- Arquivo bruto nao deve ser persistido apos parse bem-sucedido.

## Contrato de erro aplicado
- Seguir `doc/tasks/API-ERROR-CONTRACT.md` para todos os erros da rota.

## Referencias Complementares
- `doc/tasks/EVAL-RUBRIC.md`
- `doc/tasks/DATA-POLICY.md`
- `doc/tasks/OPENROUTER-FALLBACK.md`
- `doc/tasks/API-ERROR-CONTRACT.md`
- `doc/tasks/CONTEXT7-USAGE.md`
