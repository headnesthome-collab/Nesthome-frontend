import { motion } from "framer-motion";
import { Check, X, AlertTriangle, ShieldCheck } from "lucide-react";

const comparisons = [
  {
    feature: "Price Guarantee",
    nesthome: "Fixed price - what you see is what you pay",
    traditional: "Prices often increase 20-40% during construction",
    nesthomeHas: true,
    traditionalHas: false,
    painPoint: true,
  },
  {
    feature: "Contractor Verification",
    nesthome: "Background-checked, insured professionals",
    traditional: "No verification, high fraud risk",
    nesthomeHas: true,
    traditionalHas: false,
    painPoint: true,
  },
  {
    feature: "Payment Protection",
    nesthome: "Milestone-based, pay only for completed work",
    traditional: "Large upfront payments, money at risk",
    nesthomeHas: true,
    traditionalHas: false,
    painPoint: true,
  },
  {
    feature: "Progress Tracking",
    nesthome: "Daily photos & real-time updates",
    traditional: "No visibility, frequent site visits needed",
    nesthomeHas: true,
    traditionalHas: false,
    painPoint: false,
  },
  {
    feature: "Quality Inspections",
    nesthome: "Multi-stage quality checks by experts",
    traditional: "Self-inspection or none",
    nesthomeHas: true,
    traditionalHas: false,
    painPoint: false,
  },
  {
    feature: "Project Manager",
    nesthome: "Dedicated manager for your project",
    traditional: "You manage everything yourself",
    nesthomeHas: true,
    traditionalHas: false,
    painPoint: false,
  },
  {
    feature: "Material Quality",
    nesthome: "Premium brands: Tata Steel, Ultratech, Asian Paints",
    traditional: "Often substituted with cheaper alternatives",
    nesthomeHas: true,
    traditionalHas: false,
    painPoint: true,
  },
  {
    feature: "Timeline Commitment",
    nesthome: "Guaranteed delivery date with penalties",
    traditional: "Delays are common, no accountability",
    nesthomeHas: true,
    traditionalHas: false,
    painPoint: true,
  },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const rowVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  },
};

export function ComparisonTable() {
  return (
    <section className="py-12 sm:py-16 md:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-14"
        >
          <span className="text-[#d4af37] font-semibold text-xs sm:text-sm uppercase tracking-widest">Make The Smart Choice</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#2d5a4a] mt-2 sm:mt-3 mb-3 sm:mb-5">
            Why Risk Your Life's Savings?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Building with an unverified contractor can cost you lakhs in fraud, delays, and poor quality. 
            <span className="text-[#2d5a4a] font-semibold"> Choose wisely.</span>
          </p>
        </motion.div>

        {/* Mobile Card Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:hidden space-y-4"
        >
          {comparisons.map((item, index) => (
            <motion.div
              key={item.feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
              data-testid={`comparison-card-${index}`}
            >
              <div className="bg-gradient-to-r from-[#2d5a4a] to-[#1f3a2c] px-4 py-3 flex items-center gap-2">
                {item.painPoint && (
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                )}
                <h3 className="text-white font-semibold text-sm">{item.feature}</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3 bg-green-50 rounded-lg p-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[#d4af37] font-semibold text-xs mb-1">Nesthome</p>
                    <p className="text-sm text-green-700">{item.nesthome}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-red-50 rounded-lg p-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <X className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium text-xs mb-1">Traditional Builder</p>
                    <p className="text-sm text-red-600/80">{item.traditional}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-6"
          >
            <p className="text-gray-500 text-xs sm:text-sm px-2">
              Don't learn expensive lessons the hard way. <span className="text-[#2d5a4a] font-medium">Protect your family's future.</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Desktop Table Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:block max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-3 bg-gradient-to-r from-[#2d5a4a] to-[#1f3a2c]">
              <div className="p-5 md:p-6 text-white font-semibold text-sm md:text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                What You Get
              </div>
              <div className="p-5 md:p-6 text-center border-l border-white/20">
                <span className="text-[#d4af37] font-bold text-lg md:text-xl">Nesthome</span>
                <p className="text-white/70 text-xs mt-1">Peace of Mind</p>
              </div>
              <div className="p-5 md:p-6 text-center text-white/80 border-l border-white/20 text-sm md:text-base">
                Traditional Builder
                <p className="text-white/50 text-xs mt-1">High Risk</p>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
            >
              {comparisons.map((item, index) => (
                <motion.div
                  key={item.feature}
                  variants={rowVariants}
                  className={`grid grid-cols-3 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  } ${index !== comparisons.length - 1 ? "border-b border-gray-100" : ""} hover:bg-[#2d5a4a]/5 transition-colors duration-300`}
                  data-testid={`comparison-row-${index}`}
                >
                  <div className="p-4 md:p-5 flex items-start gap-2">
                    {item.painPoint && (
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm md:text-base font-medium text-gray-800">{item.feature}</p>
                    </div>
                  </div>
                  <div className="p-4 md:p-5 border-l border-gray-100">
                    <div className="flex items-start gap-2">
                      <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5"
                      >
                        <Check className="w-3 h-3 text-green-600" />
                      </motion.div>
                      <p className="text-sm text-green-700">{item.nesthome}</p>
                    </div>
                  </div>
                  <div className="p-4 md:p-5 border-l border-gray-100">
                    <div className="flex items-start gap-2">
                      <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5"
                      >
                        <X className="w-3 h-3 text-red-500" />
                      </motion.div>
                      <p className="text-sm text-red-600/80">{item.traditional}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-gray-500 text-sm">
              Don't learn expensive lessons the hard way. <span className="text-[#2d5a4a] font-medium">Protect your family's future.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
