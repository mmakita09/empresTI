# Empréstimo de Equipamentos Internos

Sistema web interno para controlar empréstimos de equipamentos.

## Onde olhar

- `docs/prd.md` — define o problema, os usuários e as regras de negócio.
- `docs/adr/` — registra decisões técnicas e seus motivos.
- `rules/restrictions.md` — define os limites de atuação do agente.
- `docs/specs/` — contém spec, plano e tarefas de cada funcionalidade.

## Precedência

Se uma spec e o código discordarem sobre comportamento, a spec vence.

O PRD define o que o negócio precisa. Os ADRs definem decisões técnicas.

Se uma informação não estiver documentada, pergunte. Não invente uma decisão.

## Processo

- Leia `rules/restrictions.md` antes de qualquer tarefa.
- Leia `docs/adr/` antes de propor mudanças estruturais.
- Não contrarie um ADR aceito sem interromper a tarefa e explicar o conflito.
- Antes de implementar, liste os requisitos ambíguos encontrados.
- Uma decisão estrutural nova precisa de ADR antes do código.
- Código de funcionalidade exige uma spec em `docs/specs/`.
- Execute uma tarefa por vez e verifique-a antes de avançar.

## Segurança

- Nunca commite `.env`, senhas, tokens ou URLs com credenciais.
- O repositório contém somente `.env.example`, com valores fictícios.
- Configurações e segredos devem vir de variáveis de ambiente.
- Não revele valores secretos em logs, documentação ou mensagens.

## Estado atual do projeto

O projeto ainda não possui código executável.

Ainda não existem comandos comprovados de execução, teste ou migration. Esta seção será substituída depois que o andar zero estiver implementado e validado.

