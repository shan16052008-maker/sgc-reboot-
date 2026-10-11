import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { 
  X, ChevronRight, ChevronLeft, Sparkles, Trophy, 
  Calendar, Bot, ArrowRight, CheckCircle2 
} from "lucide-react";
import { SGC_IDENTITY } from "../data/sgcData";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch?: () => void;
  onOpenChatbot?: () => void;
}

export default function OnboardingModal({ isOpen, onClose, onOpenSearch, onOpenChatbot }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      title: "Welcome to Student Guidance Cell",
      subtitle: `CAHCET • "${SGC_IDENTITY.motto}"`,
      badge: "The Autonomous Fraternity",
      icon: Sparkles,
      content: (
        <div className="space-y-3 text-neutral-600 text-sm">
          <p>
            Established in 2010 by Late Mr. Tanveer Ahmed & Mr. Mohammed Imran, SGC is an energetic student-led collective built on one enduring foundation:
          </p>
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950 font-semibold text-center text-xs tracking-wide">
            OF THE STUDENTS &bull; FOR THE STUDENTS &bull; BY THE STUDENTS
          </div>
          <p className="text-xs text-neutral-500">
            Here, seniors demystify technology for juniors through hands-on practice, peer coding, and real project building.
          </p>
        </div>
      ),
    },
    {
      title: "Daily 1:00 PM Knowledge Sprints",
      subtitle: "Monday to Friday • College Innovation Pods",
      badge: "Peer-to-Peer Mastery",
      icon: Calendar,
      content: (
        <div className="space-y-3 text-neutral-600 text-sm">
          <p>
            Every single day from <strong>1:00 PM to 1:30 PM</strong>, active student handlers deliver focused power sessions:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
              <span className="font-semibold text-neutral-900 block mb-0.5">Prompt Engineering & AI</span>
              <span className="text-neutral-500 text-[11px]">Handler: Zakwan Haaziq</span>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
              <span className="font-semibold text-neutral-900 block mb-0.5">Logic & Critical Thinking</span>
              <span className="text-neutral-500 text-[11px]">Handler: R. Banusree</span>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
              <span className="font-semibold text-neutral-900 block mb-0.5">Debate & Communication</span>
              <span className="text-neutral-500 text-[11px]">Handler: Mohamed Abbas</span>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
              <span className="font-semibold text-neutral-900 block mb-0.5">Hackathon Prototyping</span>
              <span className="text-neutral-500 text-[11px]">Handler: Mohammed Yasar</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Proven Hackathons & 41 Alumni",
      subtitle: "National Triumphs & Corporate Placements",
      badge: "Real Track Record",
      icon: Trophy,
      content: (
        <div className="space-y-3 text-neutral-600 text-sm">
          <p>
            SGC members convert classroom knowledge into national competitive victories and marquee placements:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
              <span>Smart India Hackathon 1st Place National Trophy & ₹1,00,000 Cash Prize</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-sky-50 border border-sky-200 text-sky-900 font-medium">
              <CheckCircle2 size={15} className="text-sky-600 shrink-0" />
              <span>VIT Hackulus 2026 Winner — CARDIA 3D Simulation (₹50,000+ Prize)</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 border border-purple-200 text-purple-900 font-medium">
              <CheckCircle2 size={15} className="text-purple-600 shrink-0" />
              <span>41 Verified Alumni placed at Zoho, TCS, Honeywell, Accenture, & Startups</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Your Built-in Superpowers",
      subtitle: "AI Assistant, Cmd+K Search, & Portal",
      badge: "Interactive Ecosystem",
      icon: Bot,
      content: (
        <div className="space-y-3 text-neutral-600 text-sm">
          <p>
            This portal is packed with interactive tools designed for students:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between">
              <div>
                <span className="font-bold text-neutral-900 block mb-1">🤖 ZealBot AI</span>
                <span className="text-neutral-500 text-[11px]">
                  Ask questions with interactive sound feedback.
                </span>
              </div>
              {onOpenChatbot && (
                <button
                  type="button"
                  onClick={onOpenChatbot}
                  className="mt-2 text-[10px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded border border-amber-200 w-fit cursor-pointer transition-colors"
                >
                  Open ZealBot &rarr;
                </button>
              )}
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between">
              <div>
                <span className="font-bold text-neutral-900 block mb-1">⌘K Command Palette</span>
                <span className="text-neutral-500 text-[11px]">
                  Search 41 alumni, 10 sessions, and council members.
                </span>
              </div>
              {onOpenSearch && (
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="mt-2 text-[10px] font-semibold text-neutral-800 bg-white hover:bg-neutral-100 px-2.5 py-1 rounded border border-neutral-200 w-fit cursor-pointer transition-colors"
                >
                  Try Search (Ctrl+K) &rarr;
                </button>
              )}
            </div>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (slideRef.current && isOpen) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [currentStep, isOpen]);

  if (!isOpen) return null;

  const active = steps[currentStep];
  const Icon = active.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-lg rounded-2xl bg-white border border-neutral-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header with Official Logo */}
        <div className="p-5 border-b border-neutral-100 bg-neutral-50/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200/80 p-1 shadow-xs flex items-center justify-center">
              <img src="/logo.png" alt="SGC Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80">
                  {active.badge}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 mt-0.5">
                {active.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer border border-neutral-200/60"
            aria-label="Close explainer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Animated Slide Content */}
        <div ref={slideRef} className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-800 flex items-center justify-center font-bold">
              <Icon size={15} />
            </div>
            <p className="text-xs font-semibold text-neutral-700">
              {active.subtitle}
            </p>
          </div>

          {active.content}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between">
          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentStep === i ? "w-6 bg-neutral-950" : "w-2 bg-neutral-200"
                }`}
                aria-label={`Jump to step ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft size={14} />
                <span>Back</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{currentStep === steps.length - 1 ? "Start Exploring" : "Next"}</span>
              {currentStep === steps.length - 1 ? <ArrowRight size={14} /> : <ChevronRight size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
