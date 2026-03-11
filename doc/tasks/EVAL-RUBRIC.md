# EVAL RUBRIC - MVP (20 perguntas)

## Objetivo
Padronizar a avaliacao do MVP para evitar analise subjetiva.

## Amostra
- Total: `20` perguntas reais sobre o CV.
- Distribuicao sugerida:
  - 5 sobre experiencia profissional
  - 5 sobre projetos
  - 4 sobre tecnologias/habilidades
  - 3 sobre formacao/certificacoes
  - 3 sobre resumo de perfil

## Criterio de Correcao da Resposta
Uma resposta e considerada **correta** quando:
1. Responde o que foi perguntado sem fugir do tema.
2. Nao contradiz o conteudo do CV indexado.
3. Nao inventa fatos nao suportados pelos chunks recuperados.

## Criterio de Relevancia da Citacao
Uma citacao e considerada **relevante** quando:
1. O snippet suporta diretamente a afirmacao principal da resposta.
2. O snippet pertence ao documento ingerido.
3. O trecho e especifico o suficiente para auditoria humana.

## Scorecard
- `accuracy_score = respostas_corretas / 20`
- `citation_score = respostas_com_citacoes_relevantes / 20`

## Baseline de Aprovacao
- `accuracy_score >= 0.80` (>= 16/20)
- `citation_score >= 0.80` (>= 16/20)

## Evidencias
- Planilha/arquivo com 20 perguntas e classificacao por pergunta.
- Para cada pergunta: `correta?`, `citacao_relevante?`, observacao curta.

## Template Oficial de Avaliacao
- Arquivo: `doc/tasks/EVAL-SHEET-TEMPLATE.csv`
- Campos:
  - `id`
  - `categoria`
  - `pergunta`
  - `resposta`
  - `correta` (`sim`/`nao`)
  - `citacao_relevante` (`sim`/`nao`)
  - `observacao`
