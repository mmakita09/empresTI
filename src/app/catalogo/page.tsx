"use client";

import Link from "next/link";
import { trpc } from "@/trpc/client";
import { LogoutButton } from "@/app/logout-button";

export default function CatalogPage() {
  const catalog = trpc.catalog.list.useQuery();
  const loans = trpc.loans.mine.useQuery();
  const createLoan = trpc.loans.create.useMutation({ onSuccess: () => { void catalog.refetch(); void loans.refetch(); } });

  if (catalog.isLoading) return <main className="catalog-shell"><p>Carregando catálogo…</p></main>;
  if (catalog.error) return <main className="catalog-shell"><h1>Catálogo protegido</h1><p>Entre com uma conta convidada para consultar seus equipamentos.</p><Link href="/login">Voltar ao login</Link></main>;
  if (!catalog.data?.tenantId) return <main className="catalog-shell"><h1>Conta sem tenant</h1><p>Peça ao administrador para vincular sua conta ao tenant.</p></main>;

  return <main className="catalog-shell">
    <header className="catalog-header"><div><p className="section-label">CATÁLOGO</p><h1>Equipamentos disponíveis</h1></div><LogoutButton /></header>
    <p className="catalog-status">{loans.data?.length ?? 0} empréstimo(s) em aberto.</p>
    <section className="catalog-grid" aria-label="Equipamentos">
      {catalog.data.equipment.map((item) => <article className="catalog-card" key={item.id}>
        <img src={item.imageUrl} alt="" />
        <div><p className="catalog-meta">{item.patrimony} · {item.category}</p><h2>{item.name}</h2><p>{item.situation === "AVAILABLE" ? "Disponível" : item.situation === "MAINTENANCE" ? "Em manutenção" : "Emprestado"}</p><p className="catalog-credit">Fotos: <a href={item.imageCredit.sourceUrl} target="_blank" rel="noreferrer">Pixabay</a> · {item.imageCredit.photographer}</p></div>
        {item.situation === "AVAILABLE" && <button className="primary-action" type="button" disabled={createLoan.isPending} onClick={() => createLoan.mutate({ tenantId: catalog.data.tenantId!, equipmentId: item.id })}>{createLoan.isPending ? "Solicitando…" : "Solicitar"}</button>}
      </article>)}
    </section>
  </main>;
}
