import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Crown, ArrowRight } from "lucide-react";

interface ConstructionPackagesProps {
  onGetQuote: () => void;
}

const packages = [
  {
    id: "essential",
    name: "Essential",
    icon: Check,
    tagline: "Quality Construction",
    description: "Premium quality construction with trusted brands for your dream home",
    features: [
      "Ultratech / ACC Cement",
      "Tata Tiscon / JSW Steel",
      "Asian Paints Tractor Emulsion",
      "Jaquar / Hindware Fittings",
      "Havells Electrical",
      "Standard Vitrified Tiles",
    ],
    gradient: "from-gray-600 to-gray-700",
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    icon: Sparkles,
    tagline: "Best Value",
    description: "Enhanced materials and finishes for a superior living experience",
    features: [
      "Ultratech Premium Cement",
      "Tata Steel TMT Bars",
      "Asian Paints Royale",
      "Kohler / Grohe Fittings",
      "Havells / Legrand Switches",
      "Kajaria / Somany Tiles",
    ],
    gradient: "from-[#2d5a4a] to-[#1f3a2c]",
    popular: true,
  },
  {
    id: "luxury",
    name: "Luxury",
    icon: Crown,
    tagline: "Ultimate Excellence",
    description: "Top-tier materials and bespoke finishes for an extraordinary home",
    features: [
      "ACC Gold / Birla A1 Cement",
      "Tata Tiscon SuperLinks",
      "Asian Paints Royale Atmos",
      "Kohler Premium / Duravit",
      "Schneider / Anchor Roma",
      "Italian Marble / Imported Tiles",
    ],
    gradient: "from-[#d4af37] to-[#b8962d]",
    popular: false,
  },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6 }
  },
};

export function ConstructionPackages({ onGetQuote }: ConstructionPackagesProps) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#2d5a4a]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-widest">Choose Your Package</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#2d5a4a] mt-3 mb-5">
            Premium Materials, Premium Home
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Every package includes <span className="text-[#2d5a4a] font-semibold">only trusted brands</span> — 
            the same quality you'd choose yourself, guaranteed.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                transition: { duration: 0.3 } 
              }}
              className={`relative rounded-3xl overflow-hidden transition-shadow duration-500 bg-white ${
                pkg.popular 
                  ? "ring-2 ring-[#d4af37] shadow-2xl shadow-[#d4af37]/20 md:scale-105 z-10" 
                  : "shadow-xl hover:shadow-2xl"
              }`}
              data-testid={`package-${pkg.id}`}
            >
              {pkg.popular && (
                <motion.div 
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="absolute top-5 right-5 bg-gradient-to-r from-[#d4af37] to-[#e5c158] text-[#1a3830] text-xs font-bold px-4 py-1.5 rounded-full z-10 shadow-lg"
                >
                  Most Popular
                </motion.div>
              )}

              <div className={`bg-gradient-to-br ${pkg.gradient} p-7 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <pkg.icon className="w-6 h-6" />
                  </motion.div>
                  <span className="text-sm font-medium opacity-90">{pkg.tagline}</span>
                </div>
                <h3 className="text-2xl font-bold font-display">{pkg.name}</h3>
              </div>

              <div className="p-7 bg-white">
                <p className="text-gray-600 text-sm mb-6">
                  {pkg.description}
                </p>

                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#2d5a4a]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2d5a4a]/20 transition-colors">
                        <Check className="w-3 h-3 text-[#2d5a4a]" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={onGetQuote}
                    className={`w-full py-6 font-semibold group rounded-xl ${
                      pkg.popular
                        ? "bg-gradient-to-r from-[#d4af37] to-[#e5c158] hover:from-[#e5c158] hover:to-[#d4af37] text-[#1a3830] shadow-lg shadow-[#d4af37]/30"
                        : "bg-[#2d5a4a] hover:bg-[#1f3a2c] text-white"
                    }`}
                    data-testid={`quote-button-${pkg.id}`}
                  >
                    Get Free Quote
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
