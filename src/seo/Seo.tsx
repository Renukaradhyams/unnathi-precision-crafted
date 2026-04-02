import { Helmet } from "react-helmet-async";
import { generateMeta } from "./generateMeta";

export type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  type?: "website" | "article";
  jsonLd?: Record<string, unknown>[];
};

const Seo = ({ title, description, path, image, imageAlt, keywords, type = "website", jsonLd = [] }: SeoProps) => {
  const meta = generateMeta({ title, description, path, image, imageAlt, keywords });

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="robots" content={meta.robots} />
      <link rel="canonical" href={meta.canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:image:alt" content={meta.imageAlt} />
      <meta property="og:image:type" content={meta.imageType} />
      <meta property="og:image:width" content={`${meta.imageWidth}`} />
      <meta property="og:image:height" content={`${meta.imageHeight}`} />

      <meta name="twitter:card" content={meta.twitterCard} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <meta name="twitter:image:alt" content={meta.imageAlt} />

      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
