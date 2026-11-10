# Schema proposto — aguarda aprovação

Este arquivo não é uma migration. Ele apresenta a mudança antes da execução, conforme `rules/migration.md`.

## Entidades

- `memberships`: liga o UUID do Supabase Auth ao tenant e ao papel `COLLABORATOR` ou `OPERATIONS`.
- `equipment`: inventário do tenant, com patrimônio único, categoria e estado.
- `loans`: empréstimos, prazo, devolução e responsáveis.
- `audit_events`: registro append-only de ações relevantes.
- Não há `loan_requests`: a decisão registrada na Spec 006 é criar o empréstimo imediatamente.

Todas as tabelas de domínio recebem `tenant_id`. As chaves estrangeiras compostas incluem o tenant para impedir referências cruzadas. Índices filtrados impedem mais de um empréstimo ativo para o mesmo equipamento. Limite de itens, atraso e cálculo de prazo ficam no service dentro de transação, porque dependem de múltiplas linhas.

## RLS

Cada nova tabela terá RLS habilitado e policy `deny_by_default` para impedir acesso direto pelos papéis comuns. O servidor Prisma continua responsável pela autorização e por filtrar `tenant_id`; o papel proprietário usado pelo Prisma ignora RLS, como o próprio `stacks.md` registra. Antes de produção, a conexão e as policies precisam ser testadas com os papéis reais do Supabase para não chamar essa policy de proteção do caminho Prisma.

## Dados existentes e reversão

A migration apenas adicionará tabelas e tipos; não altera a tabela `tenants` nem linhas existentes. A reversão remove as novas tabelas, índices e tipos, portanto perde qualquer dado criado depois da aplicação e só é aceitável antes de uso real.

## Pontos ainda não fechados

- `due_at` será calculado como 14 dias úteis, conforme a decisão registrada no PRD e na Spec 006.
- Devolução com avaria atualiza o equipamento diretamente para `MANUTENÇÃO` e registra o evento de auditoria.
- O primeiro administrador não nasce no cadastro aberto: será criado manualmente no Supabase e vinculado por seed/configuração controlada.
