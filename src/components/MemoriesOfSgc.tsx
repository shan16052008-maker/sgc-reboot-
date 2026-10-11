import { useState, useEffect } from "react";
import { 
  Lock, Unlock, Plus, Heart, 
  MapPin, Calendar, Sparkles, X, ArrowRight,
  Share2, CheckCircle2
} from "lucide-react";

interface MemoryItem {
  id: string;
  title: string;
  category: "MILESTONE" | "HACKATHON" | "CELEBRATION" | "CAMPUS";
  location: string;
  date: string;
  image: string;
  caption: string;
  author: string;
  likes: number;
}

const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: "mem-1",
    title: "Annual SGC Leadership Retreat & Campfire",
    category: "MILESTONE",
    location: "Yelagiri Hills, TN",
    date: "Aug 2024",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop",
    caption: "The entire council on our annual leadership retreat. Strategy brainstorming by the campfire, peer bonding, and unforgettable brotherhood memories.",
    author: "Council Core",
    likes: 48,
  },
  {
    id: "mem-2",
    title: "VIT Hackulus 2026 Midnight Sprint",
    category: "HACKATHON",
    location: "VIT Vellore Tech Campus",
    date: "Jan 2026",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    caption: "3:00 AM coffee run during the 36-hour hackathon. The exact hour we resolved the CARDIA 3D rendering pipeline and sealed 1st Place.",
    author: "Team CARDIA",
    likes: 62,
  },
  {
    id: "mem-3",
    title: "Alumni Homecoming & Dinner Meetup",
    category: "CELEBRATION",
    location: "Arcot Royal Dine, Ranipet",
    date: "Dec 2025",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop",
    caption: "Welcoming back our senior batches from Zoho, TCS, and Bangalore startups. Generations of SGC leadership united under one roof.",
    author: "Alumni Wing",
    likes: 54,
  },
  {
    id: "mem-4",
    title: "Post-SIH Celebration & Strategic Assembly",
    category: "MILESTONE",
    location: "Mahabalipuram Coast, TN",
    date: "Oct 2025",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop",
    caption: "Post-Smart India Hackathon celebration and fraternity assembly. Unwinding together, spontaneous tech debates, and planning next semester's roadmaps.",
    author: "Abbas & Juniors",
    likes: 41,
  },
  {
    id: "mem-5",
    title: "Farewell Tribute & Passing the Torch",
    category: "CELEBRATION",
    location: "CAHCET Seminar Hall",
    date: "May 2025",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop",
    caption: "Emotional send-off to our graduating batch of mentor seniors. The torch was officially passed with tears, mementos, and promises.",
    author: "SGC Executive Council",
    likes: 59,
  },
  {
    id: "mem-6",
    title: "Innovation Lab Late Night Hacks",
    category: "CAMPUS",
    location: "CAHCET Advanced Computing Lab",
    date: "Nov 2025",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
    caption: "Debugging edge-case webhooks with pizza boxes stacked high. True engineers are forged in the quiet hours of the college lab.",
    author: "Dev Core",
    likes: 37,
  },
];

interface MemoriesOfSgcProps {
  onOpenPortal?: () => void;
}

export default function MemoriesOfSgc({ onOpenPortal }: MemoriesOfSgcProps) {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem("sgc_member_logged_in") === "true";
  });
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [memories, setMemories] = useState<MemoryItem[]>(INITIAL_MEMORIES);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Upload Form State
  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newCategory, setNewCategory] = useState<"MILESTONE" | "HACKATHON" | "CELEBRATION" | "CAMPUS">("MILESTONE");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Sync with session storage if changed elsewhere
  useEffect(() => {
    const handleStorage = () => {
      if (sessionStorage.getItem("sgc_member_logged_in") === "true") {
        setIsUnlocked(true);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleUnlockWithPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim().toLowerCase();
    // Accept official passcodes: sgc, sgc2026, cahcet, or zeal
    if (clean === "sgc" || clean === "sgc2026" || clean === "cahcet" || clean === "zeal") {
      sessionStorage.setItem("sgc_member_logged_in", "true");
      setIsUnlocked(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleQuickUnlock = () => {
    sessionStorage.setItem("sgc_member_logged_in", "true");
    setIsUnlocked(true);
  };

  const handleLockGallery = () => {
    sessionStorage.removeItem("sgc_member_logged_in");
    setIsUnlocked(false);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImageUrl) return;

    const newMemory: MemoryItem = {
      id: `mem-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      location: newLocation || "CAHCET Campus",
      date: newDate || "Recent",
      image: newImageUrl,
      caption: newCaption || "Shared memory with the SGC fraternity.",
      author: newAuthor || "Verified Member",
      likes: 1,
    };

    setMemories([newMemory, ...memories]);
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploadOpen(false);
      // Reset form
      setNewTitle("");
      setNewLocation("");
      setNewDate("");
      setNewImageUrl("");
      setNewCaption("");
      setNewAuthor("");
    }, 1500);
  };

  const filtered = memories.filter((m) => {
    if (activeFilter === "ALL") return true;
    return m.category === activeFilter;
  });

  return (
    <section id="memories" className="py-24 relative overflow-hidden bg-[#FFFDF7] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-50 to-amber-50 text-rose-900 border border-rose-200/80 text-xs font-semibold tracking-wide mb-4 shadow-xs">
            <Lock size={13} className="text-rose-600" />
            CONFIDENTIAL ARCHIVE &bull; MEMBERS &amp; ALUMNI ONLY
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4 leading-tight">
            SGC Memories:{" "}
            <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 bg-clip-text text-transparent">
              Heritage &amp; Milestones
            </span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Private photo logs documenting our historic milestones, late-night hackathons,
            team dinners, and college life. Protected under confidential student access.
          </p>
        </div>

        {/* LOCKED STATE VIEW */}
        {!isUnlocked && (
          <div className="relative rounded-3xl overflow-hidden border border-neutral-300 shadow-xl bg-white p-6 sm:p-12">
            {/* Blurred Teaser Background */}
            <div className="absolute inset-0 filter blur-md opacity-25 pointer-events-none grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
              {INITIAL_MEMORIES.slice(0, 6).map((m) => (
                <div key={m.id} className="h-48 rounded-xl bg-neutral-200 overflow-hidden">
                  <img src={m.image} alt="Teaser" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Lock Guard Card */}
            <div className="relative z-10 max-w-lg mx-auto bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-2xl border border-neutral-200/90 shadow-2xl text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center mx-auto mb-5 shadow-lg">
                <Lock size={26} />
              </div>

              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1 rounded-md inline-block mb-3">
                RESTRICTED ACCESS
              </span>

              <h3 className="text-2xl font-extrabold text-neutral-950 mb-2">
                Confidential SGC Archive
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
                Milestone photographs, private hackathon journals, and fraternity memories are preserved exclusively for verified SGC students and alumni. Please authenticate to view.
              </p>

              {/* Passcode Unlock Form */}
              <form onSubmit={handleUnlockWithPasscode} className="space-y-3 mb-4">
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="Enter Passcode (e.g. sgc)"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setPasscodeError(false);
                    }}
                    className={`flex-1 px-4 py-2.5 rounded-xl bg-neutral-50 border text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none shadow-xs font-mono ${
                      passcodeError ? "border-rose-500 ring-2 ring-rose-200" : "border-neutral-200 focus:border-neutral-400"
                    }`}
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>Unlock</span>
                    <Unlock size={13} />
                  </button>
                </div>
                {passcodeError && (
                  <p className="text-[11px] text-rose-600 font-semibold text-left">
                    Incorrect passcode. Try <code className="bg-rose-50 px-1 py-0.5 rounded">sgc</code> or sign in via Member Portal.
                  </p>
                )}
              </form>

              {/* Alternative Quick Verify or Member Portal */}
              <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <button
                  type="button"
                  onClick={handleQuickUnlock}
                  className="text-amber-800 hover:text-amber-950 font-semibold inline-flex items-center gap-1 cursor-pointer underline underline-offset-2"
                >
                  <Sparkles size={12} className="text-amber-600" />
                  <span>One-Click Council Preview</span>
                </button>

                {onOpenPortal && (
                  <button
                    type="button"
                    onClick={onOpenPortal}
                    className="px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold transition-all cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Member Sign In</span>
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* UNLOCKED GALLERY VIEW */}
        {isUnlocked && (
          <div>
            {/* Top Controls Bar: Filter tabs & Share Memory CTA */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "ALL", label: "All Moments" },
                  { id: "MILESTONE", label: "Milestones" },
                  { id: "HACKATHON", label: "Hackathons" },
                  { id: "CELEBRATION", label: "Celebrations & Farewells" },
                  { id: "CAMPUS", label: "Lab & Campus Life" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      activeFilter === f.id
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                        : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Contribute SGC Memory +</span>
                </button>

                <button
                  onClick={handleLockGallery}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs transition-all cursor-pointer"
                  title="Lock Confidential Gallery"
                >
                  <Lock size={13} />
                  <span className="hidden sm:inline">Lock Gallery</span>
                </button>
              </div>
            </div>

            {/* Photo Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <article
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  className="group rounded-3xl overflow-hidden bg-white border border-neutral-200/80 shadow-sm hover:shadow-2xl hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative h-60 w-full overflow-hidden bg-neutral-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Category Pill */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 backdrop-blur-md text-neutral-900 border border-neutral-200 shadow-sm">
                          {item.category.replace("_", " ")}
                        </span>
                      </div>

                      {/* Location & Date Pill */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-semibold bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 rounded-xl backdrop-blur-xs">
                        <span className="flex items-center gap-1 truncate">
                          <MapPin size={12} className="text-amber-400 shrink-0" />
                          <span>{item.location}</span>
                        </span>
                        <span className="flex items-center gap-1 shrink-0 ml-2">
                          <Calendar size={12} className="text-rose-400 shrink-0" />
                          <span>{item.date}</span>
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6">
                      <h3 className="text-lg font-extrabold text-neutral-950 mb-2 leading-snug group-hover:text-amber-900 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-4 line-clamp-3">
                        {item.caption}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom: Contributor & Like Action */}
                  <div className="px-6 pb-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-neutral-500 font-medium text-[11px] flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-800 font-bold flex items-center justify-center text-[10px] border border-neutral-200">
                        {item.author.charAt(0)}
                      </span>
                      <span>By {item.author}</span>
                    </span>

                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200/70 font-bold text-xs transition-colors cursor-pointer"
                    >
                      <Heart size={13} className="text-rose-600 fill-rose-500" />
                      <span>{item.likes}</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* LIGHTBOX PREVIEW MODAL */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-3xl border border-neutral-300 shadow-2xl overflow-hidden p-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-black/70 hover:bg-black text-white shadow-lg transition-all cursor-pointer"
                aria-label="Close memory preview"
              >
                <X size={18} />
              </button>

              <div className="relative max-h-[70vh] overflow-hidden rounded-2xl bg-neutral-950 flex items-center justify-center">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="p-5 sm:p-6 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-rose-50 text-rose-900 border border-rose-200 px-2.5 py-0.5 rounded-md">
                      {selectedPhoto.category.replace("_", " ")}
                    </span>
                    <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1">
                      <MapPin size={12} />
                      {selectedPhoto.location} &bull; {selectedPhoto.date}
                    </span>
                  </div>

                  <span className="text-xs text-neutral-500 font-medium">
                    Contributed by {selectedPhoto.author}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-neutral-950 mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed font-normal">
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SHARE SGC MEMORY MODAL */}
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="fixed inset-0 -z-10" onClick={() => setIsUploadOpen(false)} />

            <div className="w-full max-w-lg rounded-3xl bg-white border border-neutral-200 shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsUploadOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-sm">
                  <Share2 size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-neutral-950">
                    Contribute SGC Memory
                  </h3>
                  <p className="text-xs text-neutral-500 font-normal">
                    Private fraternity moments are safely stored for SGC members &amp; alumni.
                  </p>
                </div>
              </div>

              {uploadSuccess && (
                <div className="my-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>Memory added to the confidential fraternity archive!</span>
                </div>
              )}

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Memory Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yelagiri Hills Leadership Retreat 2024"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 shadow-xs font-medium"
                    >
                      <option value="MILESTONE">Milestone Moment</option>
                      <option value="HACKATHON">Hackathon</option>
                      <option value="CELEBRATION">Dinner / Farewell</option>
                      <option value="CAMPUS">Lab &amp; Campus Life</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mahabalipuram, TN"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Approximate Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sept 2025"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Your Name / Batch
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Danish (Alumni '24)"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Photo URL (Cloudinary, Drive, or Direct Link)
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://res.cloudinary.com/... or https://images.unsplash.com/..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Memory Caption / Backstory
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Share what happened on this day, memorable highlights, or key breakthroughs..."
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs font-normal"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Publish Memory to SGC Vault
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
