import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Trophy, Search, Lock, HelpCircle } from "lucide-react";

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenPortal?: () => void;
  onOpenTour?: () => void;
}

export default function Navbar({ onOpenSearch, onOpenPortal, onOpenTour }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About SGC", href: "#about" },
    { name: "Announcements", href: "#announcements" },
    { name: "Achievements", href: "#achievements" },
    { name: "Daily Sessions", href: "#daily-sessions" },
    { name: "Memories", href: "#memories" },
    { name: "Team & Alumni", href: "#team" },
    { name: "Knowledge Hub", href: "#knowledge-discovery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-neutral-200/80 shadow-xs py-2.5"
          : "bg-[#FFFDF7]/90 backdrop-blur-sm border-b border-neutral-200/60 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Official SGC Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200/80 p-1 shadow-xs flex items-center justify-center group-hover:scale-105 group-hover:border-neutral-300 transition-all duration-300">
              <img
                src="/logo.png"
                alt="Student Guidance Cell Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-neutral-950">
                  STUDENT GUIDANCE CELL
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                  CAHCET &apos;26
                </span>
              </div>
              <span className="text-[10px] tracking-wider text-neutral-500 uppercase font-medium">
                Zeal and Zest to Be
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-neutral-100/80 p-1 rounded-xl border border-neutral-200/60">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950 hover:bg-white rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            {onOpenTour && (
              <button
                onClick={onOpenTour}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 bg-white hover:bg-neutral-50 border border-neutral-200/80 rounded-xl shadow-xs transition-all cursor-pointer"
                title="Guided Tour & Overview"
              >
                <HelpCircle size={13} className="text-amber-600" />
                <span className="hidden xl:inline text-xs">Tour</span>
              </button>
            )}

            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-600 bg-white hover:bg-neutral-50 border border-neutral-200/80 rounded-xl shadow-xs transition-all cursor-pointer"
                title="Search Alumni, Sessions & Wins (Ctrl+K)"
              >
                <Search size={13} className="text-neutral-400" />
                <span className="hidden xl:inline text-xs">Search</span>
                <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.2 rounded bg-neutral-100 text-[10px] font-mono border border-neutral-200 text-neutral-500">
                  Ctrl+K
                </kbd>
              </button>
            )}

            <button
              onClick={onOpenPortal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl border border-neutral-200/80 transition-all cursor-pointer"
            >
              <Lock size={12} className="text-neutral-600" />
              Member Portal
            </button>

            <a
              href="#achievements"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-sm transition-all cursor-pointer border border-amber-300/40"
            >
              <Trophy size={13} className="text-amber-100" />
              Proven Wins
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white border border-neutral-200 text-neutral-800 shadow-xs focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-b border-neutral-200 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 rounded-xl transition-colors"
            >
              {link.name}
            </a>
          ))}

          {onOpenTour && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTour();
              }}
              className="flex items-center gap-2 w-full px-3 py-2.5 text-xs font-medium text-neutral-700 bg-amber-50/60 border border-amber-200/60 rounded-xl"
            >
              <HelpCircle size={14} className="text-amber-600" />
              Take Guided Tour &amp; Overview
            </button>
          )}

          {onOpenSearch && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center justify-between w-full px-3 py-2.5 text-xs font-medium text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-xl"
            >
              <span className="flex items-center gap-2">
                <Search size={14} />
                Search Directory (Ctrl+K)
              </span>
              <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-neutral-200">
                ⌘K
              </span>
            </button>
          )}

          <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal?.();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-neutral-800 bg-neutral-100 rounded-xl"
            >
              <Lock size={14} />
              Open Member Portal
            </button>
            <a
              href="#achievements"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-white bg-neutral-950 rounded-xl"
            >
              Explore Achievements <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
