# Spec — Modo escuro

## Objetivo

Permitir que a pessoa alterne a interface entre modo claro e modo escuro nas telas inicial e de login.

## Vínculo com o PRD

Esta melhoria visual apoia o uso do sistema interno sem alterar regras de empréstimo, autenticação ou dados.

## Regras

- A preferência é local ao navegador e não é enviada ao servidor.
- O tema inicial continua claro; a pessoa escolhe quando deseja escurecer a interface.
- O controle deve indicar o tema que será aplicado e expor seu estado para leitores de tela.

## Fora de escopo

- Salvar preferências no perfil da pessoa.
- Criar ou alterar qualquer fluxo de negócio.
- Alterar autenticação, banco de dados ou API.

## Critérios de aceite

- [x] A tela inicial e a tela de login exibem um controle de modo escuro.
- [x] Ao ativar o controle, as cores das duas telas ficam legíveis no modo escuro.
- [x] Ao navegar entre as telas, a preferência escolhida permanece no navegador.
- [x] O controle pode ser usado por teclado e informa seu estado por acessibilidade.
