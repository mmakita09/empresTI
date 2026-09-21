---
description: Limites permanentes de autoridade, escopo, ritmo e produção
globs: []
alwaysApply: true
---

# Restrições de atuação

> leitor: agente

## Autoridade

- Não escreva nem altere ADRs por conta própria. Quando uma decisão nova for necessária, descreva o contexto, as alternativas e as consequências, e pare para o time decidir.
- Não contrarie decisões aceitas em `docs/adr/`. Se houver conflito, explique-o e pare.
- Não responda por conta própria perguntas de negócio deixadas em aberto pelo PRD ou por uma spec.
- Não escolha bibliotecas ou serviços que não estejam autorizados pelo ADR vigente.

## Escopo

- Altere somente arquivos necessários para a tarefa atual.
- Não implemente funcionalidades de produto sem uma spec aprovada em `docs/specs/`.
- Não crie uma estrutura nova de pastas sem registrá-la no plano ou ADR correspondente.
- Execute uma tarefa por vez e relate quais critérios foram atendidos.

## Ritmo

- Não escreva código de funcionalidade antes de uma spec e um plano aprovados.
- Uma autorização para implementar vale apenas para o escopo explicitamente pedido.
- Não relate sucesso parcial como conclusão.

## Segurança

- Nunca leia, copie, registre ou commite valores reais de `.env`, senhas, tokens ou chaves.
- Nunca invente credenciais.
- O repositório recebe somente `.env.example`, com nomes e valores fictícios.
- Antes de um commit, confirme que nenhum segredo entrou no diff.

## Produção

- Push em `main`, deploy e alteração de configuração remota exigem pedido explícito do usuário.
- Não execute SQL manual nem altere schema pelo painel remoto do Supabase.
- Toda mudança de schema nasce em migration versionada e é verificada localmente antes de chegar ao remoto.

## Verificação

- Não declare uma tarefa concluída sem executar a verificação prevista.
- Sucesso parcial deve ser informado como parcial.
- Se uma verificação não puder ser executada, informe o impedimento; não presuma que passou.

## Precedência

- Se o código e uma spec discordarem sobre comportamento, a spec prevalece até ser alterada pelo time.
- Se uma regra de procedimento contrariar um ADR ou uma spec, pare e informe o conflito.
- Autorização genérica não revoga limites de segurança ou de escopo deste arquivo.

