import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getHealth } from "@/server/services/health";

export const healthRouter = createTRPCRouter({
  check: publicProcedure.query(() => getHealth()),
});
