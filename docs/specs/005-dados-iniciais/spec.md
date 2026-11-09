# Spec 005 — Dados iniciais do catálogo

## Estado

Rascunho para aprovação antes de qualquer migration, seed remoto ou upload.

## Objetivo

Disponibilizar no ambiente de produção os 12 equipamentos definidos pela
prática, cada um com patrimônio, nome, categoria, situação e imagem pública.

## Critérios de aceitação

- CA-01: existem exatamente 12 equipamentos, com patrimônios TI-0001 a
  TI-0012, sem duplicidade.
- CA-02: a lista detalhada da prática é a fonte por patrimônio: TI-0004,
  TI-0007 e TI-0010 estão em manutenção; os outros nove estão disponíveis.
  O resumo do briefing cita apenas TI-0004 e TI-0007 e diz “os outros 10”,
  portanto há uma divergência registrada, não ocultada; o seed segue a lista
  detalhada até correção formal do material.
- CA-03: cada equipamento tem uma imagem Pexels única, sem pessoa, marca, logo,
  texto ou tela legível, redimensionada para 800×600.
- CA-04: cada imagem tem crédito de origem, fotógrafo e licença registrados.
- CA-05: as imagens ficam em bucket público do Supabase Storage e podem ser
  abertas sem sessão.
- CA-06: repetir o processo não cria equipamento, imagem ou crédito duplicado.
- CA-07: a conta de correção prevista pela prática começa sem empréstimos.

## Fora de escopo

Catálogo visual, cadastro pela interface, importação da planilha e empréstimos.

## Dependências e bloqueios

- chave Pexels em segredo, nunca em código ou git;
- aprovação da migration e do processo de bootstrap da conta;
- execução manual controlada do seed e upload no ambiente de produção.
