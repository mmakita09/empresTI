import { readFile } from "node:fs/promises";
import { prisma } from "../src/server/db";

type CatalogManifestItem = {
  patrimony: string; name: string; category: string;
  situation: "AVAILABLE" | "MAINTENANCE"; imageUrl: string;
  pexelsPhotoId: string; sourceUrl: string; photographer: string;
  license: string; width: number; height: number;
};

const expectedPatrimonies = Array.from({ length: 12 }, (_, index) => `TI-${String(index + 1).padStart(4, "0")}`);

async function readManifest(): Promise<CatalogManifestItem[]> {
  const path = process.env.CATALOG_MANIFEST_PATH ?? "prisma/catalog-manifest.json";
  let raw: string;
  try { raw = await readFile(path, "utf8"); }
  catch {
    console.warn(`Manifesto ausente em ${path}; seed de equipamentos adiado.`);
    return [];
  }
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed) || parsed.length !== 12) throw new Error("O manifesto deve conter exatamente 12 equipamentos.");
  const items = parsed as CatalogManifestItem[];
  const patrimonies = items.map((item) => item.patrimony);
  if (new Set(patrimonies).size !== 12 || !expectedPatrimonies.every((item) => patrimonies.includes(item))) throw new Error("O manifesto deve conter TI-0001 a TI-0012 sem duplicidade.");
  if (new Set(items.map((item) => item.pexelsPhotoId)).size !== 12) throw new Error("Cada patrimônio deve usar um photo_id Pexels diferente.");
  for (const item of items) {
    if (item.width !== 800 || item.height !== 600) throw new Error(`${item.patrimony}: a imagem deve ter 800x600.`);
    if (!item.imageUrl || !item.sourceUrl || !item.photographer || !item.license) throw new Error(`${item.patrimony}: crédito e URL da imagem são obrigatórios.`);
  }
  return items;
}

async function main() {
  const manifest = await readManifest();
  const tenant = await prisma.tenant.upsert({ where: { slug: "suporte_ti" }, update: { name: "Suporte TI" }, create: { slug: "suporte_ti", name: "Suporte TI" } });
  if (manifest.length === 0) return;
  await prisma.$transaction(manifest.map((item) => prisma.equipment.upsert({
    where: { tenantId_patrimony: { tenantId: tenant.id, patrimony: item.patrimony } },
    update: { name: item.name, category: item.category, situation: item.situation, imageUrl: item.imageUrl, imageCredit: { upsert: { create: { pexelsPhotoId: item.pexelsPhotoId, sourceUrl: item.sourceUrl, photographer: item.photographer, license: item.license, width: item.width, height: item.height }, update: { sourceUrl: item.sourceUrl, photographer: item.photographer, license: item.license, width: item.width, height: item.height } } } },
    create: { tenant: { connect: { id: tenant.id } }, patrimony: item.patrimony, name: item.name, category: item.category, situation: item.situation, imageUrl: item.imageUrl, imageCredit: { create: { pexelsPhotoId: item.pexelsPhotoId, sourceUrl: item.sourceUrl, photographer: item.photographer, license: item.license, width: item.width, height: item.height } } },
  })));
}

main().then(() => prisma.$disconnect()).catch(async (error: unknown) => { console.error(error); await prisma.$disconnect(); process.exit(1); });
