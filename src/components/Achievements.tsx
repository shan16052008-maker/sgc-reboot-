import { useState } from "react";
import { Trophy, Award, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ACHIEVEMENTS } from "../data/sgcData";

export default function Achievements() {
  const [filter, setFilter] = useState<string>("ALL");

  const categories = ["ALL", "HACKATHON", "PLACEMENT", "PROJECT", "STATE HONOR"];

  const filtered = ACHIEVEMENTS.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "HACKATHON") return item.badge.toLowerCase().includes("hack") || item.badge.toLowerCase().includes("winner");
    if (filter === "PLACEMENT") return item.badge.toLowerCase().includes("placement") || item.badge.toLowerCase().includes("lpa");
    if (filter === "PROJECT") return item.badge.toLowerCase().includes("prize") || item.badge.toLowerCase().includes("ibm");
    if (filter === "STATE HONOR") return item.badge.toLowerCase().includes("state");
    return true;
  });

  return (
    <section id="achievements" className="py-24 relative bg-[#FFFDF7] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-3">
            <Trophy size={13} className="text-emerald-700" />
            HALL OF EXCELLENCE &amp; PROOFS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Our Proud Achievements
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Real proofs of student capability. Explore verified victories across national hackathons,
            top placement salary packages, and state awards—with direct links to original posts.
          </p>

          {/* Filter Pill Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                    : "bg-white hover:bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:text-neutral-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo container */}
                <div className="relative h-52 w-full bg-neutral-100 border-b border-neutral-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.heading}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/80 text-xs font-semibold text-neutral-900 shadow-sm">
                      <Award size={13} className="text-amber-600" />
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-snug group-hover:text-amber-900 transition-colors">
                    {item.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-4 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  Verified Proof
                </span>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 text-xs font-semibold text-neutral-800 transition-all"
                >
                  <span>Read Post</span>
                  <ArrowUpRight size={13} className="text-neutral-400" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
