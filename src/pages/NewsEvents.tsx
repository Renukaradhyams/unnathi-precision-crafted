import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { buildPageSeo } from "@/seo/pageSeo";
import SectionHeading from "@/components/SectionHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const news = [
  { date: "Jan 2025", title: "UNNATHI CNC Expands Facility with New 5-Axis Machining Centers", desc: "We are excited to announce the addition of two new 5-axis CNC machining centers to our manufacturing floor, significantly expanding our precision machining capabilities." },
  { date: "Nov 2024", title: "AS9100D Recertification Successfully Completed", desc: "UNNATHI CNC has successfully completed its AS9100D recertification audit with zero non-conformances, reaffirming our commitment to aerospace quality standards." },
  { date: "Sep 2024", title: "UNNATHI CNC Participates in Aero India 2024", desc: "Our team showcased our aerospace machining capabilities at Aero India 2024, connecting with industry leaders and exploring new opportunities." },
  { date: "Jul 2024", title: "New Partnership with European Aerospace OEM", desc: "We are proud to announce a strategic partnership with a leading European aerospace OEM for the supply of critical flight components." },
  { date: "May 2024", title: "Best Supplier Award from Leading Medical Device Company", desc: "UNNATHI CNC received the Best Supplier Award for quality and delivery excellence from a leading medical device manufacturer." },
  { date: "Mar 2024", title: "Employee Skill Development Program Launched", desc: "We launched a comprehensive skill development program for our workforce, focusing on advanced CNC programming and quality management." },
];

const NewsEvents = () => (
  <Layout seo={buildPageSeo("news", [{ name: "Home", path: "/" }, { name: "News & Events", path: "/news" }])}>
    <section className="relative pt-32 pb-20 bg-gradient-dark">
      <div className="container relative">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">Updates</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-primary-foreground">News & Events</h1>
          <p className="mt-4 text-steel max-w-xl">Stay updated with our latest achievements, events, and announcements.</p>
        </motion.div>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container max-w-4xl">
        <div className="space-y-6">
          {news.map((item, i) => (
            <motion.article
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { delay: i * 0.1, duration: 0.5 } } }}
              className="bg-muted rounded-lg p-6 shadow-card hover:shadow-industrial transition-shadow group"
            >
              <div className="flex items-center gap-2 text-sm text-primary mb-2">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">{item.date}</span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              <button className="mt-3 flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Read More <ArrowRight className="h-3 w-3" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default NewsEvents;
