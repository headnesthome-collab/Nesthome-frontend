import { Link } from "wouter";
import { NAV_LINKS } from "@/lib/constants";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight, ChevronDown, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import logo from "@assets/2025-12-06_15.09.24_1765015104415.jpg";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/10 sm:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 sm:hidden"
        aria-expanded={isOpen}
      >
        <h4 className="font-semibold text-[#d4af37] text-xs uppercase tracking-widest">{title}</h4>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-[#d4af37]" />
        </motion.div>
      </button>
      
      <h4 className="hidden sm:block font-semibold text-[#d4af37] mb-4 md:mb-6 text-sm uppercase tracking-widest">{title}</h4>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden sm:hidden pb-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="hidden sm:block">
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#2d5a4a] to-[#1a3830] text-white relative overflow-hidden pb-20 sm:pb-0">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container px-4 md:px-6 py-8 sm:py-12 md:py-16 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-8 lg:gap-12"
        >
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1 pb-6 sm:pb-0 border-b border-white/10 sm:border-none">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={logo} alt="Nesthome Logo" className="h-10 sm:h-12 md:h-14 w-auto object-contain bg-white rounded-lg sm:rounded-xl p-1.5 sm:p-2 shadow-lg" />
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">Nesthome</h3>
                <p className="text-[10px] sm:text-xs text-[#d4af37] font-medium">Build Your Dream</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Premium home construction with transparency, verified partners, and fixed pricing.
            </p>
            
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10 sm:hidden">
              <Shield className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs text-white/80 font-medium">Building Dreams in Indore</span>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              {[
                { href: "https://wa.me/917470404685", icon: MessageCircle, label: "WhatsApp" },
                { href: "tel:+917470404685", icon: Phone, label: "Call" },
                { href: "mailto:prakhart819@gmail.com", icon: Mail, label: "Email" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/10 hover:bg-[#d4af37] flex items-center justify-center transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <CollapsibleSection title="Quick Links">
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <motion.span 
                        whileHover={{ x: 5 }}
                        className="text-white/70 hover:text-[#d4af37] transition-colors cursor-pointer duration-300 flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          </motion.div>

          <motion.div variants={itemVariants}>
            <CollapsibleSection title="Our Services">
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/70">
                {[
                  "Home Planning & Design",
                  "Construction Support",
                  "Progress Tracking",
                  "Payment Structuring",
                  "Quality Oversight",
                ].map((service) => (
                  <motion.li 
                    key={service}
                    whileHover={{ x: 5 }}
                    className="hover:text-[#d4af37] transition-colors duration-300 cursor-pointer flex items-center gap-1 group"
                  >
                    {service}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.li>
                ))}
              </ul>
            </CollapsibleSection>
          </motion.div>

          <motion.div variants={itemVariants} className="sm:col-span-1">
            <CollapsibleSection title="Contact Us" defaultOpen={true}>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <div>
                    <a href="tel:+917470404685" className="text-white/90 font-medium hover:text-[#d4af37] transition-colors">+91 7470404685</a>
                    <p className="text-xs text-white/50">Mon-Sat, 9AM-7PM</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <a href="mailto:prakhart819@gmail.com" className="text-white/70 hover:text-[#d4af37] transition-colors">prakhart819@gmail.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <span className="text-white/70">Indore, Madhya Pradesh</span>
                </li>
              </ul>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6"
              >
                <Link href="/partner-signup">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#e5c158] text-[#1a3830] text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all cursor-pointer">
                    Become a Partner
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            </CollapsibleSection>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-white/10 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-white/50">
              © {new Date().getFullYear()} Nesthome. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-white/40">
              <Link href="/faq">
                <span className="hover:text-[#d4af37] cursor-pointer transition-colors">FAQ</span>
              </Link>
              <Link href="/privacy-policy">
                <span className="hover:text-[#d4af37] cursor-pointer transition-colors">Privacy Policy</span>
              </Link>
              <Link href="/terms">
                <span className="hover:text-[#d4af37] cursor-pointer transition-colors">Terms of Use</span>
              </Link>
              <Link href="/contact">
                <span className="hover:text-[#d4af37] cursor-pointer transition-colors">Contact</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
