import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { TRPCError } from "@trpc/server";
import { getAuthenticatedUserId } from "@/server/auth";

export type Context = {
  requestId: string;
  userId?: string;
};

export async function createContext(): Promise<Context> {
  return { requestId: crypto.randomUUID(), userId: await getAuthenticatedUserId() ?? undefined };
}

const t = initTRPC.context<Context>().create({ transformer: superjson });

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});
