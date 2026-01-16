import { motion } from "framer-motion";
import { Shield, BadgeCheck, Clock, Banknote } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "100% Safe",
    description: "Verified & Insured Partners",
    stat: "Zero",
    statLabel: "Fraud Cases",
  },
  {
    icon: Banknote,
    title: "Fixed Price",
    description: "No Hidden Costs Ever",
    stat: "₹0",
    statLabel: "Surprise Charges",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assured",
    description: "Multi-Stage Inspections",
    stat: "✓",
    statLabel: "Quality Checks",
  },
  {
    icon: Clock,
    title: "On-Time",
    description: "Assured Delivery",
    stat: "100%",
    statLabel: "On-Time Focus",
  },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
  },
};

export function TrustBadges() {
  return (
    <section className="py-10 md:py-12 bg-gradient-to-r from-[#2d5a4a] via-[#234a3c] to-[#2d5a4a] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {badges.map((badge) => (
            <motion.div
              key={badge.title}
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
              }}
              className="group flex flex-col items-center text-center p-5 md:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#d4af37]/30 transition-all duration-500 cursor-default"
              data-testid={`badge-${badge.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b8962d] flex items-center justify-center mb-4 shadow-lg shadow-[#d4af37]/20 group-hover:shadow-[#d4af37]/40 transition-shadow duration-300"
              >
                <badge.icon className="w-7 h-7 md:w-8 md:h-8 text-[#1a3830]" />
              </motion.div>
              <div className="text-2xl md:text-3xl font-bold text-[#d4af37] mb-1">{badge.stat}</div>
              <div className="text-xs text-white/60 mb-2 uppercase tracking-wider">{badge.statLabel}</div>
              <h3 className="font-semibold text-white text-base md:text-lg mb-1">
                {badge.title}
              </h3>
              <p className="text-xs text-white/50">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
