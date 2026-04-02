import fs from 'fs';
import path from 'path';

const filePath = 'c:/Users/Aradhya/Downloads/unnathi-precision-crafted/config/media.config.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace .png, .jpg, .jpeg extensions in path strings
content = content.replace(/\.png"/g, '.webp"');
content = content.replace(/\.jpg"/g, '.webp"');
content = content.replace(/\.jpeg"/g, '.webp"');

fs.writeFileSync(filePath, content);
console.log('Successfully updated media.config.ts paths to WebP');
