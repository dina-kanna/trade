
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Markets", href: "#markets" },
  { name: "Stocks", href: "#stocks" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Watchlist", href: "#watchlist" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("tradexUser") || "null");
  } catch {
    user = null;
  }

  function logout() {
    localStorage.removeItem("tradexUser");
    setMenuOpen(false);
    navigate("/login");
  }

  function handleNavigation(path) {
    setMenuOpen(false);
    navigate(path);
  }

  return (
    <>
      {/* Fixed Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-[#0b100e]/95 shadow-lg shadow-black/10 backdrop-blur-xl">
        <nav className="mx-auto flex h-[72px] max-w-full items-center justify-between px-5 lg:px-8">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex shrink-0 items-center gap-2"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 text-xl font-bold text-black shadow-lg shadow-lime-400/10">
              ↗
            </span>

            <span className="text-2xl font-extrabold tracking-tight text-white">
              TRADE<span className="text-lime-400">X</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-400 transition duration-200 hover:text-lime-400"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Authentication */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-lime-400 hover:text-lime-400"
                >
                  My Profile
                </button>

                <button
                  onClick={logout}
                  className="rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-lime-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-lime-400 hover:text-lime-400"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-lime-300 hover:shadow-lg hover:shadow-lime-400/10"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-2xl text-white transition hover:border-lime-400 hover:text-lime-400 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`overflow-hidden border-t border-white/10 bg-[#111a15] transition-all duration-300 md:hidden ${
            menuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 border-t-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-5 px-5 py-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-300 transition hover:translate-x-1 hover:text-lime-400"
              >
                {link.name}
              </a>
            ))}

            <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
              {user ? (
                <>
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="rounded-lg border border-white/20 py-3 font-semibold text-white transition hover:border-lime-400 hover:text-lime-400"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={logout}
                    className="rounded-lg bg-lime-400 py-3 font-bold text-black transition hover:bg-lime-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="rounded-lg border border-white/20 py-3 font-semibold text-white transition hover:border-lime-400 hover:text-lime-400"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => handleNavigation("/signup")}
                    className="rounded-lg bg-lime-400 py-3 font-bold text-black transition hover:bg-lime-300"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Keeps page content below the fixed navbar */}
      <div className="h-[72px]" />
    </>
  );
}
