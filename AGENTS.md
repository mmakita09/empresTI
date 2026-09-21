# Empréstimo de Equipamentos Internos

Sistema web interno para controlar empréstimos de equipamentos.

## Onde olhar

- `docs/prd.md` — define o problema, os usuários e as regras de negócio.
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

- `app/main.py` — aplicação FastAPI e rotas HTTP.
- `app/config.py` — leitura e validação das variáveis de ambiente.
- `app/database.py` — engine SQLAlchemy e verificação do banco.
- `app/static/` — front HTML, CSS e JavaScript sem build.
- `migrations/` — migrations Alembic versionadas.
- `tests/` — testes automatizados com pytest.
- `docs/andar-zero.md` — critérios técnicos anteriores às funcionalidades.

## Comandos comprovados

- Subir aplicação e PostgreSQL: `docker compose up --build`
- Verificar a aplicação: abrir `http://localhost:8000`
- Executar os testes: `pytest`
- Aplicar migrations: `alembic upgrade head`
- Criar migration: `alembic revision -m "descricao"`

No Docker Compose, a aplicação aplica `alembic upgrade head` antes de iniciar o servidor.

## Convenções

- Python 3.13, FastAPI, SQLAlchemy 2, Alembic e pytest.
- APIs REST com JSON.
- Front servido pelo mesmo backend, sem etapa de build.
- Acesso ao PostgreSQL somente pelo backend.
- Toda mudança de schema precisa de migration; não edite o banco manualmente.
- Testes não podem depender do banco de produção.
- Nomes de arquivos, funções e variáveis em inglês; textos da interface e documentação em português.

## Verificação antes do handoff

- Execute `pytest`.
- Suba o Compose quando a mudança afetar inicialização, banco ou migration.
- Confira `GET /health` e a página inicial.
- Revise o diff em busca de credenciais antes de qualquer commit.
