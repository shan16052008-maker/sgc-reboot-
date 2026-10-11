import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Sparkles, ArrowRight } from "lucide-react";
import { SGC_IDENTITY } from "../data/sgcData";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mottoRef = useRef<HTMLParagraphElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.85,
            ease: "power4.inOut",
            onComplete: onComplete,
          });
        },
      });

      // 1. Initial State
      gsap.set(logoRef.current, { scale: 0.6, opacity: 0, rotate: -8 });
      gsap.set(ringRef.current, { scale: 0.4, opacity: 0 });
      gsap.set(titleRef.current, { y: 25, opacity: 0 });
      gsap.set(mottoRef.current, { y: 15, opacity: 0 });

      // 2. Logo entrance
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 0.75,
        ease: "back.out(1.8)",
      })
      .to(ringRef.current, {
        scale: 1.15,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.5")
      // 3. Title & Motto reveal
      .to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
      }, "-=0.3")
      .to(mottoRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      }, "-=0.2");

      // Progress animation from 0 to 100
      const counterObj = { val: 0 };
      tl.to(counterObj, {
        val: 100,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => {
          const currentVal = Math.round(counterObj.val);
          setPercent(currentVal);
          if (progressLineRef.current) {
            progressLineRef.current.style.width = `${currentVal}%`;
          }
        },
      }, "-=0.6");

      // Hold briefly before exit
      tl.to({}, { duration: 0.25 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const handleSkip = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: onComplete,
      });
    } else {
      onComplete();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#FFFDF7] text-neutral-900 select-none overflow-hidden"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-200/30 via-orange-100/20 to-sky-200/20 blur-3xl pointer-events-none -z-10 animate-pulse" />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-950 text-xs font-semibold transition-all cursor-pointer shadow-xs"
      >
        <span>Skip</span>
        <ArrowRight size={13} />
      </button>

      {/* Central Brand Composition */}
      <div className="flex flex-col items-center text-center px-4 max-w-md">
        {/* Logo Container with Ambient Glow Ring */}
        <div className="relative mb-6 flex items-center justify-center">
          <div
            ref={ringRef}
            className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-400/20 to-amber-600/20 blur-md pointer-events-none"
          />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-3 shadow-xl border border-neutral-200/80 flex items-center justify-center">
            <img
              ref={logoRef}
              src="/logo.png"
              alt="Student Guidance Cell Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Brand Text */}
        <h1
          ref={titleRef}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 mb-1.5 uppercase"
        >
          STUDENT GUIDANCE CELL
        </h1>

        <p
          ref={mottoRef}
          className="text-xs sm:text-sm font-semibold text-neutral-500 tracking-widest uppercase flex items-center gap-1.5"
        >
          <Sparkles size={13} className="text-amber-500" />
          <span>{SGC_IDENTITY.motto}</span>
          <span className="text-neutral-300">&bull;</span>
          <span className="text-neutral-400 font-mono">CAHCET</span>
        </p>

        {/* Progress Bar & Percentage */}
        <div className="w-56 sm:w-64 mt-8 flex flex-col items-center gap-2">
          <div className="w-full h-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 overflow-hidden">
            <div
              ref={progressLineRef}
              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-75"
              style={{ width: "0%" }}
            />
          </div>
          <div className="flex items-center justify-between w-full text-[10px] font-mono text-neutral-400">
            <span>INITIALIZING EXPERIENCE</span>
            <span className="font-semibold text-neutral-700">{percent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
