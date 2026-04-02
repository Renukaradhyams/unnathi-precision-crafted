import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  label: string;
}

const AnimatedCounter = ({ end, suffix = "+", label }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const stepTime = Math.max(Math.floor(duration / end), 20);
          let current = 0;
          const timer = setInterval(() => {
            current += Math.ceil(end / (duration / stepTime));
            if (current >= end) {
              current = end;
              clearInterval(timer);
            }
            setCount(current);
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <motion.div
      ref={ref}
      className="text-center group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative inline-block">
        <div className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground tabular-nums">
          {count}{suffix}
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary/40 rounded-full group-hover:w-full transition-all duration-300" />
      </div>
      <div className="mt-3 text-sm text-steel font-medium">{label}</div>
    </motion.div>
  );
};

export default AnimatedCounter;
