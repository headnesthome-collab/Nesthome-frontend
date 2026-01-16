import { PROCESS_STEPS } from "@/lib/constants";
import { motion } from "framer-motion";
import processImage from "@assets/generated_images/architect_reviewing_home_construction.png";

export function ProcessSteps() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">
              How Nesthome Works
            </h2>
            <p className="text-slate-600 mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg">
              From plot to possession, we simplify every step of the journey so you can focus on the excitement of your new home.
            </p>

            <div className="space-y-5 sm:space-y-6 md:space-y-8 pl-0">
              {PROCESS_STEPS.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex gap-3 sm:gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-md">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-1 sm:mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative mt-6 sm:mt-8 lg:mt-0"
          >
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-square">
              <img 
                src={processImage} 
                alt="Construction Process" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2d5a4a]/20 to-transparent mix-blend-overlay" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-16 h-16 md:w-24 md:h-24 bg-[#2d5a4a]/10 rounded-full -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 md:w-32 md:h-32 border-2 border-[#d4af37]/30 rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
