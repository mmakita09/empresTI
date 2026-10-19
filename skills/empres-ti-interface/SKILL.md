---
name: empres-ti-interface
description: Cria ou revisa telas e componentes React do EmpresTI. Use quando o pedido envolver interface, layout responsivo, acessibilidade ou revisão visual de páginas em src/app. Não use para definir regras de empréstimo, autenticação, schema, migrations ou deploy.
paths: "src/app/**"
metadata:
  origem: "time EmpresTI — Aula 10"
  licenca: "MIT"
---

# Interface do EmpresTI

## Antes de começar

1. Confirme que existe uma spec aprovada com critérios de aceitação para a tela.
2. Leia `docs/adr/001-stack.md` e as rules aplicáveis. A skill não substitui
   essas fontes e não define comportamento de negócio.

## Procedimento

1. Localize os critérios de aceitação da spec e construa somente os elementos
   necessários para atendê-los.
2. Use elementos HTML semânticos, rótulos acessíveis e estados de foco visíveis.
3. Teste o layout em viewport amplo e estreito; preserve conteúdo e evite
   rolagem horizontal.
4. Mantenha textos da interface em português e nomes de código em inglês.

## Verificação

- Siga `rules/checks.md` para testes, lint, build e checagem da página.
- Revise a página no navegador em desktop e celular antes do commit.

## Não faça

- Não crie fluxos, campos, estados ou regras que não existam na spec e no PRD.
- Não transforme elementos indisponíveis em ações que pareçam funcionar.
- Não instale bibliotecas de interface sem a autorização prevista em
  `rules/operacao.md`.
