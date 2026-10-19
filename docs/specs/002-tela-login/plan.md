# Plano — Tela de login

## Referências

- `docs/prd.md`: exige login, mas mantém em aberto a criação de contas e o primeiro acesso.
- `rules/restrictions.md`: não inventar regras de negócio nem implementar código sem spec.
- `skills/empres-ti-interface/SKILL.md`: interface sem definir autenticação ou regras de servidor.

## Implementação

1. Criar a rota estática `/login` com formulário sem submissão.
2. Trocar o botão indisponível da página inicial por um link para a rota.
3. Adicionar estilos responsivos e foco visível.
4. Verificar a página, testes, lint, build e endpoints existentes.
