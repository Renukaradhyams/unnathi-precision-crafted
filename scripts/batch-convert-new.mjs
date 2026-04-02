import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const images = [
  'src/assets/Main_photos/11.f. final packing carton box.jpeg',
  'src/assets/Main_photos/3.k. equipment usage photo.jpeg',
  'src/assets/Main_photos/4.m. finished goods storage area.jpeg',
  'src/assets/Main_photos/4.p.q.jpeg',
  'src/assets/Main_photos/8.c. fixture storage.jpeg',
  'src/assets/Main_photos/8.c. tool holder storage.jpeg',
  'src/assets/Main_photos/8.c. tool storage.jpeg',
  'src/assets/Unnathi-03-web content/Rejection bin.jpeg',
  'src/assets/Unnathi-03-web content/eye wash station.jpeg'
];

async function convertAll() {
  for (const img of images) {
    const output = img.replace(/\.jpe?g$/i, '.webp');
    try {
      if (!fs.existsSync(img)) {
        console.warn(`File not found: ${img}`);
        continue;
      }
      const data = fs.readFileSync(img);
      const buf = await sharp(data)
        .webp({ quality: 72, effort: 5 })
        .toBuffer();
      
      fs.writeFileSync(output, buf);
      console.log(`Converted: ${path.basename(img)} -> ${path.basename(output)} (${Math.round(buf.length / 1024)}KB)`);
      
      // Delete original
      fs.unlinkSync(img);
      console.log(`Deleted original: ${path.basename(img)}`);
    } catch (err) {
      console.error(`Error processing ${img}: ${err.message}`);
    }
  }
}

convertAll();
