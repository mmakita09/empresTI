"use client";

import { trpc } from "@/trpc/client";

export function HealthCard() {
  const health = trpc.health.check.useQuery(undefined, { retry: false });

  if (health.isPending) return <p className="status">Verificando ambiente…</p>;
  if (health.isError) return <p className="status error">Ambiente indisponível</p>;

  return (
    <p className={`status ${health.data.status === "ok" ? "ok" : "error"}`}>
      Aplicação: {health.data.status} · Banco: {health.data.database}
    </p>
  );
}
