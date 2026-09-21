# Restrições de atuação

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

## Segurança

- Nunca leia, copie, registre ou commite valores reais de `.env`, senhas, tokens ou chaves.
- Nunca invente credenciais.
- O repositório recebe somente `.env.example`, com nomes e valores fictícios.
- Antes de um commit, confirme que nenhum segredo entrou no diff.

## Verificação

- Não declare uma tarefa concluída sem executar a verificação prevista.
- Sucesso parcial deve ser informado como parcial.
- Se uma verificação não puder ser executada, informe o impedimento; não presuma que passou.

