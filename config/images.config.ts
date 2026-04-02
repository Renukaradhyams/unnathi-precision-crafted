import { seoMedia } from "@config/media.config";

export type SeoImage = {
  path: string;
  image: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  mimeType: string;
};

export const seoImages: SeoImage[] = [
  { path: "/", image: seoMedia.homeHero.src, title: "CNC Machining Center", caption: "Advanced CNC machining center in Bangalore", width: 1600, height: 900, mimeType: seoMedia.homeHero.mimeType! },
  { path: "/gallery", image: seoMedia.galleryFloor.src, title: "Manufacturing Floor", caption: "Production floor and machining setup", width: 1600, height: 900, mimeType: seoMedia.galleryFloor.mimeType! },
  { path: "/gallery", image: seoMedia.galleryTurning.src, title: "CNC Turning", caption: "High precision CNC turning operation", width: 1600, height: 900, mimeType: seoMedia.galleryTurning.mimeType! },
  { path: "/gallery", image: seoMedia.galleryMilling.src, title: "CNC Milling", caption: "CNC milling machine for precision parts", width: 1600, height: 900, mimeType: seoMedia.galleryMilling.mimeType! },
  { path: "/infrastructure", image: seoMedia.infrastructure.src, title: "Manufacturing Infrastructure", caption: "Infrastructure and plant layout", width: 1600, height: 900, mimeType: seoMedia.infrastructure.mimeType! },
  { path: "/units/bangalore-1", image: seoMedia.infrastructure.src, title: "Unit 1 Bangalore", caption: "Unit 1 CNC turning and precision machining", width: 1600, height: 900, mimeType: seoMedia.infrastructure.mimeType! },
  { path: "/units/bangalore-2", image: seoMedia.infrastructure.src, title: "Unit 2 Bangalore", caption: "Unit 2 CNC milling and 5-axis machining", width: 1600, height: 900, mimeType: seoMedia.infrastructure.mimeType! },
  { path: "/units/bangalore-3", image: seoMedia.infrastructure.src, title: "Unit 3 Bangalore", caption: "Unit 3 inspection and quality systems", width: 1600, height: 900, mimeType: seoMedia.infrastructure.mimeType! },
  { path: "/units/tumakuru", image: seoMedia.infrastructure.src, title: "Unit 4 Tumakuru", caption: "Tumakuru high-volume manufacturing unit", width: 1600, height: 900, mimeType: seoMedia.infrastructure.mimeType! },
];
