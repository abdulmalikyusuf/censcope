import { FaHandsHelping, FaShieldAlt, FaBriefcase, FaGraduationCap, FaLeaf, FaBalanceScale, FaHeartbeat, FaTint } from "react-icons/fa";

const pillars = [
  {
    icon: FaHandsHelping,
    title: "Peacebuilding and Social Cohesion",
    description: "At the heart of CENSCOPE's work lies the conviction that sustainable peace can only be achieved when communities are empowered to rebuild trust, resolve conflict, and coexist harmoniously.",
    details: [
      "Community dialogues and reconciliation platforms",
      "Mediation training for youth, women, and traditional leaders",
      "Reintegration of conflict-affected individuals",
      "Intercommunal sports and peace clubs",
      "Community-based early warning and early response systems (EWER)",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: FaShieldAlt,
    title: "Protection, Gender Equality, and Inclusion",
    description: "Protection and the promotion of human dignity form the cornerstone of CENSCOPE's humanitarian mandate.",
    details: [
      "Strengthening community and institutional protection systems",
      "Gender equality and rights of people with disabilities (PWDs)",
      "Psychosocial support and GBV referral pathways",
      "Engaging men and boys as allies in promoting gender equity",
      "Advocacy for stronger protection frameworks and access to justice",
    ],
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: FaBriefcase,
    title: "Livelihoods and Socio-economic Empowerment",
    description: "Economic recovery is fundamental to restoring dignity and stability in conflict-affected regions.",
    details: [
      "Skills training and entrepreneurship programs",
      "Vocational training centers and micro-grant initiatives",
      "Partnerships with microfinance institutions",
      "Climate-smart livelihoods and agricultural diversification",
      "Market linkages and value chain development",
    ],
    color: "from-green-500 to-green-600",
  },
  {
    icon: FaGraduationCap,
    title: "Education",
    description: "Education is one of the most powerful tools for restoring hope and stability in crisis-affected settings.",
    details: [
      "Rehabilitation of damaged classrooms",
      "Provision of learning materials",
      "Teacher training in safe, inclusive pedagogy",
      "Non-formal learning programs for out-of-school children",
      "Early recovery and rehabilitation efforts",
    ],
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: FaLeaf,
    title: "Climate Resilience and Environmental Sustainability",
    description: "CENSCOPE's Climate Resilience and Environmental Sustainability pillar seeks to integrate environmental protection and climate adaptation into all its programming.",
    details: [
      "Community-led natural resource management",
      "Tree-planting campaigns and environmental awareness",
      "Climate-smart agricultural practices",
      "Disaster risk reduction (DRR) plans",
      "Eco-friendly livelihood options",
    ],
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: FaBalanceScale,
    title: "Governance, Policy, and Advocacy",
    description: "Good governance is the cornerstone of sustainable peace and development.",
    details: [
      "Civic education and community dialogues",
      "Capacity-building for local government officials",
      "Policy reforms for localization and protection",
      "Support for CBOs, youth, and women's groups participation",
      "Membership in coordination platforms (HCT, sector working groups)",
    ],
    color: "from-indigo-500 to-indigo-600",
  },
];

const additionalPrograms = [
  {
    icon: FaHeartbeat,
    title: "Health and Nutrition",
    description: "Health and nutrition crisis driven by persistent poverty and violent conflict is fuelling recurring emergencies, and limited access to essential services.",
    focus: [
      "Strengthening community-level health systems",
      "Expanding quality primary healthcare",
      "Scaling up lifesaving nutrition interventions",
      "Maternal and child health support",
      "Prevention, early detection, and integrated service delivery",
    ],
    color: "from-red-500 to-red-600",
  },
  {
    icon: FaTint,
    title: "Water Sanitation and Hygiene (WASH)",
    description: "Nigeria faces persistent WASH challenges that hinder public health, dignity, and overall well-being particularly in underserved rural communities, informal settlements, and crisis-affected regions.",
    focus: [
      "Expanding equitable access to safe water",
      "Improving sanitation coverage",
      "Promoting evidence-based hygiene practices",
      "Strengthening community systems",
      "Climate-resilient water and sanitation solutions",
    ],
    color: "from-cyan-500 to-cyan-600",
  },
];

export function Pillars() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
      <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
        <p className="text-sm font-medium tracking-wide text-cyan-600 uppercase">Our Approach</p>
        <h2 className="mt-1 text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl">Six Core Pillars</h2>
        <p className="mt-2 lg:text-xl text-gray-600">
          Together, these six pillars form a comprehensive and interconnected framework for advancing peace, resilience, and sustainable development across Nigeria's most vulnerable regions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 lg:p-8"
            >
              <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${pillar.color} text-white mb-4`}>
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {pillar.title}
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {pillar.description}
              </p>
              <ul className="space-y-2">
                {pillar.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-cyan-600 mt-1">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-16 pt-16 border-t border-gray-200">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <p className="text-sm font-medium tracking-wide text-cyan-600 uppercase">Additional Programs</p>
          <h2 className="mt-1 text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl">Health, Nutrition & WASH</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {additionalPrograms.map((program) => {
            const Icon = program.icon;
            return (
              <div
                key={program.title}
                className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg p-6 lg:p-8 border border-gray-200"
              >
                <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${program.color} text-white mb-4`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {program.description}
                </p>
                <ul className="space-y-2">
                  {program.focus.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-cyan-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-16 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg p-8 lg:p-12 text-white text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Strategic Goals (2026-2031)</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 text-left">
          <div className="flex items-start gap-3">
            <span className="text-cyan-200 font-bold">1.</span>
            <span>Protect and restore dignity, safety, and rights of conflict-affected people.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-cyan-200 font-bold">2.</span>
            <span>Strengthening community resilience through peacebuilding, livelihoods, and inclusion.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-cyan-200 font-bold">3.</span>
            <span>Support sustainable reintegration of displaced people, ex-associates, and survivors of violence.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-cyan-200 font-bold">4.</span>
            <span>Promote climate-smart solutions and environmental stewardship.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-cyan-200 font-bold">5.</span>
            <span>Institutionalize accountability, gender equality, and locally led humanitarian action.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
