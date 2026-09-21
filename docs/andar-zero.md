# Andar zero — prova do ADR-001

Isto não é uma spec de produto. É a verificação de que as escolhas registradas em `docs/adr/001-stack.md` funcionam juntas antes da primeira funcionalidade.

## Critérios de aceitação

- **AZ-01** — um único comando sobe a aplicação e o PostgreSQL do zero.
- **AZ-02** — a aplicação conecta no banco; sem banco, responde com estado indisponível e mensagem clara.
- **AZ-03** — existe uma migration versionada e aplicável.
- **AZ-04** — `GET /api/health` devolve HTTP 200 quando o banco está disponível e informa o estado da conexão.
- **AZ-05** — uma página Next.js consulta o procedimento `health.check` pelo tRPC e mostra o estado do banco.
- **AZ-06** — um comando executa os testes; existe pelo menos um teste sobre `GET /health`.
- **AZ-07** — toda configuração vem de variável de ambiente e existe `.env.example` versionado.
- **AZ-08** — `.env` está ignorado e nenhum segredo existe no repositório.

## Limite

O andar zero não implementa login, catálogo, solicitação, devolução ou tela de Operações. Cada comportamento de produto será tratado posteriormente por uma spec própria.
