// IMPORTANT: This script generates favicon PNGs from the existing square company logo.
// Inputs:
//   - src/assets/logo.png (preferred square logo)
// Outputs (written to public/):
//   - favicon-16.png, favicon-32.png, favicon-48.png, apple-touch-icon.png (180x180)
//
// Usage:
//   npm run generate:favicons
//
// Notes:
// - Keeps aspect ratio; pads to square with transparent background if needed
// - Uses lossless compression suitable for favicons

import fs from "fs";
import path from "path";
import sharp from "sharp";

const projectRoot = path.resolve(process.cwd());
const inputLogo = path.join(projectRoot, "src", "assets", "logo.png");
const outDir = path.join(projectRoot, "public");

const targets = [
  { name: "favicon-16.png", size: 16 },
  { name: "favicon-32.png", size: 32 },
  { name: "favicon-48.png", size: 48 },
  { name: "apple-touch-icon.png", size: 180 },
];

async function ensureInput() {
  if (!fs.existsSync(inputLogo)) {
    throw new Error(`Logo not found at ${inputLogo}. Please add a square logo at src/assets/logo.png`);
  }
}

async function generateOne(outputPath, size) {
  const pipeline = sharp(inputLogo)
    .resize({
      width: size,
      height: size,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      effort: 10,
    });
  await pipeline.toFile(outputPath);
}

async function run() {
  await ensureInput();
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const results = [];
  for (const t of targets) {
    const outPath = path.join(outDir, t.name);
    await generateOne(outPath, t.size);
    results.push({ file: t.name, size: t.size });
  }

  console.log("Favicons generated:");
  for (const r of results) {
    console.log(` - ${r.file} (${r.size}x${r.size})`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

