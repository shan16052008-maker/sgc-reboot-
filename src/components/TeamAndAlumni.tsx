import { useState } from "react";
import { Users, ArrowUpRight, Search, Database, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";
import { TEAM_MEMBERS, ALL_ALUMNI_RECORDS } from "../data/sgcData";
import { isSupabaseConfigured } from "../lib/supabase";

const LinkedinIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-blue-600 shrink-0">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.54a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63a1.63 1.63 0 0 0-1.63-1.63Z" />
  </svg>
);

export default function TeamAndAlumni() {
  const [activeTab, setActiveTab] = useState<"TEAM" | "ALUMNI">("TEAM");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [companyFilter, setCompanyFilter] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const teamCategories = ["ALL", "Office Bearer", "Lead & Handler", "Committee Member"];
  const companies = ["ALL", "Zoho", "TCS", "Accenture", "Honeywell", "Startups", "Higher Studies"];

  const handleImageError = (name: string) => {
    setImageErrors((prev) => ({ ...prev, [name]: true }));
  };

  const filteredTeam = TEAM_MEMBERS.filter((m) => {
    const matchesCategory =
      categoryFilter === "ALL" || m.category === categoryFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredAlumni = ALL_ALUMNI_RECORDS.filter((a) => {
    const matchesCompany =
      companyFilter === "ALL" || a.company === companyFilter;
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.department.toLowerCase().includes(search.toLowerCase()) ||
      a.currentPosition.toLowerCase().includes(search.toLowerCase());
    return matchesCompany && matchesSearch;
  });

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Office Bearer":
        return "bg-amber-50 text-amber-900 border-amber-200/80";
      case "Lead & Handler":
        return "bg-sky-50 text-sky-900 border-sky-200/80";
      default:
        return "bg-purple-50 text-purple-900 border-purple-200/80";
    }
  };

  const getCompanyBadgeClass = (company: string) => {
    switch (company) {
      case "Zoho":
        return "bg-rose-50 text-rose-800 border-rose-200/80";
      case "TCS":
        return "bg-blue-50 text-blue-800 border-blue-200/80";
      case "Accenture":
        return "bg-purple-50 text-purple-800 border-purple-200/80";
      case "Honeywell":
        return "bg-red-50 text-red-800 border-red-200/80";
      case "Startups":
        return "bg-emerald-50 text-emerald-800 border-emerald-200/80";
      default:
        return "bg-neutral-50 text-neutral-800 border-neutral-200/80";
    }
  };

  return (
    <section id="team" className="py-24 relative bg-[#FFFDF7] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200/80 text-xs font-semibold mb-3">
              <Users size={13} className="text-neutral-600" />
              PEOPLE OF SGC &bull; 2026&ndash;27 COUNCIL &amp; 41 VERIFIED ALUMNI
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
              Leaders, Mentors &amp; Alumni Network
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Meet the active office bearers, session handlers, and proud alumni
              thriving across premier institutions and companies like Zoho, TCS, Accenture, and Honeywell.
            </p>
          </div>

          {/* Database State Badge & Main View Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200/80 text-[11px] font-mono font-medium text-neutral-700 shadow-sm">
              <Database size={13} className={isSupabaseConfigured ? "text-emerald-600" : "text-sky-600"} />
              <span>
                {isSupabaseConfigured ? "Live Supabase Cloud Sync" : "Supabase-Connected Directory"}
              </span>
            </div>

            <div className="flex bg-neutral-100 p-1 rounded-xl border border-neutral-200/80">
              <button
                onClick={() => setActiveTab("TEAM")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "TEAM"
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Active Council ({TEAM_MEMBERS.length})
              </button>
              <button
                onClick={() => setActiveTab("ALUMNI")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "ALUMNI"
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Alumni Network ({ALL_ALUMNI_RECORDS.length})
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {activeTab === "TEAM" ? (
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {teamCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    categoryFilter === cat
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                      : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:text-neutral-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {companies.map((comp) => (
                <button
                  key={comp}
                  onClick={() => setCompanyFilter(comp)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    companyFilter === comp
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                      : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:text-neutral-900"
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>
          )}

          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3.5 top-3 text-neutral-400" />
            <input
              type="text"
              placeholder={activeTab === "TEAM" ? "Search member, role, branch..." : "Search alumni or company..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-neutral-200/80 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Tab 1: Active Team Council with Real Member Portrait Photos */}
        {activeTab === "TEAM" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeam.map((member, idx) => {
              const hasValidImage = member.image && member.image !== "/placeholder.svg" && !imageErrors[member.name];

              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-sm hover:shadow-xl hover:border-neutral-300/90 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Portrait Photo Container */}
                    <div className="relative aspect-[4/4.5] w-full rounded-xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 mb-4 border border-neutral-100">
                      {hasValidImage ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          loading="lazy"
                          onError={() => handleImageError(member.name)}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-amber-50 to-sky-50 text-neutral-700">
                          <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-2xl text-neutral-800 border border-neutral-200/60">
                            {member.name.charAt(0)}
                          </div>
                          <span className="text-[11px] font-medium text-neutral-500 mt-2">SGC Member</span>
                        </div>
                      )}

                      {/* Floating Category Pill */}
                      <div className="absolute top-2.5 left-2.5">
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md bg-white/90 ${getCategoryBadgeClass(member.category)}`}>
                          {member.category}
                        </span>
                      </div>

                      {/* Floating Year Pill */}
                      <div className="absolute top-2.5 right-2.5">
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-neutral-950 text-white shadow-md border border-neutral-700/80">
                          {member.year}
                        </span>
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-neutral-900 group-hover:text-black transition-colors flex items-center justify-between">
                        <span>{member.name}</span>
                        <span title="Verified Council Member">
                          <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                        </span>
                      </h4>

                      <div className="text-xs font-semibold text-amber-800 bg-amber-50/80 px-2 py-0.5 rounded-md inline-block">
                        {member.role}
                      </div>

                      <p className="text-[11px] text-neutral-500 font-medium pt-1 line-clamp-1">
                        {member.department}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom / LinkedIn Connection */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-medium text-neutral-400">SGC &bull; 2026&ndash;27</span>
                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-neutral-800 hover:text-black font-semibold text-xs border border-neutral-200/60 transition-colors"
                        title={`Connect with ${member.name} on LinkedIn`}
                      >
                        <LinkedinIcon size={12} />
                        <span>Connect</span>
                        <ArrowUpRight size={12} className="text-neutral-400" />
                      </a>
                    ) : (
                      <span className="text-neutral-400 text-[11px]">Active</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: All 41 Alumni Records */}
        {activeTab === "ALUMNI" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredAlumni.map((alumni, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-lg hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${getCompanyBadgeClass(alumni.company)}`}>
                      {alumni.company}
                    </span>
                    <span className="text-[10px] font-mono font-medium text-neutral-400">
                      ALUMNI
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-neutral-900 mb-1">
                    {alumni.name}
                  </h4>

                  <div className="text-xs font-semibold text-neutral-700 mb-1 line-clamp-1 flex items-center gap-1.5">
                    <Briefcase size={12} className="shrink-0 text-neutral-400" />
                    <span>{alumni.currentPosition}</span>
                  </div>

                  <div className="text-[11px] font-medium text-neutral-500 flex items-center gap-1.5">
                    <GraduationCap size={12} className="shrink-0 text-neutral-400" />
                    <span>{alumni.department}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-neutral-500">
                    {alumni.company}
                  </span>

                  {alumni.contact ? (
                    <a
                      href={alumni.contact}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 text-[11px] font-semibold text-neutral-800 transition-all"
                    >
                      <LinkedinIcon size={11} />
                      <span>Profile</span>
                      <ArrowUpRight size={11} className="text-neutral-400" />
                    </a>
                  ) : (
                    <span className="text-[10px] text-neutral-400">Verified Alumni</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
