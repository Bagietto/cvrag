# TASK-004 - Parsers para PDF, MD e DOCX

## Meta
- **ID**: `TASK-004`
- **Status**: `todo`
- **Prioridade**: `P0`
- **Dependencias**: `[TASK-003]`

## Contexto
Cada formato de CV exige extracao diferente.

## Objetivo
Implementar extracao de texto por tipo de arquivo com interface unica.

## Escopo
- `pdf.parser.js`
- `md.parser.js`
- `docx.parser.js`
- `extract-text.js` (dispatcher)

## Fora de escopo
- OCR para PDFs escaneados.

## Entregaveis
- Texto extraido padronizado por parser.

## Criterios de aceite
- [ ] Extrai texto de amostras reais dos 3 formatos.
- [ ] Falha com mensagem clara para formato nao suportado.

## Plano tecnico
1. Escolher libs de parsing.
2. Implementar adaptadores.
3. Padronizar retorno.

## Riscos
- Qualidade de extracao em PDF complexo.

## Validacao
- Fixtures de arquivo para cada formato.

## Contexto Obrigatorio
- Ler `doc/tasks/STACK-BASELINE.md`.
- Ler `doc/tasks/ENV-CONTRACT.md`.
- Cumprir `doc/tasks/DOD.md` para fechar a task.

## Refinamento de Aceite (Mensuravel)
- PDF de exemplo: extracao retorna texto nao vazio com >= `200` caracteres.
- DOCX de exemplo: extracao retorna texto nao vazio com >= `200` caracteres.
- MD de exemplo: extracao preserva titulos e sessoes principais.
- Formato nao suportado retorna erro funcional padrao.

## Evidencias Obrigatorias
- Fixtures de `pdf`, `docx`, `md` em testes.
- Saida resumida de cada parser (tamanho de texto).
- Caso de erro para formato invalido.

## Estrategia de parser fechada (MVP)
- PDF: extracao por pagina + limpeza de quebra de linha/hifenizacao.
- MD: leitura direta preservando headings e secoes.
- DOCX: extracao de paragrafos + normalizacao de whitespace.



## Referencias Complementares
- `doc/tasks/EVAL-RUBRIC.md`
- `doc/tasks/DATA-POLICY.md`
- `doc/tasks/OPENROUTER-FALLBACK.md`

- `doc/tasks/API-ERROR-CONTRACT.md`
- `doc/tasks/CONTEXT7-USAGE.md`

