import { Hero } from "@/components/hero";
import careerBannerImg from "@/assets/images/career-bg.jpg";
import { careerMetadata } from "@/config/metadata";

export const metadata = careerMetadata || {
  title: "Career Opportunities - CENSCOPE",
  description: "Join CENSCOPE in making a difference. Explore career opportunities with us.",
};

export default function CareerPage() {
  return (
    <>
      <Hero
        title="Career Opportunities"
        image={careerBannerImg.src}
        links={[{ label: "career", href: "#" }]}
        description="Join CENSCOPE in our mission to empower communities, build peace, and transform lives across Northeast Nigeria."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Work With Us
            </h2>
            <p className="text-lg text-gray-600">
              CENSCOPE is always looking for passionate individuals who share our commitment to humanitarian work, peacebuilding, and community empowerment.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-cyan-600 mb-4">
                Current Openings
              </h3>
              <p className="text-gray-700 mb-6">
                We currently do not have any open positions. However, we welcome spontaneous applications from qualified candidates who are passionate about our mission.
              </p>
              <div className="bg-cyan-50 p-4 rounded-md">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Please check back regularly for new opportunities, or send your CV and cover letter to our recruitment team.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-cyan-600 mb-4">
                Why Work With CENSCOPE?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold mt-1">•</span>
                  <span>Make a meaningful impact in conflict-affected communities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold mt-1">•</span>
                  <span>Work with a diverse, passionate team dedicated to humanitarian values</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold mt-1">•</span>
                  <span>Professional development opportunities in humanitarian and development sectors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold mt-1">•</span>
                  <span>Competitive compensation and benefits package</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold mt-1">•</span>
                  <span>Opportunities to work across multiple program areas: Peacebuilding, Protection, Livelihoods, Education, WASH, and more</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-cyan-600 mb-4">
                How to Apply
              </h3>
              <p className="text-gray-700 mb-4">
                To express your interest in working with CENSCOPE, please send your application to:
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-800">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@censcope.org"
                    className="text-cyan-600 hover:text-cyan-700 underline"
                  >
                    info@censcope.org
                  </a>
                </p>
                <p className="text-gray-800 mt-2">
                  <strong>Subject:</strong> Career Application - [Your Name]
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Please include your CV, cover letter, and any relevant certifications. We review applications on a rolling basis and will contact qualified candidates when positions become available.
              </p>
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-cyan-600 mb-4">
                Our Values
              </h3>
              <p className="text-gray-700 mb-4">
                At CENSCOPE, we are guided by our core values in everything we do:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span className="text-gray-700"><strong>Integrity</strong> - We act with honesty and transparency</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span className="text-gray-700"><strong>Accountability</strong> - We take responsibility for our actions</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span className="text-gray-700"><strong>Teamwork</strong> - We collaborate effectively</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span className="text-gray-700"><strong>Dedication</strong> - We are committed to our mission</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
