---
description: Procedimento para variáveis de ambiente e segredos
globs: ["**/.env*", "app/config.py", "docker-compose.yml"]
alwaysApply: false
---

# Variáveis de ambiente e segredos

> leitor: agente

## Quando

Ao criar ou usar variável de ambiente ou código de configuração.

## Procedimento

1. Mantenha o valor real somente no ambiente local ignorado, no CI ou no painel da Vercel.
2. Registre o nome em `.env.example` usando valor fictício.
3. URLs com senha, `SESSION_SECRET`, tokens e chaves são secretos.
4. Código enviado ao navegador não recebe credenciais do banco.
5. Ao criar variável, informe onde ela precisa ser configurada manualmente.

## Verificação

`.env.example` contém todos os nomes usados pelo código e `git diff --cached` não contém valores reais.

## Não faça

- Não escreva segredo em resposta, commit, log ou comentário.
- Não versione `.env`.
- Não adicione chaves Supabase ao front: o ADR determina acesso ao banco pelo backend.

