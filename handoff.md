# Handoff — 23/10/2026

- Tarefa: adequação às aulas; documentação e andar zero em correção, produto bloqueado por decisões abertas.
- Branch: main; commits desta adequação: 6138529 (documentação/regras) e 5e529c0 (andar zero/interface).
- Documentação central: docs/auditoria-aulas.md, docs/adr/002-design-system.md e docs/specs/004-primeira-fatia-vertical/.
- Decisão do usuário: manter claro/escuro e alternador; paleta clara definitiva não decidida.
- Banco local: Compose saudável; migration e seed também validados em banco temporário vazio.
- Migrations: nenhuma nova migration ou mudança no schema nesta sessão.
- Produção: Vercel ativo na versão anterior; mudanças desta adequação ainda não foram enviadas ao remoto.
- Checks desta revisão: build e lint passaram; 4 testes Vitest passaram.
- Rotas locais: /, /login, /api/health e /api/trpc/health.check responderam 200.
- Banco vazio isolado: migration e seed passaram; banco temporário removido depois da prova.
- Banco indisponível isolado: `/api/health` respondeu 503; timeout de conexão definido em 3 segundos.
- Limites: login e catálogo desabilitados; primeira fatia está em spec 004 não aprovada.
- A sequência EmpresTI não possui aulas 3/5; arquivos com esses números são de MLOps.
- Falta docs/layout.md citado pelo ADR-002; paleta clara continua não decidida.
- Não fazer: inventar decisões/aprovações, tratar auditoria como implementação ou inserir requisitos de MLOps no EmpresTI.
- Não remover o alternador nem declarar que a paleta clara atual está aprovada.
- Próximo passo: responder às quatro perguntas da spec 004 e aprovar o schema antes da migration.
