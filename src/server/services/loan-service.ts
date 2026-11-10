import { prisma } from "@/server/db";
import { calculateDueAt, canBorrow } from "@/server/services/loan-rules";

export class LoanRuleError extends Error {
  constructor(public readonly code: "OPEN_LIMIT" | "OVERDUE" | "UNAVAILABLE" | "NOT_FOUND") {
    super(code);
  }
}

export async function createLoan(input: {
  tenantId: string;
  equipmentId: string;
  borrowerMembershipId: string;
  now?: Date;
}) {
  const now = input.now ?? new Date();
  return prisma.$transaction(async (tx) => {
    const membership = await tx.membership.findFirst({ where: { id: input.borrowerMembershipId, tenantId: input.tenantId } });
    if (!membership) throw new LoanRuleError("NOT_FOUND");

    const openLoans = await tx.loan.findMany({
      where: { tenantId: input.tenantId, borrowerMembershipId: input.borrowerMembershipId, status: "ACTIVE" },
      select: { dueAt: true, status: true },
    });
    const eligibility = canBorrow({ openLoans, now });
    if (!eligibility.allowed) throw new LoanRuleError(eligibility.reason);

    const claimed = await tx.equipment.updateMany({
      where: { id: input.equipmentId, tenantId: input.tenantId, situation: "AVAILABLE" },
      data: { situation: "BORROWED" },
    });
    if (claimed.count !== 1) throw new LoanRuleError("UNAVAILABLE");

    const loan = await tx.loan.create({
      data: {
        tenantId: input.tenantId,
        equipmentId: input.equipmentId,
        borrowerMembershipId: input.borrowerMembershipId,
        requestedAt: now,
        dueAt: calculateDueAt(now),
      },
    });
    await tx.auditEvent.create({
      data: {
        tenantId: input.tenantId,
        actorMembershipId: input.borrowerMembershipId,
        loanId: loan.id,
        action: "LOAN_CREATED",
        entityType: "LOAN",
        entityId: loan.id,
        metadata: { equipmentId: input.equipmentId },
      },
    });
    return loan;
  });
}

export async function returnLoan(input: {
  tenantId: string;
  loanId: string;
  actorMembershipId: string;
  damaged: boolean;
  now?: Date;
}) {
  const now = input.now ?? new Date();
  return prisma.$transaction(async (tx) => {
    const loan = await tx.loan.findFirst({ where: { id: input.loanId, tenantId: input.tenantId, status: "ACTIVE" } });
    if (!loan) throw new LoanRuleError("NOT_FOUND");
    const updated = await tx.loan.update({
      where: { id: loan.id },
      data: { status: "RETURNED", returnedAt: now, returnedByMembershipId: input.actorMembershipId, damageReported: input.damaged },
    });
    await tx.equipment.update({
      where: { id: loan.equipmentId },
      data: { situation: input.damaged ? "MAINTENANCE" : "AVAILABLE" },
    });
    await tx.auditEvent.create({
      data: {
        tenantId: input.tenantId,
        actorMembershipId: input.actorMembershipId,
        loanId: loan.id,
        action: input.damaged ? "LOAN_RETURNED_DAMAGED" : "LOAN_RETURNED",
        entityType: "LOAN",
        entityId: loan.id,
        metadata: { damaged: input.damaged },
      },
    });
    return updated;
  });
}
