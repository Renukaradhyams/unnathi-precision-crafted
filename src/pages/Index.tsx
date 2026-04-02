import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Target, Cog, ShieldCheck, Users, Clock, HeartHandshake,
  Plane, Stethoscope, Sprout, Wrench, Factory, Quote, ArrowRight, Upload, CheckCircle, Star, Zap, Car,
  Download, Play, FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import VideoCarousel from "@/components/VideoCarousel";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { buildPageSeo } from "@/seo/pageSeo";
import brochurePdf from "@/assets/Unnathi_new_catlog.pdf";
import SectionHeading from "@/components/SectionHeading";
import AnimatedCounter from "@/components/AnimatedCounter";
import { pageSectionMedia } from "@config/media.config";
import { seoImages } from "@config/images.config";
import { unitsConfig } from "@config/units.config";
import {
  homeHeroContent,
  whyChooseContent,
  homeIndustriesContent,
  homeCapabilitiesList,
  homeMaterialsList,
  homeTestimonials,
  corporateOverviewContent,
  homeInfrastructurePreview,
  homeExploreSection,
  homeBrochureSection,
  homeStatsSection
} from "@config/home.config";
import InteractiveMap from "@/components/InteractiveMap";
import homeHeroPhoto from "@/assets/3d_AI_generated/hero-cnc-3d.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
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

const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};


const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <Layout seo={buildPageSeo("home", [{ name: "Home", path: "/" }], undefined, seoImages.filter((image) => image.path === "/").map((image) => ({ name: image.title, imageUrl: image.image, caption: image.caption, pagePath: image.path, width: image.width, height: image.height, encodingFormat: image.mimeType })))}>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img src={homeHeroPhoto} alt="UNNATHI CNC precision machining facility Bangalore" title="UNNATHI VMC" className="w-full h-full object-cover" style={{ filter: "var(--img-enhance)" }} loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20" />
        </motion.div>
        <motion.div className="relative container px-6 py-28 pt-48 sm:pt-44" style={{ opacity: heroOpacity, y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.18 } } }}
            className="max-w-3xl"
          >
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 text-[10px] sm:text-xs font-semibold tracking-widest uppercase bg-primary/20 text-primary-foreground rounded-full mb-6 border border-primary/30 backdrop-blur-sm">
              {homeHeroContent.badge}
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.15] tracking-wide">
              {homeHeroContent.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-steel uppercase leading-snug tracking-wider">
              {homeHeroContent.subtitle}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-6 text-base sm:text-lg md:text-xl text-steel/90 max-w-lg leading-relaxed">
              {homeHeroContent.description}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-industrial text-primary-foreground hover:opacity-90 shadow-industrial hover:shadow-none transition-all duration-300 hover:scale-105 text-base px-8 h-12 sm:h-14">
                  Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="hero" className="w-full sm:w-auto hover:scale-105 transition-all duration-300 text-base h-12 sm:h-14">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs text-steel/60 tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 border-2 border-steel/30 rounded-full flex justify-center pt-1">
            <motion.div
              className="w-1 h-2 bg-primary/60 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Corporate Overview */}
      <section className="py-28 bg-background overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideLeft}>
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-primary px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10">{corporateOverviewContent.label}</span>
              <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-heading text-foreground leading-tight">
                {corporateOverviewContent.title}
              </h2>
              {corporateOverviewContent.paragraphs.map((p, idx) => (
                <p key={idx} className={cn("text-muted-foreground leading-relaxed text-base", idx > 0 ? "mt-3" : "mt-5")}>
                  {p}
                </p>
              ))}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {corporateOverviewContent.badges.map((badge) => (
                  <motion.div key={badge} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-sm font-medium text-foreground bg-muted rounded-lg px-4 py-3 hover:bg-primary/5 transition-colors duration-200 border border-transparent hover:border-primary/10">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" /> {badge}
                  </motion.div>
                ))}
              </div>
              <Link to="/about" className="mt-8 inline-block">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group text-base">
                  Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideRight}
              className="relative"
            >
              <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }} src={pageSectionMedia.home.sections.corporateOverview?.asset?.src} alt="UNNATHI CNC precision machining facility Bangalore" title="UNNATHI CNC Facility" className="rounded-2xl shadow-elevated w-full" style={{ filter: "var(--img-enhance)" }} />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-industrial rounded-2xl opacity-20 -z-10" />
              <div className="absolute -top-6 -right-6 w-36 h-36 bg-primary/10 rounded-full -z-10" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 md:right-8 bg-background/95 backdrop-blur-xl rounded-xl p-4 shadow-elevated border border-border/50"
              >
                <div className="text-2xl font-heading font-bold text-primary">4 Units</div>
                <div className="text-xs text-muted-foreground">Manufacturing Facilities</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Manufacturing Strengths */}
      <section className="py-28 bg-muted/50 overflow-hidden">
        <div className="container">
          <SectionHeading label="Manufacturing Strengths" title="Why Partner With UNNATHI CNC" description="Advanced CNC capabilities, certified quality processes, and customer-centric engineering solutions." />
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {whyChooseContent.map((item) => (
              <motion.div
                key={item.title}
                variants={scaleUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-background rounded-xl p-7 shadow-card hover:shadow-elevated transition-all duration-300 group border border-transparent hover:border-primary/10"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-industrial flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-industrial">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Explore Unnathi CNC – Premium Video Carousel */}
      <section className="py-28 bg-background overflow-hidden">
        <div className="container">
          <SectionHeading
            label={homeExploreSection.label}
            title={homeExploreSection.title}
            description={homeExploreSection.description}
          />
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Left – Video Carousel (3 cols) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideLeft}
              className="lg:col-span-3"
            >
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">{homeExploreSection.videoTitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {homeExploreSection.videoDescription}
              </p>
              <VideoCarousel
                videos={[
                  { id: "v1", title: "Manufacturing Facility Tour", thumbnail: pageSectionMedia.home.sections.videoPoster?.asset?.src, src: "/videos/unnathi-tour.mp4" },
                  { id: "v2", title: "CNC Machining Process", thumbnail: pageSectionMedia.home.sections.capabilityTurning?.asset?.src, src: "/videos/unnathi-video-2.mp4" },
                  { id: "v3", title: "Quality Inspection Walkthrough", thumbnail: pageSectionMedia.home.sections.capabilityQuality?.asset?.src, src: "/videos/unnathi-video-3.mp4" },
                ]}
              />
              <p className="mt-3 text-xs text-muted-foreground italic">
                Actual shop-floor visuals from our manufacturing units.
              </p>
            </motion.div>

            {/* Right – Brochure (2 cols) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideRight}
              className="lg:col-span-2 bg-muted/50 rounded-2xl p-8 border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-industrial flex items-center justify-center mb-5 shadow-industrial">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">{homeBrochureSection.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {homeBrochureSection.description}
              </p>
              <a href={brochurePdf} download="Unnathi-CNC-Brochure.pdf" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-gradient-industrial text-primary-foreground hover:opacity-90 shadow-industrial hover:shadow-none transition-all duration-300 hover:scale-105 text-base w-full sm:w-auto"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Brochure (PDF)
                </Button>
              </a>
              <p className="mt-3 text-xs text-muted-foreground">PDF | ~8 MB</p>

              <div className="mt-8 space-y-3">
                {homeBrochureSection.items.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counters */}
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={pageSectionMedia.home.sections.statsBackground?.asset?.src} alt="CNC machining service showcase image" title="CNC machining service showcase image" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100% / 0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="container relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase text-accent">{homeStatsSection.label}</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-heading text-primary-foreground">{homeStatsSection.title}</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <AnimatedCounter end={19} label="Years of Excellence" suffix="+" />
            <AnimatedCounter end={20} label="VMC" suffix="+" />
            <AnimatedCounter end={15} label="CNC Turning Centers" suffix="+" />
            <AnimatedCounter end={4} label="Manufacturing Units" />
            <AnimatedCounter end={100} label="Global Clients" suffix="+" />
          </div>
        </div>
      </section>

      {/* Capabilities Highlights */}
      <section className="py-28 bg-background overflow-hidden">
        <div className="container">
          <SectionHeading label="Our Capabilities" title="Advanced CNC Manufacturing" description="Comprehensive precision machining solutions from prototype to production." />
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "CNC Turning & Milling", img: pageSectionMedia.home.sections.capabilityTurning?.asset?.src, desc: "State-of-the-art CNC machines capable of producing complex geometries with high precision and repeatability." },
              { title: "Precision Machining", img: pageSectionMedia.home.sections.capabilityMachining?.asset?.src, desc: "Manufacturing high-accuracy components for industries requiring tight tolerances and superior surface finish quality." },
              { title: "Quality & Inspection", img: pageSectionMedia.home.sections.capabilityQuality?.asset?.src, desc: "Strict quality control processes supported by advanced inspection equipment ensuring every component meets specifications." },
            ].map((cap, i) => (
              <motion.div
                key={cap.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.15, duration: 0.6 } } }}
                className="group overflow-hidden rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500 bg-background border border-border/50 hover:border-primary/20"
              >
                <div className="relative h-56 overflow-hidden">
                  <motion.img whileHover={{ scale: 1.08 }} transition={{ duration: 0.7 }} src={cap.img} alt={cap.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">{cap.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                  <Link to="/capabilities" className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:gap-2 gap-1 transition-all duration-200">
                    Explore <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Capabilities & Materials Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft} className="bg-muted/50 rounded-2xl p-8 border border-border/50">
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">Core Capabilities</h3>
              <div className="grid grid-cols-2 gap-2">
                {homeCapabilitiesList.map((cap) => (
                  <div key={cap} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> {cap}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight} className="bg-muted/50 rounded-2xl p-8 border border-border/50">
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">Materials Expertise</h3>
              <div className="grid grid-cols-2 gap-2">
                {homeMaterialsList.map((mat) => (
                  <div key={mat} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> {mat}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-28 bg-muted/50 overflow-hidden">
        <div className="container">
          <SectionHeading label="Industries We Serve" title="Trusted Across Critical Sectors" description="Delivering precision components for the world's most demanding industries." />
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {homeIndustriesContent.map((ind) => (
              <motion.div
                key={ind.title}
                variants={scaleUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group overflow-hidden rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={ind.img} alt={ind.title} title={ind.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"  loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/10">
                      <ind.icon className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-heading font-semibold text-primary-foreground">{ind.title}</span>
                  </div>
                </div>
                <div className="p-5 bg-background">
                  <p className="text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
                  <Link to="/industries" className="mt-3 inline-flex items-center text-xs font-semibold text-primary hover:gap-2 gap-1 transition-all duration-200">
                    Learn More <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-12 text-center">
            <Link to="/industries">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group">
                View All Industries <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Multi-Unit Presence */}
      <section className="py-28 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100% / 0.08) 1px, transparent 0)", backgroundSize: "48px 48px" }} />
        </div>
        <div className="container relative">
          <SectionHeading label="Our Presence" title="Multi-Unit Manufacturing Network" description="Strategically located manufacturing units across Bangalore and Tumakuru enabling scalable production, specialization, and efficient logistics." light />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <InteractiveMap />
          </motion.div>
          <div className="mt-10 text-center">
            <Link to="/units">
              <Button size="lg" className="bg-gradient-industrial text-primary-foreground hover:opacity-90 shadow-industrial hover:shadow-none transition-all duration-300 hover:scale-105">
                Explore All Units <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Infrastructure Preview */}
      <section className="py-28 bg-background overflow-hidden">
        <div className="container">
          <SectionHeading label="Our Infrastructure" title="World-Class Manufacturing Facility" />
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {homeInfrastructurePreview.map((cat) => (
              <motion.div key={cat.title} variants={scaleUp} whileHover={{ y: -6 }} className="bg-muted/50 rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group border border-transparent hover:border-primary/10">
                <div className="h-40 overflow-hidden">
                  <img
                    src={pageSectionMedia.home.sections[cat.section as keyof typeof pageSectionMedia.home.sections]?.asset?.src || pageSectionMedia.shared.sections.imageFallback?.asset?.src}
                    alt={cat.title}
                    title={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-industrial flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-industrial -mt-10 relative">
                    <Factory className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">{cat.title}</h3>
                  <ul className="space-y-2.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 bg-muted/30 overflow-hidden">
        <div className="container">
          <SectionHeading label="Client Testimonials" title="What Our Partners Say" description="Hear from the companies that trust UNNATHI CNC for their precision manufacturing needs." />
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {homeTestimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={scaleUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="bg-background rounded-2xl p-6 relative border border-border/50 hover:border-primary/20 hover:shadow-elevated transition-all duration-300 group"
              >
                <Quote className="h-8 w-8 text-primary/10 absolute top-5 right-5 group-hover:text-primary/20 transition-colors" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-industrial flex items-center justify-center text-lg font-heading font-bold text-primary-foreground shadow-industrial">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">"{t.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={pageSectionMedia.home.sections.exportBackground?.asset?.src} alt="Precision components manufactured in India" title="Precision components manufactured in India" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100% / 0.05) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container relative text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-5xl font-heading text-primary-foreground">
              Looking for a Reliable Precision Manufacturing Partner?
            </h2>
            <p className="mt-4 text-steel max-w-lg mx-auto text-lg">
              Connect with our engineering team to discuss your project requirements and manufacturing solutions.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-industrial text-primary-foreground hover:opacity-90 shadow-industrial hover:shadow-none transition-all duration-300 hover:scale-105 text-base px-8">
                  Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="hero" className="hover:scale-105 transition-all duration-300 text-base">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
