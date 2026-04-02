import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const input = 'src/assets/Unnathi-03-web content/Pickling tank.jpeg';
const output = 'src/assets/Unnathi-03-web content/Pickling tank.webp';

async function convert() {
  try {
    const inputBuffer = fs.readFileSync(input);
    const buf = await sharp(inputBuffer)
      .webp({ quality: 72, effort: 5 })
      .toBuffer();
    
    fs.writeFileSync(output, buf);
    console.log(`Successfully converted and compressed to ${output}`);
    
    // Check if output is smaller or reasonably sized
    const sizeAfter = buf.length;
    console.log(`Final size: ${Math.round(sizeAfter / 1024)}KB`);
  } catch (err) {
    console.error(`Error during conversion: ${err.message}`);
    process.exit(1);
  }
}

convert();
