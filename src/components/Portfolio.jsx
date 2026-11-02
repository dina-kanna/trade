
import { useEffect, useState } from "react";
import { holdings, formatCurrency } from "../data/stocks";

const periods = {
  "1W": [30, 45, 40, 55, 48, 70, 65, 82],
  "1M": [20, 35, 30, 48, 40, 65, 55, 80],
  "1Y": [15, 22, 35, 30, 48, 55, 70, 95],
  ALL: [10, 18, 15, 32, 40, 52, 75, 100],
};

const INITIAL_VALUE = 1284560.8;

export default function Portfolio() {
  const [period, setPeriod] = useState("1M");
  const [portfolioValue, setPortfolioValue] = useState(INITIAL_VALUE);
  const [dailyChange, setDailyChange] = useState(24680.5);
  const [holdingsData, setHoldingsData] = useState(
    holdings.map((holding) => ({ ...holding }))
  );
  const [chartData, setChartData] = useState(periods["1M"]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulated live portfolio updates
  useEffect(() => {
    const interval = setInterval(() => {
      const movement = (Math.random() - 0.48) * 0.004;
      const valueChange = portfolioValue * movement;

      setPortfolioValue((previous) =>
        Math.max(0, previous + valueChange)
      );

      setDailyChange((previous) => previous + valueChange);

      setHoldingsData((previous) =>
        previous.map((holding) => {
          const stockMovement = (Math.random() - 0.48) * 0.8;
          const newChange = Number(
            (holding.change + stockMovement).toFixed(2)
          );

          const newValue = Math.max(
            0,
            holding.value * (1 + stockMovement / 100)
          );

          return {
            ...holding,
            value: newValue,
            change: newChange,
          };
        })
      );

      setChartData((previous) => {
        const lastValue = previous[previous.length - 1];
        const nextValue = Math.min(
          100,
          Math.max(5, lastValue + (Math.random() - 0.46) * 12)
        );

        return [...previous.slice(1), nextValue];
      });

      setLastUpdated(new Date());
    }, 2500);

    return () => clearInterval(interval);
  }, [portfolioValue]);

  // Change chart when period changes
  const handlePeriodChange = (item) => {
    setPeriod(item);
    setChartData([...periods[item]]);
  };

  const chartPoints = chartData
    .map((value, index) => {
      const x = (index / (chartData.length - 1)) * 100;
      const y = 100 - value;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,100 ${chartPoints} 100,100`;

  const formatTime = (date) =>
    date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const overallReturn =
    ((portfolioValue - 1085000) / 1085000) * 100;

  const positiveDay = dailyChange >= 0;

  return (
    <section
      id="portfolio"
      className="scroll-mt-20 bg-[#080f0b] px-5 py-20 text-white md:px-8"
    >
      <div className="mx-auto max-w-full">

        {/* Heading */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-[3px] text-lime-400">
              Your Money, In Motion
            </span>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Portfolio Dashboard
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              A snapshot of your investment journey.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
            </span>
            <span className="text-xs font-bold text-lime-400">
              LIVE SIMULATION
            </span>
          </div>
        </div>

        {/* Portfolio layout */}
        <div className="grid gap-6 lg:grid-cols-5">

          {/* Performance card */}
          <div className="rounded-3xl border border-white/10 bg-[#111c15] p-6 md:p-8 lg:col-span-3">

            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-sm text-gray-400">
                  Total portfolio value
                </p>

                <h3 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                  {formatCurrency(portfolioValue)}
                </h3>

                <p
                  className={`mt-3 text-sm font-semibold ${
                    positiveDay ? "text-lime-400" : "text-red-400"
                  }`}
                >
                  {positiveDay ? "↗ +" : "↘ "}
                  {formatCurrency(Math.abs(dailyChange))} today
                </p>
              </div>

              {/* Period filters */}
              <div className="flex gap-1 rounded-xl bg-black/30 p-1">
                {Object.keys(periods).map((item) => (
                  <button
                    key={item}
                    onClick={() => handlePeriodChange(item)}
                    className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                      period === item
                        ? "bg-lime-400 text-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Live chart */}
            <div className="relative mt-10 h-56 w-full overflow-hidden">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[1, 2, 3, 4].map((line) => (
                  <div
                    key={line}
                    className="border-t border-white/[0.07]"
                  />
                ))}
              </div>

              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="relative h-full w-full overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="portfolioArea"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#a3e635"
                      stopOpacity="0.35"
                    />
                    <stop
                      offset="100%"
                      stopColor="#a3e635"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <polygon
                  points={areaPoints}
                  fill="url(#portfolioArea)"
                />

                <polyline
                  points={chartPoints}
                  fill="none"
                  stroke="#a3e635"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            <div className="mt-3 flex justify-between text-xs text-gray-500">
              <span>Start</span>
              <span>{period} performance</span>
              <span>Today</span>
            </div>

            {/* Metrics */}
            <div className="mt-8 grid grid-cols-1 gap-5 border-t border-white/10 pt-7 sm:grid-cols-3">

              <div>
                <p className="text-xs text-gray-500">
                  Invested amount
                </p>
                <h4 className="mt-2 text-lg font-bold">
                  ₹10,85,000
                </h4>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Total returns
                </p>
                <h4
                  className={`mt-2 text-lg font-bold ${
                    overallReturn >= 0
                      ? "text-lime-400"
                      : "text-red-400"
                  }`}
                >
                  {formatCurrency(portfolioValue - 1085000)}
                </h4>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Overall return
                </p>
                <h4
                  className={`mt-2 text-lg font-bold ${
                    overallReturn >= 0
                      ? "text-lime-400"
                      : "text-red-400"
                  }`}
                >
                  {overallReturn >= 0 ? "+" : ""}
                  {overallReturn.toFixed(2)}%
                </h4>
              </div>

            </div>

            <p className="mt-6 text-[10px] text-gray-500">
              Last updated: {formatTime(lastUpdated)} · Prices are simulated.
            </p>
          </div>

          {/* Holdings card */}
          <div className="rounded-3xl border border-white/10 bg-[#111c15] p-6 md:p-8 lg:col-span-2">

            <div className="mb-7 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">
                  Your Holdings
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Your investment breakdown
                </p>
              </div>

              <span className="rounded-full bg-lime-400/10 px-3 py-2 text-xs font-bold text-lime-400">
                {holdingsData.length} Stocks
              </span>
            </div>

            <div className="space-y-7">
              {holdingsData.map((holding) => (
                <div key={holding.symbol}>

                  <div className="flex items-center justify-between gap-3">

                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 font-black text-lime-400">
                        {holding.symbol[0]}
                      </div>

                      <div className="min-w-0">
                        <h4 className="font-bold">
                          {holding.symbol}
                        </h4>

                        <p className="truncate text-xs text-gray-500">
                          {holding.name}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold transition-all">
                        {formatCurrency(holding.value)}
                      </p>

                      <p
                        className={`mt-1 text-xs font-semibold ${
                          holding.change >= 0
                            ? "text-lime-400"
                            : "text-red-400"
                        }`}
                      >
                        {holding.change > 0 ? "+" : ""}
                        {holding.change.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  {/* Allocation bar */}
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-lime-400 transition-all duration-700"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, holding.allocation)
                        )}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-right text-[10px] text-gray-500">
                    {holding.allocation}% allocation
                  </p>

                </div>
              ))}
            </div>
          </div>

        </div>

        <p className="mt-5 text-center text-xs text-gray-600">
          TradeX demo dashboard · All portfolio movements and prices are dummy data, not real exchange prices.
        </p>
      </div>
    </section>
  );
}
