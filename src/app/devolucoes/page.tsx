"use client";

import Link from "next/link";
import { trpc } from "@/trpc/client";

export default function ReturnsPage() {
  const loans = trpc.loans.mine.useQuery();
  const catalog = trpc.catalog.list.useQuery();
  const returnLoan = trpc.loans.return.useMutation({ onSuccess: () => void loans.refetch() });
  if (loans.isLoading) return <main className="catalog-shell"><p>Carregando empréstimos…</p></main>;
  if (loans.error) return <main className="catalog-shell"><h1>Devoluções</h1><p>Entre com uma conta convidada para consultar seus empréstimos.</p><Link href="/login">Voltar ao login</Link></main>;
  return <main className="catalog-shell"><header className="catalog-header"><div><p className="section-label">DEVOLUÇÕES</p><h1>Meus empréstimos</h1></div><Link className="login-button" href="/catalogo">Catálogo</Link></header><section className="loan-list" aria-label="Empréstimos em aberto">{loans.data?.length ? loans.data.map((loan) => <article className="loan-row" key={loan.id}><div><p className="catalog-meta">{loan.equipment.patrimony}</p><h2>{loan.equipment.name}</h2><p>Devolução prevista: {new Date(loan.dueAt).toLocaleDateString("pt-BR")}</p></div><div className="loan-actions"><button className="primary-action" type="button" disabled={returnLoan.isPending || !catalog.data?.tenantId} onClick={() => { if (window.confirm("O equipamento voltou sem avaria?")) returnLoan.mutate({ tenantId: catalog.data?.tenantId ?? "", loanId: loan.id, damaged: false }); }}>Devolver sem avaria</button><button className="secondary-action" type="button" disabled={returnLoan.isPending || !catalog.data?.tenantId} onClick={() => returnLoan.mutate({ tenantId: catalog.data?.tenantId ?? "", loanId: loan.id, damaged: true })}>Registrar avaria</button></div></article>) : <p>Nenhum empréstimo em aberto.</p>}</section></main>;
}
