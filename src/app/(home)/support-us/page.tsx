import { Hero } from "@/components/hero";
import { DonationForm } from "@/components/donation-form";
import { supportMetadata } from "@/config/metadata";
import SupportUs from "src/assets/images/support-us.jpg";

export const metadata = supportMetadata;

export default function Page() {
  return (
    <>
      <Hero
        title="Support us"
        image={SupportUs.src}
        links={[{ label: "support us", href: "#" }]}
        description="We are a non-profit organisation that is committed to providing support to the community."
      />

      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="">
              Why Your Support Matters
            </h2>
            <p className="mt-4 text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              At the <strong>Centre for Social Cohesion, Peace and Empowerment (CENSCOPE)</strong>, we
              believe in the power of people helping people. Every contribution—big or small—helps
              restore dignity, hope, and opportunity to communities affected by conflict and disaster
              across Northeast Nigeria.
            </p>
          </div>

          <div className="mt-16">
            <h3 className="text-gray-900 text-center mb-4">
              Our Impact in 2024
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <h4 className="lg:text-xl font-medium text-gray-900">Civic Empowerment</h4>
                <p className="mt-4 text-gray-500">
                  <strong>586 individuals</strong> (including 186 ex-associates and 400 women) gained crucial civic education, financial literacy, and life skills, directly increasing community participation and social cohesion.
                </p>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <h4 className="lg:text-xl font-medium text-gray-900">Risk Education & Safety</h4>
                <p className="mt-4 text-gray-500">
                  We reached <strong>47,080 people</strong> with life-saving safety education, training 90 volunteers and helping communities reduce risk by establishing Mine Action Committees.
                </p>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <h4 className="lg:text-xl font-medium text-gray-900">Survivor Support</h4>
                <p className="mt-4 text-gray-500">
                  <strong>105 explosive ordnance survivors</strong> received holistic assistance, including essential medical care, prosthetics, rehabilitation, and the livelihood support needed to restart their lives.
                </p>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <h4 className="lg:text-xl font-medium text-gray-900">Economic Independence</h4>
                <p className="mt-4 text-gray-500">
                  <strong>615 individuals</strong> received startup kits and seed capital. Crucially, 580 women were trained in income-generating skills and linked to cooperatives, fostering economic stability.
                </p>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <h4 className="lg:text-xl font-medium text-gray-900">Rapid Disaster Response</h4>
                <p className="mt-4 text-gray-500">
                  Following the Alau Dam flood, we swiftly provided hygiene kits, psychosocial support, and vaccination campaigns to mitigate health crises affecting <strong>over 400,000 displaced people.</strong>
                </p>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <h4 className="lg:text-xl font-medium text-gray-900">Media & Advocacy Reach</h4>
                <p className="mt-4 text-gray-500">
                  Your support amplifies our message: Through partnerships and social media, we reached <strong>over 1.7 million people</strong> with vital messages on protection, hygiene, and reintegration, ensuring critical information reaches those most in need.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center p-8 md:p-10 lg:p-12 xl:p-16 bg-cyan-600 rounded-xl shadow-xl max-w-5xl mx-auto w-full">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Make an Impact Today.
            </h3>
            <p className="mt-4 text-lg text-cyan-100 max-w-4xl mx-auto">
              Every donation directly contributes to a safer, more empowered Northeast Nigeria. Whether you are funding a startup kit for a woman entrepreneur or a life-saving EORE session, your support is vital.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DonationForm />
        </div>
      </section>

    </>
  );
}
