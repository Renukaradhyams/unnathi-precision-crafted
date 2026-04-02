import { contactConfig } from "@config/contact.config";
import { siteConfig } from "@config/site.config";
import { unitsConfig, type UnitConfig } from "@config/units.config";
import { absoluteUrl } from "./generateMeta";

const baseId = `${siteConfig.siteUrl}/#organization`;

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": baseId,
  name: siteConfig.companyName,
  url: siteConfig.siteUrl,
  logo: absoluteUrl(siteConfig.defaultOgImage.url),
  email: contactConfig.emails.rfq,
  telephone: contactConfig.phones.mobile,
  foundingDate: `${siteConfig.establishedYear}`,
  sameAs: Object.values(siteConfig.social),
});

export const generateLocalBusinessSchema = (unit?: UnitConfig) => {
  if (unit) {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteConfig.siteUrl}/units/${unit.id}#local-business`,
      name: unit.name,
      url: `${siteConfig.siteUrl}/units/${unit.id}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: unit.address,
        addressLocality: unit.location,
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      telephone: unit.contact.phone,
      email: unit.contact.email,
      image: absoluteUrl(unit.galleryImages[0]?.src || siteConfig.defaultOgImage.url),
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.siteUrl}/#local-business`,
    name: siteConfig.companyName,
    url: siteConfig.siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Peenya Industrial Area",
      addressLocality: "Bangalore",
      postalCode: "560058",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    telephone: contactConfig.phones.landline,
    email: contactConfig.emails.rfq,
  };
};

export const generateMultiUnitSchema = () => unitsConfig.map((unit) => generateLocalBusinessSchema(unit));

export const generateManufacturingCompanySchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  additionalType: "https://schema.org/ManufacturingBusiness",
  "@id": `${siteConfig.siteUrl}/#manufacturing-company`,
  name: siteConfig.companyName,
  url: siteConfig.siteUrl,
  description: "UNNATHI CNC Technologies Pvt. Ltd. — CNC machining Bangalore specialist for precision components India with advanced CNC turning and CNC milling.",
  areaServed: "India",
});

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.siteUrl}/#website`,
  url: siteConfig.siteUrl,
  name: siteConfig.shortName,
  inLanguage: siteConfig.defaultLocale,
});

export const generateWebPageSchema = (name: string, path: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${absoluteUrl(path)}#webpage`,
  name,
  url: absoluteUrl(path),
  description,
  inLanguage: siteConfig.defaultLocale,
  isPartOf: { "@id": `${siteConfig.siteUrl}/#website` },
});

export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; path: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

export type ImageSchemaInput = {
  name: string;
  imageUrl: string;
  caption: string;
  pagePath: string;
  width?: number;
  height?: number;
  encodingFormat?: string;
};

export const generateImageObjectSchema = (image: ImageSchemaInput) => ({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": `${absoluteUrl(image.pagePath)}#image-${image.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  name: image.name,
  contentUrl: absoluteUrl(image.imageUrl),
  url: absoluteUrl(image.imageUrl),
  caption: image.caption,
  width: image.width,
  height: image.height,
  encodingFormat: image.encodingFormat,
});

export const generateServiceSchema = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${absoluteUrl(url)}#service`,
  name,
  provider: { "@id": baseId },
  description,
  areaServed: "India",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "CNC Machining Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CNC Turning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CNC Milling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "VMC Machining" } },
    ],
  },
});

export const generateProductSchema = (name: string, description: string, image: string, category: string) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${siteConfig.siteUrl}/#product-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  name,
  description,
  image: absoluteUrl(image),
  category,
  brand: { "@id": baseId },
  manufacturer: { "@id": baseId },
});

export const generateProfessionalServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.siteUrl}/#professional-service`,
  name: siteConfig.companyName,
  url: siteConfig.siteUrl,
  logo: absoluteUrl(siteConfig.defaultOgImage.url),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Peenya Industrial Area",
    addressLocality: "Bangalore",
    postalCode: "560058",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  telephone: contactConfig.phones.landline,
  priceRange: "$$",
});

export const generateContactPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${siteConfig.siteUrl}/contact#webpage`,
  name: "Contact Us",
  description: "Get in touch with UNNATHI CNC Technologies for your precision machining requirements.",
  url: `${siteConfig.siteUrl}/contact`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: contactConfig.phones.mobile,
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi", "Kannada"],
  },
});

export const generateAboutPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${siteConfig.siteUrl}/about#webpage`,
  name: "About UNNATHI CNC",
  description: "The story, mission, and certifications of UNNATHI CNC Technologies Pvt. Ltd.",
  url: `${siteConfig.siteUrl}/about`,
  mainEntity: { "@id": baseId },
});
