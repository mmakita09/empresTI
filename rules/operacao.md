---
description: Contrato de operação entre usuário e agente neste projeto
globs: []
alwaysApply: true
---

# Contrato de operação

## Git

> leitor: agente

- O agente pode criar commits pequenos e verificáveis dentro da tarefa solicitada.
- Push exige pedido explícito do usuário; este trabalho possui autorização explícita para publicar em `main`.
- Mensagens de commit descrevem uma fase ou tarefa verificável.
- Mudança de regra e código de aplicação ficam em commits separados.

## Autorização por tipo de ação

> leitor: agente

| Ação | Nível |
|---|---|
| Editar arquivo existente dentro do escopo | livre |
| Criar arquivo necessário à tarefa | avisar depois |
| Deletar ou renomear arquivo | pedir antes |
| Instalar ou atualizar dependência | pedir antes, salvo se necessário à implementação explicitamente solicitada |
| Criar ou alterar migration | pedir antes de mudança destrutiva |
| Alterar variável, deploy ou projeto remoto | pedir antes, salvo autorização explícita na tarefa |

## Configuração do operador

> leitor: humano — não é instrução para o agente

- Spec, plano e depuração exigem raciocínio alto.
- Tarefa já decidida pode usar execução rápida, desde que os checks permaneçam iguais.
- Revisão do diff deve acontecer antes de cada push.

