# SEO Operations Checklist (Google + Bing)

## 1) Google Image Indexing Strategy Verification

### Image discoverability
- [ ] All indexable pages include crawlable `<img>` tags in HTML (not CSS-only backgrounds).
- [ ] Every image has descriptive `alt` and `title` attributes.
- [ ] Image filenames are semantic and keyword-relevant (example: `cnc-machining-bangalore-hero.svg`).
- [ ] Images use stable public URLs under `/images/`.
- [ ] Lazy-loading is used for non-critical images; hero/LCP image uses eager/high-priority loading.

### Image metadata and schema
- [ ] `og:image` and `twitter:image` are present for shareable pages.
- [ ] `og:image:alt` and `twitter:image:alt` are present.
- [ ] `ImageObject` JSON-LD is present on hero/gallery/infrastructure/unit pages.
- [ ] Image dimensions and MIME types are declared in centralized config and used in schema generation.

### Image crawling/indexing control
- [ ] `robots.txt` allows `Googlebot-Image`.
- [ ] `image-sitemap.xml` includes all target image URLs.
- [ ] Image URLs in sitemap return `200` and are not blocked by `X-Robots-Tag: noindex`.

## 2) Search Console Setup Checklist

### Property and sitemap
- [ ] Add **Domain Property** in Google Search Console (`unnathicnc.com`).
- [ ] Verify DNS ownership.
- [ ] Submit:
  - `https://www.unnathicnc.com/sitemap.xml`
  - `https://www.unnathicnc.com/image-sitemap.xml`

### Indexing and coverage
- [ ] Inspect key URLs:
  - `/`
  - `/capabilities`
  - `/industries`
  - `/units/bangalore-1`
- [ ] Confirm canonical selected = user-declared canonical.
- [ ] Request indexing for newly optimized pages.
- [ ] Monitor Coverage and Enhancements for structured data validity.

### Performance monitoring
- [ ] Track queries containing `cnc bangalore`, `cnc machining bangalore`, `precision components india`.
- [ ] Compare CTR/title/description effectiveness by page.
- [ ] Review Core Web Vitals report and fix URLs in "Poor" bucket first.

## 3) Bing Webmaster Setup Checklist

- [ ] Add and verify site in Bing Webmaster Tools.
- [ ] Submit:
  - `https://www.unnathicnc.com/sitemap.xml`
  - `https://www.unnathicnc.com/image-sitemap.xml`
- [ ] Use URL Inspection on top service and unit pages.
- [ ] Monitor Crawl Control and Index Explorer for blocked/missed URLs.
- [ ] Validate structured data parsing in Bing reports.

## 4) Ranking Plan for “CNC Bangalore”

## On-page keyword mapping
- Home page primary intent: `CNC Bangalore` / `CNC machining Bangalore`.
- Capabilities page: `CNC turning Bangalore`, `CNC milling Bangalore`.
- Industries page: `precision components India` + sector modifiers.
- Unit pages: local modifiers (`Peenya`, `Rajajinagar`, `Bommasandra`, `Tumakuru`).

## Content requirements
- [ ] Ensure Home H1 includes primary service + city intent.
- [ ] Add a dedicated section: “Why choose us for CNC machining in Bangalore”.
- [ ] Add FAQ block with Bangalore-focused search questions.
- [ ] Publish monthly case studies with geo-modified titles.

## Internal linking
- [ ] Link Home → Capabilities/Units using anchor text containing `CNC Bangalore` variants.
- [ ] Link Unit pages back to Capabilities and Contact with commercial intent anchors.

## Local SEO signals
- [ ] Keep NAP consistency in footer, LocalBusiness schema, and Google Business Profile.
- [ ] Add service-area references in page copy and schema where relevant.
- [ ] Build citations from reputable manufacturing and Bangalore business directories.

## Authority and CTR
- [ ] Acquire backlinks from manufacturing associations, trade bodies, and supplier networks.
- [ ] Test title/meta variants for pages ranking in positions 4–15 to improve CTR.
- [ ] Use compelling snippet language: certification, tolerances, and industry proof points.

## 5) Release Verification (before each deploy)
- [ ] Run sitemap generation.
- [ ] Run production build.
- [ ] Spot-check canonical, OG/Twitter tags, and JSON-LD on Home + 2 inner pages.
- [ ] Confirm no binary-only assets were introduced in SEO config paths.
