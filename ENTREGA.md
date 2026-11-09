# Entrega — prática de subagentes

## Estado atual

As decisões do briefing foram incorporadas ao PRD e registradas nas Specs 005
e 006. O modelo local de catálogo foi criado e a migration foi validada no
Docker local. Não houve seed ou escrita no Supabase de produção nesta etapa.

## Conflitos e lacunas

- O resumo do briefing diz que só TI-0004 e TI-0007 estão em manutenção e que
  os outros 10 estão disponíveis, mas a lista detalhada marca também TI-0010
  como manutenção. A lista detalhada por patrimônio foi adotada como fonte,
  e a divergência permanece registrada na Spec 005.
- O PRD ainda não decide criação de conta, devolução e avaria.
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

## Verificação

O verificador de specs é independente, não edita nem publica. A Spec 004 teve
veredito anterior de **NÃO PRONTA**. Ainda falta executar uma rodada comparável
com erro plantado e registrar o resultado sem corrigir pelo verificador.

## Fora desta entrega

Não foram criados usuário real, migration remota, seed remoto, bucket público,
upload de fotos ou deploy adicional. Essas ações exigem confirmação explícita
e dados secretos fora do chat.

## Links

- Repositório: https://github.com/mmakita09/empresTI
- Tag prevista: `entrega-pratica` (a criar somente quando as validações finais
  e o conteúdo da entrega estiverem concluídos).
