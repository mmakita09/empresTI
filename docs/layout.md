# Layout do EmpresTI

Este arquivo registra a composição aprovada para a entrega atual, limitada à
landing page e à tela visual de login. Os tokens e estados reutilizáveis ficam
no ADR-002.

## Landing page

- `topbar`: marca à esquerda; navegação informativa; alternador de tema e
  entrada para `/login` à direita.
- `hero`: título, descrição curta e ações informativas à esquerda; composição
  visual de notebook, câmera e cabo à direita.
- `process`: explicação curta do problema que o EmpresTI resolve.
- `features`: três cartões para catálogo, solicitação e devolução; enquanto os
  fluxos não existirem, os cartões não simulam estados de negócio.
- `footer`: nome do produto e estado técnico opcional.

## Login visual

- painel central com marca, título, descrição, e-mail corporativo, senha,
  botão desabilitado e retorno para a landing.
- o botão informa que o primeiro acesso ainda depende de decisão de negócio;
  nenhum dado é enviado.

## Responsividade

- acima de 800 px: hero em duas colunas e cartões em três colunas;
- até 800 px: hero e cartões em uma coluna, navegação reduzida;
- até 480 px: ações empilhadas e ilustrações reduzidas;
- conteúdo não pode exigir rolagem horizontal.

## Temas

O modo inicial é claro. O alternador aplica a classe `theme-dark` no elemento
`html` e persiste `empres-ti-theme` no navegador. A paleta dos dois temas está
no ADR-002.
