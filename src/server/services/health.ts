import { prisma } from "@/server/db";

export type HealthStatus = {
  status: "ok" | "unavailable";
  database: "conexão disponível" | "não foi possível conectar ao banco";
};

export async function getHealth(): Promise<HealthStatus> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: "ok", database: "conexão disponível" };
  } catch {
    return {
      status: "unavailable",
      database: "não foi possível conectar ao banco",
    };
  }
}
