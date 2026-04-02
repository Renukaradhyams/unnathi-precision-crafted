import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle, FileCheck, Microscope, ClipboardList } from "lucide-react";
import Layout from "@/components/Layout";
import { buildPageSeo } from "@/seo/pageSeo";
import SectionHeading from "@/components/SectionHeading";
import { qualityLabPhotos } from "@config/units.config";
import certUnit1As9100IsoPdf from "@/assets/Certificates/6.2a.pdf";
import certUnit3IsoPdf from "@/assets/Certificates/6.2b.pdf";
import { pageSectionMedia } from "@config/media.config";
import Breadcrumbs from "@/components/Breadcrumbs";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const inspectionEquipment = [
  "Coordinate Measuring Machine (CMM)",
  "Profile Projector",
  "Surface Table for Inspection",
  "Digital Micrometer",
  "Height Master",
  "Digital Vernier",
  "Vision Measuring System",
  "Depth Gauge",
  "Thread & Pin Gauges",
  "Contour Measuring Instrument",
  "Surface Roughness Instrument",
];

const Quality = () => (
  <Layout seo={buildPageSeo("quality", [{ name: "Home", path: "/" }, { name: "Quality", path: "/quality" }])}>
    <section className="relative pt-32 pb-20 bg-gradient-dark">
      <div className="container relative">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Breadcrumbs items={[{ name: "Quality", active: true }]} className="mb-6 opacity-70" />
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">Quality</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-primary-foreground">Quality & Certifications</h1>
          <p className="mt-4 text-steel max-w-xl">Uncompromising quality standards across every component we manufacture.</p>
        </motion.div>
      </div>
    </section>

    {/* Certifications */}
    <section className="py-20 bg-background">
      <div className="container">
        <SectionHeading label="Certifications" title="Our Quality Credentials" />
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "AS9100D & ISO 9001:2015 (Unit-1)",
              desc: "Unit-1 certificate for AS9100D and ISO 9001:2015 issued by TÜV SÜD. Valid until 12/12/2027.",
              scope: "CNC Machining, Assembly, and Testing of precision aerospace components.",
              validity: "12/12/2027",
              file: certUnit1As9100IsoPdf,
              preview: pageSectionMedia.quality.sections.certificateUnit1?.asset?.src,
            },
            {
              title: "ISO 9001:2015 (Unit-3)",
              desc: "Unit-3 ISO 9001:2015 certificate for surface treatment and related operations. Valid until 07/01/2029.",
              scope: "Manufacturing and surface treatment services for stainless steel and other suitable alloys.",
              validity: "07/01/2029",
              file: certUnit3IsoPdf,
              preview: pageSectionMedia.quality.sections.certificateUnit3?.asset?.src,
            },
          ].map((cert) => (
            <motion.div key={cert.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-muted rounded-lg p-8 shadow-card">
              <div className="w-14 h-14 rounded-sm bg-gradient-industrial flex items-center justify-center mb-4">
                <ShieldCheck className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground">{cert.title}</h3>
              <p className="mt-3 text-muted-foreground text-sm">{cert.desc}</p>
              <div className="mt-4 rounded-md overflow-hidden border border-border bg-background">
                <img src={cert.preview} alt={`${cert.title} certificate`} className="w-full h-52 object-contain" loading={cert.title.includes("AS9100D") ? "eager" : "lazy"} decoding="async" />
              </div>
              <div className="mt-3">
                <a href={cert.file} target="_blank" rel="noreferrer" className="text-xs font-semibold text-primary hover:underline">
                  Open Certificate PDF
                </a>
              </div>
              <div className="mt-4 p-3 bg-background rounded-sm flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">Scope</p>
                  <p className="text-sm text-muted-foreground mt-1">{cert.scope}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">Valid Up To</p>
                  <p className="text-sm font-bold text-foreground mt-1">{cert.validity}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Quality Policy */}
    <section className="py-20 bg-muted">
      <div className="container max-w-3xl text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <FileCheck className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-heading text-foreground">Our Quality Policy</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-lg italic">
            "We are committed to delivering precision-machined components that consistently meet or exceed customer requirements and applicable statutory & regulatory standards. Through continuous improvement, advanced technology, and a skilled workforce, we strive for zero-defect manufacturing."
          </p>
        </motion.div>
      </div>
    </section>

    {/* Quality Lab Photos */}
    <section className="py-20 bg-background">
      <div className="container">
        <SectionHeading label="Quality Lab" title="Our Quality Lab & Inspection Area" description="State-of-the-art inspection and measurement equipment — in action." />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {qualityLabPhotos.map((photo, i) => (
            <motion.div
              key={photo.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.08, duration: 0.6 } } }}
              className="group overflow-hidden rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500 border border-border/50"
            >
              <div className="relative h-52 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6 }}
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                <p className="absolute bottom-3 left-3 text-sm font-semibold text-primary-foreground">{photo.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Inspection Equipment */}
    <section className="py-20 bg-muted">
      <div className="container">
        <SectionHeading label="Quality Control" title="Inspection Equipment" description="Comprehensive inspection capabilities for 100% quality assurance." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {inspectionEquipment.map((eq) => (
            <motion.div key={eq} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-muted rounded-lg p-4 shadow-card flex items-center gap-3">
              <Microscope className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-medium text-foreground">{eq}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Compliance */}
    <section className="py-20 bg-muted">
      <div className="container">
        <SectionHeading label="Compliance" title="Traceability & Process Control" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: ClipboardList, title: "Full Material Traceability", desc: "Complete material certificates and batch traceability from raw material to finished product." },
            { icon: FileCheck, title: "First Article Inspection", desc: "Comprehensive FAI reports per AS9102 standard for all new and revised components." },
            { icon: ShieldCheck, title: "Statistical Process Control", desc: "SPC monitoring on critical dimensions ensuring consistent quality throughout production runs." },
          ].map((item) => (
            <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-background rounded-lg p-6 shadow-card">
              <item.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-heading font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Quality;
