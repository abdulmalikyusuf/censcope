export function CoreValues() {
  const values = [
    { name: "Integrity", description: "We act with honesty and transparency in all our operations" },
    { name: "Honesty", description: "We maintain truthfulness in our communications and actions" },
    { name: "Accountability", description: "We take responsibility for our actions and decisions" },
    { name: "Teamwork", description: "We collaborate effectively to achieve common goals" },
    { name: "Dedication", description: "We are committed to our mission and the communities we serve" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 bg-gray-50">
      <div className="text-center max-w-4xl mx-auto mb-8 lg:mb-12">
        <p className="text-sm font-medium tracking-wide text-cyan-600 uppercase">Our Foundation</p>
        <h2 className="mt-1 text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl">Core Values</h2>
        <p className="mt-2 lg:text-xl text-gray-600">
          CENSCOPE&apos;s values define the ethical and professional foundation of its work. They guide every aspect of program delivery, decision-making, and partnership.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((value, index) => (
          <div
            key={value.name}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-cyan-600 font-bold text-2xl">{index + 1}</span>
              <h3 className="text-xl font-bold text-gray-900">{value.name}</h3>
            </div>
            <p className="text-gray-700">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
