import { describe, expect, it } from "vitest";
import { addBusinessDays, calculateDueAt, canBorrow } from "@/server/services/loan-rules";

describe("regras de empréstimo", () => {
  it("CA-06 calcula 14 dias úteis sem contar sábado e domingo", () => {
    const start = new Date("2026-11-06T12:00:00.000Z");
    expect(calculateDueAt(start).toISOString()).toBe("2026-11-26T12:00:00.000Z");
    expect(addBusinessDays(start, 0).toISOString()).toBe(start.toISOString());
  });

  it("CA-06 bloqueia a quinta solicitação quando já há cinco empréstimos ativos", () => {
    const future = new Date("2026-12-01T12:00:00.000Z");
    expect(canBorrow({ now: new Date("2026-11-11T12:00:00.000Z"), openLoans: Array.from({ length: 5 }, () => ({ status: "ACTIVE" as const, dueAt: future })) })).toEqual({ allowed: false, reason: "OPEN_LIMIT" });
  });

  it("CA-06 bloqueia nova solicitação quando há empréstimo atrasado", () => {
    expect(canBorrow({ now: new Date("2026-11-11T12:00:00.000Z"), openLoans: [{ status: "ACTIVE", dueAt: new Date("2026-11-10T12:00:00.000Z") }] })).toEqual({ allowed: false, reason: "OVERDUE" });
  });
});
