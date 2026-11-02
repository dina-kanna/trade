
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DEMO_EMAIL = "demo@tradex.com";
const DEMO_PASSWORD = "TradeX@123";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    // Demo account
    if (
      normalizedEmail === DEMO_EMAIL &&
      password === DEMO_PASSWORD
    ) {
      const demoUser = {
        name: "Demo User",
        email: DEMO_EMAIL,
        isDemo: true,
      };

      localStorage.setItem("tradexUser", JSON.stringify(demoUser));
      navigate("/profile");
      return;
    }

    // Demo-only registered account check
    try {
      const savedUser = JSON.parse(
        localStorage.getItem("tradexUser") || "null"
      );

      if (
        savedUser &&
        savedUser.email?.toLowerCase() === normalizedEmail &&
        savedUser.password === password
      ) {
        navigate("/profile");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch {
      setError("Unable to sign in. Please try again.");
    }
  }

  function fillDemoCredentials() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080f0b] px-5 py-12 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111c15] p-8 shadow-2xl md:p-10">

        <Link to="/" className="mb-9 inline-flex items-center gap-2 text-2xl font-black">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 text-xl text-black">
            ↗
          </span>
          TRADE<span className="text-lime-400">X</span>
        </Link>

        <h1 className="text-3xl font-black">Welcome Back!</h1>
        <p className="mt-2 text-sm text-gray-400">
          Login to access your trading dashboard.
        </p>

        <div className="mt-6 rounded-xl border border-lime-400/20 bg-lime-400/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-lime-400">
              Demo Account
            </span>
            <span className="rounded-full bg-lime-400/10 px-2 py-1 text-xs text-lime-400">
              TEST LOGIN
            </span>
          </div>

          <p className="text-sm text-gray-300">
            Email: <strong className="text-white">{DEMO_EMAIL}</strong>
          </p>
          <p className="mt-1 text-sm text-gray-300">
            Password: <strong className="text-white">{DEMO_PASSWORD}</strong>
          </p>

          <button
            type="button"
            onClick={fillDemoCredentials}
            className="mt-4 w-full rounded-lg bg-lime-400 py-2.5 text-sm font-bold text-black transition hover:bg-lime-300"
          >
            Fill Demo Credentials
          </button>
        </div>

        {error && (
          <p className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="mt-7 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none transition focus:border-lime-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 pr-20 outline-none transition focus:border-lime-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-lime-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-lime-400 py-3.5 font-bold text-black transition hover:-translate-y-0.5 hover:bg-lime-300"
          >
            Login to TradeX →
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold text-lime-400 hover:underline">
            Sign Up
          </Link>
        </p>

        <Link
          to="/"
          className="mt-6 block text-center text-xs text-gray-500 transition hover:text-lime-400"
        >
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}
