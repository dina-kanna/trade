
import { useNavigate } from "react-router-dom";

const demoStats = [
  {
    label: "Available Balance",
    value: "₹2,45,680.00",
    change: "Ready to invest",
  },
  {
    label: "Portfolio Value",
    value: "₹12,84,560.80",
    change: "+18.39% overall",
  },
  {
    label: "Total Investment",
    value: "₹10,85,000.00",
    change: "Across 8 holdings",
  },
  {
    label: "Total Profit",
    value: "+₹1,99,560.80",
    change: "+18.39% returns",
  },
];

const recentActivity = [
  {
    name: "Reliance Industries",
    symbol: "RELIANCE",
    type: "BUY",
    quantity: "10 Shares",
    amount: "₹14,523.00",
    date: "02 Nov 2026",
    status: "Completed",
  },
  {
    name: "Tata Consultancy",
    symbol: "TCS",
    type: "BUY",
    quantity: "5 Shares",
    amount: "₹19,452.50",
    date: "01 Nov 2026",
    status: "Completed",
  },
  {
    name: "Infosys",
    symbol: "INFY",
    type: "SELL",
    quantity: "8 Shares",
    amount: "₹12,545.60",
    date: "30 Oct 2026",
    status: "Completed",
  },
];

const watchlist = [
  { symbol: "RELIANCE", price: "₹1,452.30", change: "+1.82%" },
  { symbol: "TCS", price: "₹3,890.50", change: "+0.74%" },
  { symbol: "INFY", price: "₹1,568.20", change: "+2.16%" },
];

export default function Profile() {
  const navigate = useNavigate();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("tradexUser") || "null");
  } catch {
    user = null;
  }

  function logout() {
    localStorage.removeItem("tradexUser");
    sessionStorage.removeItem("tradexDemoPassword");
    navigate("/login", { replace: true });
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080f0b] px-5 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111c15] p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-400/10 text-3xl text-lime-400">
            !
          </div>
          <h2 className="mt-5 text-2xl font-bold">
            Please Login First
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Login to access your TradeX account dashboard.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-7 rounded-xl bg-lime-400 px-7 py-3 font-bold text-black transition hover:bg-lime-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const name = user.name || "TradeX User";
  const email = user.email || "No email available";
  const initial = name.charAt(0).toUpperCase();

  return (
    <section className="min-h-screen bg-[#080f0b] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Top Navigation */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-2xl font-black"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 text-xl text-black">
              ↗
            </span>
            TRADE<span className="text-lime-400">X</span>
          </button>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/")}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition hover:border-lime-400 hover:text-lime-400"
            >
              Home
            </button>

            <button
              onClick={logout}
              className="rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
            >
              Logout ↗
            </button>
          </div>
        </div>

        {/* Welcome Header */}
        <div className="mb-9">
          <p className="text-xs font-bold uppercase tracking-[3px] text-lime-400">
            Account Dashboard
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            Welcome back, {name}!
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Here's an overview of your TradeX account and investments.
          </p>
        </div>

        {/* Profile and Account Status */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">

          {/* User Card */}
          <div className="rounded-3xl border border-white/10 bg-[#111c15] p-7">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-lime-400/20 bg-lime-400 text-3xl font-black text-black">
                {initial}
              </div>

              <div className="min-w-0">
                <h2 className="break-words text-xl font-bold">
                  {name}
                </h2>
                <p className="mt-1 break-all text-sm text-gray-400">
                  {email}
                </p>
                <span className="mt-2 inline-block rounded-full bg-lime-400/10 px-3 py-1 text-xs font-bold text-lime-400">
                  {user.isDemo ? "Demo Member" : "TradeX Member"}
                </span>
              </div>
            </div>

            <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-400">Account ID</span>
                <span className="font-semibold">TX-2026-001</span>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-400">Member Since</span>
                <span className="font-semibold">
                  {user.joined || "Nov 2026"}
                </span>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-400">Account Type</span>
                <span className="font-semibold">Individual</span>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-400">Account Status</span>
                <span className="font-semibold text-lime-400">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Account Verification */}
          <div className="rounded-3xl border border-white/10 bg-[#111c15] p-7 lg:col-span-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">
                  Account Overview
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  Your account information and verification status.
                </p>
              </div>

              <span className="rounded-full bg-lime-400/10 px-3 py-2 text-xs font-bold text-lime-400">
                ACTIVE
              </span>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-black/20 p-5">
                <p className="text-sm text-gray-400">Email Verification</p>
                <p className="mt-3 font-bold text-lime-400">
                  ✓ Demo Verified
                </p>
              </div>

              <div className="rounded-2xl bg-black/20 p-5">
                <p className="text-sm text-gray-400">KYC Status</p>
                <p className="mt-3 font-bold text-yellow-400">
                  Demo Only
                </p>
              </div>

              <div className="rounded-2xl bg-black/20 p-5">
                <p className="text-sm text-gray-400">Trading Account</p>
                <p className="mt-3 font-bold text-lime-400">
                  Simulation Active
                </p>
              </div>

              <div className="rounded-2xl bg-black/20 p-5">
                <p className="text-sm text-gray-400">Membership</p>
                <p className="mt-3 font-bold">
                  Standard Plan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Statistics */}
        <div className="mb-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold">Investment Summary</h2>
            <p className="mt-2 text-sm text-gray-400">
              Your portfolio performance at a glance.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {demoStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-[#111c15] p-6 transition hover:-translate-y-1 hover:border-lime-400/40"
              >
                <p className="text-sm text-gray-400">{stat.label}</p>
                <h3 className="mt-4 text-2xl font-black">
                  {stat.value}
                </h3>
                <p className="mt-2 text-xs font-semibold text-lime-400">
                  {stat.change}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trading Activity and Watchlist */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Recent Activity */}
          <div className="rounded-3xl border border-white/10 bg-[#111c15] p-6 lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <p className="mt-1 text-xs text-gray-400">
                  Your latest demo transactions.
                </p>
              </div>

              <span className="rounded-full bg-lime-400/10 px-3 py-2 text-xs text-lime-400">
                Demo History
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[570px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs text-gray-500">
                    <th className="pb-4 font-medium">STOCK</th>
                    <th className="pb-4 font-medium">TYPE</th>
                    <th className="pb-4 font-medium">QUANTITY</th>
                    <th className="pb-4 font-medium">AMOUNT</th>
                    <th className="pb-4 font-medium">STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {recentActivity.map((activity) => (
                    <tr
                      key={`${activity.symbol}-${activity.date}`}
                      className="border-b border-white/5"
                    >
                      <td className="py-5">
                        <p className="font-bold">{activity.symbol}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {activity.date}
                        </p>
                      </td>

                      <td className="py-5">
                        <span
                          className={
                            activity.type === "BUY"
                              ? "font-bold text-lime-400"
                              : "font-bold text-red-400"
                          }
                        >
                          {activity.type}
                        </span>
                      </td>

                      <td className="py-5 text-gray-300">
                        {activity.quantity}
                      </td>

                      <td className="py-5 font-semibold">
                        {activity.amount}
                      </td>

                      <td className="py-5">
                        <span className="rounded-full bg-lime-400/10 px-2 py-1 text-xs text-lime-400">
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              These are illustrative transactions, not actual executed orders.
            </p>
          </div>

          {/* Watchlist */}
          <div className="rounded-3xl border border-white/10 bg-[#111c15] p-6">
            <h2 className="text-xl font-bold">My Watchlist</h2>
            <p className="mt-1 text-xs text-gray-400">
              Stocks you are following.
            </p>

            <div className="mt-6 space-y-5">
              {watchlist.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between gap-3 border-b border-white/5 pb-4"
                >
                  <div>
                    <p className="font-bold">{stock.symbol}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {stock.price}
                    </p>
                  </div>

                  <span className="text-sm font-bold text-lime-400">
                    {stock.change}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-7 w-full rounded-xl border border-lime-400/30 py-3 text-sm font-bold text-lime-400 transition hover:bg-lime-400 hover:text-black"
            >
              Explore Stocks →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-r from-[#17251b] to-[#111c15] p-7">
          <h2 className="text-xl font-bold">Quick Actions</h2>
          <p className="mt-2 text-sm text-gray-400">
            Continue exploring your TradeX dashboard.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/")}
              className="rounded-xl bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
            >
              Dashboard ↗
            </button>

            <button
              onClick={() => navigate("/")}
              className="rounded-xl border border-white/10 px-6 py-3 font-semibold transition hover:border-lime-400 hover:text-lime-400"
            >
              Explore Markets
            </button>

            <button
              onClick={() => navigate("/")}
              className="rounded-xl border border-white/10 px-6 py-3 font-semibold transition hover:border-lime-400 hover:text-lime-400"
            >
              View Portfolio
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          © 2026 TradeX. All rights reserved.
          <p className="mt-2">
            Demo dashboard · Illustrative data · Not investment advice
          </p>
        </footer>
      </div>
    </section>
  );
}
