import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { pageSectionMedia } from "@config/media.config";

interface ImageSliderProps {
  images: string[];
  alt: string;
  onExpand?: (index: number) => void;
  className?: string;
}

const ImageSlider = ({ images, alt, onExpand, className = "" }: ImageSliderProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const safeImages = images.length > 0 ? images : [pageSectionMedia.shared.sections.imageFallback?.asset?.src];

  const go = useCallback(
    (next: number) => {
      setDirection(next > current ? 1 : -1);
      setCurrent(next);
    },
    [current]
  );

  const prev = () => go((current - 1 + safeImages.length) % safeImages.length);
  const next = () => go((current + 1) % safeImages.length);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -120 : 120, opacity: 0 }),
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Main image */}
      <div className="relative overflow-hidden rounded-xl bg-muted aspect-[4/3] group">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={current}
            src={safeImages[current]}
            alt={`${alt} ${current + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </AnimatePresence>

        {/* Nav arrows */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-charcoal/60 backdrop-blur-sm text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-charcoal/80"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-charcoal/60 backdrop-blur-sm text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-charcoal/80"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Expand button */}
        {onExpand && (
          <button
            onClick={(e) => { e.stopPropagation(); onExpand(current); }}
            className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-charcoal/60 backdrop-blur-sm text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-charcoal/80"
            aria-label="Expand image"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Counter */}
        {safeImages.length > 1 && (
          <div className="absolute bottom-2 right-2 z-10 px-2 py-0.5 text-[10px] font-semibold bg-charcoal/60 backdrop-blur-sm text-primary-foreground rounded-full">
            {current + 1}/{safeImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((img, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === current ? "border-primary shadow-industrial" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`${alt} thumb ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
