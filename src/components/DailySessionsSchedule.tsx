import { useState } from "react";
import { Calendar, Clock, Search, CheckCircle2, Image as ImageIcon, X } from "lucide-react";
import { SCHEDULE_WEEKS } from "../data/sgcData";

export default function DailySessionsSchedule() {
  const [selectedWeek, setSelectedWeek] = useState<number>(2);
  const [domainFilter, setDomainFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const domains = [
    "ALL",
    "Generative AI",
    "Soft Skills",
    "Financial Literacy",
    "Critical Thinking",
    "Orientation",
  ];

  const currentWeekData = SCHEDULE_WEEKS.find((w) => w.weekNumber === selectedWeek) || SCHEDULE_WEEKS[1];

  const filteredSessions = currentWeekData.sessions.filter((session) => {
    const matchesDomain =
      domainFilter === "ALL" ||
      session.domain.toLowerCase().includes(domainFilter.toLowerCase());

    const matchesSearch =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.handler.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.overview.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDomain && matchesSearch;
  });

  const getDomainBadge = (domain: string) => {
    switch (domain) {
      case "Artificial Intelligence":
        return "bg-emerald-100 text-emerald-950 border-emerald-300";
      case "Communication":
        return "bg-purple-100 text-purple-950 border-purple-300";
      case "Finance":
        return "bg-amber-100 text-amber-950 border-amber-300";
      case "Team Building":
        return "bg-sky-100 text-sky-950 border-sky-300";
      case "Orientation":
        return "bg-rose-100 text-rose-950 border-rose-300";
      case "Critical Thinking":
        return "bg-indigo-100 text-indigo-950 border-indigo-300";
      default:
        return "bg-neutral-100 text-neutral-900 border-neutral-300";
    }
  };

  return (
    <section id="daily-sessions" className="py-24 relative bg-gradient-to-b from-[#FFFDF7] via-sky-50/20 to-[#FFFDF7] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-50 to-blue-50 text-sky-900 border border-sky-200/80 text-xs font-bold mb-3 shadow-xs">
              <Calendar size={14} className="text-sky-600" />
              PEER-LED DAILY POWER SESSIONS &bull; 1:00 PM &ndash; 1:30 PM
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
              Interactive{" "}
              <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Daily Sessions Timetable
              </span>
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Conducted Monday to Friday at 1:00 PM in college lab pods. Authentic verified photos,
              hands-on speaker handlers, and actionable student takeaways.
            </p>
          </div>

          {/* Week Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl border border-neutral-200/90 shadow-sm self-start lg:self-auto">
            {SCHEDULE_WEEKS.map((w) => (
              <button
                key={w.weekNumber}
                onClick={() => setSelectedWeek(w.weekNumber)}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  selectedWeek === w.weekNumber
                    ? "bg-neutral-950 text-white shadow-md scale-[1.02]"
                    : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100"
                }`}
              >
                Week {w.weekNumber}
                {w.status === "Coming Soon" && (
                  <span className="ml-1 text-[9px] opacity-75 font-normal">
                    (Soon)
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Week Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-md mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md">
              W{currentWeekData.weekNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-2xl font-extrabold text-neutral-950">
                  {currentWeekData.weekTitle}
                </h3>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-950 border border-emerald-300 shadow-xs">
                  {currentWeekData.status}
                </span>
              </div>
              <span className="text-xs font-semibold text-neutral-600 mt-1 inline-block">
                📅 {currentWeekData.dateRange} &bull; Mon to Fri &bull; 1:00 PM &ndash; 1:30 PM IST
              </span>
            </div>
          </div>

          <div className="text-xs font-bold text-sky-900 bg-sky-50 px-4 py-2.5 rounded-xl border border-sky-200 self-start md:self-auto shadow-xs">
            📍 Location: SGC Innovation Pods, CAHCET Campus
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-3 sm:p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setDomainFilter(dom)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  domainFilter === dom
                    ? "bg-neutral-950 text-white border-neutral-950 shadow-md scale-[1.02]"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200/80"
                }`}
              >
                {dom}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-3 text-sky-600" />
            <input
              type="text"
              placeholder="Search topic, speaker or handler..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-sky-400 focus:bg-white shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session, idx) => (
            <div
              key={session.id}
              className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-2xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border shadow-xs ${getDomainBadge(session.domain)}`}>
                    Day 0{idx + 1} &bull; {session.domain}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-neutral-600 flex items-center gap-1 bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200">
                    <Clock size={12} className="text-sky-600" />
                    {session.time}
                  </span>
                </div>

                {/* Session Photo with Lightbox Click */}
                {session.image && (
                  <div
                    onClick={() => setSelectedPhoto(session.image || null)}
                    className="relative h-48 rounded-2xl overflow-hidden mb-4 border border-neutral-200/80 bg-neutral-100 cursor-pointer group shadow-sm"
                    title="Click to expand high-res photo"
                  >
                    <img
                      src={session.image}
                      alt={session.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-neutral-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs backdrop-blur-xs">
                      <ImageIcon size={16} />
                      <span>Click to view full photo</span>
                    </div>
                  </div>
                )}

                <h4 className="text-base sm:text-lg font-extrabold text-neutral-950 mb-2 leading-snug group-hover:text-sky-900 transition-colors">
                  {session.title}
                </h4>

                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed mb-4">
                  {session.overview}
                </p>
              </div>

              {/* Footer info: Handler & status */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {session.handler.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-neutral-400">Speaker / Handler</div>
                    <div className="font-extrabold text-neutral-900 text-xs">{session.handler}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 shadow-xs">
                  <CheckCircle2 size={12} className="text-emerald-700" />
                  <span>{session.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl border border-neutral-300 shadow-2xl overflow-hidden p-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-neutral-800 shadow-md hover:bg-white transition-all cursor-pointer"
                aria-label="Close photo preview"
              >
                <X size={18} />
              </button>
              <img
                src={selectedPhoto}
                alt="SGC Session Authentic Photo"
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              <div className="p-3 text-center text-xs font-medium text-neutral-600">
                Official SGC Classroom &amp; Workshop Photo Archive
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
