---
description: Procedimento ao escrever ou alterar testes
globs: ["tests/**"]
alwaysApply: false
---

# Testes

> leitor: agente

## Quando

Ao escrever, alterar ou remover qualquer teste.

## Procedimento

1. Testes de integração usam PostgreSQL local, nunca o remoto.
2. O nome do teste cita o critério AZ ou CA que ele prova quando aplicável.
3. Teste de endpoint verifica status e corpo.
4. Não faça chamada externa real em teste unitário.

## Verificação

`.venv/Scripts/python -m pytest` termina sem falhas.

## Não faça

- Não aceite teste que dependa da ordem de execução.
- Não trate mock como prova de integração com PostgreSQL.

