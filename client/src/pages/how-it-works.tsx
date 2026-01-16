import { LeadForm } from "@/components/forms/lead-form";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Users, Shield, Wallet, ClipboardCheck, Phone, ArrowRight, Star, Sparkles, Smartphone, Camera, MessageCircle, CreditCard, Bell } from "lucide-react";
import { SEO } from "@/components/seo";
import { motion } from "framer-motion";
import architectImage from "@assets/generated_images/architect_reviewing_home_construction.png";
import constructionImage from "@assets/generated_images/premium_construction_site.png";
import completedHomeImage from "@assets/generated_images/luxury_completed_family_home.png";
import appMockupImage from "@assets/generated_images/construction_tracking_app_mockup.png";

const trustBadges = [
  { icon: Shield, text: "No Hidden Costs", description: "Fixed price guarantee" },
  { icon: Wallet, text: "Milestone Payments", description: "Pay only for completed work" },
  { icon: Smartphone, text: "App Tracking", description: "Real-time progress updates" },
  { icon: Users, text: "Dedicated Manager", description: "Your single point of contact" },
];

const appFeatures = [
  { icon: Camera, title: "Progress Photos", description: "Daily photos & videos of your construction site" },
  { icon: Bell, title: "Milestone Updates", description: "Get notified when milestones are completed" },
  { icon: CreditCard, title: "Payment Tracking", description: "View payment schedule and history" },
  { icon: MessageCircle, title: "Direct Messaging", description: "Chat with your project manager instantly" },
];

const detailedSteps = [
  {
    step: 1,
    title: "Submit Your Details",
    description: "Share your plot size, location, budget and requirements with us through a simple form. This helps us understand your project scope.",
    deliverables: ["Personalized cost estimate", "Expert callback", "Project feasibility review"],
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    image: null,
  },
  {
    step: 2,
    title: "Free Expert Consultation",
    description: "Our architects and project managers connect with you to understand your requirements, lifestyle needs, and design preferences.",
    deliverables: ["1-on-1 video/phone consultation", "Requirements documentation", "Initial design direction"],
    icon: Phone,
    color: "from-purple-500 to-purple-600",
    image: architectImage,
  },
  {
    step: 3,
    title: "Design & Planning",
    description: "Based on your inputs, we create detailed floor plans and 3D visualizations. You'll work closely with our architects to perfect every detail.",
    deliverables: ["Custom floor plan", "3D home visualization", "Material specifications"],
    icon: ClipboardCheck,
    color: "from-amber-500 to-amber-600",
    image: null,
  },
  {
    step: 4,
    title: "Matched With Verified Builder",
    description: "We connect you with a trusted, background-verified local builder selected specifically for your project type and location.",
    deliverables: ["Verified builder profile", "Past project references", "Detailed quotation"],
    icon: Users,
    color: "from-green-500 to-green-600",
    image: null,
  },
  {
    step: 5,
    title: "Transparent Agreement",
    description: "Sign a clear agreement with defined scope, fixed pricing, milestone payments, and project guarantees.",
    deliverables: ["Legal agreement", "Payment schedule", "Project milestones"],
    icon: Shield,
    color: "from-teal-500 to-teal-600",
    image: null,
  },
  {
    step: 6,
    title: "Construction & App Tracking",
    description: "Track your home construction from anywhere using our mobile app. Get daily photos, milestone updates, and chat directly with your project manager.",
    deliverables: ["Nesthome tracking app access", "Daily progress photos", "Real-time notifications"],
    icon: Smartphone,
    color: "from-orange-500 to-orange-600",
    image: constructionImage,
  },
  {
    step: 7,
    title: "Quality Handover",
    description: "After final inspections and quality certification, your beautiful new home is handed over to you — ready to move in.",
    deliverables: ["Final quality certification", "All documentation", "Keys to your dream home"],
    icon: Star,
    color: "from-[#d4af37] to-[#c9a030]",
    image: completedHomeImage,
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
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <SEO 
        title="How It Works | Nesthome" 
        description="Understand the Nesthome construction process: From sharing plot details to transparent estimates, construction tracking, and final handover."
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2d5a4a] via-[#1f4a3a] to-[#1a3830] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2Mmg')] opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl" />
        
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#d4af37]/20 text-[#d4af37] rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Your Home Building Journey
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
              From Dream to Reality
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
              A transparent, milestone-based journey to your dream home. We guide you through every stage — from first consultation to final handover.
            </p>
            
            {/* Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <Shield className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm">Verified Partners</h3>
                <p className="text-white/60 text-xs mt-1">Background-checked builders</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <Wallet className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm">Fixed Pricing</h3>
                <p className="text-white/60 text-xs mt-1">No hidden costs or surprises</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <Smartphone className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm">App Tracking</h3>
                <p className="text-white/60 text-xs mt-1">Real-time progress updates</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 md:py-12 bg-white border-b border-gray-100">
        <div className="container px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.text}
                variants={itemVariants}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#2d5a4a]/10 flex items-center justify-center mb-3">
                  <badge.icon className="w-6 h-6 text-[#2d5a4a]" />
                </div>
                <h3 className="font-semibold text-[#2d5a4a] text-sm mb-1">{badge.text}</h3>
                <p className="text-gray-500 text-xs">{badge.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#2d5a4a] mb-4">
              Your Step-by-Step Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every step is designed for transparency, quality, and your peace of mind.
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Timeline Line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2d5a4a] via-[#d4af37] to-[#2d5a4a]" />

            <div className="space-y-8 md:space-y-12">
              {detailedSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                  data-testid={`step-${step.step}`}
                >
                  {/* Step Number Badge */}
                  <div className="absolute left-0 md:left-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#2d5a4a] to-[#1f3a2c] border-4 border-white shadow-lg z-10 flex items-center justify-center">
                    <span className="font-bold text-[#d4af37] text-sm md:text-base">{step.step}</span>
                  </div>

                  {/* Card */}
                  <div className="ml-12 md:ml-20">
                    <div className={`bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${step.image ? 'md:grid md:grid-cols-5' : ''}`}>
                      {/* Image Section (if exists) */}
                      {step.image && (
                        <div className="md:col-span-2 h-48 md:h-auto">
                          <img 
                            src={step.image} 
                            alt={step.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Content Section */}
                      <div className={`p-6 md:p-8 ${step.image ? 'md:col-span-3' : ''}`}>
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                            <step.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold text-[#2d5a4a] mb-2">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                          </div>
                        </div>

                        {/* Deliverables */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">What You'll Get</p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {step.deliverables.map((item, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2d5a4a]/10 text-[#2d5a4a] rounded-full text-sm font-semibold mb-6">
                <Smartphone className="w-4 h-4" />
                Nesthome App
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#2d5a4a] mb-4">
                Track Your Home Construction From Anywhere
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Stay connected to your project with our mobile app. Get real-time updates, photos, and communicate directly with your project team.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {appFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm"
                    data-testid={`app-feature-${index}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2d5a4a] text-sm">{feature.title}</h4>
                      <p className="text-gray-500 text-xs mt-0.5">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* App Store Badges */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#2d5a4a] rounded-lg text-white">
                  <Smartphone className="w-5 h-5" />
                  <div className="text-left">
                    <p className="text-[10px] text-white/70">Coming Soon on</p>
                    <p className="text-sm font-semibold">App Store & Play Store</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Get notified when we launch</p>
              </div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#d4af37]/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#2d5a4a]/20 rounded-full blur-3xl" />
                
                {/* Phone Image */}
                <img 
                  src={appMockupImage} 
                  alt="Nesthome App - Construction Tracking"
                  className="relative z-10 w-full max-w-sm mx-auto drop-shadow-2xl"
                  data-testid="app-mockup-image"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#2d5a4a] to-[#1a3830] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2Mmg')] opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl" />
        
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-[#d4af37]/20 text-[#d4af37] rounded-full text-sm font-semibold mb-6">
              Ready to Begin?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Start Your Home Building Journey Today
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Get a free consultation and personalized cost estimate. Our team will guide you through every step of building your dream home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LeadForm trigger={
                <Button 
                  size="lg" 
                  className="px-8 py-6 text-lg h-auto bg-[#d4af37] text-[#2d5a4a] hover:bg-[#e5c158] font-bold shadow-lg hover:shadow-xl transition-all"
                  data-testid="button-start-journey"
                >
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              } />
              <a href="https://wa.me/917470404685" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-6 text-lg h-auto border-white/30 text-white hover:bg-white/10 font-semibold w-full sm:w-auto"
                  data-testid="button-whatsapp"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>

            <p className="mt-6 text-white/60 text-sm">
              No obligations. Get expert advice for free.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
