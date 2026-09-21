# PRD — Empréstimo de Equipamentos Internos

**Versão:** 1  
**Responsável:** time de Operações

## Problema

O controle de quem pegou qual equipamento — notebooks, monitores, cabos e
câmeras — é feito atualmente em uma planilha compartilhada. Ninguém sabe com
segurança o que está disponível, itens somem e a devolução só é registrada se
alguém lembrar de atualizar a linha correspondente.

## Quem usa

- **Colaborador:** consulta o catálogo, solicita um item emprestado e registra a
  devolução.
- **Operações:** cadastra equipamentos, consulta quem está com cada item e
  registra devoluções realizadas no balcão.

## O que precisa existir na primeira versão

1. Login, permitindo que cada pessoa veja os próprios empréstimos.
2. Catálogo de equipamentos com a situação de cada item.
3. Solicitação de empréstimo de um item disponível.
4. Devolução de um item que está com o próprio colaborador.
5. Tela de Operações com todos os empréstimos em aberto.

## Regras já decididas por Operações

- Cada pessoa pode estar com, no máximo, três itens ao mesmo tempo.
- O prazo padrão de devolução é de 14 dias.
- Quem possui item em atraso não pode pegar outro item emprestado.
- Equipamento em manutenção não aparece como disponível.

## Fora do escopo desta versão

- Reserva de equipamento para uma data futura.
- Notificação por e-mail.
- Importação da planilha atual.

## Critério de sucesso

Operações consegue abandonar a planilha depois de duas semanas de uso do
sistema.

## Questões em aberto

O PRD não responde às questões abaixo. Elas precisam ser esclarecidas com o time
de Operações antes da especificação das funcionalidades correspondentes:

1. Quem pode criar uma conta e como o primeiro acesso é concedido?
2. A solicitação reserva o equipamento imediatamente ou exige aprovação de
   Operações?
3. Quem pode registrar uma devolução: o colaborador, Operações ou ambos?
4. Como devem ser calculados os 14 dias: dias corridos ou dias úteis?
5. O que deve acontecer quando um equipamento devolvido apresenta avaria?
