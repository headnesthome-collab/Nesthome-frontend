import { CheckCircle } from "lucide-react";
import { SEO } from "@/components/seo";

export default function About() {
  return (
    <div className="py-12 md:py-24 bg-white min-h-screen">
      <SEO 
        title="About Us" 
        description="Nesthome is bringing transparency to India’s home-construction market. Our mission is to empower plot owners with trust, quality, and fixed timelines."
      />
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-display">About Nesthome</h1>
          <p className="text-xl text-slate-600">
            Bringing transparency to India’s home-construction market.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              To empower every plot owner in India to build their dream home with confidence, clarity, and zero stress. We aim to eliminate the opacity, delays, and quality issues that plague the traditional construction industry.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Building India’s most trusted home-construction ecosystem where quality is guaranteed and pricing is transparent.
            </p>
          </section>

          <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Why We Exist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Solving Delays</h3>
                  <p className="text-slate-600 text-sm">We use strict project management to ensure on-time delivery.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Fixing Quality</h3>
                  <p className="text-slate-600 text-sm">Standardized quality checks at every stage of construction.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Preventing Price Jumps</h3>
                  <p className="text-slate-600 text-sm">Fixed cost estimates that don't change mid-project.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Building Trust</h3>
                  <p className="text-slate-600 text-sm">Complete transparency in materials and pricing.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
