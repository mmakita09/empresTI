# Auditoria das aulas — EmpresTI

Data: 23/10/2026. Base de comparação: `main`, commit `6fbd3d9`. Correções registradas nos commits `6138529` e `5e529c0`.

## Resultado

**Conformidade parcial.** Todas as aulas da sequência EmpresTI foram revisadas, a aplicação abre e a base técnica executa, mas o produto do PRD ainda não funciona de ponta a ponta. Não é possível garantir uma nota apenas com build e página pública.

Esta adequação corrige documentação, regras, testes, prova do andar zero e parte do tema escuro. Funcionalidades de produto não foram iniciadas porque a spec 004 e a migration ainda dependem das decisões explícitas listadas ao final.

## Material disponível

Foram revisados requisitos e checklists dos oito HTML que compõem a sequência de desenvolvimento/SDD. Também foram inspecionados os dois roteiros numerados 3 e 5 encontrados na mesma pasta para evitar misturar disciplinas:

| Aula | Arquivo | Situação principal |
|---|---|---|
| 1 | `aula1-introducao/aula1-introducao.html` | Base de trabalho e projeto presentes; execução não comprova todo o processo histórico. |
| 2 | `aula2-agents-rules/aula2-agents-rules.html` | AGENTS e regras presentes; há repetição de instruções e faltam provas de acionamento em sessão nova. |
| 3 (MLOps) | `aula3/ROTEIRO_AULA3.html` | Material de outra sequência; não integra a numeração do EmpresTI. |
| 4 | `aula4-prd-adr/aula4-prd-adr.html` | PRD e ADR presentes; falta reconciliar decisões e demonstrar rastreabilidade completa. |
| 5 (MLOps) | `aula5/ROTEIRO_AULA5.html` | Material de outra sequência; não integra a numeração do EmpresTI. |
| 6 | `aula6-restrictions-sdd/aula6-restrictions-sdd.html` | Restrições e specs presentes; critérios e testes ainda não formam a cadeia completa. |
| 7 | `aula7-sdd-conceito/aula7-sdd-conceito.html` | PRD do EmpresTI presente; perguntas precisam de classificação e specs precisam de ajustes. |
| 8 | `aula8-greenfield-ordem/aula8-greenfield-ordem.html` | Plano corretivo, teste HTTP, saúde visível, banco vazio e banco indisponível comprovados. |
| 9 | `aula9-rules-operacao/aula9-rules-operacao.html` | Oito regras e migration corrigidas; primeira fatia vertical permanece bloqueada por decisões. |
| 10 | `aula10-skills-mcp/aula10-skills-mcp.html` | Skill ligada ao ADR-002; ainda faltam prova de acionamento, página de componentes e decisão MCP. |

Não existem aulas 3 e 5 na sequência do EmpresTI, conforme esclarecimento do usuário em 23/10/2026. Os arquivos que usam esses números pertencem a MLOps e ficam fora desta auditoria. Portanto, não há lacuna de material entre as aulas 2 e 4 nem entre 4 e 6. A cópia da aula 8 em `work/aula8.html` é idêntica; a aula 9 em Downloads apresenta diferenças de interface, sem mudança nos requisitos identificados. Páginas estáticas de outros projetos não foram tratadas como requisitos do EmpresTI.

Os exercícios de qualidade de dados, recompensas e cupons das aulas anteriores são exemplos do método. Suas funcionalidades e stacks não substituem o PRD e o `stacks.md` deste projeto.

### O que são os novos arquivos 3 e 5

- `aula3/ROTEIRO_AULA3.html:6` identifica o título **MLOps Aula 3 — Quando retreinar é a resposta errada**. O roteiro trabalha o modelo `turnover_rh`, monitoramento de lotes, MLflow, erro de unidade de dados e quarentena. A avaliação pede um post-mortem com diagnóstico, evidências, ação e registro dos runs (seção iniciada na linha 1468).
- `aula5/ROTEIRO_AULA5.html:6` identifica o título **MLOps Aula 5 — Quando o modelo muda o mundo**. O roteiro trabalha intervenção de RH, modelos de uplift e a distinção entre nova versão e novo modelo. A avaliação pede `proposta_novo_modelo.md`, respostas no notebook e respostas conceituais (linha 1509 e seguintes).
- Esses entregáveis se referem a outro produto e dados. Não é correto reprovar o EmpresTI por não possuir MLflow, modelos de rotatividade ou notebooks, nem implementá-los aqui por instrução contida no HTML.
- Princípios como diagnosticar antes de alterar, guardar evidências e validar contratos podem orientar o trabalho. Não tornam os entregáveis de MLOps obrigatórios para o PRD de empréstimos.
- Esta auditoria não avaliou a conclusão do projeto de MLOps. Caso também faça parte da entrega do curso, ele precisa de auditoria própria no repositório correspondente.

## Pendências prioritárias

### 1. Produto e autenticação ainda não funcionam de ponta a ponta

- `src/app/page.tsx` mantém **Ver catálogo** desabilitado; `src/app/login/page.tsx` mantém **Entrar** desabilitado.
- `prisma/schema.prisma` contém somente `Tenant`: não há modelos de equipamentos, empréstimos, pessoas ou vínculos de acesso.
- A API implementa saúde do ambiente, não os fluxos do PRD. O contexto não estabelece sessão, tenant autenticado nem autorização.
- A primeira fatia vertical pedida na aula 9 precisa ligar banco, servidor e tela, com critérios verificáveis. A home de apresentação não cumpre essa entrega.

### 2. Design system aplicado apenas em parte

- O ADR-002 enviado foi salvo em `docs/adr/002-design-system.md`, preservando os dois temas conforme decisão do usuário.
- O tema escuro agora usa os tokens Nocturne, tipografia 400/600, foco e gradientes permitidos. O alternador deixou de usar emoji e ganhou teste de persistência e estado acessível.
- Open Sans aparece na pilha de fontes, mas ainda não é empacotada e servida pela aplicação. Phosphor Icons também não foi instalado.
- Não há implementação do conjunto de componentes e página de teste visual propostos na aula 10.
- `docs/layout.md`, citado no ADR fornecido, não foi encontrado. A composição visual não pode ser conferida integralmente sem esse arquivo.
- A paleta definitiva do tema claro não foi fornecida: permanece **não decidida**, sem assumir que o CSS atual seja a aprovação visual.

### 3. Andar zero revalidado; testes de produto ainda inexistentes

- **AZ-05 corrigido:** `src/app/health-card.tsx` passou a ser exibido na página inicial e a consulta tRPC foi confirmada visualmente com banco disponível.
- **AZ-06 corrigido no contrato HTTP:** `tests/health-route.test.ts` verifica status e corpo para 200 e 503; o teste do router tRPC continua separado. Os serviços são simulados, portanto isso não é prova de integração com PostgreSQL.
- **AZ-01/AZ-03 revalidados:** migration e seed foram aplicados em banco PostgreSQL local vazio e isolado. A tabela, o seed e a policy foram consultados; o banco temporário foi removido depois da prova.
- **AZ-02 corrigido:** uma instância isolada da aplicação foi iniciada com PostgreSQL inalcançável e `/api/health` respondeu 503 com mensagem clara. Foi adicionado timeout de conexão de 3 segundos para evitar que a saúde fique pendurada.
- Não há testes de isolamento entre tenants, permissões, concorrência de empréstimos ou jornadas do produto.
- `docs/plan-andar-zero.md` foi criado como plano de correção datado, deixando explícito que não representa aprovação retroativa.

### 4. Documentos e processo precisam de reconciliação

- As cinco perguntas do PRD não estão classificadas em negócio, técnica ou fora de escopo com justificativa, como pede a aula 7.
- `stacks.md` já determina cadastro fechado por convite de administrador. Portanto, não está correto tratar toda a forma de ingresso como indefinida; ainda é necessário especificar bootstrap, papéis e fluxo operacional.
- As specs 002 e 003 receberam IDs de critérios, vínculo de tarefas, referências e contrato afetado. A nova spec 004 permanece explicitamente não aprovada até as decisões abertas.
- `rules/migration.md` agora exige apresentação e aprovação antes de qualquer migration, além de `tenant_id`, RLS e teste de isolamento para tabelas de domínio.
- Há instruções repetidas entre AGENTS e regras. Consolidar cada procedimento na sua fonte, mantendo links de descoberta.
- Aprovações históricas e testes de obediência das regras não têm evidência suficiente no repositório inspecionado. Ausência de registro não prova que nunca aconteceram.
- O handoff de raiz estava ausente; foi criado nesta auditoria, sem inventar verificações anteriores.
- Mudanças semânticas de arquitetura precisam de histórico claro de substituição de decisões; evitar apenas reescrever o ADR aceito sem registrar sua evolução.

### 5. Decisões de `stacks.md` ainda não implementadas

- Sessão Supabase no servidor, proteção de rotas, autorização e isolamento por tenant.
- Pipeline GitHub Actions com migration antes do deploy, observabilidade Sentry, rate limiting e trilha de auditoria.
- CSP definida no documento e ferramentas de formatação/hooks declaradas no stack.
- O próprio stack informa que o papel de conexão do Prisma pode ignorar RLS. Não é coerente prometer RLS como proteção de uma consulta Prisma que esqueça o filtro de tenant sem resolver essa condição. É uma pendência arquitetural, não uma prova de exposição do banco remoto.

### 6. Skill e MCP: existência não equivale a validação

- `skills/empres-ti-interface/SKILL.md` agora referencia o ADR-002 e inclui técnicas locais de tokens, tipografia e foco sem copiar a regra de negócio.
- Registrar testes de acionamento e de não acionamento em sessões novas, conforme a aula 10, e apontar a skill nas tarefas que a utilizam.
- Não foi identificada skill de terceiro que exigisse auditoria de origem nesta entrega.
- Ausência de configuração MCP no repositório não é, isoladamente, reprovação: documentar a escolha CLI/MCP e, se MCP for usado, seus limites e evidências reais. Ter ferramentas disponíveis no aplicativo não comprova essa atividade.

## Verificações da auditoria inicial

| Verificação | Resultado | Limite da evidência |
|---|---|---|
| Retomar projeto Vercel | Projeto reativado; URL pública respondeu HTTP 200 e conteúdo da home | Não comprova autenticação ou banco remoto. |
| `docker compose up --build -d` | Sucesso, incluindo build Next.js | Usou volume existente; não foi um teste de instalação limpa. |
| `docker compose exec -T app npm test` | Inicialmente 1 teste; após adequação, 4 testes aprovados | Os testes de saúde simulam o service; não são integração com PostgreSQL. |
| `docker compose exec -T app npm run lint` | Sucesso | Não valida fluxos de negócio. |
| `/` e `/login` locais | HTTP 200 | Páginas existem, mas ações de produto estão desabilitadas. |
| `/api/health` e `/api/trpc/health.check` locais | HTTP 200, estado disponível | Somente cenário positivo. |
| Arquivos de ambiente versionados/ignorados | Exemplo presente e arquivos reais ignorados nas verificações de nomes | Não foi feita auditoria completa de segredos em todo o conteúdo histórico. |

Produção: https://empres-ti.vercel.app

Nenhuma migration, credencial ou configuração de banco remoto foi alterada nesta auditoria. Na etapa inicial, a mudança remota foi retomar o projeto Vercel, conforme solicitado.

### Revalidação após receber os novos arquivos

- `docker compose ps`: aplicação em execução e PostgreSQL saudável.
- Suite final: 4 testes aprovados em 3 arquivos; inclui handler HTTP, router tRPC e persistência/acessibilidade do tema. Os testes de saúde ainda simulam o service.
- `docker compose exec -T app npm run lint`: aprovado.
- `docker compose exec -T app npm run build`: aprovado, incluindo TypeScript e geração das páginas.
- HTTP local: `/`, `/login`, `/api/health` e `/api/trpc/health.check` responderam 200; os dois endpoints de saúde informaram conexão disponível.
- URL pública do Vercel: HTTP 200 novamente. Não foi feita alteração de configuração ou novo deploy nesta revisão.
- Reconferidos no código: ações de login/catálogo desabilitadas, schema contendo apenas `Tenant` e ausência de `docs/layout.md`. O `HealthCard` passou a ser usado na página inicial.
- Migration e seed foram aplicados em um banco local temporário vazio; tenant e policy esperados foram encontrados e o banco temporário foi removido.
- A revalidação incluiu banco vazio isolado, falha real de conexão e inspeção visual desktop dos dois temas e da tela de login. Não incluiu viewport móvel controlado, jornada autenticada nem teste integrado de produção.

## Ordem sugerida para adequação

1. Disponibilizar `docs/layout.md` e reconciliar PRD, stack e ADRs, fechando somente decisões necessárias à próxima entrega.
2. Responder às quatro perguntas da spec 004, revisar o schema proposto e aprovar spec, plano e migration antes do código de produto.
3. Implementar a primeira fatia vertical aprovada: banco, servidor, autorização e interface com testes correspondentes.
4. Definir a paleta clara, empacotar Open Sans e Phosphor e criar/validar os componentes reutilizáveis do ADR-002.
5. Demonstrar carregamento da skill/regras e registrar a decisão sobre MCP; completar o pipeline e os controles do stack antes de afirmar prontidão de produção.

Cada item exige sua verificação. Não marcar a lista inteira como concluída por um build verde ou por a URL abrir.
