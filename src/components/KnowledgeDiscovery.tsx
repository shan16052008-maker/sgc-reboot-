import { useState } from "react";
import { Search, Compass, PlusCircle, Check, X, Share2, BookMarked } from "lucide-react";
import { KNOWLEDGE_RESOURCES } from "../data/sgcData";

export default function KnowledgeDiscovery() {
  const [resources, setResources] = useState(KNOWLEDGE_RESOURCES);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Web Dev",
    format: "Community Guide",
    difficulty: "All Levels",
    topics: "",
    contributor: "",
  });

  const tags = ["ALL", "Web Dev", "Hackathons", "National Contests", "Artificial Intelligence", "Career"];

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.contributor) return;

    const newRes = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      format: formData.format || "Community Contribution",
      difficulty: formData.difficulty,
      topics: formData.topics ? formData.topics.split(",").map((t) => t.trim()) : ["Student Guide"],
      contributor: formData.contributor,
    };

    setResources([newRes, ...resources]);
    setSuccessMsg("Knowledge contributed successfully! It is now live in the hub.");
    setFormData({
      title: "",
      category: "Web Dev",
      format: "Community Guide",
      difficulty: "All Levels",
      topics: "",
      contributor: "",
    });

    setTimeout(() => {
      setSuccessMsg("");
      setModalOpen(false);
    }, 1500);
  };

  const filtered = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.category.toLowerCase().includes(search.toLowerCase()) ||
      res.topics.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      (res.contributor && res.contributor.toLowerCase().includes(search.toLowerCase()));

    const matchesTag = selectedTag === "ALL" || res.category === selectedTag;

    return matchesSearch && matchesTag;
  });

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "Web Dev":
        return {
          pill: "bg-sky-100 text-sky-950 border-sky-300",
          accent: "from-sky-500 to-blue-600",
          border: "hover:border-sky-300",
        };
      case "Hackathons":
        return {
          pill: "bg-amber-100 text-amber-950 border-amber-300",
          accent: "from-amber-500 to-orange-600",
          border: "hover:border-amber-300",
        };
      case "National Contests":
        return {
          pill: "bg-purple-100 text-purple-950 border-purple-300",
          accent: "from-purple-500 to-pink-600",
          border: "hover:border-purple-300",
        };
      case "Artificial Intelligence":
        return {
          pill: "bg-emerald-100 text-emerald-950 border-emerald-300",
          accent: "from-emerald-500 to-teal-600",
          border: "hover:border-emerald-300",
        };
      case "Career":
        return {
          pill: "bg-rose-100 text-rose-950 border-rose-300",
          accent: "from-rose-500 to-red-600",
          border: "hover:border-rose-300",
        };
      default:
        return {
          pill: "bg-neutral-100 text-neutral-900 border-neutral-300",
          accent: "from-neutral-600 to-neutral-800",
          border: "hover:border-neutral-300",
        };
    }
  };

  return (
    <section id="knowledge-discovery" className="py-24 relative bg-gradient-to-b from-[#FFFDF7] via-amber-50/20 to-[#FFFDF7] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Contribution Button */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 border border-amber-200/80 text-xs font-bold mb-3 shadow-xs">
              <Compass size={14} className="text-amber-600" />
              OPEN COLLABORATIVE COMMONS &bull; 100% PEER POWERED
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4">
              SGC Knowledge{" "}
              <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 bg-clip-text text-transparent">
                Discovery Hub
              </span>
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              Anyone can learn, and <strong className="text-neutral-950 font-bold bg-amber-100/70 px-1.5 py-0.5 rounded border border-amber-200">anyone can share</strong>. Trainees, leads, and alumni contribute
              roadmaps, pitch blueprints, and KT takeaways to empower every member.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-extrabold text-xs shadow-md hover:shadow-xl transition-all self-start lg:self-auto cursor-pointer border border-amber-400/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle size={16} />
            <span>Share Knowledge With Cell +</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-3 sm:p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  selectedTag === tag
                    ? "bg-neutral-950 text-white border-neutral-950 shadow-md scale-[1.02]"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200/80"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-3 text-amber-600" />
            <input
              type="text"
              placeholder="Search resources, topics, contributors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:bg-white shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const theme = getCategoryTheme(item.category);
            return (
              <div
                key={item.id}
                className={`p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-2xl ${theme.border} transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border shadow-xs ${theme.pill}`}>
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 border border-neutral-200">
                      {item.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-neutral-950 mb-2 leading-snug group-hover:text-amber-900 transition-colors">
                    {item.title}
                  </h3>

                  <div className="text-xs font-semibold text-neutral-600 mb-4 flex items-center gap-1.5">
                    <BookMarked size={14} className="text-amber-600" />
                    <span>Format: <strong className="text-neutral-900">{item.format}</strong></span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.topics.map((t: string, i: number) => (
                      <span
                        key={i}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-50/70 border border-amber-200/80 text-amber-950 shadow-xs"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-neutral-700">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white font-bold flex items-center justify-center text-[10px] shadow-xs">
                      {item.contributor.charAt(0)}
                    </div>
                    <span className="text-xs">{item.contributor}</span>
                  </div>

                  <button
                    onClick={() => alert(`Accessing "${item.title}". Included in SGC Member Knowledge Vault.`)}
                    className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-extrabold shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    Open Resource &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Share Knowledge Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="fixed inset-0 -z-10" onClick={() => setModalOpen(false)} />

            <div className="w-full max-w-lg rounded-2xl bg-white border border-neutral-200 shadow-2xl p-6 relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80">
                  <Share2 size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-950">
                    Share Knowledge With Cell
                  </h3>
                  <p className="text-xs text-neutral-500 font-normal">
                    Peer learning is the heart of SGC. Every tip helps a peer win.
                  </p>
                </div>
              </div>

              {successMsg && (
                <div className="my-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
                  <Check size={15} />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleShareSubmit} className="space-y-3.5 mt-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Resource / Topic Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Next.js 15 Server Components Mastery"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 shadow-xs"
                    >
                      <option>Web Dev</option>
                      <option>Hackathons</option>
                      <option>National Contests</option>
                      <option>Artificial Intelligence</option>
                      <option>Career</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      Resource Format
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cheat Sheet / Video"
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Key Topic Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. React, ThreeJS, Hackathon Pitch"
                    value={formData.topics}
                    onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Your Name &amp; Department
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Abbas (III Year AI&amp;DS)"
                    value={formData.contributor}
                    onChange={(e) => setFormData({ ...formData, contributor: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer mt-2"
                >
                  Publish Knowledge to Community
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
