import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Clock, CheckCircle, ArrowRight } from "lucide-react";
import heroImage from "@assets/Gemini_Generated_Image_9lwz8m9lwz8m9lwz_1765124759866.png";
import { HeroLeadForm } from "@/components/forms/hero-lead-form";

interface HeroProps {
  onGetEstimate: () => void;
  onCalculateCost?: () => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export function Hero({ onGetEstimate, onCalculateCost }: HeroProps) {
  return (
    <div className="relative w-full min-h-[580px] sm:min-h-[650px] md:min-h-[750px] overflow-hidden bg-gradient-to-br from-[#2d5a4a] via-[#234a3c] to-[#1a3830]">
      <div className="absolute inset-0 w-full h-full">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={heroImage} 
          alt="Your Future Dream Home" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d5a4a]/75 via-[#2d5a4a]/60 to-[#2d5a4a]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3830]/80 via-transparent to-transparent" />
        
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#d4af37]/20 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl" 
        />
      </div>

      <div className="relative z-10 container h-full px-4 md:px-6 max-w-7xl py-10 sm:py-14 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-4 sm:space-y-5 md:space-y-8 flex-1 text-white"
          >
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-lg"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
              </span>
              <span className="text-white/90 text-sm font-medium">Now Serving Indore & Nearby Areas</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15] font-display"
            >
              Your Family Deserves{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f0d78c] to-[#d4af37]">
                A Home Built Right
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-sm sm:text-base md:text-lg text-white/85 max-w-xl leading-relaxed"
            >
              Stop worrying about contractor fraud, hidden costs, and delays. 
              <span className="text-[#d4af37] font-medium"> Build with complete peace of mind.</span>
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm"
            >
              {[
                { icon: Shield, text: "Fixed Price" },
                { icon: CheckCircle, text: "Quality Assured" },
                { icon: Clock, text: "On-Time" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="flex items-center gap-1.5 sm:gap-2 bg-white/5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg backdrop-blur-sm border border-white/10"
                >
                  <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37]" />
                  <span className="text-white/90">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-2 lg:hidden"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  onClick={onGetEstimate}
                  className="w-full sm:w-auto text-base px-8 py-6 h-auto bg-gradient-to-r from-[#d4af37] to-[#e5c158] hover:from-[#e5c158] hover:to-[#d4af37] text-[#1a3830] font-bold shadow-2xl shadow-[#d4af37]/30 transition-all duration-500 group rounded-xl"
                  data-testid="hero-cta-primary"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={onCalculateCost}
                  className="w-full sm:w-auto text-base px-8 py-6 h-auto bg-white/5 hover:bg-white/15 text-white border-2 border-white/30 hover:border-[#d4af37] backdrop-blur-md transition-all duration-300 rounded-xl"
                  data-testid="hero-cta-secondary"
                >
                  Calculate Cost
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="hidden lg:flex flex-col sm:flex-row gap-4 pt-2"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={onCalculateCost}
                  className="w-full sm:w-auto text-base px-8 py-6 h-auto bg-white/5 hover:bg-white/15 text-white border-2 border-white/30 hover:border-[#d4af37] backdrop-blur-md transition-all duration-300 rounded-xl"
                  data-testid="hero-cta-calculator"
                >
                  Calculate Cost
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 sm:gap-5 pt-3 sm:pt-4 border-t border-white/10"
            >
              <div className="flex -space-x-2 sm:-space-x-3">
                {['P', 'R', 'A', 'K'].map((letter, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm border-2 border-white shadow-lg ${
                      i % 2 === 0 
                        ? 'bg-gradient-to-br from-[#d4af37] to-[#b8962d] text-[#1a3830]' 
                        : 'bg-[#2d5a4a] text-white'
                    }`}
                  >
                    {letter}
                  </motion.div>
                ))}
              </div>
              <div className="text-xs sm:text-sm">
                <p className="text-white/80">Trusted by families across Indore</p>
                <p className="text-[#d4af37] font-semibold">Join them in building your dream home</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <HeroLeadForm />
          </div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div 
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-[#d4af37] rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
