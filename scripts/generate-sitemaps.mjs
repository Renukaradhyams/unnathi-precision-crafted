import fs from 'node:fs';
import path from 'node:path';

const siteUrl = 'https://www.unnathicnc.com';
const routes = [
  '/', '/about', '/capabilities', '/infrastructure', '/industries', '/gallery', '/leadership', '/quality', '/careers', '/news', '/contact', '/units',
  '/units/unit-1', '/units/unit-2', '/units/unit-3', '/units/tumakuru',
];

const images = [
  { path: '/', image: '/images/cnc-machining-bangalore-hero.svg', title: 'CNC Machining Center Bangalore', caption: 'Advanced CNC machining center facility at UNNATHI CNC Technologies' },
  { path: '/gallery', image: '/images/cnc-manufacturing-gallery-floor.svg', title: 'Manufacturing Floor', caption: 'State-of-the-art production floor and precision machining setup' },
  { path: '/gallery', image: '/images/cnc-turning-operation.svg', title: 'CNC Turning Bangalore', caption: 'High precision CNC turning operation for aerospace components' },
  { path: '/gallery', image: '/images/cnc-milling-operation.svg', title: 'CNC Milling Bangalore', caption: 'Advanced CNC milling machine for precision engineering parts' },
  { path: '/infrastructure', image: '/images/manufacturing-infrastructure-bangalore.svg', title: 'Manufacturing Infrastructure India', caption: 'Precision manufacturing infrastructure and plant layout in Bangalore' },
  { path: '/units/unit-1', image: '/images/manufacturing-infrastructure-bangalore.svg', title: 'Unit 1 Bangalore', caption: 'UNNATHI Unit 1 — CNC turning and precision machining specialist' },
  { path: '/units/unit-2', image: '/images/manufacturing-infrastructure-bangalore.svg', title: 'Unit 2 Bangalore', caption: 'UNNATHI Unit 2 — CNC milling and 5-axis machining center' },
  { path: '/units/unit-3', image: '/images/manufacturing-infrastructure-bangalore.svg', title: 'Unit 3 Bangalore', caption: 'UNNATHI Unit 3 — Advanced inspection and quality management systems' },
  { path: '/units/tumakuru', image: '/images/manufacturing-infrastructure-bangalore.svg', title: 'Unit 4 Tumakuru', caption: 'UNNATHI Unit 4 — Tumakuru high-volume precision manufacturing unit' },
];

const now = new Date().toISOString();
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${siteUrl}${route}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>${route === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}\n</urlset>\n`;
const imageSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${images.map((entry) => `  <url><loc>${siteUrl}${entry.path}</loc><image:image><image:loc>${siteUrl}${entry.image}</image:loc><image:title>${entry.title}</image:title><image:caption>${entry.caption}</image:caption></image:image></url>`).join('\n')}\n</urlset>\n`;

const publicDir = path.resolve('public');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
fs.writeFileSync(path.join(publicDir, 'image-sitemap.xml'), imageSitemapXml);
console.log('Generated sitemap.xml and image-sitemap.xml');
