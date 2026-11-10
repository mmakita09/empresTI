# Plano — Spec 004

## Pré-condição

Apresentar e aprovar o DDL, a migration e o tratamento de `tenant_id`, RLS e
policies antes de alterar o schema ou executar migration.

## Ordem

1. Revisar e aprovar o schema proposto.
2. Criar uma migration versionada para as tabelas de domínio.
3. Aplicar a migration do zero no PostgreSQL local via Docker Compose.
4. Implementar autenticação, sessão e autorização por tenant no servidor.
5. Implementar catálogo, solicitação imediata, devolução e auditoria.
6. Criar o primeiro administrador manualmente no Supabase e vinculá-lo por
   configuração controlada.
7. Validar os critérios da Spec 004 com testes de isolamento, concorrência e
   permissões.
