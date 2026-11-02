
import { useEffect, useState } from "react";

const loadingMessages = [
  "Connecting to market data...",
  "Preparing your trading dashboard...",
  "Analyzing market trends...",
  "Loading stock information...",
  "Getting everything ready...",
];

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 5000;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const progressTimer = setInterval(() => {
      setProgress((previous) => {
        const next = Math.min(previous + increment, 100);
        return next;
      });
    }, interval);

    const messageTimer = setInterval(() => {
      setMessageIndex((previous) => (previous + 1) % loadingMessages.length);
    }, 1300);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, []);

  const percentage = Math.floor(progress);

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#080f0b] px-5 text-white">

      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/5 blur-[100px]" />

      <div className="relative z-10 w-full max-w-sm text-center">

        {/* Animated logo */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-3xl bg-lime-400/10" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-lime-300/30 bg-lime-400 text-5xl font-black text-black shadow-2xl shadow-lime-400/20">
            ↗
          </div>
        </div>

        {/* Brand */}
        <h1 className="mt-8 text-3xl font-black tracking-[5px]">
          TRADE<span className="text-lime-400">X</span>
        </h1>

        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[4px] text-gray-500">
          Smart Trading Platform
        </p>

        {/* Loading message */}
        <p className="mt-10 min-h-5 text-sm text-gray-400 transition-all duration-500">
          {loadingMessages[messageIndex]}
        </p>

        {/* Percentage */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Loading
          </span>

          <span className="text-2xl font-black tabular-nums text-lime-400">
            {percentage}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#26342b]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-lime-500 to-lime-300 transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading dots */}
        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="h-2 w-2 animate-bounce rounded-full bg-lime-400"
              style={{ animationDelay: `${dot * 150}ms` }}
            />
          ))}
        </div>

        {/* Footer */}
        <p className="mt-8 text-[10px] uppercase tracking-[3px] text-gray-600">
          Secure · Fast · Intelligent
        </p>

        <p className="mt-3 text-[10px] text-gray-700">
          © 2026 TradeX
        </p>
      </div>
    </div>
  );
}
