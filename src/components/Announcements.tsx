import { useState } from "react";
import { ArrowRight, Bell, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { ANNOUNCEMENTS } from "../data/sgcData";

export default function Announcements() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((curr) => (curr === 0 ? ANNOUNCEMENTS.length - 1 : curr - 1));
  };

  const next = () => {
    setActiveIndex((curr) => (curr === ANNOUNCEMENTS.length - 1 ? 0 : curr + 1));
  };

  const current = ANNOUNCEMENTS[activeIndex];

  return (
    <section id="announcements" className="py-24 relative bg-[#FFFDF7] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200/80 text-xs font-semibold mb-3">
              <Bell size={13} className="text-neutral-600" />
              CELL CIRCULARS &amp; NOTICES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
              Important Announcements
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-xl">
              Stay up-to-date with flagship events, committee expansions, and academic initiatives from SGC.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="p-2 rounded-xl bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors cursor-pointer"
              aria-label="Previous announcement"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="text-xs font-mono font-medium text-neutral-700 px-3 py-1.5 rounded-xl bg-white border border-neutral-200 shadow-xs">
              {activeIndex + 1} / {ANNOUNCEMENTS.length}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-xl bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors cursor-pointer"
              aria-label="Next announcement"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Featured Announcement Card */}
        <div className="relative rounded-2xl overflow-hidden border border-neutral-200/80 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
            {/* Visual/Image Left */}
            <div className="lg:col-span-5 relative bg-neutral-50 border-b lg:border-b-0 lg:border-r border-neutral-200/80 p-6 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200/80 text-emerald-800 mb-4">
                  <Sparkles size={13} />
                  {current.tag}
                </span>

                <div className="rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-xs h-56">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs font-medium text-neutral-500">
                <span>Verified Official Notice</span>
                <span className="font-mono">Circular #{current.id}</span>
              </div>
            </div>

            {/* Content Right */}
            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between bg-white">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight mb-4">
                  {current.title}
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                  {current.content}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
                {current.link ? (
                  <a
                    href={current.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs shadow-sm transition-all"
                  >
                    <span>{current.linkText || "View Full Details"}</span>
                    <ArrowRight size={14} />
                  </a>
                ) : (
                  <span className="text-xs font-medium text-neutral-500">
                    Notice in effect for all registered members.
                  </span>
                )}

                {/* Dot pagination indicator */}
                <div className="flex items-center gap-1.5">
                  {ANNOUNCEMENTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeIndex === i ? "w-6 bg-neutral-900" : "w-2 bg-neutral-200"
                      }`}
                      aria-label={`Jump to announcement ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
