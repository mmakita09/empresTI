# Plano atual de adequação do andar zero

Este plano foi criado em 23/10/2026 para corrigir as lacunas encontradas na auditoria. Ele não representa uma aprovação ou um plano histórico anterior ao código existente.

## Referências

- `docs/andar-zero.md`
- `docs/adr/001-stack.md`
- `rules/checks.md`
- `rules/tests.md`
- `rules/migration.md`

## Tarefas

1. Exibir o resultado de `health.check` em uma página Next.js. Cobre AZ-05.
2. Testar o Route Handler de saúde, verificando status e corpo nos cenários disponível e indisponível. Cobre AZ-02, AZ-04 e AZ-06 no limite do handler.
3. Validar migrations e seed em PostgreSQL local vazio e isolado, sem apagar o volume de desenvolvimento. Cobre AZ-01 e AZ-03.
4. Revisar variáveis de exemplo, arquivos ignorados e diff sem ler valores reais. Cobre AZ-07 e AZ-08.
5. Executar testes, lint, build e as rotas documentadas. Revalida AZ-01 a AZ-08 sem ampliar seu significado.

O plano não substitui testes de integração do produto nem autoriza migrations de domínio.
