
import { news } from "../data/stocks";

export default function MarketNews() {
  return (
    <section className="bg-[#080f0b] px-6 py-20 text-white">
      <div className="mx-auto max-w-full">

        {/* Section heading */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-[3px] text-lime-400">
              Stay Informed
            </span>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Market News & Insights
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Stories and updates worth your attention.
            </p>
          </div>

          <div className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs font-semibold text-lime-400">
            ✦ Latest Insights
          </div>
        </div>

        {/* News cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item, index) => (
            <article
              key={item.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111c15] p-6 transition duration-300 hover:-translate-y-2 hover:border-lime-400/40 hover:shadow-xl hover:shadow-lime-400/5"
            >
              {/* Decorative top section */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10 text-2xl text-lime-400">
                  {["▤", "↗", "◈", "◎", "◆", "▣"][index % 6]}
                </div>

                <span className="text-xs text-gray-500">
                  NEWS {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Category */}
              <span className="mb-3 text-[11px] font-bold uppercase tracking-[2px] text-lime-400">
                {item.category}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold leading-snug transition group-hover:text-lime-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-4 flex-1 text-sm leading-7 text-gray-400">
                {item.description}
              </p>

              {/* Footer */}
              <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-lime-400">◷</span>
                  {item.time}
                </span>

                <span className="text-sm font-bold text-lime-400 transition group-hover:translate-x-1">
                  Read more →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-gray-500">
            Stay updated. Think smart. Invest wisely.
          </p>
        </div>

      </div>
    </section>
  );
}
