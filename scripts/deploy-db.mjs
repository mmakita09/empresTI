import { execFileSync } from "node:child_process";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL ausente para aplicar as migrations.");

const migrationUrl = new URL(databaseUrl);
if (migrationUrl.hostname.endsWith("pooler.supabase.com")) {
  // O pooler em 6543 é transacional; o modo sessão em 5432 aceita o Prisma Migrate.
  migrationUrl.port = "5432";
  migrationUrl.searchParams.delete("pgbouncer");
}

process.env.MIGRATION_DATABASE_URL = migrationUrl.toString();
const npx = process.platform === "win32" ? "npx.cmd" : "npx";
execFileSync(npx, ["prisma", "migrate", "deploy"], { stdio: "inherit", env: process.env });
execFileSync(npx, ["prisma", "db", "seed"], { stdio: "inherit", env: process.env });
