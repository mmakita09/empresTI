import { getHealth } from "@/server/services/health";

export async function GET() {
  const health = await getHealth();
  return Response.json(health, { status: health.status === "ok" ? 200 : 503 });
}
