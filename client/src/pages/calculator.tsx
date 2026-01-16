import { useLocation } from "wouter";
import { Layout } from "@/components/layout/layout";
import { SEO } from "@/components/seo";
import { CostCalculator } from "@/components/calculator/cost-calculator";

export default function CalculatorPage() {
  const [, setLocation] = useLocation();

  const handleGetQuote = (data: { plotSize: string; floors: string; quality: string; estimate: string }) => {
    const params = new URLSearchParams({
      plotSize: data.plotSize,
      source: "calculator",
      estimate: data.estimate
    });
    setLocation(`/contact?${params.toString()}`);
  };

  return (
    <Layout>
      <SEO 
        title="Construction Cost Calculator" 
        description="Get instant home construction cost estimates for Indore. Calculate your dream home building cost in 30 seconds. Free and accurate estimates."
        keywords="construction cost calculator, home building cost Indore, house construction estimate, building cost per sq ft"
      />
      
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-[#2d5a4a] mb-4">
              Construction Cost Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get an instant estimate for your dream home. Enter your plot details and 
              see transparent pricing based on current Indore market rates.
            </p>
          </div>

          <CostCalculator onGetQuote={handleGetQuote} />

          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-[#2d5a4a] text-center mb-8">
              Why Our Estimates Are Accurate
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border">
                <div className="w-12 h-12 bg-[#2d5a4a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold text-[#2d5a4a] mb-2">Market-Based Rates</h3>
                <p className="text-sm text-muted-foreground">
                  Updated pricing based on current Indore construction market
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border">
                <div className="w-12 h-12 bg-[#2d5a4a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏗️</span>
                </div>
                <h3 className="font-semibold text-[#2d5a4a] mb-2">Complete Package</h3>
                <p className="text-sm text-muted-foreground">
                  Includes construction, finishing, electrical & plumbing
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border">
                <div className="w-12 h-12 bg-[#2d5a4a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-semibold text-[#2d5a4a] mb-2">No Hidden Costs</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent fixed-cost pricing with no surprises
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Need a more detailed quote? Our experts are here to help.
            </p>
            <p className="text-lg font-medium text-[#2d5a4a]">
              Call us: <a href="tel:+917470404685" className="text-[#d4af37] hover:underline">+91 7470404685</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
