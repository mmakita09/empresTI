# Entrega — prática de subagentes

## Estado atual

As decisões do briefing foram incorporadas ao PRD e registradas nas Specs 005
e 006. O modelo local de catálogo foi criado e a migration foi validada no
Docker local. O seed idempotente dos 12 equipamentos foi executado no banco local do Docker; não houve escrita no Supabase de produção.

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

O verificador de specs é independente, não edita nem publica. A rodada mais
recente confirmou o veredito **NÃO PRONTA** para a Spec 004: os CA-01 a CA-09
ainda não têm implementação nem testes de produto. `plan.md` e `tasks.md` já
existem; a migration foi aprovada e validada localmente. Os checks Docker
foram repetidos após o daemon voltar e passaram; o veredito continua `NÃO
PRONTA` porque o código de produto ainda não foi implementado.

### Atualização após autorização do DDL

- O schema da Spec 004 foi implementado no Prisma com `memberships`, `loans` e
  `audit_events`.
- A migration `20261110180448_first_vertical_slice` foi aplicada do zero no
  PostgreSQL local.
- RLS foi habilitado nas três tabelas novas e o índice único de empréstimo ativo
  foi validado no banco local.
- O Supabase remoto não foi alterado.

## Fora desta entrega

Não foram criados usuário real, migration remota, seed remoto, bucket público,
upload de fotos ou deploy adicional. Essas ações exigem confirmação explícita
e dados secretos fora do chat.

## Links

- Repositório: https://github.com/mmakita09/empresTI
- Tag prevista: `entrega-pratica` (a criar somente quando as validações finais
  e o conteúdo da entrega estiverem concluídos).
