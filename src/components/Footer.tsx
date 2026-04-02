import { Link, useNavigate } from "react-router-dom";
import { pageSectionMedia } from "@config/media.config";
import { Phone, Mail, MapPin, ArrowRight, Download, Facebook, Linkedin, Twitter, Instagram } from "lucide-react";
import { quickLinksConfig } from "@config/navigation.config";
import { contactConfig } from "@config/contact.config";
import { siteConfig } from "@config/site.config";
import unnathiCatalogPdf from "@/assets/Unnathi_new_catlog.pdf";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-dark text-charcoal-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" onClick={handleLogoClick} className="mb-6 flex w-full justify-center md:w-auto md:justify-start" aria-label="Go to Home page">
              <div className="bg-white p-2 rounded-md shadow-sm inline-block">
                <img
                  src={pageSectionMedia.shared.sections.footerLogo?.asset?.src}
                  alt="UNNATHI CNC Technologies Pvt. Ltd. Logo"
                  className="h-11 w-auto drop-shadow-lg"
                />
              </div>
            </Link>
            <p className="text-sm text-steel leading-relaxed mb-4 text-center md:text-left">
              Leading precision engineering and CNC machining company established in 2007, specializing in high-precision machined components and assemblies for global customers.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              {[Facebook, Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 rounded-lg bg-charcoal hover:bg-primary transition-all duration-300 hover:scale-110 hover:-translate-y-0.5">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-heading font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinksConfig.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-steel hover:text-primary-foreground transition-all duration-200 flex items-center gap-1 hover:gap-2">
                    <ArrowRight className="h-3 w-3" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-semibold text-primary-foreground mb-4">Industries</h4>
            <ul className="space-y-2">
              {["Pharma Equipment", "Aerospace", "Semi-Conductor", "Machine Tools", "Precision Engineering"].map((ind) => (
                <li key={ind}>
                  <Link to="/industries" className="text-sm text-steel hover:text-primary-foreground transition-all duration-200 flex items-center gap-1 hover:gap-2">
                    <ArrowRight className="h-3 w-3" /> {ind}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-semibold text-primary-foreground mb-4">Reach Us</h4>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-steel">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>{contactConfig.registeredAddress}</span>
              </li>
              <li className="flex gap-3 text-sm text-steel">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>{contactConfig.phones.landline} | {contactConfig.phones.mobile}</span>
              </li>
              <li className="flex gap-3 text-sm text-steel">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>{contactConfig.emails.rfq}</span>
              </li>
            </ul>
            <a
              href={unnathiCatalogPdf}
              download="Unnathi-New-Catalog.pdf"
              className="mt-4 inline-flex items-center gap-2 text-sm text-primary-foreground bg-primary/20 hover:bg-primary/30 transition-all duration-300 px-4 py-2.5 rounded-lg hover:scale-105"
            >
              <Download className="h-4 w-4" /> Download Brochure
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-charcoal/50">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-between text-xs text-steel/70">
          <p>© 2026 {siteConfig.companyName}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-primary-foreground transition-colors">Terms & Conditions</Link>
          </div>
          <p>AS9100D & ISO 9001:2015 Certified</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
