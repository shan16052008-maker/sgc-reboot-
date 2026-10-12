import { useState, useEffect, useRef } from "react";
import { 
  Sparkles, Compass, Users, Calendar, Trophy, 
  Lock, Search, HelpCircle, ArrowUp, Mail, 
  ChevronUp, ChevronDown, Bell, LayoutGrid, X 
} from "lucide-react";

interface BottomNavDockProps {
  onOpenSearch: () => void;
  onOpenPortal: () => void;
  onOpenTour: () => void;
}

interface NavItem {
  id: string;
  name: string;
  shortName: string;
  href: string;
  icon: typeof Trophy;
  badge?: string;
  badgeColor?: string;
  highlight?: boolean;
}

const PRIMARY_NAV_ITEMS: NavItem[] = [
  { 
    id: "about", 
    name: "About SGC", 
    shortName: "About", 
    href: "#about", 
    icon: Sparkles,
    badge: "11+ Yrs"
  },
  { 
    id: "announcements", 
    name: "Notices & Events", 
    shortName: "Notices", 
    href: "#announcements", 
    icon: Bell,
    badge: "Live" 
  },
  { 
    id: "achievements", 
    name: "Hall of Fame", 
    shortName: "Wins", 
    href: "#achievements", 
    icon: Trophy,
    badge: "1st SIH"
  },
  { 
    id: "daily-sessions", 
    name: "Daily Sessions", 
    shortName: "Sessions", 
    href: "#daily-sessions", 
    icon: Calendar,
    badge: "4:30 PM"
  },
  { 
    id: "memories", 
    name: "Secret Vault", 
    shortName: "Memories", 
    href: "#memories", 
    icon: Lock,
    badge: "Vault",
    highlight: true 
  },
  { 
    id: "team", 
    name: "Team & Alumni", 
    shortName: "People", 
    href: "#team", 
    icon: Users,
    badge: "60+" 
  },
  { 
    id: "knowledge-discovery", 
    name: "Knowledge Hub", 
    shortName: "Vault", 
    href: "#knowledge-discovery", 
    icon: Compass,
    badge: "Tech" 
  },
  { 
    id: "contact", 
    name: "Contact Us", 
    shortName: "Contact", 
    href: "#contact", 
    icon: Mail,
    badge: "2nd Flr" 
  },
];

export default function BottomNavDock({
  onOpenSearch,
  onOpenPortal,
  onOpenTour
}: BottomNavDockProps) {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll spy & reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
      setScrollProgress(progress);
      setShowScrollTop(scrollY > 350);

      // Section detection
      const sections = [
        "home",
        "about",
        "announcements",
        "achievements",
        "daily-sessions",
        "memories",
        "team",
        "knowledge-discovery",
        "contact"
      ];

      const triggerPoint = window.innerHeight * 0.35;
      let current = "home";

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
            current = sectionId;
            break;
          } else if (rect.top <= triggerPoint) {
            current = sectionId;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile sheet on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const yOffset = -30;
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.pushState(null, "", href);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile Expanded Drawer Menu (Floats upward right above the bottom dock) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden animate-fadeIn"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            ref={mobileMenuRef}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-24 left-4 right-4 max-w-sm mx-auto bg-white/95 backdrop-blur-2xl border border-neutral-200/90 rounded-3xl p-4 shadow-2xl shadow-neutral-900/20 animate-fadeIn"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                  SGC
                </div>
                <span className="font-extrabold text-neutral-900 text-xs tracking-tight">
                  Quick Navigation Hub
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3">
              {PRIMARY_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-neutral-900 text-white shadow-sm"
                        : "text-neutral-700 hover:bg-neutral-100 bg-neutral-50/80"
                    }`}
                  >
                    <div className={`p-1.5 rounded-xl ${isActive ? "bg-neutral-800 text-amber-300" : "bg-white text-neutral-600 shadow-2xs"}`}>
                      <Icon size={14} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="truncate">{item.shortName}</span>
                      {item.badge && (
                        <span className={`text-[9px] font-mono leading-none ${isActive ? "text-neutral-300" : "text-neutral-500"}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Quick Action Buttons in Mobile Drawer */}
            <div className="flex items-center gap-2 pt-3 mt-3 border-t border-neutral-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenTour();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <HelpCircle size={13} className="text-amber-600" />
                <span>Tour</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Lock size={12} className="text-amber-400" />
                <span>Member Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Floating Bottom Navigation Dock */}
      <aside
        aria-label="Interactive Floating Navigation Dock"
        className="floating-dock fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[96vw] transition-all duration-300"
      >
        <div
          className={`relative rounded-full bg-white/90 backdrop-blur-2xl border border-neutral-200/90 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.18)] flex items-center transition-all duration-300 ${
            isMinimized 
              ? "p-1.5 gap-2" 
              : "px-2.5 py-1.5 sm:px-3.5 sm:py-2 gap-1.5 sm:gap-2.5"
          }`}
        >
          {/* Real-time Reading Progress Track at top edge of dock */}
          <div className="absolute top-0 left-6 right-6 h-[2.5px] bg-neutral-200/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500 transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
              title={`Page Scrolled: ${Math.round(scrollProgress)}%`}
            />
          </div>

          {/* SGC Logo / Home Link with Tooltip */}
          <div className="relative group">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              onMouseEnter={() => setHoveredItem("home")}
              onMouseLeave={() => setHoveredItem(null)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-neutral-200/90 p-1 shadow-2xs flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer ${
                activeSection === "home" ? "ring-2 ring-neutral-900 ring-offset-2" : ""
              }`}
              title="Home"
              aria-label="Return to Top / Home"
            >
              <img src="/logo.png" alt="SGC" className="w-full h-full object-contain" />
            </a>

            {/* Hover Tooltip */}
            {hoveredItem === "home" && (
              <div className="hidden sm:block absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-[10px] font-semibold tracking-wide whitespace-nowrap shadow-lg animate-fadeIn pointer-events-none">
                Home <span className="text-neutral-400 font-normal">&bull; CAHCET</span>
              </div>
            )}
          </div>

          {/* Command Palette Trigger */}
          <div className="relative">
            <button
              onClick={onOpenSearch}
              onMouseEnter={() => setHoveredItem("search")}
              onMouseLeave={() => setHoveredItem(null)}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-neutral-100/90 hover:bg-neutral-200 text-neutral-800 transition-all duration-150 cursor-pointer text-xs font-semibold active:scale-95 hover:shadow-2xs"
              title="Search SGC (⌘K)"
              aria-label="Open Command Search"
            >
              <Search size={13} className="text-neutral-500" />
              <span className="hidden sm:inline font-semibold">Search</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-white text-[9px] font-mono border border-neutral-200 text-neutral-500 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {hoveredItem === "search" && (
              <div className="hidden sm:block absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-[10px] font-semibold tracking-wide whitespace-nowrap shadow-lg animate-fadeIn pointer-events-none">
                Quick Search <span className="text-neutral-400 font-mono text-[9px]">(Ctrl+K)</span>
              </div>
            )}
          </div>

          {/* If NOT minimized, show navigation links */}
          {!isMinimized && (
            <>
              {/* Desktop & Tablet Links (Scroll-spied active pills) */}
              <nav className="hidden md:flex items-center gap-1">
                {PRIMARY_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  const isHovered = hoveredItem === item.id;

                  return (
                    <div key={item.id} className="relative">
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`relative px-2.5 lg:px-3 py-1.5 rounded-full text-[11px] lg:text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 active:scale-95 cursor-pointer ${
                          isActive
                            ? "bg-neutral-900 text-white shadow-sm"
                            : item.highlight
                            ? "text-rose-700 hover:text-rose-950 hover:bg-rose-50/80"
                            : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
                        }`}
                      >
                        <Icon 
                          size={13} 
                          className={
                            isActive 
                              ? "text-amber-300" 
                              : item.highlight 
                              ? "text-rose-600" 
                              : "text-neutral-500"
                          } 
                        />
                        <span className="hidden xl:inline">{item.name}</span>
                        <span className="inline xl:hidden">{item.shortName}</span>

                        {/* Active dot indicator */}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        )}
                      </a>

                      {/* Floating Micro-Tooltip on hover */}
                      {isHovered && (
                        <div className="absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-[10px] font-medium tracking-wide whitespace-nowrap shadow-xl border border-neutral-700/50 animate-fadeIn pointer-events-none flex items-center gap-1.5">
                          <span>{item.name}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 rounded bg-neutral-800 text-[9px] font-mono text-amber-300 border border-neutral-700">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Mobile Selective Nav Items (< 768px): Home, Wins, Sessions, Team, and Menu Drawer */}
              <div className="flex md:hidden items-center gap-1">
                {[
                  PRIMARY_NAV_ITEMS[2], // Wins
                  PRIMARY_NAV_ITEMS[3], // Sessions
                  PRIMARY_NAV_ITEMS[5], // Team
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`p-2 rounded-full transition-all text-xs cursor-pointer ${
                        isActive
                          ? "bg-neutral-900 text-white shadow-xs"
                          : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
                      }`}
                      title={item.name}
                      aria-label={item.name}
                    >
                      <Icon size={14} className={isActive ? "text-amber-300" : ""} />
                    </a>
                  );
                })}

                {/* Mobile 'More Hub' button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`p-2 rounded-full transition-all text-xs flex items-center gap-1 font-semibold cursor-pointer ${
                    isMobileMenuOpen 
                      ? "bg-neutral-900 text-white" 
                      : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                  }`}
                  title="More Sections & Tools"
                  aria-label="Open Navigation Hub"
                >
                  <LayoutGrid size={14} className="text-amber-600" />
                  <span className="text-[10px] pr-0.5">Hub</span>
                </button>
              </div>

              {/* Right Dock Controls: Tour, Portal, Scroll Top */}
              <div className="flex items-center gap-1 sm:gap-1.5 pl-1.5 sm:pl-2 border-l border-neutral-200/80">
                {/* Quick Tour Button */}
                <div className="relative hidden sm:block">
                  <button
                    onClick={onOpenTour}
                    onMouseEnter={() => setHoveredItem("tour")}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all duration-150 cursor-pointer active:scale-95"
                    title="Quick Tour"
                    aria-label="Start Guided Tour"
                  >
                    <HelpCircle size={14} className="text-amber-600" />
                  </button>

                  {hoveredItem === "tour" && (
                    <div className="absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-[10px] font-semibold tracking-wide whitespace-nowrap shadow-lg animate-fadeIn pointer-events-none">
                      Interactive Tour
                    </div>
                  )}
                </div>

                {/* Portal Access Button */}
                <div className="relative">
                  <button
                    onClick={onOpenPortal}
                    onMouseEnter={() => setHoveredItem("portal")}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="px-2.5 sm:px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-semibold inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer shadow-sm active:scale-95 hover:shadow-md"
                    title="Member Portal"
                    aria-label="Open SGC Member Portal"
                  >
                    <Lock size={12} className="text-amber-400" />
                    <span className="hidden sm:inline">Portal</span>
                  </button>

                  {hoveredItem === "portal" && (
                    <div className="hidden sm:block absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-[10px] font-semibold tracking-wide whitespace-nowrap shadow-lg animate-fadeIn pointer-events-none">
                      Member & Alumni Portal
                    </div>
                  )}
                </div>

                {/* Back to Top */}
                {showScrollTop && (
                  <button
                    onClick={scrollToTop}
                    className="p-1.5 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-all duration-150 cursor-pointer active:scale-95 animate-fadeIn"
                    aria-label="Back to top"
                    title="Scroll to Top"
                  >
                    <ArrowUp size={13} />
                  </button>
                )}
              </div>
            </>
          )}

          {/* Minimize / Expand Dock Toggle */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors ml-0.5 cursor-pointer"
            title={isMinimized ? "Expand Navigation Dock" : "Minimize Dock"}
            aria-label={isMinimized ? "Expand Dock" : "Minimize Dock"}
          >
            {isMinimized ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </aside>
    </>
  );
}
