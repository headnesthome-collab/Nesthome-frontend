import { SERVICES } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

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

export function ServicesPreview() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
        >
          <div>
            <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a4a] mt-2 mb-4 font-display">Our Services</h2>
            <p className="text-gray-600 max-w-xl">
              We guide you through every step of building your home.
            </p>
          </div>
          <Link href="/services">
            <motion.div whileHover={{ x: 5 }}>
              <Button variant="outline" className="gap-2 group border-[#2d5a4a] text-[#2d5a4a] hover:bg-[#2d5a4a] hover:text-white">
                View All Services 
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={index} 
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-gray-100 h-full">
                  <CardContent className="p-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 rounded-xl bg-[#2d5a4a]/10 text-[#2d5a4a] flex items-center justify-center mb-5 group-hover:bg-[#2d5a4a] group-hover:text-white transition-colors duration-300"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <div className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-2">
                      0{index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-[#2d5a4a] mb-3">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
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
