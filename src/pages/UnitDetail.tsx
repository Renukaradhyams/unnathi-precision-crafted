import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  MapPin, CheckCircle, ArrowLeft, ArrowRight, Factory, Cog, Phone, Mail,
  Wrench, Globe2, Send,
  FileText, MessageSquare, Maximize2, Stethoscope, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import LightboxGallery from "@/components/LightboxGallery";
import { unitsById } from "@config/units.config";
import { buildPageSeo } from "@/seo/pageSeo";
import { seoImages } from "@config/images.config";
import { pageSectionMedia } from "@config/media.config";
import Breadcrumbs from "@/components/Breadcrumbs";

/* ── animation variants ─────────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const scaleUp = { hidden: { opacity: 0, scale: 0.88, y: 15 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const slideLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };
const slideRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };

/* ── capability icon map ────────────────────────────────── */
const capabilityIcons: Record<string, typeof Wrench> = {
  "Turning operation": Cog,
  "VMC": Factory,
  "Surface and Cylindrical grinding": Wrench,
  "Wire cutting": Zap,
  "MIG & TIG Welding": Wrench,
  "Orbital welding": Wrench,
  "Sandblasting": Wrench,
  "Electropolishing": Wrench,
  "Pickling and Passivation": Wrench,
  "H-Boring & VTL": Cog,
};

/* ── industry icon map ──────────────────────────────────── */
const industryIcons: Record<string, typeof Factory> = {
  "Aerospace": Globe2,
  "Pharma Equipment": Stethoscope,
  "Semi-Conductor": Zap,
  "Machine Tools": Cog,
  "Precision Engineering": CheckCircle,
  "Heavy Engineering": Factory,
};

const UnitDetail = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = unitsById[unitId || ""];
  const [lightbox, setLightbox] = useState<{ images: { src: string; label: string }[]; index: number } | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  const isLightboxOpen = !!lightbox;

  // Parallax for hero
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isLightboxOpen]);

  if (!unit) {
    return (
      <Layout seo={buildPageSeo("notFound", [{ name: "Home", path: "/" }, { name: "Units", path: "/units" }], { path: `/units/${unitId}` })}>
        <section className="pt-32 pb-20 bg-gradient-dark">
          <div className="container text-center">
            <h1 className="text-4xl font-heading text-primary-foreground">Unit Not Found</h1>
            <Link to="/units" className="mt-4 inline-block">
              <Button variant="outline" className="border-steel text-steel hover:bg-primary hover:text-primary-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Units
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout
      key={unitId}
      seo={buildPageSeo(
        "unitDetail",
        [{ name: "Home", path: "/" }, { name: "Our Units", path: "/units" }, { name: unit.name, path: `/units/${unitId}` }],
        {
          title: `${unit.name} | CNC Manufacturing Unit`,
          description: `${unit.specialisation} at ${unit.location}. CNC machining Bangalore infrastructure for precision components India.`,
          path: `/units/${unitId}`,
        },
        seoImages.filter((image) => image.path === `/units/${unitId}`).map((image) => ({ name: image.title, imageUrl: image.image, caption: image.caption, pagePath: image.path, width: image.width, height: image.height, encodingFormat: image.mimeType })),
      )}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full"
      >
        {/* ═══ 1. UNIT HERO with parallax ═══ */}
        <section ref={heroRef} className="relative pt-36 pb-28 bg-gradient-dark overflow-hidden">
          <motion.div className="absolute inset-0 opacity-15" style={{ y: heroY }}>
            <img src={unit.galleryImages[0]?.src || pageSectionMedia.units.sections.heroFallback?.asset?.src} alt={`UNNATHI CNC precision machining facility ${unit.location}`} className="w-full h-full object-cover scale-110" style={{ filter: "var(--img-enhance)" }} loading="eager" decoding="async" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal/90" />
          <div className="container relative">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <Breadcrumbs
                items={[{ name: "Our Units", path: "/units" }, { name: unit.name, active: true }]}
                className="mb-8 opacity-80"
              />
              <h1 className="text-4xl md:text-6xl font-heading text-primary-foreground leading-tight">{unit.name}</h1>
              <p className="mt-3 text-steel flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5" /> {unit.location}
              </p>
              <p className="mt-2 text-primary-foreground/80 text-base max-w-xl">{unit.specialisation}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {unit.specialisationBadges.map((badge) => (
                  <span key={badge} className="inline-block px-3 py-1.5 text-xs font-semibold tracking-wide uppercase bg-primary/20 text-primary-foreground rounded-full border border-primary/30">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* ═══ 2. UNIT OVERVIEW ═══ */}
        <section className="py-20 bg-background">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              <SectionHeading label="Overview" title="Unit Overview" className="text-left mb-6" />
              <p className="text-muted-foreground leading-relaxed text-base">{unit.overview}</p>
              <div className="mt-6 p-4 bg-muted rounded-xl border border-border">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Address</p>
                <p className="text-sm text-muted-foreground">{unit.address}</p>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight}>
              <img src={unit.galleryImages[0]?.src || pageSectionMedia.units.sections.overviewFallback?.asset?.src} alt={`UNNATHI CNC precision manufacturing facility ${unit.location}`} className="rounded-2xl shadow-elevated w-full h-72 object-cover" style={{ filter: "var(--img-enhance)" }} loading="lazy" decoding="async" />
            </motion.div>
          </div>
        </section>

        {/* ═══ 3. KEY CAPABILITIES as card grid with descriptions ═══ */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <SectionHeading label="Capabilities" title="Key Capabilities" description={`Core processes available at ${unit.location}.`} />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {unit.capabilities.map((cap) => {
                const Icon = capabilityIcons[cap] || CheckCircle;
                const capDescriptions: Record<string, string> = {
                  "CNC Turning Centres": "High-precision turning operations for complex cylindrical components.",
                  "Vertical Milling Centres": "Multi-axis milling for intricate geometries and tight tolerances.",
                  "Surface Grinding Machines": "Precision flat surface finishing to micron-level accuracy.",
                  "Cylindrical Grinding Machines": "OD/ID grinding for shafts, bores, and precision cylinders.",
                  "Wire Cutting Machines": "EDM wire cutting for hardened materials and complex profiles.",
                  "Orbital Welding": "Automated orbital welding for pharma and aerospace tube assemblies.",
                  "Welding Support": "MIG & TIG welding for fabrication and assembly requirements.",
                  "H-Boring & VTL": "Heavy boring and vertical turning for large-diameter components.",
                  "Major Inspection Instruments": "CMM, contour testing, and advanced metrology equipment.",
                };
                return (
                  <motion.div key={cap} variants={scaleUp}
                    className="bg-background rounded-xl p-6 shadow-card border border-border/50 transition-all duration-300 group hover:shadow-elevated hover:border-primary/15"
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}>
                    <div className="w-12 h-12 rounded-xl bg-gradient-industrial flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-industrial">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h4 className="text-sm font-heading font-bold text-foreground mb-1">{cap}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{capDescriptions[cap] || "Advanced precision manufacturing capability."}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ 4. MACHINES IN THIS UNIT – redirect to Infrastructure ═══ */}
        <section className="py-20 bg-background">
          <div className="container">
            <SectionHeading label="Machinery" title="Machines in this Unit" description={`${unit.machines.length} precision machines installed at ${unit.location}. Click any machine to view full details.`} />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {unit.machines.map((m, i) => (
                <Link
                  key={`${m.brand}-${m.model}-${i}`}
                  to={`/infrastructure#machine-information`}
                  className="block"
                >
                  <motion.div variants={scaleUp}
                    className="bg-muted/30 rounded-xl overflow-hidden shadow-card border border-border/50 transition-all duration-300 group cursor-pointer hover:border-primary/20 hover:shadow-elevated"
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}>
                    {(m.image || m.images?.[0]) && (
                      <div className="h-36 overflow-hidden relative">
                        <motion.img
                          src={m.image || m.images?.[0]}
                          alt={`${m.brand} ${m.model} at UNNATHI CNC ${unit.location}`}
                          className="w-full h-full object-cover"
                          style={{ filter: "var(--img-enhance)" }}
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.6 }}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary-foreground bg-primary/80 px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            View Details →
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-5">
                      <p className="font-heading font-bold text-foreground text-base group-hover:text-primary transition-colors">{m.name}</p>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <p><span className="font-medium text-foreground">Brand:</span> {m.brand}</p>
                        <p><span className="font-medium text-foreground">Model:</span> {m.model}</p>
                        <p><span className="font-medium text-foreground">Axis:</span> {m.axis}</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
            <div className="mt-8 text-center">
              <Link to="/infrastructure#machine-information">
                <Button className="bg-gradient-industrial text-primary-foreground shadow-industrial hover:opacity-90 hover:scale-105 transition-all duration-300">
                  View All Machines on Infrastructure Page <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ 5. UNIT PHOTO GALLERY with lightbox ═══ */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <SectionHeading label="Gallery" title="Inside Our Manufacturing Facility" />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {unit.galleryImages.map((img, i) => (
                <motion.div
                  key={`${img.label}-${i}`}
                  variants={scaleUp}
                  className="relative group rounded-xl overflow-hidden shadow-card cursor-pointer aspect-[4/3]"
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  onClick={() => setLightbox({ images: unit.galleryImages, index: i })}
                >
                  <motion.img
                    src={img.src}
                    alt={`UNNATHI CNC ${img.label} - precision machining facility ${unit.location}`}
                    className="w-full h-full object-cover"
                    style={{ filter: "var(--img-enhance)" }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <Maximize2 className="h-6 w-6 text-primary-foreground mx-auto mb-1" />
                      <p className="text-sm font-semibold text-primary-foreground">{img.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ 6. INDUSTRIES SERVED ═══ */}
        <section className="py-20 bg-background">
          <div className="container">
            <SectionHeading label="Industries" title="Industries Served" />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {unit.industries.map((ind) => {
                const Icon = industryIcons[ind] || Factory;
                return (
                  <motion.div key={ind} variants={scaleUp}
                    className="flex items-center gap-3 bg-muted rounded-xl px-5 py-4 shadow-card border border-border/50 transition-all duration-300"
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}>
                    <div className="w-10 h-10 rounded-lg bg-gradient-industrial flex items-center justify-center shrink-0 shadow-industrial">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-heading font-bold text-foreground">{ind}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ 7. CONTACT THIS UNIT ═══ */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <SectionHeading label="Contact" title="Contact This Unit" />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto">
              <div className="bg-background rounded-2xl shadow-elevated border border-border/50 p-8">
                <div className="grid sm:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-industrial flex items-center justify-center shrink-0 shadow-industrial">
                      <MapPin className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Address</p>
                      <p className="text-sm text-muted-foreground leading-snug">{unit.contact.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-industrial flex items-center justify-center shrink-0 shadow-industrial">
                      <Phone className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Phone</p>
                      <a href={`tel:${unit.contact.phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{unit.contact.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-industrial flex items-center justify-center shrink-0 shadow-industrial">
                      <Mail className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Email</p>
                      <a href={`mailto:${unit.contact.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{unit.contact.email}</a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link to="/contact">
                    <Button className="bg-gradient-industrial text-primary-foreground shadow-industrial hover:opacity-90">
                      <Send className="h-4 w-4 mr-2" /> Send Enquiry
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                      <FileText className="h-4 w-4 mr-2" /> Request Quote
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                      <MessageSquare className="h-4 w-4 mr-2" /> Contact Engineering Team
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-xl overflow-hidden shadow-elevated h-72">
                <iframe src={unit.mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title={`${unit.name} Location`} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ GALLERY LIGHTBOX ═══ */}
        <AnimatePresence>
          {lightbox && (
            <LightboxGallery
              images={lightbox.images.map((img) => ({ src: img.src, label: img.label }))}
              initialIndex={lightbox.index}
              onClose={() => setLightbox(null)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  );
};

export default UnitDetail;
