import { siteConfig } from "./site.config";

export type SeoPageKey =
  | "home"
  | "about"
  | "capabilities"
  | "infrastructure"
  | "industries"
  | "gallery"
  | "leadership"
  | "quality"
  | "careers"
  | "news"
  | "contact"
  | "units"
  | "unitDetail"
  | "notFound";

export type SeoEntry = {
  title: string;
  description: string;
  path: string;
};

const primaryKeywords = [
  "CNC machining Bangalore",
  "Precision components India",
  "CNC turning",
  "CNC milling",
  "Manufacturing company Bangalore",
];

export const defaultSeoConfig = {
  siteName: siteConfig.shortName,
  titleTemplate: `%s | ${siteConfig.shortName}`,
  description:
    "UNNATHI CNC is a manufacturing company in Bangalore delivering CNC machining, CNC turning, CNC milling, and precision components for global OEMs.",
  keywords: primaryKeywords,
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  twitterCard: "summary_large_image",
} as const;

export const seoConfig: Record<SeoPageKey, SeoEntry> = {
  home: {
    title: "UNNATHI CNC Technologies | Precision CNC Machining Bangalore & Component Manufacturing India",
    description: "UNNATHI CNC Technologies Pvt. Ltd. is a world-class precision engineering company in Bangalore specializing in high-precision CNC machining, CNC turning, and CNC milling with AS9100D certification.",
    path: "/",
  },
  about: {
    title: "About Our AS9100D Certified Precision Manufacturing Company in Bangalore",
    description: "Learn about the journey of UNNATHI CNC since 2007. Established as a leading manufacturing company Bangalore with 4 units specializing in CNC machining and global quality standards.",
    path: "/about",
  },
  capabilities: {
    title: "Advanced CNC Turning, CNC Milling, and Precision Machining Capabilities",
    description: "Explore our multi-axis CNC turning and milling centers. We provide precision machining for aerospace, medical, and semiconductor industries with tight tolerances of ±0.005mm.",
    path: "/capabilities",
  },
  infrastructure: {
    title: "World-Class Manufacturing Infrastructure for Precision Components India",
    description: "Modern production facility in Bangalore with advanced VMC, CNC turning centers, and high-speed machining for scalable precision components India.",
    path: "/infrastructure",
  },
  industries: {
    title: "B2B Precision Components for Aerospace, Pharma, and Semiconductor Industries",
    description: "Expert CNC machining Bangalore for critical sectors including medical equipment, aerospace OEMs, and semiconductor manufacturing systems.",
    path: "/industries",
  },
  gallery: {
    title: "Precision Machining Gallery | CNC Turning and Milling Showcase",
    description: "Visual portfolio of precision components, CNC turning operations, and VMC milling setup at UNNATHI CNC Technologies Bangalore.",
    path: "/gallery",
  },
  leadership: {
    title: "Leadership & Engineering Expertise | UNNATHI CNC Technologies",
    description: "Meet the visionary leadership team and skilled engineering professionals driving manufacturing excellence at UNNATHI CNC Bangalore.",
    path: "/leadership",
  },
  quality: {
    title: "AS9100D & ISO 9001 Quality Standards for Precision Manufacturing",
    description: "Certified quality management systems ensuring zero-defect delivery for CNC machining, precision components, and advanced engineering parts.",
    path: "/quality",
  },
  careers: {
    title: "Careers in Precision Engineering | Join UNNATHI CNC Bangalore",
    description: "Explore career opportunities in CNC machining and precision manufacturing with a high-growth engineering company in Bangalore.",
    path: "/careers",
  },
  news: {
    title: "Latest News & Milestones in Precision Manufacturing | UNNATHI CNC",
    description: "Stay updated with recent milestones, certification updates, and industry participation of UNNATHI CNC Technologies.",
    path: "/news",
  },
  contact: {
    title: "Contact for CNC Machining RFQ | UNNATHI CNC Technologies Bangalore",
    description: "Get a quote for your precision machining projects. Dedicated manufacturing partner for CNC turning, milling, and precision components India.",
    path: "/contact",
  },
  units: {
    title: "Manufacturing Units in Bangalore & Tumakuru | Multi-Unit CNC Facility",
    description: "Overview of our 4 production units strategically located for efficient precision component manufacturing and scalable production.",
    path: "/units",
  },
  unitDetail: {
    title: "Detailed Unit Specifications for CNC Machining & Turning",
    description: "Technical specifications, machinery list, and specialization details for each UNNATHI CNC manufacturing unit.",
    path: "/units",
  },
  notFound: {
    title: "404 - Page Not Found | UNNATHI CNC",
    description: "The requested page was not found. Please navigate back to UNNATHI CNC home for precision machining solutions.",
    path: "/404",
  },
};
