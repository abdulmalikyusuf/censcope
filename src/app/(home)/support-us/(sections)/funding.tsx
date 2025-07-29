export default function Funding() {
  const lists = [
    { content: "Visit the Gandee website." },
    {
      content:
        "Select “Première Urgence Internationale” from the suggested associations.",
    },
    { content: "Create and personalize your solidarity kitty." },
    {
      content:
        "Invite your friends and network to take part in the generosity of your solidarity kitty.",
    },
    {
      content:
        "100% of the money raised goes directly to Première Urgence Internationale in an account opened in our name. Donations are tax-deductible, and participants receive their tax receipts.",
    },
  ];

  return (
    <section
      id="funding"
      className="flex flex-col gap-6 lg:gap-10 padding-horizontal padding-vertical !pb-0"
    >
      <div className="w-full flex flex-col items-start gap-4">
        <h2 className="text-xl md:text-3xl lg:text-4xl">Crowdfunding</h2>
        <p className="lg:text-lg text-justify flex flex-col gap-6">
          Raise funds for Première Urgence Internationale thanks to our
          crowdfunding partner Gandee.
        </p>
      </div>

      <div className="flex flex-col gap-2 max-w-[90%] lg:max-w-3xl">
        {lists.map((item, index) => (
          <p key={item.content} className="text-sm flex items-start gap-2">
            <b className="font-anton whitespace-nowrap">{index + 1} /</b>{" "}
            {item.content}
          </p>
        ))}
      </div>
    </section>
  );
}
