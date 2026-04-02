import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const FloatingEnquiry = () => {
  const [showPulse, setShowPulse] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Subtle pulse every 13 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 1500);
    }, 13000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setDrawerOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      company: String(data.get("company") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      requirement: String(data.get("message") || "").trim(),
    };

    if (!payload.company) {
      toast({
        title: "Company name required",
        description: "Please provide your company name to submit the enquiry.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit enquiry at the moment.");
      }

      toast({
        title: "Enquiry submitted",
        description: result.message || "Our team will contact you shortly.",
      });
      setDrawerOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={handleClick}
        aria-label="Quick Enquiry – Send us your requirements"
        className={cn(
          "fixed right-6 z-[130] flex items-center gap-2 rounded-full px-5 py-3.5",
          "bg-gradient-industrial text-primary-foreground shadow-industrial",
          "hover:shadow-elevated hover:scale-105 transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "bottom-[calc(5.5rem+env(safe-area-inset-bottom))] md:bottom-[calc(6rem+env(safe-area-inset-bottom))] md:right-8",
          "max-sm:px-3.5 max-sm:py-2.5 max-sm:bottom-[calc(5rem+env(safe-area-inset-bottom))] max-sm:right-3.5"
        )}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
      >
        <MessageSquare className="h-5 w-5 max-sm:h-4 max-sm:w-4" />
        <span className="text-sm font-semibold tracking-wide max-sm:text-xs">Quick Enquiry</span>

        {/* Pulse ring */}
        <AnimatePresence>
          {showPulse && (
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-primary/40"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Enquiry Drawer/Modal */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[140] bg-charcoal/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className={cn(
                "fixed z-[150] bg-background rounded-2xl shadow-elevated border border-border/50 overflow-hidden",
                "bottom-6 right-6 w-[400px] max-h-[85vh]",
                "max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:w-full max-sm:rounded-b-none max-sm:rounded-t-2xl max-sm:max-h-[90vh]"
              )}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="bg-gradient-industrial px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-heading font-bold text-primary-foreground">Quick Enquiry</h3>
                  <p className="text-xs text-primary-foreground/70">We'll respond within 24 hours</p>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors p-1 rounded-lg hover:bg-primary-foreground/10"
                  aria-label="Close enquiry form"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[calc(85vh-80px)] max-sm:max-h-[calc(90vh-80px)]">
                {[
                  { name: "name", label: "Your Name", type: "text", required: true },
                  { name: "company", label: "Company Name", type: "text", required: true },
                  { name: "phone", label: "Phone Number", type: "tel", required: true },
                  { name: "email", label: "Email Address", type: "email", required: true },
                ].map((field) => (
                  <div key={field.name} className="relative">
                    <input
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      placeholder={field.label}
                      className="w-full px-4 py-3 text-sm bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                    />
                  </div>
                ))}
                <div>
                  <textarea
                    name="message"
                    rows={3}
                    required
                    placeholder="Your Requirements / Message"
                    className="w-full px-4 py-3 text-sm bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-industrial text-primary-foreground hover:opacity-90 shadow-industrial transition-all duration-300 text-sm font-semibold disabled:opacity-70"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Or email us at <a href="mailto:rfq@unnathicnc.com" className="text-primary hover:underline">rfq@unnathicnc.com</a>
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingEnquiry;
