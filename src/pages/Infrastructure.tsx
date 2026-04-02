import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Factory, Cog, Wrench, Microscope, CheckCircle, Settings, Search,
  Shield, Flame, HardHat, Layers, Award, ArrowRight, X,
  Target, Ruler, Gauge, BarChart3, Thermometer, Monitor,
  Package, Eye, Sparkles, Truck, FileDown, ChevronRight,
  MapPin, Globe, Cpu, Crosshair, ScanLine, Activity,
} from "lucide-react";
import Layout from "@/components/Layout";
import { buildPageSeo } from "@/seo/pageSeo";
import SectionHeading from "@/components/SectionHeading";
import AnimatedCounter from "@/components/AnimatedCounter";
import ImageSlider from "@/components/ImageSlider";
import LightboxGallery from "@/components/LightboxGallery";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageSectionMedia, humanizeFilename } from "@config/media.config";
import certUnit1As9100IsoPdf from "@/assets/Certificates/6.2a.pdf";
import certUnit3IsoPdf from "@/assets/Certificates/6.2b.pdf";
import { seoImages }  from "@config/images.config";
import unnathiCatalogPdf from "@/assets/Unnathi_new_catlog.pdf";
import {
  machineryDB, metrologyDB, brandsDB, machineCategories,
  capabilityMetrics, processSteps, faqItems, safetyItems,
  facilityFeatures, galleryLabels,
  type Machine, type MetrologyEquipment,
} from "@config/infrastructure.config";
import { machineryPhotos, infrastructurePhotos, qualityLabPhotos, factoryPhotos } from "@config/units.config";

/* ── icon maps ─────────────────────────────────────────────── */
const processIcons = [Package, Cog, Wrench, Eye, Microscope, Sparkles, Truck];
const capabilityIcons = [Target, Ruler, Gauge, BarChart3, Thermometer, Monitor];
const safetyIcons = [Layers, HardHat, Flame, Shield, Award];
const metrologyIcons = [ScanLine, Cpu, Activity, Crosshair, Ruler];

/* ── image map (7.2 Machinery photos) ─────────────────────── */
const machineImgMap: Record<string, string> = {
  "VMC": machineryPhotos[1].src,
  "CNC Turning Centers":   machineryPhotos[0].src,
  "Grinding Machines":     machineryPhotos[4].src,
  "Special Machines":      machineryPhotos[6].src,
};
const metroImg = qualityLabPhotos[0].src;

/* ── gallery images: Factory + Infrastructure (filtered for 'Inside' views) ── */
const excludeGalleryPaths = [
  "src/assets/Main_photos/Unnathi_unit01_view_01.webp",
  "src/assets/Main_photos/Unnathi_unit01_gateview.webp",
  "src/assets/Unnathi-01-web content/Outsideview_unit_01.webp",
  "src/assets/Unnathi-04-web content/VTL_01.webp",
];

const galleryAssets = [
  ...factoryPhotos,
  ...infrastructurePhotos,
].filter((p) => !excludeGalleryPaths.includes(p.path));

const galleryImages = galleryAssets.map((p) => p.src);
const galleryDisplayLabels = galleryAssets.map((p) => p.label || humanizeFilename(p.path));

/* ── certifications ─────────────────────────────────────────── */
const certifications = [
  { name: "AS9100D & ISO 9001:2015 Certificate (Unit-1)", file: certUnit1As9100IsoPdf, preview: pageSectionMedia.infrastructure.sections.certificateUnit1?.asset?.src, fileType: "pdf", desc: "Aerospace Quality Management System" },
  { name: "ISO 9001:2015 Certificate (Unit-3)", file: certUnit3IsoPdf, preview: pageSectionMedia.infrastructure.sections.certificateUnit3?.asset?.src, fileType: "pdf", desc: "Quality Management System for surface treatment services" },
  { name: "Quality Excellence Award", file: pageSectionMedia.infrastructure.sections.certificateAward?.asset?.src, preview: pageSectionMedia.infrastructure.sections.certificateAward?.asset?.src, fileType: "image", desc: "Recognition for manufacturing excellence" },
  { name: "ZED Gold Certification", file: pageSectionMedia.infrastructure.sections.certificateZed?.asset?.src, preview: pageSectionMedia.infrastructure.sections.certificateZed?.asset?.src, fileType: "image", desc: "Zero Defect Zero Effect manufacturing" },
];

/* ── enhanced animation variants ────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const scaleUp = { hidden: { opacity: 0, scale: 0.88, y: 20 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } } };
const slideLeft = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } };
const slideRight = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

/* ── modal animation ────────────────────────────────────────── */
const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.25 } },
};

/* ── categories with "All" ──────────────────────────────────── */
const allCategories = ["All", ...machineCategories] as const;

/* ── component ───────────────────────────────────────────────── */
const Infrastructure = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [selectedMetro, setSelectedMetro] = useState<MetrologyEquipment | null>(null);
  const [certModal, setCertModal] = useState<typeof certifications[0] | null>(null);
  const [lightbox, setLightbox] = useState<{ images: { src: string; label: string }[]; index: number } | null>(null);
  const [machineImageExpand, setMachineImageExpand] = useState<{ images: string[]; index: number } | null>(null);

  const machineryRef = useRef<HTMLElement>(null);
  const metrologyRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const isModalOpen = !!selectedMachine || !!selectedMetro || !!certModal;

  // Parallax for hero
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const filtered = useMemo(() => {
    return machineryDB.filter((m) => {
      const matchCat = activeCategory === "All" || m.category === activeCategory;
      const matchSearch = searchTerm === "" || [m.name, m.brand, m.model, m.controller, m.category].some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchTerm]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    const anyOpen = isModalOpen || !!lightbox || !!machineImageExpand;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen, lightbox, machineImageExpand]);

  // Scroll to hash on mount (e.g. #machine-information)
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }, []);

  const getImg = (m: Machine) => m.images[0] || machineImgMap[m.category] || pageSectionMedia.infrastructure.sections.machineFallback?.asset?.src;
  const getMachineImages = (m: Machine) => {
    if (m.images.length > 0) return m.images;
    const fallback = machineImgMap[m.category] || pageSectionMedia.infrastructure.sections.machineFallback?.asset?.src;
    return [fallback, machineryPhotos[0].src, machineryPhotos[1].src];
  };

  return (
    <Layout seo={buildPageSeo("infrastructure", [{ name: "Home", path: "/" }, { name: "Infrastructure", path: "/infrastructure" }], undefined, seoImages.filter((i) => i.path === "/infrastructure").map((i) => ({ name: i.title, imageUrl: i.image, caption: i.caption, pagePath: i.path, width: i.width, height: i.height, encodingFormat: i.mimeType })))}>

      {/* ═══ HERO with parallax ═══ */}
      <section ref={heroRef} className="relative pt-36 pb-32 bg-gradient-dark overflow-hidden">
        <motion.div className="absolute inset-0 opacity-20" style={{ y: heroY }}>
          <img src={pageSectionMedia.infrastructure.sections.hero?.asset?.src} alt="Manufacturing infrastructure at UNNATHI CNC Bangalore" className="w-full h-full object-cover scale-110" loading="eager" decoding="async" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal/90" />
        <div className="container relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <Breadcrumbs items={[{ name: "Infrastructure", active: true }]} className="mb-6 opacity-70" />
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase bg-primary/20 text-primary-foreground rounded-full mb-4 border border-primary/30">Infrastructure</span>
            <h1 className="mt-2 text-4xl md:text-6xl font-heading text-primary-foreground leading-tight">
              World-Class Manufacturing Infrastructure
            </h1>
            <p className="mt-5 text-steel max-w-2xl text-lg leading-relaxed">
              Advanced CNC machinery, precision inspection systems, and certified quality control facilities built for global standards.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                onClick={() => machineryRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="bg-gradient-industrial text-primary-foreground shadow-industrial hover:opacity-90 px-6 py-5 text-sm font-semibold"
              >
                <Factory className="h-4 w-4 mr-2" /> View Machinery
              </Button>
              <Button
                variant="hero"
                onClick={() => metrologyRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-5 text-sm font-semibold"
              >
                <Microscope className="h-4 w-4 mr-2" /> View Metrology
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ═══ INFRASTRUCTURE STATS ═══ */}
      <section className="relative -mt-16 z-10">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gradient-dark rounded-2xl p-8 md:p-10 shadow-elevated border border-primary/10">
            {[
              { end: 19, suffix: "+", label: "Years in Industry" },
              { end: 30, suffix: "+", label: "CNC Machines" },
              { end: 5, suffix: "-Axis", label: "Multi-Axis Capability" },
              { end: 1, suffix: " µm", label: "Inspection Accuracy" },
            ].map((s, i) => (
              <motion.div key={i} variants={scaleUp}>
                <AnimatedCounter end={s.end} suffix={s.suffix} label={s.label} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ MANUFACTURING PROCESS FLOW ═══ */}
      <section className="py-24 bg-gradient-dark overflow-hidden">
        <div className="container">
          <SectionHeading label="Process" title="Manufacturing Process Flow" description="End-to-end precision manufacturing with quality checks at every stage." light />
          <div className="hidden md:block relative mt-8">
            <div className="absolute top-7 left-[7%] right-[7%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 rounded-full" />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="relative grid grid-cols-7 gap-2">
              {processSteps.map((step, i) => {
                const Icon = processIcons[i];
                return (
                  <motion.div key={step.label} variants={scaleUp} className="flex flex-col items-center text-center group relative">
                    <div className="w-14 h-14 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center group-hover:bg-primary/30 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110 relative z-10 shadow-[0_0_24px_hsl(var(--primary)/0.2)]">
                      <Icon className="h-6 w-6 text-primary-foreground" strokeWidth={2} />
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-heading font-bold text-primary-foreground">{step.label}</p>
                      <p className="text-[11px] text-steel mt-1 leading-snug max-w-[120px] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="md:hidden mt-6 space-y-4">
            {processSteps.map((step, i) => {
              const Icon = processIcons[i];
              return (
                <motion.div key={step.label} variants={fadeUp} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 shadow-[0_0_16px_hsl(var(--primary)/0.15)]">
                    <Icon className="h-5 w-5 text-primary-foreground" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm font-heading font-bold text-primary-foreground">{step.label}</p>
                    <p className="text-xs text-steel mt-0.5">{step.desc}</p>
                  </div>
                  {i < processSteps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-primary-foreground/30 shrink-0 ml-auto" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ TECHNICAL CAPABILITY OVERVIEW ═══ */}
      <section className="py-24 bg-muted/50 overflow-hidden">
        <div className="container">
          <SectionHeading label="Capabilities" title="Technical Capability Overview" description="Industry-leading precision manufacturing capabilities across all operations." />
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {capabilityMetrics.map((cap, i) => {
              const Icon = capabilityIcons[i];
              return (
                <motion.div key={cap.label} variants={scaleUp}
                  className="bg-background rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 border border-transparent hover:border-primary/10 group hover:-translate-y-1.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-industrial flex items-center justify-center mb-4 shadow-industrial group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1">{cap.label}</p>
                  <p className="text-2xl font-heading font-bold text-foreground">{cap.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{cap.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ SHOP FLOOR OVERVIEW ═══ */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
            <h2 className="text-3xl md:text-4xl font-heading text-foreground">Shop-Floor Overview</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Our state-of-the-art manufacturing facility is equipped with advanced VMC, turning centers, and precision grinding machines. The shop floor operates under stringent quality controls with a focus on efficiency, safety, and precision.
            </p>
            <ul className="mt-6 space-y-2.5">
              {facilityFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight} className="relative">
            <img src={pageSectionMedia.infrastructure.sections.shopFloorOverview?.asset?.src} alt="CNC Manufacturing Facility Bangalore" className="rounded-2xl shadow-elevated w-full" loading="lazy" decoding="async" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-industrial rounded-2xl opacity-20 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* ═══ COMPREHENSIVE MACHINERY INVENTORY ═══ */}
      <section ref={machineryRef} id="machine-information" className="py-24 bg-muted/30 overflow-hidden scroll-mt-24">
        <div className="container">
          <SectionHeading label="Machinery" title="Comprehensive Machinery Inventory" description="Explore our complete fleet of precision CNC machines, grinders, and specialized equipment." />

          {/* Search + filter */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search machines, brands, controllers…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200",
                      activeCategory === cat
                        ? "bg-gradient-industrial text-primary-foreground border-primary shadow-industrial"
                        : "bg-background text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                    )}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{filtered.length} machine{filtered.length !== 1 ? "s" : ""} found</p>
          </motion.div>

          {/* Machine cards with enhanced hover */}
          <motion.div key={activeCategory + searchTerm} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" animate="visible" variants={stagger}>
            {filtered.map((m) => (
              <motion.div key={m.id} variants={scaleUp}
                className="bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group border border-border/50 hover:border-primary/20 cursor-pointer"
                whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
                onClick={() => setSelectedMachine(m)}>
                <div
                  className="h-44 overflow-hidden relative cursor-zoom-in"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMachineImageExpand({ images: getMachineImages(m), index: 0 });
                  }}
                >
                  <motion.img
                    src={getImg(m)}
                    alt={`${m.brand} ${m.model} ${m.name}`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-charcoal/80 text-primary-foreground rounded-full backdrop-blur-sm">{m.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">{m.brand}</p>
                  <h3 className="text-base font-heading font-bold text-foreground mt-1">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.model} · {m.axis}</p>
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                    <div className="text-xs"><span className="text-muted-foreground">Travel:</span> <span className="text-foreground font-medium">{m.capacity}</span></div>
                    <div className="text-xs"><span className="text-muted-foreground">Accuracy:</span> <span className="text-foreground font-medium">{m.accuracy}</span></div>
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-3 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">Controller: <span className="font-medium text-foreground">{m.controller}</span></span>
                    <span className="text-xs text-primary font-semibold flex items-center gap-0.5 group-hover:gap-1.5 transition-all">View Details <ChevronRight className="h-3 w-3" /></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ MACHINE DETAIL MODAL — enhanced with slider ═══ */}
      <AnimatePresence>
        {selectedMachine && (
          <>
            <motion.div
              className="fixed inset-0 z-[110] bg-charcoal/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMachine(null)}
            />
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                className="pointer-events-auto w-full max-w-[900px] max-h-[85vh] bg-background rounded-2xl shadow-elevated border border-border/50 overflow-y-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="md:grid md:grid-cols-5">
                  {/* LEFT: Image Slider */}
                  <div className="md:col-span-2 p-4 md:p-5">
                    <ImageSlider
                      images={getMachineImages(selectedMachine)}
                      alt={`${selectedMachine.brand} ${selectedMachine.model}`}
                      onExpand={(idx) => {
                        setMachineImageExpand({ images: getMachineImages(selectedMachine), index: idx });
                      }}
                    />
                    <div className="mt-3">
                      <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">{selectedMachine.category}</span>
                    </div>
                  </div>
                  {/* RIGHT: Specs */}
                  <div className="md:col-span-3 p-6 md:p-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider">{selectedMachine.brand}</p>
                        <h3 className="text-2xl font-heading font-bold text-foreground mt-1">{selectedMachine.name}</h3>
                        <p className="text-muted-foreground">{selectedMachine.model}</p>
                      </div>
                      <button onClick={() => setSelectedMachine(null)} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Close">
                        <X className="h-5 w-5 text-muted-foreground" />
                      </button>
                    </div>

                    <div className="w-full h-px bg-border/50 my-4" />

                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedMachine.description}</p>

                    <div className="w-full h-px bg-border/50 my-4" />

                    {/* Spec grid */}
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Technical Specifications</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Axis Configuration", value: selectedMachine.axis },
                        { label: "Travel / Capacity", value: selectedMachine.capacity },
                        { label: "Accuracy / Tolerance", value: selectedMachine.accuracy },
                        { label: "Controller", value: selectedMachine.controller },
                      ].map((spec) => (
                        <div key={spec.label} className="bg-muted/50 rounded-xl p-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{spec.label}</p>
                          <p className="text-sm font-semibold text-foreground mt-0.5">{spec.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="w-full h-px bg-border/50 my-4" />

                    {/* Industries */}
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Industries Supported</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedMachine.industries_supported.map((a) => (
                        <span key={a} className="px-3 py-1.5 text-xs bg-primary/5 text-primary rounded-full border border-primary/10 font-medium">{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ Machine Image Full-Screen Expand ═══ */}
      <AnimatePresence>
        {machineImageExpand && (
          <LightboxGallery
            images={machineImageExpand.images.map((src, i) => ({ src, label: `Machine view ${i + 1}` }))}
            initialIndex={machineImageExpand.index}
            onClose={() => setMachineImageExpand(null)}
          />
        )}
      </AnimatePresence>

      {/* ═══ ADVANCED METROLOGY & INSPECTION ═══ */}
      <section ref={metrologyRef} className="py-24 bg-background overflow-hidden scroll-mt-24">
        <div className="container">
          <SectionHeading label="Quality" title="Advanced Metrology & Inspection" description="Our inspection lab ensures micron-level dimensional accuracy with calibrated instruments and traceable measurement systems." />
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {metrologyDB.map((eq, i) => {
              const Icon = metrologyIcons[i % metrologyIcons.length];
              return (
                <motion.div key={eq.id} variants={scaleUp}
                  className="bg-muted/30 rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group border border-border/50 hover:border-primary/20 cursor-pointer"
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  onClick={() => setSelectedMetro(eq)}>
                  <div
                    className="h-40 overflow-hidden relative cursor-zoom-in"
                    onClick={(e) => {
                      e.stopPropagation();
                      const imgs = eq.images.length > 0 ? eq.images : [metroImg];
                      setLightbox({
                        images: imgs.map((src, idx) => ({
                          src,
                          label: `${eq.brand} ${eq.model} - ${eq.equipment_name}`
                        })),
                        index: 0
                      });
                    }}
                  >
                    <motion.img
                      src={eq.images[0] || metroImg}
                      alt={`${eq.brand} ${eq.model} ${eq.equipment_name}`}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Eye className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-industrial flex items-center justify-center shrink-0 shadow-industrial">
                        <Icon className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-heading font-bold text-foreground">{eq.equipment_name}</h3>
                        <p className="text-xs text-muted-foreground">{eq.brand} {eq.model}</p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="text-xs"><span className="text-muted-foreground">Accuracy:</span> <span className="text-foreground font-medium">{eq.accuracy}</span></div>
                      <div className="text-xs"><span className="text-muted-foreground">Resolution:</span> <span className="text-foreground font-medium">{eq.resolution}</span></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{eq.use_case}</p>
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <span className="text-xs text-primary font-semibold flex items-center gap-0.5 group-hover:gap-1.5 transition-all">View Details <ChevronRight className="h-3 w-3" /></span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ METROLOGY DETAIL MODAL ═══ */}
      <AnimatePresence>
        {selectedMetro && (
          <>
            <motion.div className="fixed inset-0 z-[110] bg-charcoal/70 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMetro(null)} />
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                className="pointer-events-auto w-full max-w-[700px] max-h-[85vh] bg-background rounded-2xl shadow-elevated border border-border/50 overflow-y-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div
                  className="relative cursor-zoom-in group/img"
                  onClick={() => {
                    const imgs = selectedMetro.images.length > 0 ? selectedMetro.images : [metroImg];
                    setLightbox({
                      images: imgs.map((src, idx) => ({
                        src,
                        label: `${selectedMetro.brand} ${selectedMetro.model}`
                      })),
                      index: 0
                    });
                  }}
                >
                  <img src={selectedMetro.images[0] || metroImg} alt={`${selectedMetro.brand} ${selectedMetro.model}`} className="w-full h-56 object-cover rounded-t-2xl hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 bg-charcoal/20 transition-opacity duration-300">
                    <Eye className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedMetro(null); }} className="absolute top-3 right-3 p-2 rounded-full bg-charcoal/70 text-primary-foreground hover:bg-charcoal transition-colors z-10" aria-label="Close">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">{selectedMetro.brand}</p>
                  <h3 className="text-2xl font-heading font-bold text-foreground mt-1">{selectedMetro.equipment_name}</h3>
                  <p className="text-muted-foreground">{selectedMetro.model}</p>

                  <div className="w-full h-px bg-border/50 my-4" />

                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedMetro.use_case}</p>

                  <div className="w-full h-px bg-border/50 my-4" />

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Accuracy", value: selectedMetro.accuracy },
                      { label: "Resolution", value: selectedMetro.resolution },
                      { label: "Calibration", value: selectedMetro.calibration_info },
                    ].map((spec) => (
                      <div key={spec.label} className={cn("bg-muted/50 rounded-xl p-3", spec.label === "Calibration" && "col-span-2")}>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{spec.label}</p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ TRUSTED GLOBAL MACHINE BRANDS ═══ */}
      <section className="py-24 bg-muted/30 overflow-hidden">
        <div className="container">
          <SectionHeading label="Partners" title="Trusted Global Machine Brands" description="Partnering with industry-leading OEM manufacturers for world-class precision." />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {brandsDB.map((brand) => (
              <motion.div key={brand.id} variants={scaleUp}
                className="relative bg-background rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 group border border-border/50 hover:border-primary/20 text-center cursor-default"
                whileHover={{ y: -4, transition: { duration: 0.3 } }}>
                <div className="text-2xl font-heading font-bold text-foreground/30 group-hover:text-primary transition-colors duration-300 mb-3">
                  {brand.brand_name}
                </div>
                <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{brand.country}</span>
                  <span className="flex items-center gap-1"><Settings className="h-3 w-3" />{brand.machines_installed} installed</span>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full group-hover:w-3/4 transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {[
              { value: "30+", label: "Precision Machines" },
              { value: "10+", label: "Global OEM Partners" },
              { value: "Multi-Axis", label: "Machining Capability" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-heading font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CERTIFICATIONS SHOWCASE ═══ */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container">
          <SectionHeading label="Certifications" title="Quality Certifications" description="Internationally recognized certifications validating our commitment to quality excellence." />
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {certifications.map((cert) => (
              <motion.div key={cert.name} variants={scaleUp}
                className="bg-muted/30 rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group border border-border/50 hover:border-primary/20 cursor-pointer"
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                onClick={() => cert.fileType === "image" && setCertModal(cert)}>
                <div className="h-48 overflow-hidden bg-background flex items-center justify-center p-4">
                  <img src={cert.preview} alt={cert.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-sm font-heading font-bold text-foreground">{cert.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{cert.desc}</p>
                  {cert.fileType === "pdf" && (
                    <a href={cert.file} target="_blank" rel="noreferrer" className="inline-block mt-2 text-xs font-semibold text-primary hover:underline">
                      Open Certificate PDF
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CERTIFICATION MODAL ═══ */}
      <AnimatePresence>
        {certModal && (
          <>
            <motion.div className="fixed inset-0 z-[110] bg-charcoal/70 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCertModal(null)} />
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                className="pointer-events-auto w-full max-w-[600px] max-h-[85vh] bg-background rounded-2xl shadow-elevated border border-border/50 overflow-y-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                  <h3 className="text-lg font-heading font-bold text-foreground">{certModal.name}</h3>
                  <button onClick={() => setCertModal(null)} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Close">
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
                <div className="p-6 flex items-center justify-center">
                  <img src={certModal.file} alt={certModal.name} className="max-h-[60vh] max-w-full object-contain" />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ SAFETY & COMPLIANCE ═══ */}
      <section className="py-24 bg-muted/50 overflow-hidden">
        <div className="container">
          <SectionHeading label="Compliance" title="Safety & Compliance Standards" description="Maintaining the highest standards of workplace safety and regulatory compliance." />
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {safetyItems.map((item, i) => {
              const Icon = safetyIcons[i];
              return (
                <motion.div key={item.label} variants={scaleUp}
                  className="text-center p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/10 hover:shadow-card transition-all duration-300 group"
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-industrial flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-industrial">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-sm font-heading font-bold text-foreground mb-1">{item.label}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ FACTORY GALLERY with lightbox ═══ */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container">
          <SectionHeading label="Environment" title="Inside Our Manufacturing Facility" description="A clean, organized, and technology-driven workspace built for precision." />
          <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {galleryImages.map((img, i) => (
              <motion.div key={i} variants={scaleUp}
                className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-card hover:shadow-elevated transition-all aspect-[4/3]"
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                onClick={() => setLightbox({ images: galleryImages.map((src, idx) => ({ src, label: galleryDisplayLabels[idx] })), index: i })}>
                <motion.img
                  src={img}
                  alt={galleryDisplayLabels[i]}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-sm font-heading font-semibold text-primary-foreground">{galleryDisplayLabels[i]}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ Gallery Lightbox ═══ */}
      <AnimatePresence>
        {lightbox && (
          <LightboxGallery
            images={lightbox.images}
            initialIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>

      {/* ═══ DOWNLOAD MACHINERY LIST ═══ */}
      <section className="py-16 bg-muted/30 border-y border-border/50 overflow-hidden">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-heading font-bold text-foreground">Complete Machinery Documentation</h3>
            <p className="text-sm text-muted-foreground mt-1">Download our complete machinery list and company brochure for your reference.</p>
          </div>
          <a href={unnathiCatalogPdf} download="Unnathi-Machinery-List.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-industrial text-primary-foreground font-semibold text-sm shadow-industrial hover:opacity-90 hover:scale-105 transition-all duration-300 shrink-0">
            <FileDown className="h-5 w-5" /> Download Complete Machinery List
          </a>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container max-w-3xl">
          <SectionHeading label="FAQ" title="Frequently Asked Questions" description="Common questions about our infrastructure and manufacturing capabilities." />
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-muted/30 rounded-xl border border-border/50 px-6 shadow-card data-[state=open]:shadow-elevated transition-all">
                <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══ INDUSTRIAL CTA ═══ */}
      <section className="py-24 bg-gradient-dark overflow-hidden">
        <div className="container text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl md:text-5xl font-heading text-primary-foreground max-w-3xl mx-auto leading-tight">
              Looking for a Precision CNC Manufacturing Partner?
            </h2>
            <p className="mt-4 text-steel max-w-xl mx-auto">
              From prototype to production — we deliver precision-engineered components with AS9100D certified quality.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/contact">
                <Button className="bg-gradient-industrial text-primary-foreground shadow-industrial hover:opacity-90 px-8 py-6 text-base font-semibold">
                  Request Technical Discussion
                </Button>
              </a>
              <a href="mailto:rfq@unnathicnc.com?subject=Drawing for Review">
                <Button variant="hero" className="px-8 py-6 text-base font-semibold">
                  Send Drawing for Review
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Infrastructure;
