# Entrega — prática de subagentes

## Estado atual

As decisões do briefing foram incorporadas ao PRD e registradas nas Specs 005
e 006. O modelo local de catálogo foi criado e a migration foi validada no
Docker local. O seed idempotente dos 12 equipamentos foi validado no banco
local e também executado no Supabase remoto pelo build controlado.

## Conflitos e lacunas

- O resumo do briefing diz que só TI-0004 e TI-0007 estão em manutenção e que
  os outros 10 estão disponíveis, mas a lista detalhada marca também TI-0010
  como manutenção. A lista detalhada por patrimônio foi adotada como fonte,
  e a divergência permanece registrada na Spec 005.
- A Spec 004 agora registra criação manual do primeiro administrador e avaria
  encaminhada diretamente para `MANUTENÇÃO`.
- A conta de correção e o upload das imagens dependem de autorização para
  produção e de uma chave Pixabay fornecida como segredo, nunca no repositório.

## Decisões adotadas

- Solicitação cria o empréstimo imediatamente, sem aprovação.
- Prazo padrão: 14 dias úteis.
- Limite: cinco empréstimos abertos por colaborador.
- Equipamento em manutenção ou já emprestado não pode ser solicitado.
- Seed inicial: 12 patrimônios TI-0001 a TI-0012, seguindo a lista detalhada.

## Skill

`skills/imagens-equipamentos/SKILL.md` restringe a fonte ao Pixabay, exige
800×600, unicidade, créditos, idempotência e impede upload automático em
produção.

O script `skills/imagens-equipamentos/scripts/prepare_manifest.mjs` prepara
candidatos e finaliza imagens aprovadas localmente. O manifesto foi revisado,
as imagens foram processadas em 800×600 e o seed local foi executado.

## Verificação

O verificador de specs é independente, não edita nem publica. A rodada final
confirmou os critérios CA-01 a CA-09: 19 testes passando no Docker e jornada
real validada no Supabase/Vercel. O veredito final da Spec 004 é **PRONTA**.

### Atualização após autorização do DDL

- O schema da Spec 004 foi implementado no Prisma com `memberships`, `loans` e
  `audit_events`.
- A migration `20261110180448_first_vertical_slice` foi aplicada do zero no
  PostgreSQL local.
- RLS foi habilitado nas três tabelas novas e o índice único de empréstimo ativo
  foi validado no banco local.
- O Supabase remoto recebeu as migrations Prisma e o seed idempotente durante
  o deploy de produção.

### Implementação da primeira fatia

- Login usa Supabase Auth; `/catalogo` é protegido por middleware.
- Catálogo e empréstimos usam procedimentos tRPC protegidos por sessão e
  membership do tenant.
- Devoluções registram avaria e encaminham o equipamento para `MANUTENÇÃO`.
- Operações lista empréstimos abertos e exige papel `ADMIN` ou `OPERATIONS`.
- Foram adicionados testes de regras, tenant, autenticação, visibilidade do
  colaborador, concorrência, devolução e auditoria no tRPC/PostgreSQL.
- Validação Docker mais recente: build aprovado, 19 testes em 7 arquivos e
  lint sem erros; há apenas o aviso padrão de otimização de `<img>`.
- A variável controlada do primeiro administrador foi cadastrada no Vercel em
  Production e criou a membership ADMIN na primeira sessão real.
- A conta Auth e as variáveis públicas do Supabase foram configuradas. A
  sessão real carregou o catálogo com 12 equipamentos e as rotas de
  devoluções e Operações responderam autenticadas.

## Fora desta entrega

Não foram criados bucket público ou upload de fotos. A migration remota e o
seed foram executados pelo build controlado; as imagens continuam no manifesto
idempotente do projeto.

## Links

- Repositório: https://github.com/mmakita09/empresTI
- Tag prevista: `entrega-pratica` (a criar somente quando as validações finais
  e o conteúdo da entrega estiverem concluídos).
