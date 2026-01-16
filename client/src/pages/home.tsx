import { Hero } from "@/components/sections/hero";
import { TrustBadges } from "@/components/sections/trust-badges";
import { ValuePillars } from "@/components/sections/value-pillars";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ServicesPreview } from "@/components/sections/services-preview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { ConstructionPackages } from "@/components/sections/construction-packages";
import { CityAvailability } from "@/components/sections/city-availability";
import { LeadForm } from "@/components/forms/lead-form";
import { CostCalculator } from "@/components/calculator/cost-calculator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo";

export default function Home() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  const handleCalculatorQuote = () => {
    setIsLeadFormOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Home" 
        description="Nesthome helps you find verified contractors, accurate construction costs, and a secure home-building experience in Indore. No fraud, no guesswork, only transparency."
        keywords="house construction Indore, contractors in Indore, home builder Indore, construction cost calculator, verified contractors"
        canonical="https://yourdomain.com/"
      />
      <Hero 
        onGetEstimate={() => setIsLeadFormOpen(true)} 
        onCalculateCost={() => {
          document.getElementById('cost-calculator')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      
      {/* Trust Badges - Build credibility immediately */}
      <TrustBadges />
      
      {/* Cost Calculator - Interactive engagement early */}
      <section id="cost-calculator" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white scroll-mt-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#2d5a4a]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block bg-[#d4af37]/10 text-[#d4af37] font-semibold text-sm uppercase tracking-widest px-4 py-2 rounded-full mb-4">Free Instant Estimate</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#2d5a4a] mb-5">
              Know Your Home Cost in 30 Seconds
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              No more guessing games. Get a <span className="text-[#2d5a4a] font-semibold">realistic estimate</span> based on current Indore market rates.
            </p>
          </div>
          <CostCalculator onGetQuote={handleCalculatorQuote} />
        </div>
      </section>
      
      {/* Services - Show what we offer */}
      <ServicesPreview />
      
      {/* Value Pillars - Why we're different */}
      <ValuePillars />
      
      {/* Process Steps - Show it's easy */}
      <ProcessSteps />
      
      {/* Why Choose Us - Build confidence */}
      <WhyChooseUs />
      
      {/* Comparison Table */}
      <ComparisonTable />
      
      {/* Construction Packages */}
      <ConstructionPackages onGetQuote={() => setIsLeadFormOpen(true)} />
      
      
      {/* Lead Form Preview Section - Urgency CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-[#2d5a4a] to-[#1f3a2c] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#d4af37]/5 rounded-full blur-3xl" />
        
        <div className="container px-4 md:px-6 relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white/90 text-sm">Limited Slots Available This Month</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display leading-tight">
            Your Family's <span className="text-[#d4af37]">Dream Home</span><br className="hidden md:block" /> Is Just One Call Away
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg md:text-xl leading-relaxed">
            Every day you wait is another day of uncertainty. Take the first step towards a home built with 
            <span className="text-[#d4af37] font-semibold"> transparency, quality, and peace of mind.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="text-lg px-12 py-7 h-auto font-bold bg-[#d4af37] hover:bg-[#e5c158] text-[#2d5a4a] shadow-2xl shadow-[#d4af37]/40 transition-all duration-300 group"
              onClick={() => setIsLeadFormOpen(true)}
            >
              Get Free Consultation
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
            <a 
              href="tel:+917470404685"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <span className="text-sm">Or call us:</span>
              <span className="font-semibold text-[#d4af37]">+91 7470404685</span>
            </a>
          </div>
          
          <p className="text-white/60 text-sm">
            ✓ No obligation &nbsp;&nbsp; ✓ 100% confidential &nbsp;&nbsp; ✓ Response within 24 hours
          </p>
        </div>
      </section>

      <CityAvailability />

      <LeadForm open={isLeadFormOpen} onOpenChange={setIsLeadFormOpen} />
    </div>
  );
}
