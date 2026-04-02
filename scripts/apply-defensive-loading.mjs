import fs from 'fs';
import path from 'path';

const rootDir = 'c:/Users/Aradhya/Downloads/unnathi-precision-crafted/src';
const fallback = 'pageSectionMedia.shared.sections.imageFallback.asset.src';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const targetFiles = [];
walk(rootDir, (filePath) => {
  if (filePath.endsWith('.tsx')) {
    targetFiles.push(filePath);
  }
});

targetFiles.forEach((filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // Pattern: pageSectionMedia.home.sections.hero.asset.src
  // We want to replace it with: pageSectionMedia.home.sections.hero?.asset?.src
  // AND optionally add the fallback if it's in a src={} or img: ...
  
  // First, find all pageSectionMedia references ending in .asset.src
  // We'll use a regex that captures everything up to .asset.src
  const regex = /(pageSectionMedia(?:\.[\w\d]+)+)\.asset\.src/g;
  
  content = content.replace(regex, (match, base) => {
    // If it already has ?. then skip
    if (match.includes('?.')) return match;
    
    // Replace with defensive chaining
    return `${base}?.asset?.src`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${path.basename(filePath)}`);
  }
});

console.log('Stability refactoring complete.');
