# ADR-001 — Stack do projeto

## Decisão

| Item | Escolha |
|---|---|
| Linguagem/runtime | Python 3 |
| Framework do backend | FastAPI |
| Estilo da API | REST com JSON |
| Front-end: com build ou sem | HTML, CSS e JavaScript sem build |
| Como o front é servido | Pelo mesmo processo do backend |
| Autenticação/sessão | E-mail e senha; sessão no PostgreSQL identificada por cookie `HttpOnly` |
| Autorização | RBAC simples com os papéis `COLABORADOR` e `OPERACOES`, verificado no backend |
| Acesso ao banco | SQLAlchemy ORM |
| Migrations | Alembic com migrations versionadas |
| Testes | Pytest com testes unitários e de integração usando PostgreSQL de teste |
| Execução local | Docker Compose; `docker compose up --build` |
| Banco | PostgreSQL |

## Justificativas

- **Linguagem/runtime:** Python 3 permite implementar backend e testes usando a mesma linguagem.
- **Framework do backend:** FastAPI atende à API com pouca configuração inicial.
- **Estilo da API:** REST com JSON cobre as operações simples de catálogo e empréstimo.
- **Front sem etapa de build:** o PRD pede cinco telas simples e nenhuma interação rica. Uma etapa de build adicionaria um segundo ambiente para manter e depurar, sem entregar nada que o PRD peça.
- **Como o front é servido:** usar o mesmo processo reduz a quantidade de serviços para executar e publicar.
- **Autenticação/sessão:** manter a sessão no PostgreSQL permite invalidá-la no servidor, enquanto o cookie identifica a sessão no navegador.
- **Autorização:** dois papéis são suficientes para distinguir colaborador de Operações nas regras descritas.
- **Acesso ao banco:** SQLAlchemy concentra o mapeamento entre os objetos do sistema e as tabelas.
- **Migrations:** Alembic mantém cada mudança do schema registrada e aplicável na ordem.
- **Testes:** Pytest cobre regras isoladas e o caminho integrado entre API e banco.
- **Execução local:** Docker Compose sobe aplicação e PostgreSQL do mesmo jeito em máquinas diferentes.
- **Banco:** PostgreSQL já foi decidido pelo time e não está em discussão.

## Alternativas descartadas

- **TypeScript com Node.js LTS:** descartado porque manteria outra cadeia de ferramentas sem necessidade indicada pelo PRD.
- **NestJS:** descartado porque adicionaria mais estrutura inicial ao backend deste projeto pequeno.
- **GraphQL:** descartado porque os fluxos previstos não exigem consultas definidas livremente pelo cliente.
- **Front com framework e build próprio:** descartado porque o custo de manter dois processos e dois pipelines não se paga em cinco telas. Se aparecerem telas com estado complexo, este ADR deve ser revisto.
- **Front-end e backend separados:** descartado porque exigiria dois processos e mais configuração de integração e publicação.
- **JWT armazenado no navegador:** descartado porque revogar a sessão antes do vencimento ficaria mais trabalhoso.
- **Permissões configuráveis por recurso:** descartado porque o PRD possui somente os papéis Colaborador e Operações.
- **SQL direto com psycopg:** descartado porque repetiria o mapeamento entre resultados SQL e objetos do sistema.
- **Scripts SQL manuais:** descartado porque dificultariam controlar quais mudanças do schema já foram aplicadas.
- **`unittest` com testes manuais:** descartado porque manteria dois modos de verificação e deixaria parte do resultado dependente de conferência manual.
- **Instalação manual de Python e PostgreSQL:** descartada porque aumentaria as diferenças de configuração entre as máquinas.
- **Outro banco de dados:** não foi considerado, pois PostgreSQL já estava decidido pelo time.

## Consequências

### O que fica mais fácil

- Subir o projeto e o PostgreSQL de forma reproduzível com Docker Compose.
- Publicar front-end e backend juntos.
- Revogar sessões no servidor.
- Evoluir o schema com migrations versionadas.
- Testar regras e integração usando um único framework de testes.

### O que fica mais difícil

- Criar interfaces com muitas interações no navegador sem adotar posteriormente uma ferramenta de build.
- Escalar ou publicar front-end e backend de maneira independente.
- Manter sessões exige tabela, expiração e limpeza dos registros no PostgreSQL.

### O que não muda depois sem custo

- Separar front-end e backend altera execução, publicação, autenticação e comunicação entre as duas partes.
- Trocar SQLAlchemy e Alembic exige adaptar acesso a dados e histórico de migrations.
- Trocar sessões no servidor por JWT altera o fluxo de login, revogação e autorização.
- Trocar PostgreSQL exige revisar schema, migrations, consultas, testes e execução local.

## O que este ADR não decide

Este ADR não decide o modelo de dados, a organização de pastas, o formato detalhado dos erros da API, os nomes das variáveis de ambiente, a duração da sessão nem os comportamentos de negócio que continuam em aberto no PRD.

