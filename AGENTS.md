# Empréstimo de Equipamentos Internos

Sistema web interno para controlar empréstimos de equipamentos.

## Onde olhar

- `docs/prd.md` — define o problema, os usuários e as regras de negócio.
- `stacks.md` — é a base detalhada da arquitetura aceita.
- `docs/adr/` — registra decisões técnicas e seus motivos.
- `rules/restrictions.md` — define os limites de atuação do agente.
- `docs/specs/` — contém spec, plano e tarefas de cada funcionalidade.

## Precedência

Se uma spec e o código discordarem sobre comportamento, a spec vence.

O PRD define o que o negócio precisa. Os ADRs definem decisões técnicas.

Se uma informação não estiver documentada, pergunte. Não invente uma decisão.

## Processo

- Leia `rules/restrictions.md` antes de qualquer tarefa.
- Leia `docs/adr/` antes de propor mudanças estruturais.
- Não contrarie um ADR aceito sem interromper a tarefa e explicar o conflito.
- Antes de implementar, liste os requisitos ambíguos encontrados.
- Uma decisão estrutural nova precisa de ADR antes do código.
- Código de funcionalidade exige uma spec em `docs/specs/`.
- Execute uma tarefa por vez e verifique-a antes de avançar.

## Segurança

- Nunca commite `.env`, senhas, tokens ou URLs com credenciais.
- O repositório contém somente `.env.example`, com valores fictícios.
- Configurações e segredos devem vir de variáveis de ambiente.
- Não revele valores secretos em logs, documentação ou mensagens.

## Mapa do projeto

- `src/app/` — páginas e Route Handlers do Next.js.
- `src/server/api/` — contexto, routers e procedimentos tRPC.
- `src/server/services/` — regras e operações do servidor.
- `src/server/db.ts` — singleton do Prisma.
- `prisma/` — schema, migrations e seed.
- `tests/` — testes automatizados com Vitest.
- `docs/andar-zero.md` — critérios técnicos anteriores às funcionalidades.

## Comandos comprovados

- Subir aplicação e PostgreSQL: `docker compose up --build`
- Verificar a aplicação: abrir `http://localhost:3000`
- Executar os testes: `npm test`
- Aplicar migrations: `npm run db:deploy`
- Criar migration: `npm run db:migrate -- --name descricao`
- Gerar o Prisma Client: `npm run db:generate`

No Docker Compose, a aplicação aplica `prisma migrate deploy` e o seed antes de iniciar o servidor.

## Convenções

- Node.js 24, TypeScript `strict`, Next.js App Router, tRPC, Prisma e Vitest.
- Front e servidor no mesmo projeto e deploy.
- Acesso ao PostgreSQL somente pelo servidor via Prisma.
- Toda mudança de schema precisa de migration; não edite o banco manualmente.
- Testes não podem depender do banco de produção.
- Nomes de arquivos, funções e variáveis em inglês; textos da interface e documentação em português.

## Verificação antes do handoff

- Execute `npm test`, `npm run lint` e `npm run build`.
- Suba o Compose quando a mudança afetar inicialização, banco ou migration.
- Confira `GET /api/health`, o procedimento tRPC e a página inicial.
- Revise o diff em busca de credenciais antes de qualquer commit.
