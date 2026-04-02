import { seoImages } from "@config/images.config";
import { unitsConfig } from "@config/units.config";
import { siteConfig } from "@config/site.config";

const staticRoutes = [
  "/",
  "/about",
  "/capabilities",
  "/infrastructure",
  "/industries",
  "/gallery",
  "/leadership",
  "/quality",
  "/careers",
  "/news",
  "/contact",
  "/units",
];

export const getSitemapRoutes = () => [...staticRoutes, ...unitsConfig.map((unit) => `/units/${unit.id}`)];

export const generateSitemapXml = (updatedAt = new Date().toISOString()) => {
  const urls = getSitemapRoutes()
    .map(
      (route) =>
        `<url><loc>${siteConfig.siteUrl}${route}</loc><lastmod>${updatedAt}</lastmod><changefreq>weekly</changefreq><priority>${route === "/" ? "1.0" : "0.8"}</priority></url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
};

export const generateImageSitemapXml = () => {
  const urls = seoImages
    .map(
      (entry) =>
        `<url><loc>${siteConfig.siteUrl}${entry.path}</loc><image:image><image:loc>${siteConfig.siteUrl}${entry.image}</image:loc><image:title>${entry.title}</image:title><image:caption>${entry.caption}</image:caption></image:image></url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}</urlset>`;
};
