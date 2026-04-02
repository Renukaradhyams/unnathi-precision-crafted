import { seoConfig, type SeoPageKey } from "@config/seo.config";
import {
  generateBreadcrumbSchema,
  generateImageObjectSchema,
  generateLocalBusinessSchema,
  generateManufacturingCompanySchema,
  generateOrganizationSchema,
  generateWebPageSchema,
  generateWebsiteSchema,
  generateMultiUnitSchema,
  generateServiceSchema,
  generateProductSchema,
  generateProfessionalServiceSchema,
  generateContactPageSchema,
  generateAboutPageSchema,
  type ImageSchemaInput,
} from "./generateSchema";
import { homeIndustriesContent, whyChooseContent } from "@config/home.config";

type SeoOverride = Partial<{
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
}>;

export const buildPageSeo = (
  page: SeoPageKey,
  breadcrumbs: Array<{ name: string; path: string }>,
  overrides?: SeoOverride,
  pageImages: ImageSchemaInput[] = [],
) => {
  const base = seoConfig[page];
  const title = overrides?.title ?? base.title;
  const description = overrides?.description ?? base.description;
  const path = overrides?.path ?? base.path;

  return {
    title,
    description,
    path,
    image: overrides?.image,
    imageAlt: overrides?.imageAlt,
    jsonLd: [
      generateOrganizationSchema(),
      generateLocalBusinessSchema(),
      ...(page === "home" ? generateMultiUnitSchema() : []),
      generateManufacturingCompanySchema(),
      generateWebsiteSchema(),
      generateWebPageSchema(title, path, description),
      generateBreadcrumbSchema(breadcrumbs),
      ...pageImages.map((item) => generateImageObjectSchema(item)),
      ...(page === "home" ? [
        generateProfessionalServiceSchema(),
        generateServiceSchema(
          "CNC Machining & Precision Manufacturing",
          "Comprehensive CNC turning, milling, and precision engineering services in Bangalore.",
          "/"
        ),
        ...homeIndustriesContent.map(ind => generateProductSchema(
          ind.title,
          ind.desc,
          ind.img,
          "Precision Machined Components"
        ))
      ] : []),
      ...(page === "about" ? [generateAboutPageSchema()] : []),
      ...(page === "contact" ? [generateContactPageSchema()] : []),
    ],
  };
};
