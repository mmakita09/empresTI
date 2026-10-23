# Plano — Modo escuro

## Referências

- `docs/adr/001-stack.md`: o ADR não decide o design visual.
- `docs/adr/002-design-system.md`: define o modo escuro Nocturne e mantém os dois temas.
- `rules/restrictions.md`: limitar a mudança à interface e não criar regras de produto.
- `rules/checks.md`: verificações obrigatórias da tarefa.
- `skills/empres-ti-interface/SKILL.md`: usar controles acessíveis, foco visível e verificar desktop e celular.

## Implementação

1. Criar um componente cliente de alternância que aplica a classe de tema no documento e guarda a preferência no navegador. Cobre CA-03 e CA-04.
2. Exibir esse componente nas rotas `/` e `/login`. Cobre CA-01.
3. Aplicar os tokens escuros definidos pelo ADR-002 aos componentes existentes. Cobre CA-02.
4. Verificar os critérios de aceite, testes, lint, build e endpoints. Cobre CA-01 a CA-04.
