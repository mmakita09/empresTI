import { createTRPCRouter } from "@/server/api/trpc";
import { healthRouter } from "@/server/api/routers/health";
import { catalogRouter } from "@/server/api/routers/catalog";
import { loansRouter } from "@/server/api/routers/loans";

export const appRouter = createTRPCRouter({ health: healthRouter, catalog: catalogRouter, loans: loansRouter });

export type AppRouter = typeof appRouter;
