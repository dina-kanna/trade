
import { useEffect, useMemo, useState } from "react";
import { stocks, formatCurrency } from "../data/stocks";

export default function StockTable({ onTrade, onAddWatchlist }) {
  const [filter, setFilter] = useState("all");
  const [liveStocks, setLiveStocks] = useState(() =>
    stocks.map((stock) => ({ ...stock }))
  );
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulated live market updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStocks((previousStocks) =>
        previousStocks.map((stock) => {
          // Small random price movement
          const movement = (Math.random() - 0.49) * 0.18;

          const newPrice = Math.max(
            0.01,
            stock.price * (1 + movement / 100)
          );

          const newChange = Number(
            (stock.change + movement).toFixed(2)
          );

          return {
            ...stock,
            price: Number(newPrice.toFixed(2)),
            change: newChange,
          };
        })
      );

      setLastUpdated(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Filter stocks
  const filteredStocks = useMemo(() => {
    return liveStocks.filter((stock) => {
      if (filter === "gainers") return stock.change > 0;
      if (filter === "losers") return stock.change < 0;
      return true;
    });
  }, [liveStocks, filter]);

  const filters = ["all", "gainers", "losers"];

  return (
    <section
      id="stocks"
      className="bg-[#080f0b] px-5 py-20 text-white md:px-8"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* Heading */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-[3px] text-lime-400">
              Find Your Next Move
            </span>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Trending Stocks
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Track popular stocks and their latest simulated movements.
            </p>
          </div>

          <a
            href="#watchlist"
            className="font-semibold text-lime-400 transition hover:text-lime-300"
          >
            Your Watchlist →
          </a>
        </div>

        {/* Table panel */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111c15] shadow-xl">

          {/* Table header and filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-5">
            <div>
              <h3 className="text-lg font-bold">
                Top Market Movers
              </h3>

              <div className="mt-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400">
                  Live simulation
                </span>

                <span className="text-[10px] text-gray-500">
                  Updated {lastUpdated.toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 rounded-xl bg-black/20 p-1">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold capitalize transition ${
                    filter === item
                      ? "bg-lime-400 text-[#101a0e]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Responsive table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-5">Company</th>
                  <th className="px-6 py-5">Price</th>
                  <th className="px-6 py-5">Change</th>
                  <th className="px-6 py-5">Market Cap</th>
                  <th className="px-6 py-5">Sector</th>
                  <th className="px-6 py-5">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStocks.map((stock) => {
                  const positive = stock.change >= 0;

                  return (
                    <tr
                      key={stock.symbol}
                      className="border-b border-white/5 transition duration-200 hover:bg-lime-400/[0.03]"
                    >
                      {/* Company */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-lime-400/20 bg-lime-400/10 font-black text-lime-400">
                            {stock.logo || stock.symbol[0]}
                          </div>

                          <div>
                            <p className="font-bold text-white">
                              {stock.symbol}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {stock.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-5">
                        <span className="font-bold text-white">
                          {formatCurrency(stock.price)}
                        </span>

                        <span className="mt-1 block text-[10px] text-gray-500">
                          INR
                        </span>
                      </td>

                      {/* Change */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold ${
                            positive
                              ? "bg-lime-400/10 text-lime-400"
                              : "bg-red-400/10 text-red-400"
                          }`}
                        >
                          {positive ? "↗ +" : "↘ "}
                          {stock.change.toFixed(2)}%
                        </span>
                      </td>

                      {/* Market cap */}
                      <td className="px-6 py-5 text-sm text-gray-300">
                        {stock.marketCap || "—"}
                      </td>

                      {/* Sector */}
                      <td className="px-6 py-5 text-sm text-gray-400">
                        {stock.sector || "Equity"}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              onTrade?.(stock.symbol, "buy")
                            }
                            className="rounded-lg bg-lime-400 px-4 py-2 text-xs font-bold text-[#101a0e] transition hover:bg-lime-300"
                          >
                            Buy
                          </button>

                          <button
                            onClick={() =>
                              onTrade?.(stock.symbol, "sell")
                            }
                            className="rounded-lg border border-white/10 px-4 py-2 text-xs font-bold text-gray-300 transition hover:border-red-400 hover:text-red-400"
                          >
                            Sell
                          </button>

                          <button
                            onClick={() =>
                              onAddWatchlist?.(stock.symbol)
                            }
                            title="Add to watchlist"
                            aria-label={`Add ${stock.symbol} to watchlist`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-lg text-gray-400 transition hover:border-yellow-400 hover:text-yellow-400"
                          >
                            ☆
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Empty state */}
            {filteredStocks.length === 0 && (
              <div className="p-10 text-center">
                <p className="text-sm font-semibold text-gray-300">
                  No stocks found.
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  Try selecting another market filter.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 px-6 py-4 text-xs text-gray-500">
            <span>
              Showing {filteredStocks.length} of {liveStocks.length} stocks
            </span>

            <span>
              Dummy market data · Updates every 3 seconds
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
