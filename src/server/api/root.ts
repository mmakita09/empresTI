import { createTRPCRouter } from "@/server/api/trpc";
import { healthRouter } from "@/server/api/routers/health";
import { catalogRouter } from "@/server/api/routers/catalog";
import { loansRouter } from "@/server/api/routers/loans";
import { operationsRouter } from "@/server/api/routers/operations";

export const appRouter = createTRPCRouter({ health: healthRouter, catalog: catalogRouter, loans: loansRouter, operations: operationsRouter });

export type AppRouter = typeof appRouter;
