
const features = [
  {
    icon: "◇",
    number: "01",
    title: "Security Minded",
    description:
      "A privacy-conscious experience designed around informed investment decisions.",
  },
  {
    icon: "▥",
    number: "02",
    title: "Market Insights",
    description:
      "Explore market indices, stock movements and portfolio trends in one place.",
  },
  {
    icon: "⚡",
    number: "03",
    title: "Fast & Simple",
    description:
      "Enjoy clear navigation and simple workflows that save your time.",
  },
  {
    icon: "◉",
    number: "04",
    title: "Smart Analytics",
    description:
      "Monitor your holdings, portfolio performance and watchlist movements.",
  },
];

export default function Features() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#080f0b] px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-full">

        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[3px] text-lime-400">
            The TradeX Advantage
          </span>

          <h2 className="mt-7 text-4xl font-black tracking-tight md:text-5xl">
            Clarity at Every <span className="text-lime-400">Step.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
            Everything you need to understand markets, manage
            investments and make more informed decisions.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group rounded-3xl border border-white/10 bg-[#111c15] p-7 transition-all duration-300 hover:-translate-y-3 hover:border-lime-400/50 hover:bg-[#17251a] hover:shadow-2xl hover:shadow-lime-400/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-400/10 text-4xl text-lime-400 transition duration-300 group-hover:rotate-6 group-hover:bg-lime-400 group-hover:text-black">
                  {feature.icon}
                </div>

                <span className="text-sm font-bold text-gray-600">
                  {feature.number}
                </span>
              </div>

              <h3 className="mt-8 text-xl font-bold transition group-hover:text-lime-400">
                {feature.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-400">
                {feature.description}
              </p>

              <div className="mt-8 h-1 w-10 rounded-full bg-lime-400 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="relative mt-20 overflow-hidden rounded-[2rem] border border-lime-400/20 bg-gradient-to-br from-[#1b3020] via-[#14251a] to-[#0c160f] p-8 md:p-14">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime-400/10 blur-[90px]" />

          <div className="relative flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">

            <div>
              <span className="text-xs font-bold uppercase tracking-[3px] text-lime-400">
                Start Trading Today
              </span>

              <h2 className="mt-4 text-3xl font-black md:text-4xl">
                Make Your Next Move Count.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400">
                Discover opportunities and explore the markets
                with your TradeX dashboard.
              </p>
            </div>

            <a
              href="#trade"
              className="shrink-0 rounded-xl bg-lime-400 px-8 py-4 font-bold text-black shadow-lg shadow-lime-400/10 transition hover:-translate-y-1 hover:bg-lime-300"
            >
              Try Trading Demo ↗
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
