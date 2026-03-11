# CONTEXT7 USAGE - CVRAG MVP

## Objetivo
Usar referencias atualizadas para evitar implementacao com APIs obsoletas.

## Quando usar
- Antes de iniciar cada task que envolva biblioteca externa.
- Ao definir assinatura de metodos/classes.
- Ao ajustar codigo por erro de versao/compatibilidade.

## Escopo minimo por task
1. Consultar documentacao oficial via Context7 para libs tocadas na task.
2. Confirmar versao/API usada no codigo.
3. Registrar nas evidencias da task quais docs foram consultadas.

## Regras
- Priorizar fontes oficiais (docs do projeto, repositorio oficial).
- Em conflito entre exemplos antigos e docs atuais, seguir docs atuais.
- Atualizar `STACK-BASELINE.md` se houver mudanca de versao/lib.
