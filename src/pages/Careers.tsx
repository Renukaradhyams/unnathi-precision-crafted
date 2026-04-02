import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { buildPageSeo } from "@/seo/pageSeo";
import SectionHeading from "@/components/SectionHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const openings = [
  { title: "CNC Programmer", location: "Bangalore", type: "Full-time", desc: "Experienced CNC programmer for multi-axis machining centers. Mastercam proficiency required." },
  { title: "Quality Inspector", location: "Bangalore", type: "Full-time", desc: "QA Inspector with CMM experience and knowledge of AS9100D quality systems." },
  { title: "CNC Machine Operator", location: "Bangalore", type: "Full-time", desc: "Skilled operator for CNC turning and milling centers. Minimum 3 years experience." },
  { title: "Design Engineer", location: "Bangalore", type: "Full-time", desc: "SolidWorks/NX proficient engineer for component design and process planning." },
];

const Careers = () => (
  <Layout seo={buildPageSeo("careers", [{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }])}>
    <section className="relative pt-32 pb-20 bg-gradient-dark">
      <div className="container relative">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">Careers</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-primary-foreground">Join Team UNNATHI CNC</h1>
          <p className="mt-4 text-steel max-w-xl">Build your career with a leader in precision engineering.</p>
        </motion.div>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container">
        <SectionHeading label="Open Positions" title="Current Opportunities" description="We're always looking for talented individuals to join our team." />
        <div className="max-w-3xl mx-auto space-y-4">
          {openings.map((job, i) => (
            <motion.div
              key={job.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.1, duration: 0.5 } } }}
              className="bg-muted rounded-lg p-6 shadow-card hover:shadow-industrial transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-foreground flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" /> {job.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {job.type}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{job.desc}</p>
                </div>
                <Link to="/contact">
                  <Button size="sm" className="bg-gradient-industrial text-primary-foreground hover:opacity-90 shrink-0">
                    Apply <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-12 text-center bg-muted rounded-lg p-8 max-w-xl mx-auto">
          <Send className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="text-xl font-heading font-semibold text-foreground">Don't See a Fit?</h3>
          <p className="mt-2 text-sm text-muted-foreground">Send your resume to <strong>careers@unnathicnc.com</strong> and we'll keep it on file for future openings.</p>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Careers;
