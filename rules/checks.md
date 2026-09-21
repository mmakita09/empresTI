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

1. Rode `.venv/Scripts/python -m pytest`.
2. Se a tarefa tocou em migration, recrie o ambiente com `docker compose down -v` e `docker compose up --build -d`.
3. Confira `GET /health` e a página `/`.
4. Rode `git status --short` e confirme que só aparecem arquivos do escopo.
5. Faça uma busca por segredos antes do commit.
6. Diga quais critérios AZ ou CA a tarefa atende.

## Verificação

Pronto significa testes passando, aplicação respondendo e diff limitado ao escopo.

## Não faça

- Não rode testes contra o banco remoto.
- Não esconda check que falhou.
- Não tente corrigir repetidamente o mesmo erro sem relatar a causa observada.

