---
description: Procedimento para encerrar uma tarefa ou sessão
globs: []
alwaysApply: false
---

# Handoff

> leitor: agente

## Quando

Ao terminar uma tarefa do plano, quando a sessão ficar longa ou quando o usuário disser “vamos fechar”.

## Procedimento

Sobrescreva `handoff.md` na raiz, com no máximo 25 linhas:

1. tarefa e critério em andamento;
2. branch e commits concluídos;
3. estado do banco local e migrations;
4. estado do deploy;
5. verificações executadas e seus resultados;
6. o que não fazer na próxima sessão;
7. próximo passo em uma frase imperativa.

## Verificação

Uma sessão nova continua lendo apenas `handoff.md`, a spec atual e os artefatos apontados por ela.

