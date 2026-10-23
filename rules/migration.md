---
description: Procedimento para qualquer mudança de schema
globs: ["prisma/schema.prisma", "prisma/migrations/**"]
alwaysApply: false
---

# Mudança de schema

> leitor: agente

## Quando

Ao criar, alterar ou remover tabela, coluna, índice ou constraint.

## Procedimento

1. Mostre o DDL ou a operação Prisma pretendida antes de criar qualquer migration e espere aprovação explícita.
2. Para toda nova tabela de domínio, mostre também como `tenant_id`, RLS e policies serão tratados.
3. Crie uma migration versionada em `prisma/migrations/`; uma migration por tarefa.
4. Explique o efeito sobre linhas existentes e como o downgrade funciona.
5. Aplique do zero no PostgreSQL local com Docker Compose.
6. Rode os testes depois da migration, incluindo isolamento de tenant quando a policy mudar.

## Verificação

`docker compose up --build -d` aplica as migrations com `prisma migrate deploy` sem passo manual.

## Não faça

- Não altere schema pelo Supabase Studio ou por SQL avulso.
- Não edite migration que já foi publicada; crie a próxima.
- Não aplique migration no Supabase remoto antes de validá-la localmente.
