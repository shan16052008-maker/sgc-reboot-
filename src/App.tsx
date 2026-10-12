import "./styles/home.css";
import { useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ArrowUp, RotateCcw } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Announcements from "./components/Announcements";
import Achievements from "./components/Achievements";
import DailySessionsSchedule from "./components/DailySessionsSchedule";
import MemoriesOfSgc from "./components/MemoriesOfSgc";
import TeamAndAlumni from "./components/TeamAndAlumni";
import KnowledgeDiscovery from "./components/KnowledgeDiscovery";
import Contact from "./components/Contact";
import SgcChatbot from "./components/SgcChatbot";
import CommandPalette from "./components/CommandPalette";
import MemberPortalModal from "./components/MemberPortalModal";
import SplashScreen from "./components/SplashScreen";
import ScrollProgressBar from "./components/ScrollProgressBar";
import OnboardingModal from "./components/OnboardingModal";
import Toast, { type ToastMessage } from "./components/Toast";
import { SGC_IDENTITY } from "./data/sgcData";

function App() {
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    // Show splash screen on first visit of session
    return sessionStorage.getItem("sgc_intro_seen") !== "true";
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: "success" | "info" = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("sgc_intro_seen", "true");
    setShowSplash(false);

    // Trigger GSAP entrance timeline for main application
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      gsap.fromTo(
        ".hero-reveal",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, []);

  const handleReplayIntro = () => {
    setShowSplash(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-neutral-900 selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden font-sans">
      {/* Top Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Opening GSAP Branding & Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Navbar with SGC Logo & Tour Trigger */}
      <Navbar
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
      />

      <main>
        <Hero
          onOpenSearch={() => setIsCommandPaletteOpen(true)}
          onOpenPortal={() => setIsPortalOpen(true)}
          onOpenTour={() => setIsTourOpen(true)}
        />
        <About />
        <Announcements />
        <Achievements />
        <DailySessionsSchedule />
        <MemoriesOfSgc onOpenPortal={() => setIsPortalOpen(true)} />
        <TeamAndAlumni />
        <KnowledgeDiscovery />
        <Contact onShowToast={showToast} />
      </main>

      {/* Clean Brand Footer with Verified Coordinates, Direct Contacts & Logo */}
      <footer className="py-14 border-t border-neutral-200/60 pb-32 text-center text-xs text-neutral-500 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-neutral-200 p-0.5 shadow-xs flex items-center justify-center">
              <img src="/logo.png" alt="SGC Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-extrabold text-neutral-900 text-sm tracking-tight">STUDENT GUIDANCE CELL &bull; CAHCET</span>
          </div>

          <p className="text-neutral-600 max-w-lg text-xs leading-relaxed font-medium">
            &ldquo;{SGC_IDENTITY.motto}&rdquo; &bull; OF THE STUDENTS &bull; FOR THE STUDENTS &bull; BY THE STUDENTS
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-neutral-600 font-mono">
            <span>📍 2nd Floor, Main Block, CAHCET Campus, Melvisharam - 632509</span>
            <span>📞 +91 99439 46886 (President)</span>
            <span>📞 +91 95852 70647 (Admin)</span>
            <span>✉️ contact@teamsgc.in</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-neutral-700 pt-2">
            <a href="https://www.linkedin.com/in/studentguidancecell-cahcet/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-800 transition-colors">LinkedIn</a>
            <span className="text-neutral-300">&bull;</span>
            <a href="https://www.instagram.com/studentsguidancecell" target="_blank" rel="noopener noreferrer" className="hover:text-amber-800 transition-colors">Instagram</a>
            <span className="text-neutral-300">&bull;</span>
            <a href="https://github.com/sgc-cahcet" target="_blank" rel="noopener noreferrer" className="hover:text-amber-800 transition-colors">GitHub</a>
            <span className="text-neutral-300">&bull;</span>
            <a href="https://sgc-cahcet.medium.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-800 transition-colors">Medium</a>
          </div>

          <div className="flex items-center gap-4 text-[11px] pt-2 border-t border-neutral-200/60 w-full max-w-md justify-center">
            <span>&copy; {new Date().getFullYear()} SGC CAHCET. All rights reserved.</span>
            <span className="text-neutral-300">&bull;</span>
            <button
              onClick={handleReplayIntro}
              className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-900 font-semibold cursor-pointer underline underline-offset-2"
            >
              <RotateCcw size={11} />
              <span>Replay Intro Animation</span>
            </button>
          </div>
        </div>
      </footer>

      {/* SGC Personalized AI Assistant (ZealBot) */}
      <SgcChatbot />

      {/* Global Interactive Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenPortal={() => setIsPortalOpen(true)}
      />

      {/* Interactive Member Portal Modal */}
      <MemberPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
      />

      {/* Interactive Onboarding & Explainer Modal */}
      <OnboardingModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onOpenSearch={() => {
          setIsTourOpen(false);
          setIsCommandPaletteOpen(true);
        }}
        onOpenChatbot={() => {
          setIsTourOpen(false);
          // Bot is already visible on the page
          showToast("ZealBot AI is ready in the bottom right corner!", "info");
        }}
      />

      {/* Global Feedback Toast Notification System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Floating Scroll to Top Action Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-neutral-900 text-white shadow-xl hover:bg-neutral-800 transition-all cursor-pointer hover:scale-105"
          aria-label="Back to top"
          title="Scroll to Top"
        >
          <ArrowUp size={16} />
        </button>
      )}
    </div>
  );
}

export default App;
