export function OrganizationalStructure() {
  const structure = [
    {
      level: "Board of Directors",
      description: "Provides strategic oversight and governance",
    },
    {
      level: "Executive Director",
      description: "Leads the organization and sets strategic direction",
    },
    {
      level: "Management Team",
      roles: [
        "Business Development Expert",
        "Program Manager",
        "Finance and Administration Manager",
        "Head of Human Resources",
        "Head of Procurement and Logistics",
      ],
    },
    {
      level: "Program Implementation Team",
      roles: [
        "Coordinators",
        "Officers",
        "Community Volunteers",
      ],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 bg-gray-50">
      <div className="text-center max-w-4xl mx-auto mb-8 lg:mb-12">
        <p className="text-sm font-medium tracking-wide text-cyan-600 uppercase">How We Work</p>
        <h2 className="mt-1 text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl">Organizational Structure</h2>
        <p className="mt-2 lg:text-xl text-gray-600">
          CENSCOPE operates under a Board of Directors providing strategic oversight. The Executive Director leads a professional team dedicated to delivering impactful programs.
        </p>
      </div>
      <div className="space-y-6">
        {structure.map((item, index) => (
          <div
            key={item.level}
            className="bg-white p-6 lg:p-8 rounded-lg shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {item.level}
                </h3>
                {item.description && (
                  <p className="text-gray-700">{item.description}</p>
                )}
                {item.roles && (
                  <ul className="mt-3 space-y-2">
                    {item.roles.map((role) => (
                      <li key={role} className="flex items-center gap-2 text-gray-700">
                        <span className="text-cyan-600">•</span>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
