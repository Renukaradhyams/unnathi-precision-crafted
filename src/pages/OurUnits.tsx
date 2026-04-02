import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Factory, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { unitsConfig } from "@config/units.config";
import { buildPageSeo } from "@/seo/pageSeo";
import Breadcrumbs from "@/components/Breadcrumbs";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

/* Show max 5 capabilities per card */
const MAX_CAPABILITIES = 5;

const OurUnits = () => (
  <Layout seo={buildPageSeo("units", [{ name: "Home", path: "/" }, { name: "Our Units", path: "/units" }])}>
    {/* Hero */}
    <section className="relative pt-36 pb-24 bg-gradient-dark overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100% / 0.1) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>
      <div className="container relative">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Breadcrumbs items={[{ name: "Our Units", active: true }]} className="mb-6 opacity-70" />
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase bg-primary/20 text-primary-foreground rounded-full mb-4 border border-primary/30">Our Presence</span>
          <h1 className="mt-2 text-4xl md:text-6xl font-heading text-primary-foreground">Our Manufacturing Units</h1>
          <p className="mt-4 text-steel max-w-xl text-lg">Multiple manufacturing units strategically located in Bangalore and Tumakuru enabling scalable production, specialization, and efficient logistics.</p>
        </motion.div>
      </div>
    </section>

    {/* Units Grid */}
    <section className="py-20 bg-background">
      <div className="container">
        <SectionHeading label="Facilities" title="4 Units. One Mission." description="Each unit includes advanced CNC machines, skilled manpower, and quality inspection systems." />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-8"
        >
          {unitsConfig.map((unit) => {
            const displayCaps = unit.capabilities.slice(0, MAX_CAPABILITIES);
            const remaining = unit.capabilities.length - MAX_CAPABILITIES;

            return (
              <motion.div
                key={unit.id}
                variants={fadeUp}
                className="group relative bg-background rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1.5 border border-border/50 hover:border-primary/20 overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="h-1 bg-gradient-industrial" />

                <div className="p-7">
                  {/* Header row: icon + title */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-industrial flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-industrial">
                      <Factory className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-heading font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                        {unit.name}
                      </h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-primary" /> {unit.location}
                      </p>
                    </div>
                  </div>

                  {/* Specialisation badge */}
                  <div className="mb-5">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide bg-primary/10 text-primary rounded-full border border-primary/20">
                      {unit.specialisation}
                    </span>
                  </div>

                  {/* Key Capabilities */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                      <Wrench className="h-3 w-3" /> Key Capabilities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {displayCaps.map((c) => (
                        <span key={c} className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground bg-muted rounded-lg px-2.5 py-1.5 border border-border/50">
                          {c}
                        </span>
                      ))}
                      {remaining > 0 && (
                        <span className="inline-flex items-center text-xs font-medium text-primary bg-primary/5 rounded-lg px-2.5 py-1.5 border border-primary/20">
                          +{remaining} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to={`/units/${unit.id}`}>
                    <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group/btn w-full sm:w-auto">
                      View Details <ArrowRight className="ml-1.5 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default OurUnits;
