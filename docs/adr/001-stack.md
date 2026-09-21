# ADR-001 — Stack do projeto

## Decisão

| Item | Escolha |
|---|---|
| Arquitetura | Monolito em um repositório e um projeto Vercel |
| Aplicação | Next.js App Router com TypeScript `strict` |
| Interface | React, Tailwind CSS e shadcn/ui |
| Estado e formulários | TanStack Query, React Hook Form e Zod |
| API | tRPC em Route Handlers, com superjson |
| Organização do servidor | Router → Service → Prisma |
| Banco | PostgreSQL gerenciado pelo Supabase |
| ORM e migrations | Prisma ORM e Prisma Migrate como dono único do schema |
| Autenticação | Supabase Auth com cookie `HttpOnly` via `@supabase/ssr` |
| Autorização | Middlewares tRPC e RLS como defesa em profundidade |
| Multi-tenancy | Banco único com `tenant_id` nas tabelas de domínio |
| Testes | Vitest, Testing Library, Testcontainers e Playwright |
| Execução local | Docker Compose |
| Hospedagem | Vercel; migration executada fora do boot serverless |

## Justificativas

- **Arquitetura:** não há equipes separadas para front e servidor; separar criaria dois deploys e uma fronteira HTTP para manter.
- **Aplicação:** o front e o servidor ficam no mesmo projeto e sobem juntos.
- **Interface:** as telas precisam reproduzir o design sem impor o visual de uma biblioteca fechada.
- **Estado e formulários:** o cache de servidor e a validação dos formulários ficam em caminhos definidos.
- **API:** o tipo do procedimento chega ao cliente sem contrato escrito duas vezes.
- **Organização do servidor:** o procedimento cuida de entrada e permissão; a regra de negócio fica testável no service.
- **Banco:** PostgreSQL no Supabase já faz parte da infraestrutura definida.
- **ORM e migrations:** ter um único dono do schema evita divergência entre ambientes.
- **Autenticação:** mesma origem permite sessão em cookie sem expor token ao JavaScript.
- **Autorização:** permissão é verificada no servidor e o RLS permanece como última barreira.
- **Multi-tenancy:** adicionar a coluna desde o início evita backfill e revisão de todas as consultas depois.
- **Testes:** regras, componentes, banco real e fluxos críticos precisam de níveis diferentes de verificação.
- **Execução local:** um comando sobe aplicação, migration, seed e PostgreSQL.
- **Hospedagem:** migrations não podem disputar execução durante a inicialização de várias functions.

## Alternativas descartadas

- **Front e API separados:** descartado porque criaria CORS, dois deploys e uma fronteira sem equipe separada.
- **REST ou GraphQL:** descartados porque, com cliente e servidor TypeScript no mesmo projeto, o tRPC mantém o contrato sem geração.
- **Server Actions e acesso direto ao Prisma em Server Components:** descartados porque criariam outros caminhos de leitura, mutação e autorização.
- **Supabase CLI como dono das migrations:** descartado porque dois donos do mesmo schema podem se sobrescrever.
- **RLS como autorização primária:** descartado porque o Prisma usa conexão de servidor; aplicar contexto por request exigiria outra estratégia transacional.
- **Cadastro aberto:** descartado porque o sistema guarda inventário interno e não existe domínio corporativo definido para filtrar.
- **Redux ou Zustand:** descartados porque o estado local restante cabe em React depois do cache do TanStack Query.
- **Schema ou banco por tenant:** descartado porque multiplicaria cada migration sem exigência do PRD.
- **Mocks do Prisma como prova de integração:** descartados porque não exercitam constraints, transações nem policies.

## Consequências

### O que fica mais fácil

- Publicar interface e servidor juntos.
- Detectar no build mudanças de contrato entre procedimento e tela.
- Compartilhar validação e tipos dentro do repositório.
- Manter um único histórico de schema com Prisma Migrate.

### O que fica mais difícil

- Escalar interface e servidor separadamente.
- Impedir imports indevidos entre código de cliente e servidor.
- Controlar latência entre functions da Vercel e banco em São Paulo.
- Manter middlewares e policies de RLS coerentes.

### O que isso impede de fazer depois sem custo

- Atender consumidores que não usam TypeScript exige expor outra API.
- Separar o servidor do front rompe o acoplamento de tipos do tRPC.
- Trocar Prisma exige migrar o histórico de schema e o SQL complementar.
- Processos longos, filas e conexões abertas exigem infraestrutura fora das functions da Vercel.

## O que este ADR não decide

Este ADR não decide entidades de domínio, design visual, matriz detalhada de permissões, respostas para as questões abertas do PRD, política de branches, backup, LGPD, SLO ou orçamento.

O detalhamento que fundamenta esta decisão está em `stacks.md`.
