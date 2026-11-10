"use client";

import Link from "next/link";
import { trpc } from "@/trpc/client";

export default function OperationsPage() {
  const me = trpc.operations.me.useQuery();
  const tenantId = me.data?.tenantId ?? "";
  const loans = trpc.operations.openLoans.useQuery({ tenantId }, { enabled: Boolean(tenantId) });
  const markReturn = trpc.operations.markReturn.useMutation({ onSuccess: () => void loans.refetch() });
  if (me.isLoading) return <main className="catalog-shell"><p>Carregando operações…</p></main>;
  if (!tenantId) return <main className="catalog-shell"><header className="catalog-header"><div><p className="section-label">OPERAÇÕES</p><h1>Empréstimos em aberto</h1></div><Link className="login-button" href="/">Início</Link></header><p>Não há tenant vinculado à sessão.</p></main>;
  if (loans.error) return <main className="catalog-shell"><h1>Acesso restrito</h1><p>Esta tela exige o papel de Operações ou administrador.</p></main>;
  return <main className="catalog-shell"><header className="catalog-header"><div><p className="section-label">OPERAÇÕES</p><h1>Empréstimos em aberto</h1></div><Link className="login-button" href="/">Início</Link></header><section className="loan-list">{loans.data?.map((loan) => <article className="loan-row" key={loan.id}><div><p className="catalog-meta">{loan.equipment.patrimony}</p><h2>{loan.equipment.name}</h2><p>Usuário: {loan.borrower.authUserId}</p><p>Vence em: {new Date(loan.dueAt).toLocaleDateString("pt-BR")}</p></div><button className="primary-action" type="button" disabled={markReturn.isPending} onClick={() => markReturn.mutate({ tenantId, loanId: loan.id, damaged: false })}>Registrar devolução</button></article>)}</section></main>;
}
