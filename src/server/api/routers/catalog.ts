import { z } from "zod";
import { prisma } from "@/server/db";
import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";

export const catalogRouter = createTRPCRouter({
  list: protectedProcedure.input(z.object({ tenantId: z.string().uuid().optional() }).optional()).query(async ({ ctx, input }) => {
    const membership = await prisma.membership.findFirst({ where: { authUserId: ctx.userId, ...(input?.tenantId ? { tenantId: input.tenantId } : {}) } });
    if (!membership) return { tenantId: null, equipment: [] };
    const equipment = await prisma.equipment.findMany({ where: { tenantId: membership.tenantId }, orderBy: { patrimony: "asc" }, select: { id: true, patrimony: true, name: true, category: true, situation: true, imageUrl: true, imageCredit: { select: { sourceUrl: true, photographer: true } } } });
    return { tenantId: membership.tenantId, equipment };
  }),
});
