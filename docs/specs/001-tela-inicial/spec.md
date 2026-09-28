# Spec 001 — Tela inicial

## Objetivo

Substituir a página técnica de andar zero por uma tela inicial responsiva que
apresente o EmpresTI e deixe claro o escopo já previsto no PRD.

## Vínculo com o PRD

Esta tela apresenta o sistema de empréstimo de equipamentos internos descrito
em `docs/prd.md`. Ela não executa login, catálogo, solicitação ou devolução.

## Regras

- A interface deve estar em português do Brasil.
- A tela precisa funcionar em telas pequenas e grandes.
- As informações visíveis devem se limitar ao problema e às funcionalidades já
  descritas no PRD.
- A tela não deve simular regras ou estados de negócio ainda sem spec.

## Critérios de aceitação

- CA-01: ao abrir `/`, a pessoa vê a identificação do EmpresTI, uma explicação
  curta e os recursos previstos para a primeira versão.
- CA-02: a tela se reorganiza sem corte ou rolagem horizontal em celular.
- CA-03: os elementos de navegação são apenas informativos enquanto as telas e
  fluxos correspondentes não existirem.

## Fora de escopo

- Login e criação de conta.
- Catálogo e disponibilidade de equipamentos.
- Solicitação, devolução e tela de Operações.
- Integração com Supabase Auth ou banco de dados.

## Contrato afetado

- Rota pública `/` do Next.js.
