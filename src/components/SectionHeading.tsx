import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  light?: boolean;
}

const SectionHeading = ({ label, title, description, className, light }: SectionHeadingProps) => (
  <motion.div
    className={cn("text-center mb-12", className)}
    initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
  >
    {label && (
      <span className="inline-block text-sm font-semibold tracking-widest uppercase text-primary mb-2 px-4 py-1 rounded-full bg-primary/5 border border-primary/10">
        {label}
      </span>
    )}
    <h2 className={cn("text-3xl md:text-4xl font-heading mt-2", light ? "text-primary-foreground" : "text-foreground")}>
      {title}
    </h2>
    {description && (
      <p className={cn("mt-3 max-w-2xl mx-auto text-base", light ? "text-steel" : "text-muted-foreground")}>
        {description}
      </p>
    )}
    <div className="mt-4 mx-auto flex items-center justify-center gap-1">
      <div className="w-8 h-0.5 bg-primary/30 rounded-full" />
      <div className="w-16 h-1 bg-gradient-industrial rounded-full" />
      <div className="w-8 h-0.5 bg-primary/30 rounded-full" />
    </div>
  </motion.div>
);

export default SectionHeading;
