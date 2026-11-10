import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/server/db";
import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";

async function operationsMembership(userId: string, tenantId: string) {
  const membership = await prisma.membership.findFirst({ where: { authUserId: userId, tenantId } });
  if (!membership || (membership.role !== "ADMIN" && membership.role !== "OPERATIONS")) throw new TRPCError({ code: "FORBIDDEN" });
  return membership;
}

export const operationsRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => prisma.membership.findFirst({ where: { authUserId: ctx.userId }, select: { tenantId: true, role: true } })),
  openLoans: protectedProcedure.input(z.object({ tenantId: z.string().uuid() })).query(async ({ ctx, input }) => {
    await operationsMembership(ctx.userId, input.tenantId);
    return prisma.loan.findMany({ where: { tenantId: input.tenantId, status: "ACTIVE" }, orderBy: { dueAt: "asc" }, include: { equipment: { select: { patrimony: true, name: true } }, borrower: { select: { authUserId: true, role: true } } } });
  }),
  markReturn: protectedProcedure.input(z.object({ tenantId: z.string().uuid(), loanId: z.string().uuid(), damaged: z.boolean() })).mutation(async ({ ctx, input }) => {
    const membership = await operationsMembership(ctx.userId, input.tenantId);
    const loan = await prisma.loan.findFirst({ where: { id: input.loanId, tenantId: input.tenantId, status: "ACTIVE" } });
    if (!loan) throw new TRPCError({ code: "NOT_FOUND" });
    const { returnLoan } = await import("@/server/services/loan-service");
    return returnLoan({ tenantId: input.tenantId, loanId: input.loanId, actorMembershipId: membership.id, damaged: input.damaged });
  }),
});
