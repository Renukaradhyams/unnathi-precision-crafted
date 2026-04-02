import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { unitsConfig, type UnitConfig } from "@config/units.config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

const InteractiveMap = () => {
  const [activeUnit, setActiveUnit] = useState<UnitConfig>(unitsConfig[0]);
  const { ref: mapRef, inView: mapInView } = useInView();

  return (
    <div className="bg-background rounded-2xl md:rounded-3xl overflow-hidden shadow-elevated border border-border/50">
      <div className="grid lg:grid-cols-5 min-h-[500px]">
        {/* Unit List */}
        <div className="lg:col-span-2 p-5 sm:p-8 bg-muted/30 border-b lg:border-b-0 lg:border-r border-border/50">
          <h3 className="text-xl font-heading font-bold text-foreground mb-6">Explore Our Units</h3>
          <div className="space-y-4">
            {unitsConfig.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setActiveUnit(unit)}
                className={cn(
                  "w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border flex items-start gap-3 sm:gap-4 group",
                  activeUnit.id === unit.id
                    ? "bg-background border-primary shadow-md"
                    : "bg-transparent border-transparent hover:bg-background/50 hover:border-border"
                )}
              >
                <div className={cn(
                  "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                  activeUnit.id === unit.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}>
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn(
                    "font-heading font-bold transition-colors text-sm sm:text-base truncate",
                    activeUnit.id === unit.id ? "text-primary" : "text-foreground"
                  )}>
                    {unit.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 line-clamp-1">{unit.address}</p>
                  {activeUnit.id === unit.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 overflow-hidden text-xs sm:text-sm text-foreground/80 leading-relaxed"
                    >
                      {unit.specialisation}
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="h-7 sm:h-8 text-[10px] sm:text-xs gap-1" asChild>
                          <a href={`/units/${unit.id}`}>
                            Details <ArrowRight className="h-3 w-3" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 sm:h-8 text-[10px] sm:text-xs gap-1" asChild>
                          <a href={unit.mapSrc.replace("/embed", "/maps").replace("&output=embed", "")} target="_blank" rel="noopener noreferrer">
                            Maps <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
 
        {/* Map View */}
        <div ref={mapRef} className="lg:col-span-3 h-[300px] sm:h-[400px] lg:h-auto relative bg-muted overflow-hidden">
          {mapInView ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeUnit.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <iframe
                  src={activeUnit.mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.2) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map for ${activeUnit.name}`}
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
              <MapPin className="h-10 w-10 text-muted-foreground/30 animate-pulse" />
            </div>
          )}
          
          {/* Overlay Info for Mobile */}
          <div className="absolute bottom-4 left-4 right-4 pointer-events-none lg:hidden">
            <div className="bg-background/90 backdrop-blur-md p-3 rounded-xl border border-border/50 shadow-lg">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{activeUnit.location}</p>
              <h4 className="text-xs font-heading font-bold text-foreground mt-0.5">{activeUnit.name}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
