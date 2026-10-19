# Plano — Modo escuro

## Referências

- `docs/adr/001-stack.md`: o ADR não decide o design visual.
- `rules/restrictions.md`: limitar a mudança à interface e não criar regras de produto.
- `skills/empres-ti-interface/SKILL.md`: usar controles acessíveis, foco visível e verificar desktop e celular.

## Implementação

1. Criar um componente cliente de alternância que aplica a classe de tema no documento e guarda a preferência no navegador.
2. Exibir esse componente nas rotas `/` e `/login`.
3. Adicionar estilos escuros para os componentes já presentes nas duas telas.
4. Verificar os critérios de aceite, testes, lint, build e endpoints.
