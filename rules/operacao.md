---
description: Contrato de operação entre usuário e agente neste projeto
globs: []
alwaysApply: true
---

# Contrato de operação

## Quando

Em toda tarefa que altere arquivos ou produza um commit.

## Procedimento

## Git

> leitor: agente

- O agente pode criar commits pequenos e verificáveis dentro da tarefa solicitada.
- Push exige pedido explícito do usuário.
- Mensagens de commit descrevem uma fase ou tarefa verificável.
- Mudança de regra e código de aplicação ficam em commits separados.

## Autorização por tipo de ação

> leitor: agente

| Ação | Nível |
|---|---|
| Editar arquivo existente dentro do escopo | livre |
| Criar arquivo necessário à tarefa | livre |
| Deletar ou renomear arquivo | pedir antes |
| Instalar ou atualizar dependência | pedir antes |
| Criar ou alterar migration | pedir antes |
| Alterar variável, deploy ou projeto remoto | pedir antes |

## Configuração do operador

> leitor: humano — não é instrução para o agente

- Spec, plano e depuração exigem raciocínio alto.
- Tarefa já decidida pode usar execução rápida, desde que os checks permaneçam iguais.
- Revisão do diff deve acontecer antes de cada push.

## Verificação

Antes de commit, `git status --short` mostra somente arquivos do escopo e o diff foi revisado. Antes de push, existe pedido explícito do usuário na tarefa atual.

## Não faça

- Não faça push por ser uma consequência automática do commit.
- Não agrupe tarefa de produto e alteração de regra no mesmo commit.
- Não altere configuração remota ou segredo sem autorização explícita.

