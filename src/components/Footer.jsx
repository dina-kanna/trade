
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060c08] px-6 pb-6 pt-16 text-white">

      <div className="mx-auto max-w-full">

        {/* Footer content */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-3 text-2xl font-black tracking-tight"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 text-xl text-black">
                ↗
              </span>

 <span className="text-2xl font-extrabold text-white">
            TRADE<span className="text-lime-400">X</span>
          </span>
                      </a>

            <p className="mt-6 max-w-xs text-sm leading-7 text-gray-400">
              A smarter view of the markets. Learn, explore and
              practice with our illustrative trading dashboard.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {[
                ["X", "https://x.com/"],
                ["in", "https://linkedin.com/"],
                ["f", "https://facebook.com/"],
                ["◎", "https://instagram.com/"],
              ].map(([label, url]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-gray-400 transition hover:border-lime-400 hover:bg-lime-400 hover:text-black"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-lime-400">
              Explore
            </h3>

            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <a href="#home" className="transition hover:text-lime-400">Home</a>
              <a href="#markets" className="transition hover:text-lime-400">Markets</a>
              <a href="#stocks" className="transition hover:text-lime-400">Stocks</a>
              <a href="#portfolio" className="transition hover:text-lime-400">Portfolio</a>
              <a href="#watchlist" className="transition hover:text-lime-400">Watchlist</a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-lime-400">
              Company
            </h3>

            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <a href="#about" className="transition hover:text-lime-400">About TradeX</a>
              <a href="#about" className="transition hover:text-lime-400">Our Features</a>
              <a href="#about" className="transition hover:text-lime-400">Our Mission</a>
              <a href="#about" className="transition hover:text-lime-400">Contact</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-lime-400">
              Get In Touch
            </h3>

            <div className="space-y-5 text-sm text-gray-400">
              <div>
                <p className="mb-1 text-xs text-gray-600">Email us</p>
                <a
                  href="mailto:hello@tradex.example"
                  className="transition hover:text-lime-400"
                >
                  hello@tradex.example
                </a>
              </div>

              <div>
                <p className="mb-1 text-xs text-gray-600">Business hours</p>
                <p>Monday – Friday</p>
                <p>9:00 – 18:00 IST</p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-xs text-lime-400">
                <span className="h-2 w-2 rounded-full bg-lime-400" />
                Demo platform
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="my-12 border-t border-white/10" />

        {/* Bottom footer */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-gray-500 md:flex-row md:text-left">

          <p>
            © {new Date().getFullYear()} TradeX. All rights reserved.
          </p>

          <p className="max-w-xl leading-6">
            Demo interface · Illustrative market data · Not investment advice.
          </p>

          <a
            href="#home"
            className="font-semibold text-lime-400 transition hover:text-lime-300"
          >
            Back to top ↑
          </a>

        </div>

      </div>
    </footer>
  );
}
