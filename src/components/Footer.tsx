import { ArrowUp, Heart, Sparkles, Lock } from "lucide-react";
import { SOCIAL_LINKS, SGC_IDENTITY } from "../data/sgcData";

interface FooterProps {
  onOpenPortal?: () => void;
}

export default function Footer({ onOpenPortal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FFFDF5] border-t-2 border-[#202020] pt-16 pb-28 text-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFE878] border-2 border-[#202020] shadow-[2px_2px_0px_#202020] flex items-center justify-center font-black text-lg text-[#171717]">
                SGC
              </div>
              <span className="text-xl font-black text-[#171717] tracking-tight">
                Student Guidance Cell
              </span>
            </div>

            <p className="text-[#5E5E5E] text-sm max-w-md leading-relaxed font-medium mb-4">
              An energetic student fraternity dedicated to uncovering hidden potential,
              driving competitive coding, and shaping technical leaders at{" "}
              <strong className="text-[#171717]">{SOCIAL_LINKS.college}</strong>.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#C9F2DE] border border-[#202020] shadow-[1px_1px_0px_#202020] text-xs font-black text-[#171717]">
              <Sparkles size={13} />
              <span>{SGC_IDENTITY.motto}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#171717] font-black text-xs tracking-wider uppercase mb-3">
              Sections
            </h4>
            <ul className="space-y-2 text-xs font-bold text-[#5E5E5E]">
              <li>
                <a href="#about" className="hover:text-[#171717] hover:underline">
                  About SGC
                </a>
              </li>
              <li>
                <a href="#announcements" className="hover:text-[#171717] hover:underline">
                  Announcements
                </a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-[#171717] hover:underline">
                  Student Achievements
                </a>
              </li>
              <li>
                <a href="#daily-sessions" className="hover:text-[#171717] hover:underline">
                  Daily KT Sessions
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-[#171717] hover:underline">
                  Team & 41 Alumni
                </a>
              </li>
              <li>
                <a href="#knowledge-discovery" className="hover:text-[#171717] hover:underline">
                  Knowledge Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Actions & Portal */}
          <div>
            <h4 className="text-[#171717] font-black text-xs tracking-wider uppercase mb-3">
              Member Workspace
            </h4>
            <div className="space-y-2.5">
              {onOpenPortal && (
                <button
                  onClick={onOpenPortal}
                  className="w-full py-2 px-3 rounded-xl bg-[#B8D9FF] hover:bg-[#9ec9ff] text-[#171717] text-xs font-black border-2 border-[#202020] shadow-[2px_2px_0px_#202020] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Lock size={13} />
                  Open Member Portal
                </button>
              )}
              <a
                href={SOCIAL_LINKS.portal}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2 px-3 rounded-xl bg-white hover:bg-[#FFE878] text-[#171717] text-xs font-bold border-2 border-[#202020] shadow-[2px_2px_0px_#202020] transition-all"
              >
                portal.teamsgc.in
              </a>
              <button
                onClick={scrollToTop}
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-gray-50 text-[#171717] text-xs font-bold border-2 border-[#202020] shadow-[2px_2px_0px_#202020] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowUp size={13} />
                Back to Top
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t-2 border-[#202020] flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-[#5E5E5E] gap-3">
          <div className="flex items-center gap-1">
            <span>Built by the Students of CAHCET with</span>
            <Heart size={14} className="text-red-500 inline fill-red-500" />
            <span>for the SGC Reboot Competition</span>
          </div>

          <div className="font-mono text-[11px] text-[#171717] bg-[#FFE878] px-2.5 py-0.5 rounded border border-[#202020]">
            Mantra: OF • FOR • BY THE STUDENTS
          </div>
        </div>
      </div>
    </footer>
  );
}
