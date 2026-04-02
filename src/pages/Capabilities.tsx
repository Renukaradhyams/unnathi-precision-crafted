import { motion } from "framer-motion";
import { Factory, Cog, Monitor, ArrowRight, CheckCircle, Wrench, Target, Layers } from "lucide-react";
import Layout from "@/components/Layout";
import { buildPageSeo } from "@/seo/pageSeo";
import SectionHeading from "@/components/SectionHeading";
import { pageSectionMedia } from "@config/media.config";
import Breadcrumbs from "@/components/Breadcrumbs";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

import compOnDisplay from "@/assets/Unnathi-01-web content/Components_display.webp";
import qcRoom from "@/assets/Main_photos/QC room.webp";
import buildingEntrance from "@/assets/Unnathi-04-web content/H_boring_Machine.webp";

const services = [
  { icon: Cog, title: "Core CNC Services", img: buildingEntrance, desc: "Comprehensive machining services delivered through advanced CNC platforms and experienced process teams.", items: ["Turning Operations", "VMC Machining", "Surface and Cylindrical Grinding", "Wire Cutting", "H-Boring & VTL"] },
  { icon: Wrench, title: "Special Processes", img: pageSectionMedia.capabilities.sections.specialProcesses?.asset?.src, desc: "Integrated support processes to deliver finished components with reliable quality and surface integrity.", items: ["MIG & TIG Welding", "Orbital Welding", "Sandblasting", "Electropolishing", "Pickling and Passivation"] },
  { icon: Layers, title: "Production Model", img: compOnDisplay, desc: "We are experts in prototype and batch manufacturing programs for precision-engineered parts.", items: ["Prototype Development", "Batch Production", "Drawing-to-Part Execution", "Quality-Driven Delivery"] },
  { icon: Target, title: "Inspection & Quality Assurance", img: qcRoom, desc: "In-process and final inspection supported by calibrated instruments and advanced metrology capabilities.", items: ["Surface Table Inspection", "Digital Micrometer & Vernier", "Profile Projection", "Vision Measurement", "CMM & Contour Measurement", "Surface Roughness Analysis"] },
];

const processSteps = [
  { step: "01", title: "Requirement Analysis", desc: "Review customer drawings, specifications, and material requirements." },
  { step: "02", title: "CAD/CAM Programming", desc: "3D modeling and toolpath generation using advanced CAM software." },
  { step: "03", title: "Raw Material Procurement", desc: "Sourcing certified materials with full traceability documentation." },
  { step: "04", title: "CNC Machining", desc: "Precision turning, milling, and grinding operations on advanced CNC equipment." },
  { step: "05", title: "Quality Inspection", desc: "100% inspection using calibrated instruments and advanced metrology." },
  { step: "06", title: "Delivery & Support", desc: "Secure packaging and on-time delivery with complete documentation." },
];

const technicalStrengths = [
  "Turning, VMC, Grinding & Wire Cutting", "H-Boring and VTL Support", "MIG, TIG, and Orbital Welding",
  "Electropolishing, Pickling & Passivation", "Prototype and Batch Expertise", "Advanced Metrology & Inspection",
];

const Capabilities = () => (
  <Layout seo={buildPageSeo("capabilities", [{ name: "Home", path: "/" }, { name: "Capabilities", path: "/capabilities" }])}>
    <section className="relative pt-36 pb-24 bg-gradient-dark overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <img src={pageSectionMedia.capabilities.sections.inspection?.asset?.src} alt="CNC milling machine in operation at Bangalore unit" title="CNC milling machine in operation at Bangalore unit" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
      </div>
      <div className="absolute inset-0 bg-charcoal/70" />
      <div className="container relative">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Breadcrumbs items={[{ name: "Capabilities", active: true }]} className="mb-6 opacity-70" />
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase bg-primary/20 text-primary-foreground rounded-full mb-4 border border-primary/30">Our Capabilities</span>
          <h1 className="mt-2 text-4xl md:text-6xl font-heading text-primary-foreground">Capabilities & Services</h1>
          <p className="mt-4 text-steel max-w-xl text-lg">Comprehensive precision machining solutions focused on prototype and batch production.</p>
        </motion.div>
      </div>
    </section>

    {/* Services */}
    <section className="py-24 bg-background overflow-hidden">
      <div className="container space-y-20">
        {services.map((svc, i) => (
          <div key={svc.title} className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? "md:grid-flow-col-dense" : ""}`}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={i % 2 === 0 ? slideLeft : slideRight}
              className={i % 2 !== 0 ? "md:col-start-2" : ""}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-industrial flex items-center justify-center shadow-industrial">
                  <svc.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading text-foreground">{svc.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{svc.desc}</p>
              <ul className="mt-4 space-y-2">
                {svc.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={i % 2 === 0 ? slideRight : slideLeft}
              className={i % 2 !== 0 ? "md:col-start-1" : ""}>
              <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }} src={svc.img} alt={svc.title} className="rounded-2xl shadow-elevated w-full h-72 object-cover" />
            </motion.div>
          </div>
        ))}
      </div>
    </section>

    {/* Process Flow */}
    <section id="process" className="py-24 bg-muted/50 overflow-hidden">
      <div className="container">
        <SectionHeading label="Process Flow" title="Our Manufacturing Process" description="A systematic approach ensuring quality at every stage." />
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          {processSteps.map((s) => (
            <motion.div key={s.step} variants={scaleUp}
              className="bg-background rounded-2xl p-6 shadow-card relative overflow-hidden group hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-primary/10">
              <span className="absolute top-3 right-3 text-6xl font-heading font-bold text-muted/40 group-hover:text-primary/10 transition-colors">{s.step}</span>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-industrial flex items-center justify-center shadow-industrial">
                    <ArrowRight className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <h3 className="text-base font-heading font-semibold text-foreground">{s.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Technical Strengths */}
    <section className="py-24 bg-background overflow-hidden">
      <div className="container">
        <SectionHeading label="Technical Strengths" title="Engineering Excellence" />
        <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          {technicalStrengths.map((strength) => (
            <motion.div key={strength} variants={scaleUp} whileHover={{ scale: 1.05, y: -4 }}
              className="bg-muted/50 rounded-xl p-5 text-center shadow-card hover:shadow-elevated transition-all border border-transparent hover:border-primary/10">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">{strength}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Capabilities;
