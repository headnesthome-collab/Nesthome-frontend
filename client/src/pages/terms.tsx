import { SEO } from "@/components/seo";
import { CheckCircle } from "lucide-react";

export default function Terms() {
  return (
    <div className="py-12 md:py-24 bg-white min-h-screen">
      <SEO 
        title="Terms of Use" 
        description="Read Nesthome's terms of use. Understand how our platform works, your responsibilities, and our commitment to transparency."
      />
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-display">Terms of Use</h1>
          <p className="text-slate-500">Last Updated: December 2025</p>
        </div>

        <div className="bg-[#2d5a4a]/5 rounded-2xl p-6 md:p-8 mb-12 border border-[#2d5a4a]/10">
          <p className="text-lg text-slate-700 leading-relaxed">
            Welcome to Nesthome. We're glad you're here. These Terms explain how Nesthome works, what you can expect from us, and how we work with homeowners and professionals to make home construction simpler and more transparent.
          </p>
          <p className="text-slate-600 mt-4">
            By using our website or services, you agree to these Terms.
          </p>
        </div>

        <div className="prose prose-slate max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">1. What is Nesthome?</h2>
            <p className="text-slate-600 mb-4">
              Nesthome is a technology-enabled support platform created to help homeowners manage home construction more smoothly.
            </p>
            <p className="text-slate-600 mb-3">We help you:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {[
                "Plan construction in a structured way",
                "Track progress clearly",
                "Align payments with work stages",
                "Communicate better with professionals",
                "Reduce confusion, delays, and surprises"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-slate-100 rounded-lg p-4 text-slate-600 italic">
              Nesthome does not replace contractors or engineers — we help homeowners stay informed, organised, and in control.
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">2. Who Can Use Nesthome?</h2>
            <p className="text-slate-600 mb-3">You can use Nesthome if:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>You are 18 years or older</li>
              <li>You own or are planning to build a home</li>
              <li>You share accurate information with us</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">3. How Nesthome Works</h2>
            <p className="text-slate-600 mb-3">Nesthome supports homeowners through:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Construction planning support</li>
              <li>Execution coordination</li>
              <li>Digital progress updates</li>
              <li>Stage-wise workflow tracking</li>
              <li>Structured communication</li>
            </ul>
            <p className="text-slate-600">
              Actual construction work is carried out by independent professionals engaged for your project.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">4. Clear Roles & Responsibilities</h2>
            <p className="text-slate-600 mb-4">To keep things transparent, projects supported by Nesthome usually involve three parties:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#2d5a4a]/5 rounded-xl p-4 text-center">
                <span className="text-2xl font-bold text-[#d4af37]">1</span>
                <p className="font-semibold text-slate-800 mt-2">Homeowner</p>
                <p className="text-sm text-slate-600">(you)</p>
              </div>
              <div className="bg-[#2d5a4a]/5 rounded-xl p-4 text-center">
                <span className="text-2xl font-bold text-[#d4af37]">2</span>
                <p className="font-semibold text-slate-800 mt-2">Service Provider</p>
                <p className="text-sm text-slate-600">(contractor / professional)</p>
              </div>
              <div className="bg-[#2d5a4a]/5 rounded-xl p-4 text-center">
                <span className="text-2xl font-bold text-[#d4af37]">3</span>
                <p className="font-semibold text-slate-800 mt-2">Nesthome</p>
                <p className="text-sm text-slate-600">(coordination & technology)</p>
              </div>
            </div>
            <p className="text-slate-600 mb-2">Nesthome's role is to:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Help structure the process</li>
              <li>Improve visibility and accountability</li>
              <li>Support coordination</li>
            </ul>
            <p className="text-slate-600 mt-4 font-medium">
              Nesthome does not perform construction work and does not interfere with professional execution.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">5. Payments & Transparency</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Construction payments are made by homeowners directly to service providers</li>
              <li>Nesthome helps organise stage-based payment planning aligned with progress</li>
              <li>We do not take control of your project funds unless clearly agreed in writing</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">6. Quality & Site Updates</h2>
            <p className="text-slate-600 mb-2">Nesthome:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Supports periodic checks and progress reviews</li>
              <li>Provides visibility through updates and photos (where applicable)</li>
            </ul>
            <div className="bg-slate-100 rounded-lg p-4 text-slate-600 italic">
              Technical responsibility always remains with licensed professionals handling construction.
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">7. Respectful Use</h2>
            <p className="text-slate-600 mb-2">We ask users to:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Share correct information</li>
              <li>Use the platform honestly</li>
              <li>Communicate respectfully</li>
              <li>Not misuse platform access or contacts</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">8. About Limitations</h2>
            <p className="text-slate-600 mb-4">We do our best to support your construction journey, but:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Construction outcomes depend on professionals and site conditions</li>
              <li>Timelines and costs can vary based on real-world factors</li>
              <li>Nesthome helps reduce risk, but cannot eliminate all uncertainty</li>
            </ul>
            <p className="text-slate-600 italic">This is common across all real-world construction processes.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">9. Privacy & Data</h2>
            <p className="text-slate-600">
              We respect your privacy and protect your information. Details are explained in our{" "}
              <a href="/privacy-policy" className="text-[#2d5a4a] hover:underline font-medium">Privacy Policy</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">10. Changes or Discontinuation</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>You're free to stop using Nesthome anytime</li>
              <li>We may update these Terms as the platform improves</li>
              <li>Any changes will be shared transparently on our website</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">11. Governing Law</h2>
            <p className="text-slate-600">
              These Terms follow the laws of India. Any legal matters will be handled under Indian jurisdiction.
            </p>
          </section>

          <section className="mb-10 bg-[#2d5a4a]/5 p-6 rounded-xl border border-[#2d5a4a]/10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">12. Need Help?</h2>
            <p className="text-slate-600 mb-4">We're here for you.</p>
            <div className="space-y-2">
              <p className="text-slate-600">Email: <a href="mailto:support@nesthome.co.in" className="text-[#2d5a4a] hover:underline">support@nesthome.co.in</a></p>
              <p className="text-slate-600">Website: <a href="https://www.nesthome.co.in" className="text-[#2d5a4a] hover:underline">www.nesthome.co.in</a></p>
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 rounded-2xl p-8 border border-[#d4af37]/20">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">A Note to Homeowners</h2>
            <p className="text-slate-700 mb-4">
              Nesthome exists to simplify, not complicate, home construction.
            </p>
            <p className="text-lg text-[#2d5a4a] font-semibold italic">
              Our goal is simple: Give families clarity, control, and confidence during one of the most important projects of their lives.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
