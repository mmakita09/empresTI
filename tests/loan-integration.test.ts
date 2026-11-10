import { afterEach, describe, expect, it } from "vitest";
import { prisma } from "@/server/db";
import { returnLoan } from "@/server/services/loan-service";

const created: { membershipId?: string; loanIds: string[] } = { loanIds: [] };

afterEach(async () => {
  if (created.loanIds.length) await prisma.auditEvent.deleteMany({ where: { loanId: { in: created.loanIds } } });
  if (created.loanIds.length) await prisma.loan.deleteMany({ where: { id: { in: created.loanIds } } });
  if (created.membershipId) await prisma.membership.delete({ where: { id: created.membershipId } });
  created.loanIds = [];
  created.membershipId = undefined;
});

describe("primeira fatia no PostgreSQL local", () => {
  it("CA-05 impede dois empréstimos ativos para o mesmo equipamento", async () => {
    const tenant = await prisma.tenant.findFirstOrThrow();
    const equipment = await prisma.equipment.findFirstOrThrow({ where: { tenantId: tenant.id } });
    const membership = await prisma.membership.create({ data: { tenantId: tenant.id, authUserId: crypto.randomUUID(), role: "COLLABORATOR" } });
    created.membershipId = membership.id;
    const first = await prisma.loan.create({ data: { tenantId: tenant.id, equipmentId: equipment.id, borrowerMembershipId: membership.id, dueAt: new Date("2030-01-01T00:00:00.000Z") } });
    created.loanIds.push(first.id);
    await expect(prisma.loan.create({ data: { tenantId: tenant.id, equipmentId: equipment.id, borrowerMembershipId: membership.id, dueAt: new Date("2030-01-01T00:00:00.000Z") } })).rejects.toThrow();
  });

  it("CA-08 e CA-09 registra devolução, horário, avaria e auditoria append-only", async () => {
    const tenant = await prisma.tenant.findFirstOrThrow();
    const equipment = await prisma.equipment.findFirstOrThrow({ where: { tenantId: tenant.id } });
    const membership = await prisma.membership.create({ data: { tenantId: tenant.id, authUserId: crypto.randomUUID(), role: "OPERATIONS" } });
    created.membershipId = membership.id;
    const loan = await prisma.loan.create({ data: { tenantId: tenant.id, equipmentId: equipment.id, borrowerMembershipId: membership.id, dueAt: new Date("2030-01-01T00:00:00.000Z") } });
    created.loanIds.push(loan.id);
    const returned = await returnLoan({ tenantId: tenant.id, loanId: loan.id, actorMembershipId: membership.id, damaged: true, now: new Date("2026-11-11T12:00:00.000Z") });
    const updatedEquipment = await prisma.equipment.findUniqueOrThrow({ where: { id: equipment.id } });
    const audit = await prisma.auditEvent.findFirstOrThrow({ where: { loanId: loan.id, action: "LOAN_RETURNED_DAMAGED" } });
    expect(returned.returnedAt?.toISOString()).toBe("2026-11-11T12:00:00.000Z");
    expect(returned.damageReported).toBe(true);
    expect(updatedEquipment.situation).toBe("MAINTENANCE");
    expect(audit.entityId).toBe(loan.id);
    expect(await prisma.auditEvent.count({ where: { loanId: loan.id } })).toBeGreaterThan(0);
  });
});
