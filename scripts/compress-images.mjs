/**
 * Image compression script using Sharp.
 * Compresses all WebP files > 120KB in src/assets to reduce load times.
 * Run: node scripts/compress-images.mjs
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('src/assets');
const THRESHOLD_KB = 120;
const QUALITY = 72;   // Good quality/size tradeoff for WebP

function walkDir(dir, results = []) {
  try {
    for (const entry of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, entry);
      if (fs.statSync(fullPath).isDirectory()) {
        walkDir(fullPath, results);
      } else if (/\.(webp|jpg|jpeg|png)$/i.test(entry)) {
        results.push(fullPath);
      }
    }
  } catch (e) {
    // skip unreadable dirs
  }
  return results;
}

async function run() {
  const allImages = walkDir(ROOT);
  let totalSaved = 0;
  let processed = 0;

  for (const imgPath of allImages) {
    const sizeBefore = fs.statSync(imgPath).size;
    if (sizeBefore < THRESHOLD_KB * 1024) continue;

    try {
      // Read input as buffer to avoid Windows path-with-spaces issues
      const inputBuffer = fs.readFileSync(imgPath);
      const buf = await sharp(inputBuffer)
        .webp({ quality: QUALITY, effort: 5 })
        .toBuffer();

      const sizeAfter = buf.length;
      if (sizeAfter < sizeBefore) {
        fs.writeFileSync(imgPath, buf);
        const saved = sizeBefore - sizeAfter;
        totalSaved += saved;
        processed++;
        console.log(
          `OK ${Math.round(sizeBefore / 1024)}KB -> ${Math.round(sizeAfter / 1024)}KB` +
          ` (saved ${Math.round(saved / 1024)}KB) -- ${path.relative(ROOT, imgPath)}`
        );
      } else {
        console.log(`SKIP ${path.relative(ROOT, imgPath)} already optimal`);
      }
    } catch (err) {
      console.error(`ERR ${imgPath} -- ${err.message}`);
    }
  }

  console.log(`\n── Summary ──`);
  console.log(`Compressed: ${processed} files`);
  console.log(`Total saved: ${Math.round(totalSaved / 1024)}KB`);
}

run();
