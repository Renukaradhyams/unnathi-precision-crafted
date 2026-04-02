import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { pageSectionMedia } from "@config/media.config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navigationConfig } from "@config/navigation.config";
import { contactConfig } from "@config/contact.config";


const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastScrolledRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const logoOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const logoX = useTransform(scrollY, [0, 80], [-15, 0]);

  useEffect(() => {
    const updateScrolled = () => {
      const nextScrolled = window.scrollY > 20;
      if (nextScrolled !== lastScrolledRef.current) {
        lastScrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(updateScrolled);
      }
    };

    updateScrolled();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        (scrolled || mobileOpen)
          ? "bg-background shadow-[0_1px_3px_0_hsl(var(--foreground)/0.08)] border-b border-border/40"
          : "bg-transparent border-b border-transparent"
      )}
    >
      {/* Top bar */}
      <div className={cn(
        "transition-all duration-300 overflow-hidden max-h-10 py-1.5 border-b",
        (scrolled || mobileOpen)
          ? "bg-muted text-muted-foreground border-border/40"
          : "bg-charcoal/40 backdrop-blur-sm text-primary-foreground/90 border-primary-foreground/10"
      )}>
        <div className="container flex items-center justify-between text-[10px] sm:text-xs font-medium">
          <span className={cn(
            "max-sm:hidden",
            (scrolled || mobileOpen) ? "text-muted-foreground" : "text-primary-foreground/90"
          )}>
            AS9100D & ISO 9001:2015 Certified Precision Manufacturing
          </span>
          <span className="sm:hidden font-bold tracking-tight text-[10px] uppercase opacity-80">
            AS9100D Certified
          </span>
          <a
            href={`tel:${contactConfig.phones.landline.replace(/[^\d+]/g, "")}`}
            className={cn("flex items-center gap-1.5 hover:underline", (scrolled || mobileOpen) ? "text-foreground" : "text-primary-foreground")}
          >
            <Phone className="h-3 w-3" /> {contactConfig.phones.landline}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container flex items-center justify-between py-3">
        <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2.5 group shrink-0">
          <div className="bg-white/95 backdrop-blur-sm p-2 rounded-md shadow-md">
            <img
              src={pageSectionMedia.shared.sections.headerLogo?.asset?.src}
              alt="UNNATHI CNC Technologies Logo"
              className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
            />
          </div>
          {/* Company name text - hidden when over hero (not scrolled), visible when scrolled */}
          {/* To always show on mobile or when scrolled, using a smooth transition */}
          <motion.div 
            style={{ opacity: logoOpacity, x: logoX }}
            className="flex flex-col leading-tight"
          >
            <div className="flex items-center">
              <span className="text-xl font-heading font-bold tracking-wider text-primary">
                UNNATHI
              </span>
              <span className="text-xl font-heading font-medium ml-1.5 text-primary">
                CNC
              </span>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-black">
              Technologies Pvt Ltd
            </span>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigationConfig.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.path}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-sm transition-colors flex items-center gap-1",
                  location.pathname === item.path
                    ? scrolled ? "text-primary" : "text-primary-foreground font-semibold"
                    : scrolled
                      ? "text-foreground/80 hover:text-primary"
                      : "text-primary-foreground/80 hover:text-primary-foreground"
                )}
              >
                {item.label}
                {item.children && <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", openDropdown === item.label && "rotate-180")} />}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className={cn("absolute bottom-0 left-3 right-3 h-0.5 rounded-full", scrolled ? "bg-primary" : "bg-primary-foreground")}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 bg-background/95 backdrop-blur-xl rounded-lg shadow-elevated py-2 min-w-[220px] mt-1 border border-border/50"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.path}
                        className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-200 hover:pl-5"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className={cn("lg:hidden p-2", (scrolled || mobileOpen) ? "text-foreground" : "text-primary-foreground")}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background/98 backdrop-blur-xl border-t border-border/50 overflow-hidden"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navigationConfig.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={cn(
                      "block px-3 py-2.5 text-sm font-medium rounded-sm transition-all duration-200",
                      location.pathname === item.path
                        ? "text-primary bg-primary/5 border-l-2 border-primary"
                        : "text-foreground/80 hover:text-primary hover:pl-5"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="block px-3 py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Quick Contact</p>
                  <div className="space-y-3">
                    <a href={`tel:${contactConfig.phones.landline.replace(/[^\d+]/g, "")}`} className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors">
                      <div className="p-2 bg-muted rounded-lg"><Phone className="h-4 w-4" /></div>
                      {contactConfig.phones.landline}
                    </a>
                    <a href={`mailto:${contactConfig.emails.rfq}`} className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors">
                      <div className="p-2 bg-muted rounded-lg"><Mail className="h-4 w-4" /></div>
                      {contactConfig.emails.rfq}
                    </a>
                  </div>
                </div>
                <Link to="/contact" className="mt-6">
                  <Button className="w-full bg-gradient-industrial text-primary-foreground h-12">
                    Contact Us
                  </Button>
                </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary origin-left z-[101]"
        style={{ scaleX }}
      />
    </header>
  );
};

export default Header;
