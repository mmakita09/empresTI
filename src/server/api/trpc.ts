import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export type Context = {
  requestId: string;
};

export function createContext(): Context {
  return { requestId: crypto.randomUUID() };
}

const t = initTRPC.context<Context>().create({ transformer: superjson });

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
