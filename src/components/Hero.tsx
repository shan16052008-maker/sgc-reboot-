import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { 
  ArrowRight, Trophy, BookOpen, Search, Sparkles, HelpCircle, 
  GraduationCap, ChevronRight, Code, Zap, Flame, Terminal
} from "lucide-react";
import { SGC_IDENTITY, ALL_ALUMNI_RECORDS, TEAM_MEMBERS, SCHEDULE_WEEKS } from "../data/sgcData";

interface HeroProps {
  onOpenSearch?: () => void;
  onOpenPortal?: () => void;
  onOpenTour?: () => void;
}

export default function Hero({ onOpenSearch, onOpenPortal, onOpenTour }: HeroProps) {
  const logoBadgeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Active interactive highlight index
  const [activeHighlight, setActiveHighlight] = useState(0);

  const heroHighlights = [
    {
      title: "SIH & VIT Hackulus 2026 Champion",
      subtitle: "National 1st Place & CARDIA 3D Win",
      badge: "Proven Win",
      icon: Trophy,
      color: "from-amber-500 to-orange-600",
      accentBg: "bg-amber-500/10 text-amber-900 border-amber-300",
      actionHref: "#achievements",
      actionText: "View Proven Wins",
    },
    {
      title: "Daily KT 1:00 PM Power Sprints",
      subtitle: "Hands-on Generative AI, Cloud & JAM",
      badge: "Live Sessions",
      icon: BookOpen,
      color: "from-sky-500 to-blue-600",
      accentBg: "bg-sky-500/10 text-sky-900 border-sky-300",
      actionHref: "#daily-sessions",
      actionText: "View Session Highlights",
    },
    {
      title: "41 Verified Alumni Network",
      subtitle: "Zoho, TCS 7.5 LPA, Honeywell, Startups",
      badge: "Alumni Network",
      icon: GraduationCap,
      color: "from-emerald-500 to-teal-600",
      accentBg: "bg-emerald-500/10 text-emerald-900 border-emerald-300",
      actionHref: "#team",
      actionText: "Explore Alumni Directory",
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Continuous floating motion for SGC logo badge
      if (logoBadgeRef.current) {
        gsap.to(logoBadgeRef.current, {
          y: -8,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Soft ambient background glowing orb pulsation
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.25,
          opacity: 0.85,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Floating interactive cards animation
      if (cardsContainerRef.current) {
        gsap.fromTo(
          cardsContainerRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.2 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Auto cycle highlight tabs every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % heroHighlights.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroHighlights.length]);

  const totalSessions = SCHEDULE_WEEKS.reduce((acc, w) => acc + w.sessions.length, 0);

  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-[#FFFDF7] via-[#FFF9EE]/40 to-[#FFFDF7]">
      {/* Dynamic ambient colored lights */}
      <div
        ref={glowRef}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-gradient-to-tr from-amber-300/30 via-rose-300/25 to-sky-300/25 blur-3xl rounded-full pointer-events-none -z-10"
      />

      {/* Ambient floating tech elements and micro-particles across canvas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-16 left-[18%] w-3 h-3 rounded-full bg-amber-400 border border-amber-600 animate-ping opacity-60" />
        <div className="absolute top-1/3 right-[15%] w-3.5 h-3.5 rounded-full bg-sky-400 border border-sky-600 animate-pulse opacity-50" />
        <div className="absolute bottom-1/4 left-[12%] w-3 h-3 rounded-full bg-rose-400 border border-rose-600 animate-bounce opacity-40" />
        <div className="absolute top-2/3 right-[22%] w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-600 animate-pulse opacity-60" />
      </div>

      {/* FLOATING ANIMATED TECH STICKERS & BADGES ACROSS HERO CANVAS (teamsgc.in style) */}
      {/* 1. Top-Left: Code core badge */}
      <div className="hidden lg:flex absolute top-28 left-6 xl:left-14 items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-amber-300 shadow-xl text-amber-950 text-xs font-mono font-bold animate-floatSlow pointer-events-auto hover:scale-105 transition-transform z-10">
        <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
          <Code size={14} />
        </div>
        <span>&lt;SGC Dev Core /&gt;</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
      </div>

      {/* 2. Top-Right: SIH Hackathon Trophy Badge */}
      <div className="hidden lg:flex absolute top-28 right-6 xl:right-14 items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-yellow-400 shadow-xl text-amber-950 text-xs font-bold animate-floatReverse pointer-events-auto hover:scale-105 transition-transform z-10">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-500 text-white flex items-center justify-center shadow-xs">
          <Trophy size={14} />
        </div>
        <span>SIH &apos;25 &amp; VIT Hackulus 1st</span>
        <Flame size={14} className="text-orange-500 animate-bounce" />
      </div>

      {/* 3. Mid-Left: 1:00 PM KT Daily Sprint Badge */}
      <div className="hidden xl:flex absolute top-1/2 -translate-y-1/2 left-4 items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-sky-300 shadow-lg text-sky-950 text-xs font-bold animate-float pointer-events-auto hover:scale-105 transition-transform z-10">
        <div className="w-6 h-6 rounded-lg bg-sky-500 text-white flex items-center justify-center shadow-xs">
          <Zap size={14} />
        </div>
        <span>1:00 PM KT Power Sprint</span>
        <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-900 text-[10px] font-mono font-black">LIVE</span>
      </div>

      {/* 4. Mid-Right: Interactive Terminal Command Badge */}
      <div className="hidden xl:flex absolute top-1/2 -translate-y-1/2 right-4 items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-violet-300 shadow-lg text-violet-950 text-xs font-mono font-bold animate-floatSlow pointer-events-auto hover:scale-105 transition-transform z-10">
        <div className="w-6 h-6 rounded-lg bg-violet-600 text-white flex items-center justify-center shadow-xs">
          <Terminal size={14} />
        </div>
        <span>&gt; sgc --build-future</span>
        <span className="animate-pulse font-black text-amber-600">_</span>
      </div>

      {/* 5. Bottom-Left: 41 Verified Alumni Badge */}
      <div className="hidden lg:flex absolute bottom-14 left-8 xl:left-20 items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-emerald-300 shadow-lg text-emerald-950 text-xs font-bold animate-floatReverse pointer-events-auto hover:scale-105 transition-transform z-10">
        <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
          <GraduationCap size={14} />
        </div>
        <span>41 Alumni: Zoho &amp; TCS 7.5 LPA</span>
      </div>

      {/* 6. Bottom-Right: Fraternity Ethos Badge */}
      <div className="hidden lg:flex absolute bottom-14 right-8 xl:right-20 items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-rose-300 shadow-lg text-rose-950 text-xs font-bold animate-floatSlow pointer-events-auto hover:scale-105 transition-transform z-10">
        <Sparkles size={14} className="text-amber-500 animate-spin [animation-duration:8s]" />
        <span>&ldquo;Zeal and Zest to Be&rdquo;</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Official SGC Brand Emblem & Motto Eyebrow Badge with Rotating Dashed Orbit */}
          <div
            ref={logoBadgeRef}
            className="hero-reveal relative inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 text-neutral-900 shadow-sm mb-6 select-none"
          >
            {/* Animated rotating dashed orbit ring (like teamsgc.in) */}
            <div className="absolute -inset-1.5 rounded-full border-2 border-dashed border-amber-400 animate-spin [animation-duration:20s] pointer-events-none opacity-80" />

            <div className="w-8 h-8 rounded-full bg-white p-0.5 border border-amber-200 shadow-xs flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="SGC Official Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-amber-900 font-extrabold tracking-wide">STUDENT GUIDANCE CELL</span>
              <span className="text-neutral-300">&bull;</span>
              <span className="text-neutral-700 font-medium tracking-wide">
                &ldquo;{SGC_IDENTITY.motto}&rdquo;
              </span>
            </div>
          </div>

          {/* Main Headline with High-Impact Gradient */}
          <h1 className="hero-reveal text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-neutral-950 mb-6 leading-[1.08]">
            Build Yourself.
            <br />
            <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-700 bg-clip-text text-transparent inline-block mt-1">
              Build Beyond Limits.
            </span>
          </h1>

          {/* 3-Line Iconic Mantra Banner */}
          <div className="hero-reveal my-5 inline-block py-2.5 px-6 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-md">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-extrabold tracking-wide text-neutral-900">
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 shadow-xs">
                OF THE STUDENTS
              </span>
              <span className="text-neutral-300 font-bold hidden sm:inline">&bull;</span>
              <span className="px-3.5 py-1 rounded-full bg-violet-100 text-violet-950 border border-violet-300 shadow-xs">
                FOR THE STUDENTS
              </span>
              <span className="text-neutral-300 font-bold hidden sm:inline">&bull;</span>
              <span className="px-3.5 py-1 rounded-full bg-sky-100 text-sky-950 border border-sky-300 shadow-xs">
                BY THE STUDENTS
              </span>
            </div>
          </div>

          {/* Mission Subtitle */}
          <p className="hero-reveal text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            An autonomous, student-led technical collective at CAHCET. We bridge
            classroom theory to national hackathon victories, high-impact placements,
            and daily peer-driven technical mastery.
          </p>

          {/* PRIMARY ACTION CTAS: Radiant, High-Contrast, Zero Black-Box Masking */}
          <div className="hero-reveal flex flex-wrap items-center justify-center gap-4 mb-10">
            {/* 1. Explore Proven Wins Button */}
            <a
              href="#achievements"
              className="group inline-flex items-center gap-3 px-8 py-4 text-sm sm:text-base font-black text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-amber-300"
              title="Jump to Proven Wins & National Hackathons"
            >
              <Trophy size={20} className="text-amber-100 group-hover:rotate-12 transition-transform" />
              <span>Explore Proven Wins</span>
              <ArrowRight size={18} className="text-white/90 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* 2. View Session Highlights Button */}
            <a
              href="#daily-sessions"
              className="group inline-flex items-center gap-3 px-8 py-4 text-sm sm:text-base font-black text-sky-950 bg-white hover:bg-sky-50 rounded-2xl border-2 border-sky-400 hover:border-sky-500 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              title="Jump to Daily Sessions Timetable & Highlights"
            >
              <BookOpen size={20} className="text-sky-600 group-hover:scale-110 transition-transform" />
              <span>View Session Highlights</span>
              <ArrowRight size={18} className="text-sky-600 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* 3. Member Portal Button */}
            {onOpenPortal && (
              <button
                onClick={onOpenPortal}
                className="inline-flex items-center gap-2 px-5 py-4 text-sm font-bold text-neutral-800 bg-white hover:bg-neutral-50 rounded-2xl border-2 border-neutral-200 hover:border-neutral-300 shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
                title="Open SGC Member Sign In & Registration"
              >
                <Sparkles size={16} className="text-amber-600" />
                <span>Member Portal</span>
              </button>
            )}

            {/* 4. Guided Tour Button */}
            {onOpenTour && (
              <button
                onClick={onOpenTour}
                className="inline-flex items-center gap-2 px-4 py-4 text-sm font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-2xl border border-neutral-200 hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
                title="Guided Overview & Ethos Tour"
              >
                <HelpCircle size={16} className="text-amber-600" />
                <span>Tour</span>
              </button>
            )}
          </div>

          {/* DYNAMIC HERO ANIMATION: 3 Interactive Feature Showcase Cards */}
          <div ref={cardsContainerRef} className="hero-reveal grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
            {heroHighlights.map((hl, idx) => {
              const Icon = hl.icon;
              const isActive = activeHighlight === idx;
              return (
                <a
                  key={idx}
                  href={hl.actionHref}
                  onMouseEnter={() => setActiveHighlight(idx)}
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                    isActive
                      ? "bg-white border-amber-400 shadow-xl scale-[1.02] ring-4 ring-amber-300/30"
                      : "bg-white hover:bg-neutral-50/80 border-neutral-200 shadow-md hover:shadow-lg hover:border-neutral-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-xs ${hl.accentBg}`}>
                        {hl.badge}
                      </span>
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${hl.color} text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                        <Icon size={15} />
                      </div>
                    </div>

                    <h4 className="text-sm sm:text-base font-extrabold text-neutral-950 mb-1 group-hover:text-amber-900 transition-colors">
                      {hl.title}
                    </h4>
                    <p className="text-xs text-neutral-600 font-medium">
                      {hl.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-950">
                    <span>{hl.actionText}</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Quick Search Bar */}
          {onOpenSearch && (
            <div className="hero-reveal flex items-center justify-center mb-8">
              <button
                onClick={onOpenSearch}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white hover:bg-neutral-50 border border-neutral-200/90 text-xs font-semibold text-neutral-700 shadow-sm hover:shadow-md transition-all cursor-pointer"
                title="Search everything across SGC (Ctrl+K)"
              >
                <Search size={15} className="text-amber-600" />
                <span>Search 41 Alumni, 10 Daily Sessions, Hackathons &amp; Resources</span>
                <kbd className="hidden sm:inline-block px-2.5 py-1 rounded bg-neutral-100 text-[10px] font-mono border border-neutral-200 text-neutral-800 font-bold shadow-xs">
                  Ctrl+K
                </kbd>
              </button>
            </div>
          )}

          {/* Vibrant Live Metric Badges */}
          <div className="hero-reveal flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200/80 font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{ALL_ALUMNI_RECORDS.length} Verified Alumni</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 text-sky-900 border border-sky-200/80 font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span>{totalSessions} KT Daily Sessions</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>{TEAM_MEMBERS.length} Active Council Members</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
