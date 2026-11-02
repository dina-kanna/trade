
import { useEffect, useState } from "react";
import { stocks, formatCurrency } from "../data/stocks";

export default function TradingPanel({
  selectedOrder,
  onReview,
  notify,
}) {
  const [side, setSide] = useState("buy");
  const [symbol, setSymbol] = useState(
    stocks[0]?.symbol || "RELIANCE"
  );
  const [quantity, setQuantity] = useState(10);
  const [orderType, setOrderType] = useState("Market order");
  const [limitPrice, setLimitPrice] = useState("");

  useEffect(() => {
    if (selectedOrder?.symbol) {
      setSymbol(selectedOrder.symbol);
      setSide(selectedOrder.side || "buy");
    }
  }, [selectedOrder]);

  const stock = stocks.find((item) => item.symbol === symbol);

  if (!stock) {
    return (
      <section className="bg-[#0b100e] px-5 py-16 text-center text-white">
        <p className="text-red-400">
          Stock data unavailable. Please check your stocks.js file.
        </p>
      </section>
    );
  }

  const validQuantity = Math.max(0, Number(quantity) || 0);

  const price =
    orderType === "Limit order" && Number(limitPrice) > 0
      ? Number(limitPrice)
      : stock.price;

  const subtotal = price * validQuantity;
  const fees = subtotal * 0.0015;

  const total =
    side === "buy" ? subtotal + fees : subtotal - fees;

  function handleSubmit(event) {
    event.preventDefault();

    if (validQuantity < 1) {
      notify?.("Please enter a valid quantity.");
      return;
    }

    if (orderType === "Limit order" && Number(limitPrice) <= 0) {
      notify?.("Please enter a valid limit price.");
      return;
    }

    onReview?.({
      symbol,
      side,
      quantity: validQuantity,
      price,
      total,
    });
  }

  return (
    <section
      id="trade"
      className="scroll-mt-24 bg-[#0b100e] px-4 py-16 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-full">

        {/* Heading */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[3px] text-lime-400">
              Take action
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Quick trade
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Practice an order in the demo environment.
            </p>
          </div>

          <span className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs font-semibold text-lime-400">
            ● Simulation only
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Trading Form */}
          <div className="rounded-2xl border border-white/10 bg-[#111a15] p-5 shadow-xl sm:p-7">

            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold">
                Place an order
              </h3>

              <span className="rounded-md bg-lime-400/10 px-3 py-1 text-xs font-bold text-lime-400">
                DEMO
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Buy / Sell */}
              <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#0b100e] p-1.5">
                <button
                  type="button"
                  onClick={() => setSide("buy")}
                  className={`rounded-lg py-3 text-sm font-bold transition ${
                    side === "buy"
                      ? "bg-lime-400 text-black shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Buy
                </button>

                <button
                  type="button"
                  onClick={() => setSide("sell")}
                  className={`rounded-lg py-3 text-sm font-bold transition ${
                    side === "sell"
                      ? "bg-red-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Stock */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Select stock
                </label>

                <select
                  value={symbol}
                  onChange={(event) => setSymbol(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0b100e] px-4 py-3.5 text-sm text-white outline-none transition focus:border-lime-400"
                >
                  {stocks.map((item) => (
                    <option key={item.symbol} value={item.symbol}>
                      {item.symbol} — {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Quantity
                </label>

                <input
                  type="number"
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0b100e] px-4 py-3.5 text-sm text-white outline-none transition focus:border-lime-400"
                  placeholder="Enter quantity"
                />
              </div>

              {/* Order Type */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Order type
                </label>

                <select
                  value={orderType}
                  onChange={(event) =>
                    setOrderType(event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0b100e] px-4 py-3.5 text-sm text-white outline-none transition focus:border-lime-400"
                >
                  <option>Market order</option>
                  <option>Limit order</option>
                </select>
              </div>

              {/* Limit Price */}
              {orderType === "Limit order" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Limit price (₹)
                  </label>

                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={limitPrice}
                    onChange={(event) =>
                      setLimitPrice(event.target.value)
                    }
                    placeholder={String(stock.price)}
                    className="w-full rounded-xl border border-white/10 bg-[#0b100e] px-4 py-3.5 text-sm text-white outline-none transition focus:border-lime-400"
                  />
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className={`w-full rounded-xl py-4 text-sm font-extrabold transition hover:-translate-y-0.5 hover:shadow-lg ${
                  side === "buy"
                    ? "bg-lime-400 text-black hover:bg-lime-300 hover:shadow-lime-400/20"
                    : "bg-red-500 text-white hover:bg-red-400 hover:shadow-red-500/20"
                }`}
              >
                Review {side} order →
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl border border-white/10 bg-[#111a15] p-5 shadow-xl sm:p-7">

            <h3 className="mb-6 text-xl font-bold">
              Order summary
            </h3>

            <div className="mb-6 rounded-xl border border-white/5 bg-[#0b100e] p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Selected stock
              </p>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-2xl font-extrabold">
                    {stock.symbol}
                  </h4>
                  <p className="mt-1 text-sm text-gray-400">
                    {stock.name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-lime-400">
                    {formatCurrency(stock.price)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Current price
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-400">Order type</span>
                <strong>{orderType}</strong>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-400">Execution price</span>
                <strong>{formatCurrency(price)}</strong>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-400">Quantity</span>
                <strong>{validQuantity} shares</strong>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-400">Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-400">
                  Estimated charges
                </span>
                <strong>{formatCurrency(fees)}</strong>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-400">Order side</span>

                <strong
                  className={
                    side === "buy"
                      ? "text-lime-400"
                      : "text-red-400"
                  }
                >
                  {side.toUpperCase()}
                </strong>
              </div>

              <div className="border-t border-white/10 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-gray-300">
                    Estimated total
                  </span>

                  <strong className="text-2xl font-extrabold text-lime-400">
                    {formatCurrency(total)}
                  </strong>
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-xl border border-yellow-400/10 bg-yellow-400/5 p-4">
              <p className="text-xs leading-6 text-gray-400">
                Prices and charges are illustrative. This demo
                does not connect to an exchange or execute real
                trades. No real money is involved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
