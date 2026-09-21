---
description: Procedimento para qualquer mudança de schema
globs: ["migrations/**", "app/database.py"]
alwaysApply: false
---

# Mudança de schema

> leitor: agente

## Quando

Ao criar, alterar ou remover tabela, coluna, índice ou constraint.

## Procedimento

1. Mostre o DDL ou a operação Alembic pretendida antes de executar uma mudança destrutiva.
2. Crie uma migration versionada em `migrations/versions/`; uma migration por tarefa.
3. Explique o efeito sobre linhas existentes e como o downgrade funciona.
4. Aplique do zero no PostgreSQL local com Docker Compose.
5. Rode os testes depois da migration.

## Verificação

`docker compose down -v` seguido de `docker compose up --build -d` aplica todas as migrations sem passo manual.

## Não faça

- Não altere schema pelo Supabase Studio ou por SQL avulso.
- Não edite migration que já foi publicada; crie a próxima.
- Não aplique migration no Supabase remoto antes de validá-la localmente.

