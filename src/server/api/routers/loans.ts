import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/server/db";
import { createLoan, LoanRuleError, returnLoan } from "@/server/services/loan-service";
import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";

async function membershipForUser(userId: string, tenantId?: string) {
  return prisma.membership.findFirst({ where: { authUserId: userId, ...(tenantId ? { tenantId } : {}) } });
}

export const loansRouter = createTRPCRouter({
  mine: protectedProcedure.input(z.object({ tenantId: z.string().uuid().optional() }).optional()).query(async ({ ctx, input }) => {
    const membership = await membershipForUser(ctx.userId, input?.tenantId);
    if (!membership) return [];
    return prisma.loan.findMany({ where: { tenantId: membership.tenantId, borrowerMembershipId: membership.id, status: "ACTIVE" }, orderBy: { dueAt: "asc" }, include: { equipment: { select: { patrimony: true, name: true, category: true } } } });
  }),
  create: protectedProcedure.input(z.object({ tenantId: z.string().uuid(), equipmentId: z.string().uuid() })).mutation(async ({ ctx, input }) => {
    const membership = await membershipForUser(ctx.userId, input.tenantId);
    if (!membership) throw new TRPCError({ code: "FORBIDDEN" });
    try {
      return await createLoan({ tenantId: input.tenantId, equipmentId: input.equipmentId, borrowerMembershipId: membership.id });
    } catch (error) {
      if (error instanceof LoanRuleError) throw new TRPCError({ code: error.code === "NOT_FOUND" ? "NOT_FOUND" : "CONFLICT", message: error.code });
      throw error;
    }
  }),
  return: protectedProcedure.input(z.object({ tenantId: z.string().uuid(), loanId: z.string().uuid(), damaged: z.boolean() })).mutation(async ({ ctx, input }) => {
    const membership = await membershipForUser(ctx.userId, input.tenantId);
    if (!membership) throw new TRPCError({ code: "FORBIDDEN" });
    try {
      return await returnLoan({ tenantId: input.tenantId, loanId: input.loanId, actorMembershipId: membership.id, damaged: input.damaged });
    } catch (error) {
      if (error instanceof LoanRuleError) throw new TRPCError({ code: "NOT_FOUND", message: error.code });
      throw error;
    }
  }),
});
