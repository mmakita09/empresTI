---
description: O que precisa passar antes de declarar uma tarefa pronta
globs: []
alwaysApply: true
---

# Verificação de fim de tarefa

> leitor: agente

## Quando

Antes de dizer “pronto”, “implementado” ou “funcionando”.

## Procedimento

1. Rode `docker compose exec -T app npm test`.
2. Rode `docker compose exec -T app npm run lint` e `docker compose exec -T app npm run build`.
3. Se a tarefa tocou no schema, siga `rules/migration.md` e recrie o ambiente antes de afirmar que a migration funciona do zero.
4. Confira `GET /api/health`, `GET /api/trpc/health.check` e a página `/`.
5. Rode `git status --short` e confirme que só aparecem arquivos do escopo.
6. Revise o diff procurando credenciais antes do commit.
7. Diga quais critérios AZ ou CA a tarefa atende.

## Verificação

Os três comandos terminam sem erro, os endpoints respondem e o diff está limitado ao escopo.

## Não faça

- Não rode testes contra o banco remoto.
- Não esconda check que falhou.
- Não tente corrigir repetidamente o mesmo erro sem relatar a causa observada.

