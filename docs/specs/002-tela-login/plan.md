# Plano — Tela de login

## Referências

- `docs/prd.md`: exige login, mas mantém em aberto a criação de contas e o primeiro acesso.
- `rules/restrictions.md`: não inventar regras de negócio nem implementar código sem spec.
- `skills/empres-ti-interface/SKILL.md`: interface sem definir autenticação ou regras de servidor.
- `docs/adr/001-stack.md`: autenticação real usa Supabase Auth, quando especificada.
- `rules/checks.md`: verificações obrigatórias da tarefa.

## Implementação

1. Criar a rota estática `/login` com formulário sem submissão. Cobre CA-01 e CA-02.
2. Trocar o botão indisponível da página inicial por um link para a rota. Cobre CA-03.
3. Adicionar estilos responsivos e foco visível. Cobre CA-04.
4. Verificar a página, testes, lint, build e endpoints existentes. Cobre CA-01 a CA-04.
