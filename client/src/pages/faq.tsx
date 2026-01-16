import { SEO } from "@/components/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_DATA = [
  {
    question: "What is Nesthome?",
    answer: "Nesthome is a technology-enabled platform that helps homeowners plan, manage, and track their home construction in a more structured and transparent way. We focus on bringing clarity, control, and peace of mind to the construction process."
  },
  {
    question: "Is Nesthome a construction company or a contractor?",
    answer: "No. Nesthome is not a contractor or builder. We act as a coordination and project management platform that helps homeowners manage construction efficiently by improving planning, tracking, payments, and communication."
  },
  {
    question: "How does Nesthome help homeowners?",
    answer: "Nesthome helps by: Structuring the construction process, Improving visibility into progress and timelines, Aligning payments with work stages, Supporting coordination with verified professionals, and Reducing confusion, delays, and unexpected surprises."
  },
  {
    question: "Do you show contractors or builders on your website?",
    answer: "No. Nesthome does not operate as a public listing marketplace. We work through a controlled and structured process to avoid confusion, misuse, or direct bypassing, and to ensure better accountability for homeowners."
  },
  {
    question: "How are payments handled?",
    answer: "Nesthome encourages stage-wise payments aligned with visible progress. This helps homeowners maintain better control over cash flow and reduces the risk of paying ahead without work completion. Final payment terms are always between the homeowner and service providers."
  },
  {
    question: "Can I track my home construction progress?",
    answer: "Yes. Nesthome provides digital updates and progress visibility, including site updates and stage tracking, so you know what is happening on your plot at every major step."
  },
  {
    question: "Do you guarantee construction quality or timelines?",
    answer: "Nesthome provides process-level support and checks, but we do not guarantee construction outcomes. Quality, timelines, and execution depend on multiple factors including site conditions and third-party performance. Our role is to reduce risk, not replace professional responsibility."
  },
  {
    question: "Are the professionals associated with Nesthome verified?",
    answer: "Nesthome follows an internal verification and screening process before working with professionals. However, homeowners are encouraged to independently review and understand all agreements before proceeding."
  },
  {
    question: "Who owns the construction contract?",
    answer: "All construction agreements are directly between the homeowner and the service provider. Nesthome does not become a party to construction contracts."
  },
  {
    question: "Is Nesthome suitable for first-time home builders?",
    answer: "Yes. Nesthome is especially helpful for first-time homeowners who want more clarity, structure, and guidance during construction."
  },
  {
    question: "Where is Nesthome currently available?",
    answer: "Nesthome is currently rolling out selectively and expanding in phases. Availability may vary by city and project type. We are primarily serving Indore and nearby areas."
  },
  {
    question: "How does Nesthome make money?",
    answer: "Nesthome operates on a service-based model. Commercial terms, if applicable, are communicated transparently before engagement."
  },
  {
    question: "Is my personal and project data safe?",
    answer: "Yes. Nesthome follows strict data protection practices. Your data is not sold or misused and is shared only when necessary for service coordination."
  },
  {
    question: "Can I leave or stop using Nesthome midway?",
    answer: "Yes. You are free to discontinue at any point. Any ongoing obligations will be governed by the terms agreed at the time of engagement."
  },
  {
    question: "How do I get started with Nesthome?",
    answer: "You can get started by submitting an inquiry on our website. Our team will connect with you to understand your project and explain how Nesthome can help."
  }
];

export default function FAQ() {
  return (
    <div className="py-12 md:py-24 bg-white min-h-screen">
      <SEO 
        title="Frequently Asked Questions" 
        description="Find answers to common questions about Nesthome's home construction coordination platform. Learn how we help homeowners build their dream homes."
      />
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-display">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about Nesthome and how we help you build your dream home.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-slate-50 rounded-xl border border-slate-100 px-6 data-[state=open]:bg-[#2d5a4a]/5 data-[state=open]:border-[#2d5a4a]/20 transition-colors"
            >
              <AccordionTrigger 
                className="text-left text-lg font-semibold text-slate-800 hover:text-[#2d5a4a] hover:no-underline py-5"
                data-testid={`faq-question-${index}`}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 text-center bg-gradient-to-r from-[#2d5a4a] to-[#1a3830] rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display">
            Still have questions?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/917470404685" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BD5C] transition-colors"
              data-testid="faq-whatsapp-link"
            >
              Chat on WhatsApp
            </a>
            <a 
              href="mailto:support@nesthome.in"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              data-testid="faq-email-link"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
