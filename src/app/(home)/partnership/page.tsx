import { Hero } from "@/components/hero";
import partnershipBannerImg from "@/assets/images/partnership-bg.jpg";
import { partnershipMetadata } from "@/config/metadata";

export const metadata = partnershipMetadata || {
  title: "Partnership - CENSCOPE",
  description: "Partner with CENSCOPE to create lasting impact in communities across Northeast Nigeria.",
};

export default function PartnershipPage() {
  return (
    <>
      <Hero
        title="Partnership"
        image={partnershipBannerImg.src}
        links={[{ label: "partnership", href: "#" }]}
        description="Join hands with CENSCOPE to build a legacy of enduring peace, empowerment, and social equity."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Partner With Us
            </h2>
            <p className="text-lg text-gray-600">
              CENSCOPE partners with national and international actors including UN agencies and international non-governmental organizations to deliver principled humanitarian response and long-term development.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-cyan-600 mb-4">
                Why Partner With CENSCOPE?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold mt-1">•</span>
                  <span><strong>Proven Track Record:</strong> Over 1.7 million people reached through our programs across Borno, Adamawa, Yobe, Katsina, Benue, and Kogi states</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold mt-1">•</span>
                  <span><strong>Local Expertise:</strong> Deep understanding of the context and communities we serve, with headquarters in Maiduguri, Borno State</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold mt-1">•</span>
                  <span><strong>Comprehensive Programming:</strong> Six interconnected pillars covering Peacebuilding, Protection, Livelihoods, Education, Climate Resilience, and Governance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold mt-1">•</span>
                  <span><strong>Accountability & Transparency:</strong> Registered with Nigeria&apos;s Corporate Affairs Commission (CAC/IT/110963) and committed to ethical practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold mt-1">•</span>
                  <span><strong>Community-Centered Approach:</strong> Programs designed with and for the communities we serve</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-cyan-600 mb-4">
                Partnership Opportunities
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">UN Agencies & International NGOs</h4>
                  <p className="text-gray-700">
                    We collaborate with UN agencies and international organizations on humanitarian response, peacebuilding, and development initiatives. Our expertise in program implementation, community engagement, and local context makes us an ideal implementing partner.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Government & Policy Makers</h4>
                  <p className="text-gray-700">
                    We work with local and state governments to strengthen governance systems, support policy reforms, and enhance service delivery. Our advocacy efforts promote localization, protection, and equitable resource distribution.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Private Sector</h4>
                  <p className="text-gray-700">
                    Corporate partnerships enable us to scale our impact through funding, technical support, and shared expertise. We welcome partnerships that align with our values and contribute to sustainable development.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Community-Based Organizations</h4>
                  <p className="text-gray-700">
                    We support and collaborate with local CBOs, youth groups, and women&apos;s organizations to ensure grassroots participation in development processes and strengthen local capacity.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Academic & Research Institutions</h4>
                  <p className="text-gray-700">
                    We partner with universities and research institutions to generate evidence, evaluate programs, and inform best practices in humanitarian and development work.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-cyan-600 mb-4">
                Our Impact
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-cyan-50 p-4 rounded-md">
                  <h4 className="font-bold text-gray-900 mb-2">People Reached</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 47,080 individuals through Explosive Ordnance Risk Education</li>
                    <li>• 1,747,626 individuals via social media platforms</li>
                    <li>• Over 1.7 million via radio partnerships</li>
                  </ul>
                </div>
                <div className="bg-cyan-50 p-4 rounded-md">
                  <h4 className="font-bold text-gray-900 mb-2">People Supported</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 586 individuals through civic education</li>
                    <li>• 615 individuals with startup kits</li>
                    <li>• 580 women trained in income-generating skills</li>
                    <li>• 105 survivors supported with medical care</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-cyan-600 mb-4">
                Get In Touch
              </h3>
              <p className="text-gray-700 mb-4">
                Interested in partnering with CENSCOPE? We&apos;d love to hear from you. Contact our partnership team:
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-800 mb-2">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@censcope.org"
                    className="text-cyan-600 hover:text-cyan-700 underline"
                  >
                    info@censcope.org
                  </a>
                </p>
                <p className="text-gray-800 mb-2">
                  <strong>Address:</strong> NO.03 OFF SHEHU LAMINU WAY, BEHIND DOCTORS&apos; QUARTERS, OLD GRA, MAIDUGURI, BORNO STATE
                </p>
                <p className="text-gray-800">
                  <strong>Subject:</strong> Partnership Inquiry
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 p-6 lg:p-8 rounded-lg text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Together, We Can Build a Better Future
              </h3>
              <p className="mb-4">
                By partnering with CENSCOPE, you join a network of organizations committed to creating lasting change in conflict-affected communities. Let&apos;s work together to advance peace, resilience, and sustainable development.
              </p>
              <a
                href="/support-us"
                className="inline-block mt-4 px-6 py-3 bg-white text-cyan-600 font-semibold rounded-md hover:bg-gray-100 transition-all"
              >
                Support Our Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
