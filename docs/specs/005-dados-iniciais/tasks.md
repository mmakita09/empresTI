# Tarefas — Spec 005

- [x] Especificar modelo `Equipment` e `ImageCredit`.
- [x] Criar migration aprovada (validada com `prisma validate` e `prisma migrate status` no Docker local).
- [x] Criar skill `imagens-equipamentos` e registrar o contrato Pixabay.
- [x] Implementar processamento local 800×600 com rejeição de duplicatas (script de coleta e finalização criado; depende de chave no ambiente local e revisão humana).
- [ ] Implementar seed idempotente dos 12 equipamentos.
- [ ] Executar verificação independente da spec.
- [ ] Fazer upload manual controlado e verificar produção.
