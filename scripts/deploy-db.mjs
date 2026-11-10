import { execFileSync } from "node:child_process";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL ausente para aplicar as migrations.");

const migrationUrl = new URL(databaseUrl);
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (supabaseUrl && migrationUrl.hostname.endsWith("pooler.supabase.com")) {
  const projectRef = new URL(supabaseUrl).hostname.split(".")[0];
  migrationUrl.hostname = `db.${projectRef}.supabase.co`;
  migrationUrl.port = "5432";
  migrationUrl.searchParams.delete("pgbouncer");
}

process.env.MIGRATION_DATABASE_URL = migrationUrl.toString();
const npx = process.platform === "win32" ? "npx.cmd" : "npx";
execFileSync(npx, ["prisma", "migrate", "deploy"], { stdio: "inherit", env: process.env });
execFileSync(npx, ["prisma", "db", "seed"], { stdio: "inherit", env: process.env });
