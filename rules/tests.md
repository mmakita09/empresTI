---
description: Procedimento ao escrever ou alterar testes
globs: ["tests/**", "vitest.config.ts"]
alwaysApply: false
---

# Testes

> leitor: agente

## Quando

Ao escrever, alterar ou remover qualquer teste.

## Procedimento

1. Testes unitários não fazem chamada externa real nem acessam banco remoto.
2. Testes de integração usam o PostgreSQL local iniciado pelo Docker Compose.
3. O nome do teste cita o critério AZ ou CA que ele prova quando aplicável.
4. Teste de Route Handler verifica status e corpo; teste tRPC usa `createCaller` quando não for necessário subir HTTP.
5. Alteração de política de acesso exige teste que prove o bloqueio esperado.

## Verificação

`docker compose exec -T app npm test` termina sem falhas.

## Não faça

- Não aceite teste que dependa da ordem de execução.
- Não trate mock como prova de integração com PostgreSQL.
