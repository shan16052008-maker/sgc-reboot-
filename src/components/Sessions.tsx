import { BookOpen } from "lucide-react";
import { SESSIONS } from "../data/sgcData";

export default function Sessions() {
  return (
    <section id="sessions" className="py-20 relative bg-[#FFFDF5] border-b-2 border-[#202020]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8D9FF] text-[#171717] border-2 border-[#202020] shadow-[2px_2px_0px_#202020] text-xs font-black mb-3">
              <BookOpen size={13} />
              WEEKLY LEARNING CYCLES
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#171717] tracking-tight">
              Latest KT & Hands-on Workshops
            </h2>
            <p className="text-[#5E5E5E] text-sm sm:text-base mt-2 max-w-xl font-medium">
              Knowledge Transfer (KT) sessions conducted by students for students, delivering industry-relevant skills.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#171717] bg-[#FFE878] px-3 py-1.5 rounded-xl border-2 border-[#202020] shadow-[2px_2px_0px_#202020] self-start md:self-auto">
            Cycle: Generative AI & Career Foundations
          </span>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SESSIONS.map((session: any) => (
            <div
              key={session.id}
              className="p-6 rounded-2xl bg-white border-2 border-[#202020] shadow-[4px_4px_0px_#202020] hover:shadow-[6px_6px_0px_#202020] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-[#171717] bg-[#C9F2DE] border border-[#202020] px-2.5 py-1 rounded-lg">
                    {session.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#5E5E5E]">
                    Session #{session.id}
                  </span>
                </div>

                {session.image && (
                  <div className="h-36 w-full rounded-xl overflow-hidden mb-4 bg-[#FFFDF5] border-2 border-[#202020]">
                    <img
                      src={session.image}
                      alt={session.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                )}

                <h3 className="text-lg font-black text-[#171717] mb-2 leading-snug">
                  {session.title}
                </h3>
                <p className="text-[#5E5E5E] text-xs sm:text-sm leading-relaxed font-medium mb-4">
                  {session.description}
                </p>
              </div>

              <div className="pt-4 border-t-2 border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[#5E5E5E] font-bold">Trainer: <strong className="text-[#171717]">{session.speaker}</strong></span>
                <span className="font-mono font-bold text-[#171717]">{session.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
