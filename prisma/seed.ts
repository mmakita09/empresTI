import { prisma } from "../src/server/db";

async function main() {
  await prisma.tenant.upsert({
    where: { slug: "suporte_ti" },
    update: { name: "Suporte TI" },
    create: { slug: "suporte_ti", name: "Suporte TI" },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
