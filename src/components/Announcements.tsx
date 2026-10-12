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

        {/* Featured Announcement Card - Cinematic Full Poster Layout matching official SGC */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-black/80 bg-neutral-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-white">
          <div className="relative min-h-[380px] sm:min-h-[420px] flex flex-col justify-between overflow-hidden">
            {/* Full-bleed background poster image */}
            <div className="absolute inset-0 z-0">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.45] contrast-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/logo.png";
                  target.className = "w-full h-full object-contain p-12 opacity-30";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            {/* Top metadata row */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-neutral-950 border border-amber-300 shadow-sm">
                <Sparkles size={13} />
                {current.tag}
              </span>

              <div className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-neutral-300 border border-white/20">
                Circular #{current.id}
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-4">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {current.title}
              </h3>
              <p className="text-neutral-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                {current.content}
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/15">
                {current.link ? (
                  <a
                    href={current.link}
                    target={current.link.startsWith("http") ? "_blank" : undefined}
                    rel={current.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 cursor-pointer"
                  >
                    <span>{current.linkText || "View Details"}</span>
                    <ArrowRight size={15} />
                  </a>
                ) : (
                  <span className="text-xs text-neutral-400 font-mono">
                    Official Announcement • Student Guidance Cell
                  </span>
                )}

                {/* Dot pagination indicator */}
                <div className="flex items-center gap-2">
                  {ANNOUNCEMENTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        activeIndex === i ? "w-8 bg-amber-400" : "w-2.5 bg-white/40 hover:bg-white/70"
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
