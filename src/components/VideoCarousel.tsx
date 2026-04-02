import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  src: string;
}

interface VideoCarouselProps {
  videos: VideoItem[];
}

const VideoCarousel = ({ videos }: VideoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxVideo, setLightboxVideo] = useState<VideoItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [maxVisible, setMaxVisible] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Responsive maxVisible
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setMaxVisible(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalSlides = Math.max(1, videos.length - maxVisible + 1);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)));
  }, [totalSlides]);

  const next = useCallback(() => goTo((currentIndex + 1) % totalSlides), [currentIndex, totalSlides, goTo]);
  const prev = useCallback(() => goTo((currentIndex - 1 + totalSlides) % totalSlides), [currentIndex, totalSlides, goTo]);

  // Auto-slide
  useEffect(() => {
    if (isPaused || lightboxVideo) return;
    intervalRef.current = setInterval(next, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused, lightboxVideo, next]);

  // Lightbox keyboard
  useEffect(() => {
    if (!lightboxVideo) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxVideo(null); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [lightboxVideo]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next(); else prev();
    }
  };

  const gap = 20; // px gap between items
  const slideWidth = 100 / maxVisible;
  const gapOffset = gap * (maxVisible - 1) / maxVisible;

  return (
    <>
      <div
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel track */}
        <div
          className="overflow-hidden rounded-2xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            ref={trackRef}
            className="flex"
            style={{ gap: `${gap}px` }}
            animate={{ x: `-${currentIndex * (slideWidth + gap / maxVisible)}%` }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {videos.map((video) => (
              <div
                key={video.id}
                className="shrink-0"
                style={{ width: `calc(${slideWidth}% - ${gapOffset}px)` }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-video rounded-xl overflow-hidden bg-charcoal cursor-pointer group/card shadow-card hover:shadow-elevated transition-all duration-300"
                  onClick={() => setLightboxVideo(video)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    style={{ filter: "var(--img-enhance)" }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-charcoal/40 group-hover/card:bg-charcoal/60 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-industrial"
                    >
                      <Play className="h-6 w-6 md:h-7 md:w-7 text-primary-foreground ml-0.5" fill="currentColor" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-charcoal/80 to-transparent">
                    <p className="text-xs md:text-sm font-heading font-semibold text-primary-foreground">{video.title}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation arrows - visible on hover (desktop), always visible (mobile) */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-background/90 backdrop-blur-sm shadow-elevated border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Previous video"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-background/90 backdrop-blur-sm shadow-elevated border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Next video"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Pagination dots */}
        {totalSlides > 1 && (
          <div className="flex items-center justify-center gap-2 mt-5">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {lightboxVideo && (
          <>
            <motion.div
              className="fixed inset-0 z-[200] bg-charcoal/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxVideo(null)}
            />
            <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.35 }}
                className="relative w-full max-w-5xl"
              >
                <button
                  onClick={() => setLightboxVideo(null)}
                  className="absolute -top-12 right-0 z-10 w-10 h-10 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Close video"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="rounded-2xl overflow-hidden shadow-elevated bg-charcoal">
                  <video
                    className="w-full aspect-video"
                    controls
                    autoPlay
                    playsInline
                    src={lightboxVideo.src}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="mt-3 text-center text-sm font-heading font-semibold text-primary-foreground/80">
                  {lightboxVideo.title}
                </p>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoCarousel;
