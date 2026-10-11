import { useState, useEffect, useRef } from "react";
import { 
  Search, X, Sparkles, Calendar, Users, Trophy, 
  ArrowRight, Bot, ExternalLink, Mail 
} from "lucide-react";
import { 
  ALL_ALUMNI_RECORDS, 
  SCHEDULE_WEEKS, 
  ACHIEVEMENTS, 
  TEAM_MEMBERS 
} from "../data/sgcData";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChatbot?: () => void;
  onOpenPortal?: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenChatbot, onOpenPortal }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingAlumni = ALL_ALUMNI_RECORDS.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.company.toLowerCase().includes(q) ||
      a.currentPosition.toLowerCase().includes(q) ||
      a.department.toLowerCase().includes(q)
  ).slice(0, 4);

  const allSessions = SCHEDULE_WEEKS.flatMap((w) =>
    w.sessions.map((s) => ({ ...s, weekNumber: w.weekNumber }))
  );
  const matchingSessions = allSessions.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.handler.toLowerCase().includes(q) ||
      s.domain.toLowerCase().includes(q) ||
      s.overview.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchingAchievements = ACHIEVEMENTS.filter(
    (a) =>
      a.heading.toLowerCase().includes(q) ||
      a.badge.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchingTeam = TEAM_MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.department.toLowerCase().includes(q)
  ).slice(0, 3);

  const hasResults =
    matchingAlumni.length > 0 ||
    matchingSessions.length > 0 ||
    matchingAchievements.length > 0 ||
    matchingTeam.length > 0;

  const handleSelectLink = (href: string) => {
    onClose();
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-2xl rounded-2xl bg-white border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar with SGC Logo */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center gap-3 bg-neutral-50/50">
          <div className="w-6 h-6 rounded-md bg-white border border-neutral-200 p-0.5 shadow-xs flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="SGC Logo" className="w-full h-full object-contain" />
          </div>
          <Search size={17} className="text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search alumni (Zoho, TCS), daily sessions, hackathons, team..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-neutral-900 placeholder-neutral-400 text-sm outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
            >
              <X size={15} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-white border border-neutral-200 text-[10px] font-mono text-neutral-500 shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs bg-white">
          {!q && (
            <div className="space-y-4">
              <div>
                <h4 className="text-[11px] font-mono font-medium uppercase text-neutral-400 tracking-wider mb-2.5">
                  Navigation &amp; Quick Commands
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenChatbot?.();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center font-bold">
                        <Bot size={15} />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 text-xs">
                          Ask ZealBot (AI Guide)
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Personalized answers on SGC
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-neutral-400" />
                  </button>

                  <button
                    onClick={() => handleSelectLink("#daily-sessions")}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 flex items-center justify-center font-bold">
                        <Calendar size={15} />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 text-xs">
                          Daily Sessions Timetable
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Week 1 &amp; 2 Photos &amp; Overviews
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-neutral-400" />
                  </button>

                  <button
                    onClick={() => handleSelectLink("#team")}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold">
                        <Users size={15} />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 text-xs">
                          41 Verified Alumni &amp; Team
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Zoho, TCS, Honeywell, Startups
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-neutral-400" />
                  </button>

                  <button
                    onClick={() => handleSelectLink("#memories")}
                    className="flex items-center justify-between p-3 rounded-xl bg-rose-50/50 hover:bg-rose-50 border border-rose-200/70 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-900 border border-rose-200 flex items-center justify-center font-bold">
                        <Sparkles size={15} />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 text-xs">
                          SGC Memories (Confidential)
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Brotherhood, Hackathons, Dinners &amp; Milestones
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-neutral-400" />
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenPortal?.();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 flex items-center justify-center font-bold">
                        <ExternalLink size={14} />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 text-xs">
                          SGC Member Portal
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Student Authentication &amp; Access
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-neutral-400" />
                  </button>

                  <a
                    href="#contact"
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center font-bold">
                        <Mail size={14} />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 text-xs">
                          Contact &amp; Council Headquarters
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          CAHCET Main Block &bull; Ayaz (+91 99439 46886) &bull; Aasif
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-neutral-400" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {q && (
            <>
              {matchingAlumni.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-neutral-400 uppercase font-semibold flex items-center gap-1.5">
                      <Users size={12} />
                      Alumni Matches ({matchingAlumni.length})
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingAlumni.map((a, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectLink("#team")}
                        className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="font-semibold text-neutral-900 text-xs">{a.name}</div>
                          <div className="text-[11px] text-neutral-500">
                            {a.currentPosition} &bull; {a.department}
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white border border-neutral-200 text-neutral-800">
                          {a.company}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingSessions.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-neutral-400 uppercase font-semibold flex items-center gap-1.5">
                      <Calendar size={12} />
                      Daily Sessions ({matchingSessions.length})
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingSessions.map((s, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectLink("#daily-sessions")}
                        className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="font-semibold text-neutral-900 text-xs">{s.title}</div>
                          <div className="text-[11px] text-neutral-500">
                            Handler: <span className="text-neutral-900 font-medium">{s.handler}</span> &bull; {s.domain}
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-white border border-neutral-200 text-neutral-700">
                          Week {s.weekNumber} &bull; {s.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingAchievements.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-neutral-400 uppercase font-semibold flex items-center gap-1.5">
                      <Trophy size={12} />
                      Achievements &amp; Wins ({matchingAchievements.length})
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingAchievements.map((ach, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectLink("#achievements")}
                        className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="font-semibold text-neutral-900 text-xs">{ach.heading}</div>
                          <div className="text-[11px] text-neutral-500">
                            <span className="text-neutral-900 font-medium">{ach.badge}</span> &bull; {ach.description.slice(0, 55)}...
                          </div>
                        </div>
                        {ach.date && (
                          <span className="text-[10px] font-mono text-neutral-400">{ach.date}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingTeam.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-neutral-400 uppercase font-semibold flex items-center gap-1.5">
                      <Users size={12} />
                      Active Council ({matchingTeam.length})
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingTeam.map((m, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectLink("#team")}
                        className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="font-semibold text-neutral-900 text-xs">{m.name}</div>
                          <div className="text-[11px] text-neutral-500">
                            {m.role} &bull; {m.department}
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white border border-neutral-200 text-neutral-800">
                          {m.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!hasResults && (
                <div className="text-center py-8">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center mb-2">
                    <Search size={18} />
                  </div>
                  <div className="font-semibold text-neutral-900 text-sm mb-1">
                    No exact results found for &ldquo;{query}&rdquo;
                  </div>
                  <div className="text-neutral-500 text-xs max-w-sm mx-auto mb-4 font-normal">
                    ZealBot can answer questions directly with its full knowledge base.
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenChatbot?.();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition-all cursor-pointer"
                  >
                    <Bot size={13} />
                    Ask ZealBot about &ldquo;{query}&rdquo;
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-neutral-200 text-neutral-600">ESC</kbd> to close
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-600">
            <Sparkles size={12} className="text-amber-500" />
            <span>SGC Search Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
}
