import { defaultSeoConfig, type SeoEntry } from "@config/seo.config";
import { siteConfig } from "@config/site.config";

export type MetaInput = Partial<SeoEntry> & {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
};

export const absoluteUrl = (path: string) => (path.startsWith("http") ? path : `${siteConfig.siteUrl}${path}`);

export const generateMeta = ({ title, description, path = "/", image, imageAlt, keywords = [] }: MetaInput) => {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image ?? siteConfig.defaultOgImage.url);

  return {
    title,
    description,
    canonical,
    image: imageUrl,
    imageAlt: imageAlt ?? siteConfig.defaultOgImage.alt,
    imageWidth: siteConfig.defaultOgImage.width,
    imageHeight: siteConfig.defaultOgImage.height,
    imageType: siteConfig.defaultOgImage.type,
    robots: defaultSeoConfig.robots,
    keywords: [...defaultSeoConfig.keywords, ...keywords].join(", "),
    twitterCard: defaultSeoConfig.twitterCard,
    siteName: defaultSeoConfig.siteName,
  };
};
