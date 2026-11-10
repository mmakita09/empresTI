# Spec 004 — Primeira fatia vertical do produto (decisões fechadas)

## Estado

**Decisões fechadas; migration ainda não aprovada.** Este documento reúne o menor fluxo que liga banco, servidor e interface. O código desta funcionalidade só pode começar depois da aprovação do DDL, da migration e do plano de execução.

## Objetivo

Permitir que uma pessoa previamente convidada entre no sistema, veja o catálogo do seu tenant e solicite um equipamento disponível, com registro persistido e visível para Operações.

## Vínculo com o PRD

- Login individual.
- Catálogo com situação dos equipamentos.
- Solicitação de item disponível.
- Visão de empréstimos em aberto para Operações.
- Limite de cinco itens, prazo de 14 dias úteis e bloqueio por atraso.

## Decisões já existentes

- Cadastro fechado por convite de administrador, conforme `stacks.md` e ADR-001.
- Supabase Auth com sessão em cookie HttpOnly.
- Banco PostgreSQL, Prisma ORM/Migrate e `tenant_id` nas tabelas de domínio.
- Router tRPC → service → Prisma; autorização no servidor.
- Equipamento em manutenção não aparece como disponível.
- Colaborador e Operações registram devoluções, conforme a descrição de usuários do PRD.
- A solicitação cria o empréstimo imediatamente, sem aprovação, conforme o PRD e a Spec 006.
- O prazo padrão é de 14 dias úteis, conforme o PRD e a Spec 006.
- O limite adotado para empréstimos em aberto é de cinco itens, conforme o PRD v2 e a Spec 006.
- Item devolvido com avaria muda diretamente para `MANUTENÇÃO` e deixa de estar disponível.
- O primeiro administrador é criado manualmente no Supabase e vinculado por seed/configuração controlada.

## Critérios de aceitação provisórios

- CA-01: pessoa convidada entra com Supabase Auth e a sessão não fica disponível ao JavaScript da página.
- CA-02: rota protegida sem sessão redireciona para `/login`.
- CA-03: pessoa autenticada só acessa dados do tenant ao qual pertence.
- CA-04: catálogo mostra equipamentos e situação, sem anunciar manutenção como disponível.
- CA-05: operação concorrente não permite dois empréstimos ativos do mesmo equipamento.
- CA-06: pessoa com cinco itens ativos ou item atrasado não consegue iniciar outro empréstimo.
- CA-07: Operações vê todos os empréstimos abertos do tenant; colaborador vê somente os próprios.
- CA-08: devolução registra pessoa e horário e atualiza a disponibilidade conforme a resposta sobre avaria.
- CA-09: cada mudança relevante gera registro append-only de auditoria.

## Fora de escopo

- Reserva futura, e-mail e importação da planilha.
- Cadastro aberto.
- Acesso direto do navegador ao banco.
- Alteração manual do schema no Supabase.

## Contratos afetados

- Cookies e sessão Supabase.
- Contexto e middlewares tRPC.
- Schema Prisma e migrations.
- Rotas protegidas de catálogo, empréstimos e Operações.
- Variáveis públicas do Supabase já listadas em `.env.example`.

## Pendência de execução

- Aprovar o DDL/schema proposto e a migration antes de alterar `prisma/schema.prisma` ou criar migration.
