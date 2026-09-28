---
description: Procedimento para variáveis de ambiente e segredos
globs: ["**/.env*", "src/env.ts", "prisma.config.ts", "docker-compose.yml"]
alwaysApply: false
---

# Variáveis de ambiente e segredos

> leitor: agente

## Quando

Ao criar ou usar variável de ambiente ou código de configuração.

## Procedimento

1. Mantenha o valor real somente no ambiente local ignorado, no CI ou no painel da Vercel.
2. Registre o nome em `.env.example` usando valor fictício.
3. URLs com senha, `DATABASE_URL`, `MIGRATION_DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, tokens e chaves são secretos.
4. Somente variáveis com prefixo `NEXT_PUBLIC_` podem chegar ao navegador; `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` são públicas por design. Credenciais do banco e `service_role` nunca chegam ao cliente.
5. Ao criar variável, informe onde ela precisa ser configurada manualmente.

## Verificação

`.env.example` contém todos os nomes usados pelo código e `git diff --cached` não contém valores reais.

## Não faça

- Não escreva segredo em resposta, commit, log ou comentário.
- Não versione `.env`.
- Não exponha `SUPABASE_SERVICE_ROLE_KEY`, URL do banco ou segredo de observabilidade em código de cliente.

