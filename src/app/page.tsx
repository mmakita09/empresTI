import { HealthCard } from "./health-card";

export default function Home() {
  return (
    <main>
      <span className="eyebrow">EmpresTI</span>
      <h1>Andar zero</h1>
      <p>
        Next.js, tRPC, Prisma e PostgreSQL estão conectados antes da primeira
        funcionalidade do produto.
      </p>
      <HealthCard />
    </main>
  );
}
