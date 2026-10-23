# Spec 002 — Tela de login

## Objetivo

Disponibilizar uma tela visual de login acessível em `/login` e ligá-la ao botão “Entrar” da página inicial.

## Escopo

- Exibir os campos de e-mail corporativo e senha, o botão “Entrar” e o retorno à página inicial.
- Manter a ação de entrar desabilitada e explicar o motivo de forma visível.
- Não enviar credenciais, criar contas, autenticar usuários ou alterar dados.

## Pergunta de negócio em aberto

O PRD não define quem cria contas nem como ocorre o primeiro acesso. Isso bloqueia a autenticação real, mas não impede a entrega da interface estática desta spec.

## Critérios de aceite

- CA-01: ao acessar `/login`, a pessoa vê o formulário com rótulos para e-mail corporativo e senha.
- CA-02: o botão “Entrar” não envia credenciais e informa que depende da definição de primeiro acesso.
- CA-03: o botão “Entrar” da página inicial leva para `/login`.
- CA-04: a tela funciona sem rolagem horizontal em telas pequenas e mantém foco visível nos controles.

## Fora de escopo

- Criar conta, recuperar senha ou conceder o primeiro acesso.
- Autenticar uma sessão real.

## Contrato afetado

- Rotas públicas `/` e `/login` do Next.js.
