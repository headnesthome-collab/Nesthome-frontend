import { SERVICES } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { SEO } from "@/components/seo";
import { motion } from "framer-motion";
import { useState } from "react";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

export default function Services() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  return (
    <div className="py-12 md:py-24 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <SEO 
        title="Services" 
        description="Comprehensive home construction services in Indore: Home Planning, Construction Support, Progress Tracking, Payment Structuring, and Quality Oversight."
      />
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-widest">What We Offer</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a4a] mt-3 mb-6 font-display">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We guide you through every step of building your home — from planning to handover.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10"
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={index} 
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white">
                  <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2d5a4a] to-[#1f3a2c] text-white flex items-center justify-center shadow-lg"
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-1">
                        0{index + 1}
                      </div>
                      <CardTitle className="text-xl text-[#2d5a4a]">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#2d5a4a] to-[#1f3a2c] rounded-3xl p-8 md:p-12 shadow-2xl w-full flex flex-col items-center justify-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display text-center">Ready to Build Your Dream Home?</h2>
          <p className="text-white/80 mb-8 text-center max-w-xl mx-auto">
            Every project is unique. Share your requirements and get a personalized consultation.
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex justify-center"
          >
            <Button 
              size="lg" 
              onClick={() => setIsLeadFormOpen(true)}
              className="px-10 py-6 h-auto bg-gradient-to-r from-[#d4af37] to-[#e5c158] hover:from-[#e5c158] hover:to-[#d4af37] text-[#1a3830] font-bold shadow-lg"
            >
              Get Free Consultation
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <LeadForm open={isLeadFormOpen} onOpenChange={setIsLeadFormOpen} />
    </div>
  );
}
