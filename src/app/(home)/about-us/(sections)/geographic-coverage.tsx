export function GeographicCoverage() {
  const regions = [
    { name: "Northeast", states: ["Borno", "Adamawa", "Yobe"] },
    { name: "Northwest", states: ["Katsina"] },
    { name: "Northcentral", states: ["Benue", "Kogi"] },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
      <div className="text-center max-w-4xl mx-auto mb-8 lg:mb-12">
        <p className="text-sm font-medium tracking-wide text-cyan-600 uppercase">Our Reach</p>
        <h2 className="mt-1 text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl">Geographic Coverage</h2>
        <p className="mt-2 lg:text-xl text-gray-600">
          CENSCOPE is operational across multiple states in Nigeria, bringing hope and support to communities affected by conflict and disaster.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {regions.map((region) => (
          <div
            key={region.name}
            className="bg-gradient-to-br from-cyan-600 to-cyan-700 text-white p-6 lg:p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4">{region.name}</h3>
            <ul className="space-y-2">
              {region.states.map((state) => (
                <li key={state} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span className="text-lg">{state}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
