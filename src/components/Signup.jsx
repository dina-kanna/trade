
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUser = JSON.parse(
      localStorage.getItem("tradexUser") || "null"
    );

    if (existingUser?.email === form.email) {
      setError("This email is already registered.");
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      joined: new Date().toLocaleDateString(),
    };

    localStorage.setItem("tradexUser", JSON.stringify(newUser));

    // Demo only. Do not store real passwords this way.
    sessionStorage.setItem("tradexDemoPassword", form.password);

    navigate("/profile");
    window.location.reload();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080f0b] px-5 py-12 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111c15] p-8 shadow-2xl md:p-10">

        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-2xl font-black">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 text-black">
            ↗
          </span>
          TRADE<span className="text-lime-400">X</span>
        </Link>

        <h1 className="text-3xl font-black">Create Account</h1>
        <p className="mt-2 text-sm text-gray-400">
          Join TradeX and explore your investment journey.
        </p>

        {error && (
          <p className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={handleSignup} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-lime-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-lime-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="Create a password"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-lime-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-lime-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-lime-400 py-3.5 font-bold text-black transition hover:bg-lime-300"
          >
            Create My Account →
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-lime-400 hover:underline">
            Login
          </Link>
        </p>

        <Link to="/" className="mt-6 block text-center text-xs text-gray-500 hover:text-lime-400">
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}
