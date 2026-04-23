import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Upload, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { buildPageSeo } from "@/seo/pageSeo";
import { useToast } from "@/hooks/use-toast";
import { pageSectionMedia } from "@config/media.config";
import Breadcrumbs from "@/components/Breadcrumbs";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const Contact = () => {
  const { toast } = useToast();
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Multer expects the field name to be 'attachment' as configured in middleware
    if (file) {
      formData.append("attachment", file);
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message. Please try again later.");
      }

      toast({ 
        title: "Message Sent!", 
        description: "We'll get back to you within 24 hours." 
      });
      
      form.reset();
      setFileName(null);
      setFile(null);
    } catch (error) {
      toast({ 
        title: "Submission Error", 
        description: error instanceof Error ? error.message : "Something went wrong.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  return (
    <Layout seo={buildPageSeo("contact", [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])}>
      <section className="relative pt-36 pb-24 bg-gradient-dark overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={pageSectionMedia.contact.sections.hero?.asset?.src} alt="UNNATHI CNC Bangalore facility exterior" title="UNNATHI CNC Bangalore facility exterior" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="container relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Breadcrumbs items={[{ name: "Contact", active: true }]} className="mb-6 opacity-70" />
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase bg-primary/20 text-primary-foreground rounded-full mb-4 border border-primary/30">Contact</span>
            <h1 className="mt-2 text-4xl md:text-6xl font-heading text-primary-foreground">Reach Us</h1>
            <p className="mt-4 text-steel max-w-xl text-lg">Connect with our engineering team to discuss your project requirements and manufacturing solutions.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft} className="space-y-6">
              <h2 className="text-2xl font-heading text-foreground">Get in Touch</h2>
              {[
                { icon: MapPin, label: "Registered Office", value: "UNNATHI CNC Technologies Pvt. Ltd., No.487, D1 & D2, 13th cross, 4th Phase, Peenya Industrial Area, Bangalore – 560058, India" },
                { icon: Phone, label: "Phone", value: "080-41171792 | +91 9480686747 | +91 9480686743" },
                { icon: Mail, label: "Email", value: "rfq@unnathicnc.com | sales@unnathicnc.com" },
                { icon: Clock, label: "Working Hours", value: "Mon - Sat: 9:00 AM - 5:30 PM" },
              ].map((item) => (
                <motion.div key={item.label} whileHover={{ x: 4 }} className="flex gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-gradient-industrial flex items-center justify-center shrink-0 shadow-industrial group-hover:scale-110 transition-transform">
                    <item.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-card h-48 bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.2932493679077!2d77.5018843736754!3d13.016988337302525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3cfac4663ddb%3A0xc169fcf8ebfffd0!2sUnnathi%20CNC%20Technologies%20Pvt%20Ltd%2C%20Unit%201!5e0!3m2!1sen!2sin!4v1775124633753!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="UNNATHI CNC Unit 01 Location"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight} className="lg:col-span-2">
              <div className="bg-muted/50 rounded-2xl p-8 shadow-card border border-border/50">
                <h2 className="text-2xl font-heading text-foreground mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Name *</label>
                      <Input name="name" placeholder="Your full name" required className="bg-background border-border/50 focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Company</label>
                      <Input name="company" placeholder="Company name" className="bg-background border-border/50 focus:border-primary" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                      <Input name="email" type="email" placeholder="your@email.com" required className="bg-background border-border/50 focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                      <Input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" className="bg-background border-border/50 focus:border-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label>
                    <Textarea name="message" placeholder="Describe your requirements, specifications, or project details..." rows={5} required className="bg-background border-border/50 focus:border-primary" />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Upload Drawing</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.dxf,.dwg,.step,.stp,.iges,.igs,.jpg,.png"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center gap-3 p-4 border-2 border-dashed border-border/50 rounded-xl bg-background hover:border-primary/30 transition-colors">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {fileName || "Click to upload drawing (PDF, DXF, STEP, IGES)"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="bg-gradient-industrial text-primary-foreground hover:opacity-90 w-full sm:w-auto shadow-industrial hover:shadow-none transition-all hover:scale-105 disabled:opacity-70"
                  >
                    <Send className="mr-2 h-4 w-4" /> {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
