import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cog, Zap, CheckCircle, Plane, Stethoscope } from "lucide-react";
import Layout from "@/components/Layout";
import { buildPageSeo } from "@/seo/pageSeo";
import SectionHeading from "@/components/SectionHeading";
import { pageSectionMedia } from "@config/media.config";
import LightboxGallery from "@/components/LightboxGallery";
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

const industries = [
  {
    icon: Stethoscope, title: "Pharma Equipment", img: pageSectionMedia.industries.sections.pharmaEquipment?.asset?.src,
    desc: "Precision-machined components for pharma and process equipment applications requiring strict dimensional and surface quality control.",
    components: ["Valve Bodies", "Manifold Blocks", "Fittings & Connectors", "Pump Components", "Custom SS Assemblies"],
  },
  {
    icon: Plane, title: "Aerospace", img: pageSectionMedia.industries.sections.aerospace?.asset?.src,
    desc: "Flight-critical and precision components manufactured under robust quality systems with high repeatability.",
    components: ["Mounting Brackets", "Hydraulic Components", "Structural Precision Parts", "Engine Subcomponents", "Inspection-Critical Parts"],
  },
  {
    icon: Zap, title: "Semi-Conductor", img: pageSectionMedia.industries.sections.semiconductor?.asset?.src,
    desc: "High-precision parts for semiconductor equipment, including clean-finish components and complex machined features.",
    components: ["Flange Components", "Precision Plates", "Clean-Process Fittings", "Custom Tooling Parts", "Alignment Components"],
  },
  {
    icon: Cog, title: "Machine Tools", img: pageSectionMedia.industries.sections.machineTools?.asset?.src,
    desc: "Reliable machined components for machine tool builders and industrial automation systems.",
    components: ["Spindle Components", "Housings", "Guide Blocks", "Fixture Parts", "Transmission Components"],
  },
];

const Industries = () => {
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null);

  const lightboxImages = industries.map((ind) => ({
    src: ind.img,
    label: ind.title,
  }));

  return (
  <Layout seo={buildPageSeo("industries", [{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])}>
    <section className="relative pt-36 pb-24 bg-gradient-dark overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <img src={pageSectionMedia.industries.sections.hero?.asset?.src} alt="Precision machined components for industrial applications" title="Precision machined components for industrial applications" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
      </div>
      <div className="absolute inset-0 bg-charcoal/70" />
      <div className="container relative">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Breadcrumbs items={[{ name: "Industries", active: true }]} className="mb-6 opacity-70" />
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase bg-primary/20 text-primary-foreground rounded-full mb-4 border border-primary/30">Industries</span>
          <h1 className="mt-2 text-4xl md:text-6xl font-heading text-primary-foreground">Industries We Serve</h1>
          <p className="mt-4 text-steel max-w-xl text-lg">Trusted partner for pharma equipment, aerospace, semi-conductor, and machine tools industries.</p>
        </motion.div>
      </div>
    </section>

    {industries.map((ind, i) => (
      <section key={ind.title} className={`py-24 ${i % 2 === 0 ? "bg-background" : "bg-muted/50"} overflow-hidden`}>
        <div className="container">
          <div className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? "md:grid-flow-col-dense" : ""}`}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={i % 2 === 0 ? slideLeft : slideRight}
              className={i % 2 !== 0 ? "md:col-start-2" : ""}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-industrial flex items-center justify-center shadow-industrial">
                  <ind.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="text-3xl md:text-4xl font-heading text-foreground">{ind.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{ind.desc}</p>
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Key Components</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ind.components.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={i % 2 === 0 ? slideRight : slideLeft}
              className={i % 2 !== 0 ? "md:col-start-1" : ""}>
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                src={ind.img}
                alt={ind.title}
                className="rounded-2xl shadow-elevated w-full h-80 object-cover cursor-pointer"
                onClick={() => setLightbox({ index: i })}
              />
            </motion.div>
          </div>
        </div>
      </section>
    ))}

    <AnimatePresence>
      {lightbox && (
        <LightboxGallery
          images={lightboxImages}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </AnimatePresence>
  </Layout>
);
};

export default Industries;
