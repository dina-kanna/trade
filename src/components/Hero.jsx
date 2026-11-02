
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

const initialChart = [
  125, 110, 118, 85, 98, 65, 78, 45, 60, 28, 42, 12,
];

const formatCurrency = (value) =>
  "₹" +
  value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function Hero() {
  const [portfolio, setPortfolio] = useState(1284560.8);
  const [dailyProfit, setDailyProfit] = useState(24680.5);
  const [chartData, setChartData] = useState(initialChart);
  const [marketChange, setMarketChange] = useState(1.96);

  // Simulated live portfolio updates
  useEffect(() => {
    const interval = setInterval(() => {
      const movement = (Math.random() - 0.48) * 0.002;
      const amount = portfolio * movement;

      setPortfolio((previous) =>
        Math.max(0, previous + amount)
      );

      setDailyProfit((previous) => previous + amount);

      setMarketChange((previous) =>
        Number(
          (previous + (Math.random() - 0.48) * 0.12).toFixed(2)
        )
      );

      setChartData((previous) => {
        const last = previous[previous.length - 1];

        const next = Math.max(
          8,
          Math.min(140, last + (Math.random() - 0.48) * 22)
        );

        return [...previous.slice(1), next];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [portfolio]);

  // SVG chart coordinates
  const chartPoints = chartData
    .map((value, index) => {
      const x = (index / (chartData.length - 1)) * 385;
      return `${x},${value}`;
    })
    .join(" ");

  const areaPoints = `0,150 ${chartPoints} 385,150`;

  const isPositive = dailyProfit >= 0;

  return (
    <section
      id="home"
      className="relative min-h-[650px] overflow-hidden bg-[#080f0b] px-6 py-20 text-white md:py-28"
    >
      {/* Animated background effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-40 -top-32 h-[500px] w-[500px] rounded-full bg-lime-400/10 blur-[130px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-full items-center gap-16 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-lime-400/20 bg-lime-400/5 px-4 py-2"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-400" />
            </span>

            <span className="text-xs font-semibold tracking-wider text-lime-300">
              MARKETS ARE LIVE · DEMO ENVIRONMENT
            </span>
          </motion.div>

          {/* Animated heading */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl text-5xl font-black leading-[1.1] tracking-tight md:text-7xl"
          >
            Invest in your
            <br />
            future.{" "}
            <span className="bg-gradient-to-r from-lime-300 to-green-500 bg-clip-text text-transparent">
              Trade
            </span>
            <br />
            with clarity.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-7 max-w-xl text-base leading-8 text-gray-400 md:text-lg"
          >
            Make confident moves with a smarter trading experience.
            Track markets, discover opportunities, and stay in
            control of your portfolio — all in one place.
          </motion.p>

          {/* Animated buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <motion.a
              href="#stocks"
              whileHover={{ scale: 1.06, y: -5 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-xl bg-lime-400 px-7 py-4 font-bold text-[#101a0e] shadow-lg shadow-lime-400/20 transition hover:bg-lime-300"
            >
              Explore Markets ↗
            </motion.a>

            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.06, y: -5 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-xl border border-white/15 px-7 py-4 font-semibold text-white transition hover:border-lime-400 hover:text-lime-300"
            >
              View Portfolio
            </motion.a>
          </motion.div>

          {/* Investor avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {["A", "J", "M", "S"].map((letter, index) => (
                <motion.div
                  key={letter}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 1 + index * 0.12,
                    type: "spring",
                  }}
                  whileHover={{ y: -6, scale: 1.15 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#080f0b] bg-gradient-to-br from-lime-300 to-green-700 text-sm font-bold text-black"
                >
                  {letter}
                </motion.div>
              ))}
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                Built for modern investors
              </p>
              <p className="text-xs text-gray-500">
                Smarter tools. Clearer decisions.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT PORTFOLIO CARD */}
        <motion.div
          initial={{ opacity: 0, x: 70, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="relative mx-auto w-full max-w-xl"
        >
          {/* Animated card glow */}
          <motion.div
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.95, 1.08, 0.95],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-5 rounded-[35px] bg-lime-400/10 blur-3xl"
          />

          {/* Main dashboard */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.015 }}
            className="relative rounded-3xl border border-white/10 bg-[#111c15]/95 p-6 shadow-2xl backdrop-blur-xl md:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-widest text-gray-400">
                  PORTFOLIO PERFORMANCE
                </p>
                <p className="mt-2 text-xs text-gray-600">
                  Your investment overview
                </p>
              </div>

              <span className="flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1.5 text-[10px] font-bold text-lime-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
                LIVE PREVIEW
              </span>
            </div>

            {/* Live portfolio value */}
            <div className="mt-9">
              <p className="text-sm text-gray-400">
                Total portfolio value
              </p>

              <AnimatePresence mode="popLayout">
                <motion.h2
                  key={Math.round(portfolio)}
                  initial={{ opacity: 0.5, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 text-3xl font-black tracking-tight md:text-4xl"
                >
                  {formatCurrency(portfolio)}
                </motion.h2>
              </AnimatePresence>

              <motion.p
                key={dailyProfit.toFixed(0)}
                initial={{ opacity: 0.5, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 text-sm font-semibold ${
                  isPositive ? "text-lime-400" : "text-red-400"
                }`}
              >
                {isPositive ? "↗ +" : "↘ -"}
                {formatCurrency(Math.abs(dailyProfit))}
                {" ("}
                {marketChange > 0 ? "+" : ""}
                {marketChange.toFixed(2)}%)
                {" today"}
              </motion.p>
            </div>

            {/* Animated SVG chart */}
            <div className="mt-9 h-48 w-full">
              <svg
                viewBox="0 0 385 150"
                className="h-full w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="heroAreaGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#a3e635"
                      stopOpacity="0.3"
                    />
                    <stop
                      offset="100%"
                      stopColor="#a3e635"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                {[30, 65, 100, 135].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="385"
                    y2={y}
                    stroke="white"
                    strokeOpacity="0.08"
                    strokeDasharray="4 5"
                  />
                ))}

                <motion.polygon
                  animate={{ points: areaPoints }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  fill="url(#heroAreaGradient)"
                />

                <motion.polyline
                  animate={{ points: chartPoints }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  fill="none"
                  stroke="#a3e635"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <motion.circle
                  animate={{
                    cx: 385,
                    cy: chartData[chartData.length - 1],
                    r: [4, 6, 4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  fill="#a3e635"
                />
              </svg>
            </div>

            {/* Bottom metrics */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/5 bg-white/[0.04] p-4"
              >
                <p className="text-xs text-gray-500">
                  Total returns
                </p>
                <p className="mt-2 text-xl font-bold text-lime-400">
                  +18.42%
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/5 bg-white/[0.04] p-4"
              >
                <p className="text-xs text-gray-500">
                  Investment status
                </p>
                <p className="mt-2 text-xl font-bold text-white">
                  Growing ↗
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating market badge */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-7 -left-4 rounded-2xl border border-lime-400/20 bg-[#1a2b1e] px-5 py-4 shadow-xl md:-left-10"
          >
            <p className="text-[10px] font-semibold tracking-widest text-gray-400">
              MARKET MOMENTUM
            </p>
            <p className="mt-1 text-lg font-black text-lime-400">
              Positive ↗
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
