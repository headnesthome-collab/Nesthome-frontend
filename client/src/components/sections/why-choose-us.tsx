import { WHY_CHOOSE_US } from "@/lib/constants";
import { motion } from "framer-motion";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  },
};

export function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#1a3830] text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#d4af37] font-semibold text-xs sm:text-sm uppercase tracking-widest">Why Us</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4 sm:mb-6 font-display">Why Choose Nesthome?</h2>
            <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">
              We are fixing the broken home construction experience using technology, structure, and transparency.
            </p>
            
            <motion.ul 
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-3 sm:space-y-5"
            >
              {WHY_CHOOSE_US.map((item, index) => (
                <motion.li 
                  key={index} 
                  variants={itemVariants}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className="mt-0.5 sm:mt-1 text-[#d4af37]"
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  <span className="text-sm sm:text-base md:text-lg font-medium text-white/90">{item.title}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 sm:mt-8 text-white/70 text-xs sm:text-sm md:text-base leading-relaxed border-t border-white/10 pt-4 sm:pt-6"
            >
              We manage construction through a structured, transparent process that emphasizes accountability and gives homeowners greater clarity and control throughout the build.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#2d5a4a] p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-display">The Nesthome Assurance</h3>
            <div className="space-y-3 sm:space-y-4 text-white/80 text-sm sm:text-base">
              <p>
                A simple, structured construction process built to give homeowners clarity, control, and confidence throughout their home building journey.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
