import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.resolve(__dirname, '../src/assets');

async function convertDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await convertDir(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const outPath = fullPath.replace(new RegExp(`${ext}$`), '.webp');
        
        try {
          // Skip if already exists and newer (rudimentary cache)
          if (fs.existsSync(outPath)) {
            const statOrig = fs.statSync(fullPath);
            const statWebp = fs.statSync(outPath);
            if (statWebp.mtime > statOrig.mtime) {
              // console.log(`Skipping ${entry.name} - up to date`);
              continue;
            }
          }

          await sharp(fullPath)
            .webp({ quality: 80, effort: 6 })
            .toFile(outPath);
          
          const origSize = (fs.statSync(fullPath).size / 1024).toFixed(1);
          const webpSize = (fs.statSync(outPath).size / 1024).toFixed(1);
          console.log(`Converted: ${entry.name} (${origSize}KB -> ${webpSize}KB)`);
        } catch (err) {
          console.error(`Error converting ${fullPath}:`, err);
        }
      }
    }
  }
}

console.log('--- Starting WebP Conversion ---');
convertDir(ASSETS_DIR)
  .then(() => console.log('--- Finished Conversion ---'))
  .catch(err => console.error('Fatal error:', err));
