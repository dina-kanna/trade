
import { useEffect, useState } from "react";
import { indices } from "../data/stocks";

export default function MarketOverview() {
  const [marketData, setMarketData] = useState(indices);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulated live market updates using dummy data
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((previousData) =>
        previousData.map((index) => {
          const movement = (Math.random() - 0.48) * 0.15;
          const newChange = Number(
            (index.change + movement).toFixed(2)
          );

          const currentValue = Number(
            String(index.value).replace(/,/g, "")
          );

          const newValue = currentValue * (1 + movement / 100);

          return {
            ...index,
            value: newValue.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
            change: newChange,
          };
        })
      );

      setLastUpdated(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatChange = (change) =>
    `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;

  return (
    <section
      id="markets"
      className="bg-[#080f0b] px-5 py-20 text-white md:px-8"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* Heading */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-[3px] text-lime-400">
              The Big Picture
            </span>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Market Overview
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Track major global and Indian market indices.
            </p>
          </div>

          {/* Market status */}
          <div className="rounded-xl border border-lime-400/20 bg-lime-400/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-400" />
              </span>

              <span className="text-xs font-bold text-lime-300">
                LIVE SIMULATION
              </span>
            </div>

            <p className="mt-2 text-[10px] text-gray-500">
              Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Market cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {marketData.map((index, i) => {
            const positive = index.change >= 0;

            return (
              <div
                key={index.name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111c15] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-lime-400/40 hover:shadow-xl hover:shadow-lime-400/5"
              >
                {/* Background glow */}
                <div
                  className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition ${
                    positive
                      ? "bg-lime-400/5 group-hover:bg-lime-400/10"
                      : "bg-red-400/5 group-hover:bg-red-400/10"
                  }`}
                />

                {/* Index heading */}
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-300">
                      {index.name}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
                      Market Index
                    </p>
                  </div>

                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-lime-400/10 bg-lime-400/10 text-lg font-black text-lime-400">
                    {["N", "S", "B", "I", "M", "D", "F", "T"][i % 8]}
                  </span>
                </div>

                {/* Market value */}
                <div className="relative mt-7">
                  <h3 className="text-2xl font-black tracking-tight md:text-3xl">
                    {index.value}
                  </h3>

                  <p className="mt-2 text-[10px] text-gray-500">
                    Current indicative value
                  </p>
                </div>

                {/* Change */}
                <div className="relative mt-6 flex items-center justify-between">
                  <span
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-bold ${
                      positive
                        ? "bg-lime-400/10 text-lime-400"
                        : "bg-red-400/10 text-red-400"
                    }`}
                  >
                    <span>{positive ? "↗" : "↘"}</span>
                    {formatChange(index.change)}
                  </span>

                  <span className="text-xs text-gray-500">
                    Today
                  </span>
                </div>

                {/* Movement bar */}
                <div className="relative mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      positive ? "bg-lime-400" : "bg-red-400"
                    }`}
                    style={{
                      width: `${Math.min(
                        Math.max(Math.abs(index.change) * 15, 5),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom information */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div>
            <p className="text-xs text-gray-500">
              All figures are simulated and for demonstration purposes only.
            </p>
            <p className="mt-1 text-[10px] text-gray-600">
              Not real-time exchange data or investment advice.
            </p>
          </div>

          <a
            href="#stocks"
            className="text-xs font-bold text-lime-400 transition hover:text-lime-300"
          >
            Explore stocks ↗
          </a>
        </div>

      </div>
    </section>
  );
}
