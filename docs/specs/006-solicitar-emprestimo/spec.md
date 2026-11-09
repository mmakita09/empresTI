# Spec 006 — Solicitar empréstimo

## Estado

Rascunho para aprovação antes da migration e do código.

## Objetivo

Permitir que um colaborador autenticado solicite imediatamente um equipamento
disponível e veja seus empréstimos em aberto.

## Critérios de aceitação

- CA-01: o catálogo exibe os 12 equipamentos com imagem, nome, categoria e
  situação.
- CA-02: somente equipamento disponível apresenta ação de solicitar.
- CA-03: solicitar cria o empréstimo na hora, grava vencimento em 14 dias úteis
  e torna o equipamento indisponível.
- CA-04: colaborador com cinco empréstimos em aberto recebe recusa explicada.
- CA-05: colaborador com empréstimo atrasado recebe recusa explicada.
- CA-06: manutenção e empréstimo ativo impedem nova solicitação.
- CA-07: duas solicitações concorrentes para o mesmo equipamento criam no
  máximo um empréstimo.
- CA-08: a pessoa vê apenas seus empréstimos abertos e as datas previstas.

## Fora de escopo

Devolução, Operações, reserva futura, e-mail e renovação.

## Decisões adotadas do briefing

Solicitação imediata, sem aprovação; prazo em dias úteis; limite de cinco
empréstimos em aberto.
