import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface LightboxImage {
  src: string;
  label: string;
}

interface LightboxGalleryProps {
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
}

const LightboxGallery = ({ images, initialIndex = 0, onClose }: LightboxGalleryProps) => {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [zoom, setZoom] = useState(1);

  const go = useCallback(
    (next: number) => {
      setZoom(1);
      setDirection(next > current ? 1 : -1);
      setCurrent(next);
    },
    [current]
  );

  const prev = useCallback(() => go((current - 1 + images.length) % images.length), [go, current, images.length]);
  const next = useCallback(() => go((current + 1) % images.length), [go, current, images.length]);

  const toggleZoom = () => setZoom((z) => (z === 1 ? 2 : 1));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [current, next, onClose, prev]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[130] bg-charcoal/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Container */}
      <div className="fixed inset-0 z-[140] flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between p-4">
          <span className="text-sm font-medium text-primary-foreground/80">
            {current + 1} / {images.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleZoom}
              className="w-9 h-9 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="Toggle zoom"
            >
              {zoom === 1 ? <ZoomIn className="h-4 w-4" /> : <ZoomOut className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main image area */}
        <div className="flex-1 relative overflow-hidden flex items-center justify-center px-14">
          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-2 z-10 w-10 h-10 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center px-14"
            >
              <img
                src={images[current].src}
                alt={images[current].label}
                className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
                onClick={toggleZoom}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={next}
              className="absolute right-2 z-10 w-10 h-10 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Caption */}
        <div className="text-center pb-4">
          <p className="text-sm font-heading font-semibold text-primary-foreground">
            {images[current].label}
          </p>
        </div>

        {/* Bottom thumbnails */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 pb-6 px-4 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === current ? "border-primary opacity-100 scale-105" : "border-transparent opacity-40 hover:opacity-70"
                }`}
              >
                <img src={img.src} alt={img.label} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LightboxGallery;
