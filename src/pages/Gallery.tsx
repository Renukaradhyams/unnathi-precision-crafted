import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { buildPageSeo } from "@/seo/pageSeo";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import { seoImages } from "@config/images.config";
import { factoryPhotos, machineryPhotos, infrastructurePhotos, qualityLabPhotos, teamPhotos } from "@config/units.config";

const fadeUp  = { hidden: { opacity: 0, y: 40 },       visible: { opacity: 1, y: 0,    transition: { duration: 0.7 } } };

const categories = [
  "All",
  "Factory & Shop-floor",
  "Machinery",
  "Infrastructure",
  "Quality Lab",
  "Team & Workforce",
];

type GalleryItem = { src: string; title: string; category: string };

const galleryItems: GalleryItem[] = [
  ...factoryPhotos.map((p)      => ({ ...p, title: p.label, category: "Factory & Shop-floor" })),
  ...machineryPhotos.map((p)    => ({ ...p, title: p.label, category: "Machinery" })),
  ...infrastructurePhotos.map((p)=> ({ ...p, title: p.label, category: "Infrastructure" })),
  ...qualityLabPhotos.map((p)   => ({ ...p, title: p.label, category: "Quality Lab" })),
  ...teamPhotos.map((p)         => ({ ...p, title: p.label, category: "Team & Workforce" })),
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((g) => g.category === activeCategory);
  const visibleItems = filtered.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(24);
  }, [activeCategory]);

  const currentIndex = selectedImage ? filtered.findIndex(img => img.src === selectedImage.src) : -1;
  const isOpen = currentIndex !== -1;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setSelectedImage(filtered[currentIndex - 1]);
    else if (currentIndex === 0) setSelectedImage(filtered[filtered.length - 1]);
  }, [currentIndex, filtered]);

  const handleNext = useCallback(() => {
    if (currentIndex < filtered.length - 1) setSelectedImage(filtered[currentIndex + 1]);
    else if (currentIndex === filtered.length - 1) setSelectedImage(filtered[0]);
  }, [currentIndex, filtered]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "Escape") setSelectedImage(null);
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
  }, [isOpen, handleNext, handlePrev]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Layout seo={buildPageSeo("gallery", [{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }], undefined, seoImages.filter((image) => image.path === "/gallery").map((image) => ({ name: image.title, imageUrl: image.image, caption: image.caption, pagePath: image.path, width: image.width, height: image.height, encodingFormat: image.mimeType })))}>

      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-gradient-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={factoryPhotos[1].src} alt="UNNATHI CNC Gallery" className="w-full h-full object-cover" loading="eager" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="container relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Breadcrumbs items={[{ name: "Gallery", active: true }]} className="mb-6 opacity-70" />
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase bg-primary/20 text-primary-foreground rounded-full mb-4 border border-primary/30">Gallery</span>
            <h1 className="mt-2 text-4xl md:text-6xl font-heading text-primary-foreground">Photo Gallery</h1>
            <p className="mt-4 text-steel max-w-xl text-lg">
              Explore our factory, machinery, infrastructure, quality lab and workforce — {galleryItems.length} photos.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container">

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const count = cat === "All" ? galleryItems.length : galleryItems.filter((g) => g.category === cat).length;
              return (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gradient-industrial text-primary-foreground shadow-industrial"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat}
                  <span className="ml-1.5 text-xs opacity-70">({count})</span>
                </motion.button>
              );
            })}
          </div>

          <p className="text-center text-sm text-muted-foreground mb-6">
            Showing <strong className="text-foreground">{filtered.length}</strong> photo{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Grid */}
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" layout>
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, i) => (
                <motion.div
                  key={item.category + item.title + i}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -4 }}
                  className="relative overflow-hidden rounded-2xl group cursor-pointer aspect-square shadow-card hover:shadow-elevated"
                  onClick={() => setSelectedImage(item)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    title={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/55 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
                      <ZoomIn className="h-8 w-8 text-primary-foreground mx-auto mb-2" />
                      <p className="text-sm font-heading font-semibold text-primary-foreground leading-tight">{item.title}</p>
                      <p className="text-xs text-steel mt-0.5">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {visibleCount < filtered.length && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((current) => current + 24)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                Load more photos ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <>
            <motion.div
              className="fixed inset-0 z-[200] bg-charcoal/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            />
            <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="relative max-w-5xl w-full pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedImage(null)} 
                  className="absolute -top-12 right-0 md:-top-4 md:-right-12 z-10 w-10 h-10 rounded-full bg-background/90 text-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Close image"
                >
                  <X className="h-5 w-5" />
                </button>

                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={selectedImage.src}
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full rounded-2xl shadow-elevated max-h-[80vh] object-contain bg-muted/10 backdrop-blur-sm"
                    loading="eager"
                    decoding="async"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                <div className="mt-4 text-center">
                  <p className="text-lg font-heading font-semibold text-primary-foreground">{selectedImage.title}</p>
                  <p className="text-sm text-steel mt-1">
                    {selectedImage.category} • {currentIndex + 1} / {filtered.length}
                  </p>
                </div>

                {/* Navigation arrows */}
                {filtered.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 text-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 text-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
