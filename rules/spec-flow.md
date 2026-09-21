---
description: Procedimento para iniciar funcionalidade nova do PRD
globs: ["docs/specs/**"]
alwaysApply: false
---

# Fluxo de funcionalidade

> leitor: agente

## Quando

Ao iniciar qualquer funcionalidade nova do PRD.

## Procedimento

1. Crie `docs/specs/<NNN-nome-curto>/spec.md`.
2. Liste perguntas que o PRD não responde e espere as respostas.
3. Escreva `plan.md` a partir da spec e cite os ADRs que o restringem.
4. Escreva `tasks.md` a partir do plano; cada tarefa cita um CA e cabe em um commit.
5. Execute uma tarefa por vez e siga `rules/checks.md` ao concluir.

## Não faça

- Não escreva código antes do plano aprovado.
- Não crie pasta de spec fora do padrão `NNN-nome-curto`.

