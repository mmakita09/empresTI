import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, "prisma", "catalog-manifest.json");
const candidatesPath = path.join(root, "prisma", "catalog-candidates.json");
const imageDir = path.join(root, "prisma", "catalog-images");
const equipment = [
  ["TI-0001", "Notebook", "notebook computer"], ["TI-0002", "Notebook", "notebook computer"],
  ["TI-0003", "Notebook", "notebook computer"], ["TI-0004", "Notebook", "notebook computer"],
  ["TI-0005", "Monitor", "computer monitor"], ["TI-0006", "Monitor", "computer monitor"],
  ["TI-0007", "Monitor", "computer monitor"], ["TI-0008", "Cabo", "computer cable"],
  ["TI-0009", "Cabo", "computer cable"], ["TI-0010", "Cabo", "computer cable"],
  ["TI-0011", "Webcam", "webcam"], ["TI-0012", "Câmera compacta", "compact camera"],
];
const apiKey = process.env.PIXABAY_API_KEY;
if (!apiKey) throw new Error("Defina PIXABAY_API_KEY somente no ambiente de execução.");

async function search(query) {
  const url = new URL("https://pixabay.com/api/");
  url.searchParams.set("key", apiKey); url.searchParams.set("q", query);
  url.searchParams.set("image_type", "photo"); url.searchParams.set("orientation", "horizontal");
  url.searchParams.set("safesearch", "true"); url.searchParams.set("per_page", "20");
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Pixabay respondeu ${response.status}.`);
  return response.json();
}

async function collect() {
  const byQuery = new Map();
  for (const [, , query] of equipment) if (!byQuery.has(query)) byQuery.set(query, await search(query));
  const candidates = equipment.map(([patrimony, name, query]) => ({
    patrimony, name, category: name, query,
    hits: byQuery.get(query).hits.map((hit) => ({ imageId: String(hit.id), pageURL: hit.pageURL, imageURL: hit.largeImageURL, photographer: hit.user, width: hit.imageWidth, height: hit.imageHeight, tags: hit.tags })),
  }));
  await writeFile(candidatesPath, JSON.stringify(candidates, null, 2));
  console.log(`Candidatos salvos em ${candidatesPath}. Revise pessoas, marcas, logos, texto e telas antes de aprovar.`);
}

async function finalize() {
  const { default: sharp } = await import("sharp");
  const approved = JSON.parse(await readFile(candidatesPath, "utf8"));
  if (approved.some((item) => !item.selected)) throw new Error("Marque uma imagem aprovada por patrimônio com selected=true.");
  const selected = approved.map((item) => item.selected);
  if (new Set(selected.map((item) => item.imageId)).size !== 12) throw new Error("As imagens aprovadas devem ser únicas.");
  await mkdir(imageDir, { recursive: true });
  const manifest = [];
  for (const item of approved) {
    const source = await fetch(item.selected.imageURL);
    if (!source.ok) throw new Error(`${item.patrimony}: falha ao baixar a imagem.`);
    const output = path.join(imageDir, `${item.patrimony}.jpg`);
    await sharp(Buffer.from(await source.arrayBuffer())).resize(800, 600, { fit: "cover" }).jpeg({ quality: 85 }).toFile(output);
    manifest.push({ patrimony: item.patrimony, name: item.name, category: item.category, situation: ["TI-0004", "TI-0007", "TI-0010"].includes(item.patrimony) ? "MAINTENANCE" : "AVAILABLE", imageUrl: `catalog-images/${item.patrimony}.jpg`, pixabayImageId: item.selected.imageId, sourceUrl: item.selected.pageURL, photographer: item.selected.photographer, license: "Pixabay Content License", width: 800, height: 600 });
  }
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Manifesto final salvo em ${manifestPath}.`);
}

if (process.argv.includes("--collect")) await collect();
else if (process.argv.includes("--finalize")) await finalize();
else throw new Error("Use --collect ou --finalize.");
