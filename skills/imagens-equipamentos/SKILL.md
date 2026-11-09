---
name: imagens-equipamentos
description: Prepare imagens de equipamentos para o catálogo usando somente a API do Pexels, com validação de conteúdo, tamanho, créditos e idempotência.
---

# Imagens de equipamentos

Use esta skill quando o catálogo precisar selecionar, validar ou preparar fotos
de equipamentos. A skill prepara artefatos locais; ela não autoriza upload,
alteração de bucket ou qualquer escrita em produção.

## Regras obrigatórias

- A única fonte de imagem permitida é a API do Pexels.
- Nunca coloque a chave Pexels em código, arquivo versionado, log ou resposta.
  Leia-a somente de um segredo de ambiente fornecido no momento da execução.
- Cada imagem deve ser 800×600, sem pessoas, marcas, logotipos, texto legível
  ou telas de dispositivos.
- Não reutilize a mesma foto para patrimônios diferentes. Registre o `photo_id`
  do Pexels para tornar a checagem objetiva.
- Para cada imagem, registre URL de origem, fotógrafo e licença Pexels. A tela
  que exibe as fotos deve mostrar “Fotos: Pexels” com link para a origem.
- O processo deve ser idempotente: repetir a preparação não duplica fotos,
  créditos ou registros de equipamento.

## Limite de produção

Produza um manifesto local e arquivos derivados quando necessário. Upload para
Supabase Storage, criação de bucket público, seed remoto e criação de contas
exigem autorização explícita no momento da ação e devem ocorrer em passo
separado, revisável e sem imprimir segredos.

## Saída mínima

O manifesto deve relacionar patrimônio, `photo_id`, URL de origem, fotógrafo,
licença e dimensões finais. Se uma foto não satisfizer todas as regras, rejeite
o item e deixe a lacuna explícita; não invente uma imagem ou um crédito.
