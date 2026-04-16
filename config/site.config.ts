import { seoMedia } from "@config/media.config";

export const siteConfig = {
  companyName: "UNNATHI CNC Technologies Pvt. Ltd.",
  shortName: "UNNATHI CNC",
  siteUrl: "https://www.unnathicnc.com",
  defaultLocale: "en-IN",
  industry: "CNC machining and precision component manufacturing",
  slogan: "Precision CNC Machining Partner in Bangalore",
  defaultOgImage: {
    url: seoMedia.homeHero.src,
    alt: "CNC machining center at UNNATHI CNC Bangalore",
    width: 1600,
    height: 900,
    type: seoMedia.homeHero.mimeType,
  },
  establishedYear: 2007,
  social: {
    linkedin: "https://www.linkedin.com/company/unnathi-cnc",
    twitter: "https://x.com/unnathicnc",
    facebook: "https://www.facebook.com/unnathicnc",
    instagram: "https://www.instagram.com/unnathicnc",
  },
} as const;

export type SiteConfig = typeof siteConfig;
