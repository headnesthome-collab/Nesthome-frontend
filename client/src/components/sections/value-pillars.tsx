import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shield, Heart, Eye, Wallet, Clock, Users } from "lucide-react";

const EMOTIONAL_PILLARS = [
  {
    title: "Sleep Peacefully",
    description: "No more worrying about contractor fraud or poor quality. Every partner is verified and insured.",
    icon: Shield,
    emotion: "Security",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    title: "Protect Your Investment",
    description: "Fixed pricing means no surprises. Your hard-earned money is safe with milestone-based payments.",
    icon: Wallet,
    emotion: "Financial Safety",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    title: "See Everything",
    description: "Daily photo updates and real-time tracking. Know exactly what's happening at your site, anytime.",
    icon: Eye,
    emotion: "Control",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Save Precious Time",
    description: "We handle permits, materials, and coordination. Focus on your life while we build your home.",
    icon: Clock,
    emotion: "Convenience",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Build with Pride",
    description: "Premium materials from Tata Steel, Ultratech, Asian Paints. A home your family will cherish for generations.",
    icon: Heart,
    emotion: "Pride",
    gradient: "from-rose-500 to-rose-600",
  },
  {
    title: "Expert Support Always",
    description: "Dedicated project manager answers your calls. Never feel alone in your home-building journey.",
    icon: Users,
    emotion: "Support",
    gradient: "from-teal-500 to-teal-600",
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

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
};

export function ValuePillars() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#2d5a4a]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-[#d4af37] font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Why Families Choose Us
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d5a4a] mb-5 font-display">
            Building Homes, Building Trust
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We understand building a home is one of life's biggest decisions. 
            That's why we've designed every step to give you <span className="text-[#2d5a4a] font-semibold">complete peace of mind</span>.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {EMOTIONAL_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.3 } 
                }}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-white group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#2d5a4a]/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  
                  <CardContent className="p-8 flex flex-col h-full relative">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-5 shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    
                    <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-2">{pillar.emotion}</span>
                    <h3 className="text-xl font-bold text-[#2d5a4a] mb-3 font-display group-hover:text-[#1a3830] transition-colors">{pillar.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
