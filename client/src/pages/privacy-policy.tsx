import { SEO } from "@/components/seo";

export default function PrivacyPolicy() {
  return (
    <div className="py-12 md:py-24 bg-white min-h-screen">
      <SEO 
        title="Privacy Policy" 
        description="Learn how Nesthome collects, uses, and protects your personal information. Read our complete privacy policy."
      />
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-display">Privacy Policy</h1>
          <p className="text-slate-500">Last Updated: December 2025</p>
        </div>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            This Privacy Policy governs the collection, use, storage, disclosure, and protection of information by Nesthome ("Nesthome", "we", "us", "our").
          </p>
          <p className="text-slate-600 mb-8">
            Nesthome is a technology-enabled platform currently under development, operated by its founding team, and intended to assist individual homeowners by providing structured coordination, informational support, and digital tools related to residential construction projects.
          </p>
          <p className="text-slate-600 mb-12">
            By accessing or using the website www.nesthome.co.in, submitting inquiries, or interacting with our platform in any manner, you acknowledge that you have read, understood, and agreed to the practices described in this Privacy Policy.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">1. Applicability & Scope</h2>
            <p className="text-slate-600 mb-4">This Privacy Policy applies to:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Visitors browsing the Nesthome website</li>
              <li>Individuals submitting inquiries or expressions of interest</li>
              <li>Users engaging with Nesthome consultations or coordination support</li>
              <li>Communications conducted via email, phone, messaging platforms, or digital forms</li>
            </ul>
            <p className="text-slate-600">
              This policy does not apply to third-party websites, applications, or services that may be linked from our platform. Users are advised to review the privacy policies of such third parties independently.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-slate-800 mb-3">A. Personal Information (Voluntarily Provided)</h3>
            <p className="text-slate-600 mb-3">We may collect personal information that you choose to provide, including:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
              <li>Full name</li>
              <li>Mobile phone number</li>
              <li>Email address</li>
              <li>City, location of property, or project location</li>
              <li>Information shared during calls, forms, consultations, or inquiries</li>
            </ul>
            <p className="text-slate-600 mb-6">Submission of such information is voluntary, but certain services may not be available without it.</p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">B. Project & Interaction Information</h3>
            <p className="text-slate-600 mb-3">If you engage with Nesthome for consultation or coordination purposes, we may collect:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Project requirements and preferences</li>
              <li>High-level budget ranges (if voluntarily shared)</li>
              <li>Non-sensitive documents, images, or plans voluntarily uploaded</li>
            </ul>
            <p className="text-slate-600 mb-6">Nesthome does not require or solicit confidential title documents, bank details, or sensitive personal identifiers at the website stage.</p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">C. Technical & Usage Information</h3>
            <p className="text-slate-600 mb-3">We may automatically collect limited technical information such as:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>IP address</li>
              <li>Device type and browser information</li>
              <li>Pages visited and time spent on the website</li>
              <li>Cookies and basic analytics data</li>
            </ul>
            <p className="text-slate-600">This information is collected to improve platform functionality and user experience.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">3. Purpose of Information Collection</h2>
            <p className="text-slate-600 mb-3">Information collected is used strictly for the following purposes:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Responding to inquiries and requests</li>
              <li>Providing consultation, coordination, or informational support</li>
              <li>Facilitating structured communication related to services</li>
              <li>Improving platform usability and experience</li>
              <li>Sending service-related updates or information (non-promotional by default)</li>
              <li>Internal analysis, compliance, and quality improvement</li>
              <li>Compliance with applicable laws and legal obligations</li>
            </ul>
            <p className="text-slate-600">Nesthome does not use personal data for unrelated commercial exploitation.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">4. Disclosure & Information Sharing</h2>
            <p className="text-slate-600 mb-4 font-semibold">Nesthome does not sell, trade, or rent personal information.</p>
            <p className="text-slate-600 mb-4">Information may be shared only under the following controlled circumstances:</p>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-2">A. Service Facilitation</h3>
            <p className="text-slate-600 mb-4">Information may be shared with relevant professionals or partners only when necessary to facilitate consultation or coordination, and only with user awareness.</p>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-2">B. Platform Operations</h3>
            <p className="text-slate-600 mb-2">Limited information may be accessed by:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-1 mb-4">
              <li>Technology service providers</li>
              <li>Hosting or analytics tools</li>
              <li>Communication infrastructure providers</li>
            </ul>
            <p className="text-slate-600 mb-4">These parties are required to follow reasonable data protection practices.</p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">C. Legal & Regulatory Requirements</h3>
            <p className="text-slate-600 mb-2">Disclosure may occur if required by:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-1 mb-4">
              <li>Applicable law</li>
              <li>Court order</li>
              <li>Governmental or regulatory authority</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">D. Protection of Rights</h3>
            <p className="text-slate-600">Information may be disclosed to prevent fraud, misuse, or to protect Nesthome's legal rights, user safety, or platform integrity.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">5. Data Security Measures</h2>
            <p className="text-slate-600 mb-4">
              Nesthome implements reasonable administrative, organizational, and technical safeguards to protect personal information from unauthorized access, misuse, or loss.
            </p>
            <p className="text-slate-600 mb-2">However, users acknowledge that:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>No digital or online system can guarantee absolute security</li>
              <li>Transmission of information over the internet carries inherent risks</li>
            </ul>
            <p className="text-slate-600 mt-4">You share information at your own discretion.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">6. Data Retention & Deletion</h2>
            <p className="text-slate-600 mb-2">Personal data is retained only for:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Providing requested services</li>
              <li>Internal operational needs</li>
              <li>Legal or regulatory compliance</li>
            </ul>
            <p className="text-slate-600">Once data is no longer required, it is deleted or anonymized using reasonable methods.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">7. User Rights & Choices</h2>
            <p className="text-slate-600 mb-2">Users may:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Request access to their personal information</li>
              <li>Request correction or deletion of incorrect information</li>
              <li>Withdraw consent for non-essential communication</li>
            </ul>
            <p className="text-slate-600 mb-2">Requests can be sent to:</p>
            <p className="text-[#2d5a4a] font-semibold mb-4">support@nesthome.in</p>
            <p className="text-slate-600">We aim to respond within a reasonable timeframe, subject to legal and operational constraints.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">8. Cookies & Tracking Technologies</h2>
            <p className="text-slate-600 mb-2">Nesthome uses cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Improve website performance</li>
              <li>Understand usage patterns</li>
              <li>Enhance user experience</li>
            </ul>
            <p className="text-slate-600">Users may control cookies via browser settings. Disabling cookies may limit certain features.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">9. Third-Party Websites</h2>
            <p className="text-slate-600 mb-4">
              Nesthome may contain links to third-party websites or tools. We are not responsible for their privacy practices, content, or data handling policies.
            </p>
            <p className="text-slate-600">Users should review third-party privacy policies independently.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">10. Platform Disclaimer</h2>
            <p className="text-slate-600 mb-4 font-semibold">Nesthome operates as a technology-enabled coordination and support platform only.</p>
            <p className="text-slate-600 mb-2">Nesthome:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Is not a contractor, architect, engineer, or construction company</li>
              <li>Does not execute construction work</li>
              <li>Does not guarantee construction outcomes, timelines, costs, or third-party performance</li>
            </ul>
            <p className="text-slate-600">All construction-related agreements, services, and liabilities remain strictly between the user and respective service providers.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">11. Policy Modifications</h2>
            <p className="text-slate-600 mb-4">
              Nesthome reserves the right to revise this Privacy Policy at any time. Updates will be posted on this page with a revised date.
            </p>
            <p className="text-slate-600">Continued use of the platform constitutes acceptance of updated terms.</p>
          </section>

          <section className="mb-10 bg-[#2d5a4a]/5 p-6 rounded-xl border border-[#2d5a4a]/10">
            <h2 className="text-2xl font-bold text-[#2d5a4a] mb-4">12. Contact Information</h2>
            <p className="text-slate-600 mb-4">For privacy-related questions or concerns:</p>
            <div className="space-y-2">
              <p className="text-slate-700 font-semibold">Nesthome</p>
              <p className="text-slate-600">Email: <a href="mailto:support@nesthome.in" className="text-[#2d5a4a] hover:underline">support@nesthome.in</a></p>
              <p className="text-slate-600">Website: <a href="https://www.nesthome.co.in" className="text-[#2d5a4a] hover:underline">www.nesthome.co.in</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
