
import { useState } from "react";
import { stocks, formatCurrency } from "../data/stocks";

export default function Watchlist({
  watchlist = [],
  onAdd,
  onRemove,
}) {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const symbol = ticker.trim().toUpperCase();

    if (!symbol) return;

    const stock = stocks.find(
      (item) => item.symbol === symbol
    );

    if (!stock) {
      setError("Stock not found. Please enter a valid ticker.");
      return;
    }

    if (watchlist.includes(symbol)) {
      setError("This stock is already in your watchlist.");
      return;
    }

    onAdd?.(symbol);
    setTicker("");
    setError("");
  }

  const watchedStocks = watchlist
    .map((symbol) =>
      stocks.find((stock) => stock.symbol === symbol)
    )
    .filter(Boolean);

  return (
    <section
      id="watchlist"
      className="bg-[#080f0b] px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-full">

        {/* Heading */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-[3px] text-lime-400">
            Keep An Eye On It
          </span>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Your Watchlist
          </h2>

          <p className="mt-3 text-sm text-gray-400">
            Track stocks you are interested in.
          </p>
        </div>

        {/* Watchlist panel */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111c15] shadow-xl">

          {/* Panel header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-6">
            <div>
              <h3 className="text-lg font-bold">
                My Watchlist
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {watchedStocks.length} stocks tracked
              </p>
            </div>

            <span className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs font-bold text-lime-400">
              {watchedStocks.length} / {stocks.length}
            </span>
          </div>

          {/* Empty state */}
          {watchedStocks.length === 0 && (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-400/10 text-3xl text-lime-400">
                ☆
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Your watchlist is empty
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Add your favourite stocks to track their performance.
              </p>
            </div>
          )}

          {/* Stock rows */}
          <div>
            {watchedStocks.map((stock) => {
              const positive = stock.change >= 0;

              return (
                <div
                  key={stock.symbol}
                  className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 px-6 py-5 transition hover:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-lime-400/20 bg-lime-400/10 font-black text-lime-400">
                      {stock.logo || stock.symbol[0]}
                    </div>

                    <div>
                      <p className="font-bold">
                        {stock.symbol}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {stock.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-bold">
                        {formatCurrency(stock.price)}
                      </p>

                      <p
                        className={`mt-1 text-xs font-semibold ${
                          positive
                            ? "text-lime-400"
                            : "text-red-400"
                        }`}
                      >
                        {positive ? "↗ +" : "↘ "}
                        {stock.change.toFixed(2)}%
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemove?.(stock.symbol)}
                      aria-label={`Remove ${stock.symbol}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-lg text-gray-400 transition hover:border-red-400 hover:bg-red-400/10 hover:text-red-400"
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add stock form */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-white/10 bg-black/10 p-6"
          >
            <label
              htmlFor="stock-ticker"
              className="mb-3 block text-sm font-semibold text-gray-300"
            >
              Add a stock to your watchlist
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="stock-ticker"
                type="text"
                value={ticker}
                onChange={(event) => {
                  setTicker(event.target.value);
                  setError("");
                }}
                placeholder="Enter ticker (e.g. INFY)"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#080f0b] px-5 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-lime-400"
              />

              <button
                type="submit"
                className="rounded-xl bg-lime-400 px-7 py-3 text-sm font-bold text-[#101a0e] transition hover:bg-lime-300"
              >
                + Add Stock
              </button>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-400">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
