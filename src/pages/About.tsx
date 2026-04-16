import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Award, Target, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { buildPageSeo } from "@/seo/pageSeo";
import SectionHeading from "@/components/SectionHeading";
import { certificateMedia, pageSectionMedia } from "@config/media.config";
import { teamPhotos } from "@config/units.config";
import certUnit1As9100IsoPdf from "@/assets/Certificates/6.2a.pdf";
import certUnit3IsoPdf from "@/assets/Certificates/6.2b.pdf";
import Breadcrumbs from "@/components/Breadcrumbs";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const milestones = [
  { year: "2007", event: "Company Founded — Precision machining company established with a strong focus on CNC capability" },
  { year: "2009", event: "First Major OEM Partnership Established" },
  { year: "2011", event: "ISO 9001 Certification Achieved" },
  { year: "2012", event: "Purchased 12,000 Sq. feet Industrial land & building in Peenya Industrial Area" },
  { year: "2013", event: "Expanded to Multi-Machine CNC Facility" },
  { year: "2016", event: "AS9100D Certification — Entered Aerospace Segment. First global client serviced" },
  { year: "2018", event: "Unit 2 — Dedicated manufacturing shopfloor for overseas customers established" },
  { year: "2020", event: "Reached major milestone with multiple global clients" },
  { year: "2021", event: "Fabrication facility setup" },
  { year: "2022", event: "Unit 3 — Electropolishing & Passivation facility established" },
  { year: "2023", event: "Acquired 17,500 Sq. feet land for further expansion" },
  { year: "2024", event: "Unit 4 established for heavy engineering with 44,000 Sq. feet facility" },
  { year: "2025", event: "Added a Heavy Vertical Turret Lathe (VTL) to Unit 4" },
];

const missionPoints = [
  "Deliver reliable, high-quality, and cost-effective CNC machining solutions that consistently meet customer expectations.",
  "Empower our workforce through continuous learning, innovation and skill development.",
  "Foster lasting customer partnerships built on trust, process excellence and timely delivery for sustainable growth.",
];

const certificates = [
  { title: "AS9100D & ISO 9001:2015 Certification (Unit-1)", file: certUnit1As9100IsoPdf, preview: certificateMedia.as9100TuvSud.src, fileType: "pdf" as const, alt: "AS9100D and ISO 9001:2015 certificate for UNNATHI CNC Technologies Unit-1" },
  { title: "ISO 9001:2015 Certification (Unit-3)", file: certUnit3IsoPdf, preview: certificateMedia.iso9001Unit3.src, fileType: "pdf" as const, alt: "ISO 9001:2015 certificate for UNNATHI CNC Technologies Unit-3" },
  { title: "ZED Gold Rating – Quality Council of India", file: certificateMedia.zedGold.src, preview: certificateMedia.zedGold.src, fileType: "image" as const, alt: "ZED Gold Rating certificate awarded to UNNATHI CNC Technologies by Quality Council of India" },
  { title: "Quality Excellence Award", file: certificateMedia.qualityAward.src, preview: certificateMedia.qualityAward.src, fileType: "image" as const, alt: "Quality Excellence Award presented to UNNATHI CNC Technologies team" },
];

// Only image-type certificates for the lightbox
const imageCerts = certificates.filter((c) => c.fileType === "image");

const About = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [teamLightboxIndex, setTeamLightboxIndex] = useState<number | null>(null);

  const isOpen = lightboxIndex !== null || teamLightboxIndex !== null;

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setTeamLightboxIndex(null);
      }

      // Certificate Lightbox Navigation
      if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev !== null ? (prev + 1) % imageCerts.length : null));
        if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev !== null ? (prev - 1 + imageCerts.length) % imageCerts.length : null));
      }

      // Team Lightbox Navigation
      if (teamLightboxIndex !== null) {
        if (e.key === "ArrowRight") setTeamLightboxIndex((prev) => (prev !== null ? (prev + 1) % teamPhotos.length : null));
        if (e.key === "ArrowLeft") setTeamLightboxIndex((prev) => (prev !== null ? (prev - 1 + teamPhotos.length) % teamPhotos.length : null));
      }
    },
    [isOpen, lightboxIndex, teamLightboxIndex, imageCerts.length, teamPhotos.length],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const openImageCert = (cert: typeof certificates[number]) => {
    const idx = imageCerts.findIndex((c) => c.file === cert.file);
    if (idx >= 0) setLightboxIndex(idx);
  };

  return (
    <Layout seo={buildPageSeo("about", [{ name: "Home", path: "/" }, { name: "About", path: "/about" }])}>
      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-gradient-dark overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={pageSectionMedia.about.sections.hero?.asset?.src} alt="UNNATHI CNC manufacturing facility in Bangalore" title="UNNATHI CNC manufacturing facility in Bangalore" className="w-full h-full object-cover" loading="eager" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="container relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Breadcrumbs items={[{ name: "About", active: true }]} className="mb-6 opacity-70" />
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase bg-primary/20 text-primary-foreground rounded-full mb-4 border border-primary/30">Who We Are</span>
            <h1 className="mt-2 text-4xl md:text-6xl font-heading text-primary-foreground">About UNNATHI CNC</h1>
            <p className="mt-4 text-steel max-w-xl text-lg">Leading precision engineering and CNC machining company delivering excellence since 2007.</p>
          </motion.div>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
            <h2 className="text-3xl md:text-4xl font-heading text-foreground">Company Profile</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Founded in 2007, Unnathi CNC Technologies Pvt Ltd has grown into a well-established, high-growth precision engineering company with a strong reputation in the global market. From the very beginning, the company has focused on state-of-the-art CNC machining capabilities, enabling it to undertake complex and challenging jobs with the highest level of accuracy and quality.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Over the years, this commitment to excellence has positioned Unnathi CNC Technologies Pvt Ltd as a trusted partner for aerospace, medical, and advanced engineering sectors worldwide.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              The organization is certified to AS9100D and ISO 9001:2015 quality management systems, demonstrating its commitment to quality excellence and continuous improvement in every process and every product.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {["AS9100D Certified", "ISO 9001:2015", "Global Market Focus", "Since 2007"].map((b) => (
                <motion.div key={b} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-sm font-medium text-foreground bg-muted rounded-lg px-3 py-2.5 border border-transparent hover:border-primary/10 transition-all">
                  <CheckCircle className="h-4 w-4 text-primary" /> {b}
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight} className="relative">
            <img src={pageSectionMedia.about.sections.facilitySection?.asset?.src} alt="Unnathi CNC Facility" title="Unnathi CNC Facility" className="rounded-2xl shadow-elevated" loading="lazy" decoding="async" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-industrial rounded-2xl opacity-20 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Organisational Overview */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight} className="md:order-2 relative overflow-hidden rounded-2xl">
            <img src={pageSectionMedia.about.sections.precisionSection?.asset?.src} alt="Unnathi CNC Organisational View" title="Unnathi CNC Organisational View" className="w-full h-full object-cover scale-150 shadow-elevated" loading="lazy" decoding="async" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft} className="md:order-1">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground">Organisational Overview</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              The company is led by an experienced leadership team supported by skilled engineers, technicians, and quality professionals. The organizational structure promotes efficiency, accountability, and continuous improvement across production, engineering, quality assurance, and customer support functions.
            </p>
            <h3 className="mt-6 text-xl font-heading font-semibold text-foreground">Business Focus</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Unnathi CNC positions itself as a trusted precision engineering partner specializing in critical machined components for OEM manufacturers and engineering companies requiring tight tolerances and consistent quality.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              The company collaborates closely with customer engineering teams to provide optimized manufacturing solutions, ensuring performance, efficiency, and cost-effectiveness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our People – Team Photos */}
      <section className="py-24 bg-muted/50 overflow-hidden">
        <div className="container">
          <SectionHeading label="Our Team" title="Our People" description="The skilled workforce behind our precision engineering excellence." />
          <div className="grid md:grid-cols-3 gap-6">
            {teamPhotos.map((photo, i) => (
              <motion.div
                key={photo.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden shadow-elevated group cursor-pointer"
                onClick={() => setTeamLightboxIndex(i)}
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  title={`Unnathi CNC Technologies – ${photo.label}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent flex items-end p-4" />
                <p className="absolute bottom-4 left-4 text-sm font-semibold text-primary-foreground group-hover:text-primary transition-colors">{photo.label}</p>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal/20">
                   <div className="bg-background/80 p-2 rounded-full text-foreground shadow-sm">
                      <Eye className="h-5 w-5" />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="mt-8 text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            Our experienced engineers, technicians, and quality professionals work together to deliver precision-engineered components that meet global standards.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container grid md:grid-cols-2 gap-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={scaleUp}
            className="bg-muted/30 rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-primary/10 group">
            <div className="w-14 h-14 rounded-xl bg-gradient-industrial flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-industrial">
              <Eye className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground">Our Vision</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              To be recognized worldwide for excellence, innovation and sustainable precision engineering.
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ ...scaleUp, visible: { ...scaleUp.visible, transition: { delay: 0.15, duration: 0.5, ease: "easeOut" as const } } }}
            className="bg-muted/30 rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-primary/10 group">
            <div className="w-14 h-14 rounded-xl bg-gradient-industrial flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-industrial">
              <Target className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground">Our Mission</h3>
            <ul className="mt-3 space-y-2">
              {missionPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" /> {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Milestones */}
      <section id="milestones" className="py-24 bg-muted/50 overflow-hidden">
        <div className="container">
          <SectionHeading label="Our Journey" title="Growth Timeline" description="From a single CNC machine to a multi-unit precision manufacturing enterprise." />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.08, duration: 0.5 } } }}
                className={`relative flex items-start gap-4 mb-10 ${i % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""}`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 mt-1 border-2 border-background shadow-industrial" />
                <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <span className="text-sm font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">{m.year}</span>
                  <p className="text-foreground font-medium mt-1">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Standards */}
      <section id="awards" className="py-24 bg-background overflow-hidden">
        <div className="container">
          <SectionHeading label="Recognition" title="Certifications & Standards" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "AS9100D Certification",
              "ISO 9001:2015 Certification",
              "Quality Excellence Award",
              "Best Precision Supplier",
            ].map((a, i) => (
              <motion.div key={a} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ ...scaleUp, visible: { ...scaleUp.visible, transition: { delay: i * 0.1, duration: 0.5 } } }}
                className="bg-muted/50 rounded-2xl p-6 text-center shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group border border-transparent hover:border-primary/10">
                <Award className="h-10 w-10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-heading font-semibold text-foreground">{a}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Certifications – Image Showcase */}
      <section className="py-24 bg-muted/50 overflow-hidden">
        <div className="container">
          <SectionHeading label="Verified Quality" title="Our Certifications" description="Visual proof of our commitment to international quality standards." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...scaleUp, visible: { ...scaleUp.visible, transition: { delay: i * 0.1, duration: 0.5 } } }}
                className="bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-primary/10 cursor-pointer group"
                onClick={() => cert.fileType === "image" && openImageCert(cert)}
              >
                <div className="aspect-[3/4] overflow-hidden bg-muted/30 p-4">
                  <img
                    src={cert.preview}
                    alt={cert.alt}
                    title={cert.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-4 text-center space-y-2">
                  <h3 className="text-sm font-heading font-semibold text-foreground">{cert.title}</h3>
                  {cert.fileType === "pdf" && (
                    <a href={cert.file} target="_blank" rel="noreferrer" className="text-xs font-semibold text-primary hover:underline" onClick={(e) => e.stopPropagation()}>
                      Open Certificate PDF
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Enhanced Certificate Lightbox ═══ */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[200] bg-charcoal/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
            />
            {/* Content */}
            <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                className="relative max-w-2xl w-full pointer-events-auto"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute -top-12 right-0 md:-top-4 md:-right-12 z-10 w-10 h-10 rounded-full bg-background/90 text-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Close certificate view"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Image */}
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={lightboxIndex}
                    src={imageCerts[lightboxIndex].file}
                    alt={imageCerts[lightboxIndex].alt}
                    className="w-full max-h-[80vh] object-contain rounded-xl"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Title + counter */}
                <div className="mt-4 text-center">
                  <p className="font-heading font-bold text-primary-foreground text-lg">{imageCerts[lightboxIndex].title}</p>
                  <p className="text-sm text-steel mt-1">{lightboxIndex + 1} / {imageCerts.length}</p>
                </div>

                {/* Navigation arrows */}
                {imageCerts.length > 1 && (
                  <>
                    <button
                      onClick={() => setLightboxIndex((prev) => prev !== null ? (prev - 1 + imageCerts.length) % imageCerts.length : null)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 text-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
                      aria-label="Previous certificate"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setLightboxIndex((prev) => prev !== null ? (prev + 1) % imageCerts.length : null)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 text-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
                      aria-label="Next certificate"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ Team Photo Lightbox ═══ */}
      <AnimatePresence>
        {teamLightboxIndex !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[200] bg-charcoal/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTeamLightboxIndex(null)}
            />
            {/* Content */}
            <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                className="relative max-w-4xl w-full pointer-events-auto"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setTeamLightboxIndex(null)}
                  className="absolute -top-12 right-0 md:-top-6 md:-right-12 z-10 w-10 h-10 rounded-full bg-background/90 text-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Close team photo view"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Image */}
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={teamLightboxIndex}
                    src={teamPhotos[teamLightboxIndex].src}
                    alt={teamPhotos[teamLightboxIndex].label}
                    className="w-full max-h-[85vh] object-contain rounded-xl shadow-elevated"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Label + counter */}
                <div className="mt-6 text-center">
                  <p className="font-heading font-bold text-primary-foreground text-2xl">{teamPhotos[teamLightboxIndex].label}</p>
                  <p className="text-sm text-steel mt-1 uppercase tracking-widest">{teamLightboxIndex + 1} / {teamPhotos.length}</p>
                </div>

                {/* Navigation arrows */}
                {teamPhotos.length > 1 && (
                  <>
                    <button
                      onClick={() => setTeamLightboxIndex((prev) => prev !== null ? (prev - 1 + teamPhotos.length) % teamPhotos.length : null)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 text-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform md:-left-16"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => setTeamLightboxIndex((prev) => prev !== null ? (prev + 1) % teamPhotos.length : null)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 text-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform md:-right-16"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default About;
