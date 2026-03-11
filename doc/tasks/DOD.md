# Definition of Done (DoD) - CVRAG MVP

Uma task so pode ser marcada como `done` quando:

1. Criterios de aceite da task foram comprovados.
2. Codigo compila/executa sem erro no fluxo alterado.
3. Logs de erro sao claros e sem dados sensiveis.
4. Configuracoes novas foram documentadas em `.env.example` e `README`.
5. Testes relevantes foram adicionados/atualizados.
6. Sem regressao nos testes existentes.
7. Arquitetura/decisoes alteradas foram refletidas em `doc/CVRAG.md` quando aplicavel.
8. Referencias de bibliotecas externas foram verificadas via `doc/tasks/CONTEXT7-USAGE.md` quando aplicavel.
9. Contrato de erros segue `doc/tasks/API-ERROR-CONTRACT.md` nas rotas alteradas.

## Evidencias minimas por task
- Comando(s) executado(s).
- Resultado dos testes relevantes.
- Exemplo de request/response se houver endpoint.
- Referencias de documentacao consultadas via Context7 quando aplicavel.
