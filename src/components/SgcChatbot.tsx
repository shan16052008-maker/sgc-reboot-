import { useState, useRef, useEffect } from "react";
import { 
  X, Send, Bot, 
  ArrowUpRight, RefreshCw, Flame, Volume2, VolumeX 
} from "lucide-react";
import { SGC_IDENTITY, ALL_ALUMNI_RECORDS, TEAM_MEMBERS } from "../data/sgcData";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actionLink?: { label: string; href: string };
  chips?: string[];
}

export default function SgcChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = [
    {
      id: "welcome",
      sender: "bot",
      text: `Hello! 👋 I'm **ZealBot**, the personalized AI Guide for **Student Guidance Cell (SGC)** at CAHCET.\n\nDriven by our motto *"${SGC_IDENTITY.motto}"* and our mantra *"OF THE STUDENTS, FOR THE STUDENTS, BY THE STUDENTS"*, I can assist you with daily sessions, hackathon roadmaps, placement records, leads, or alumni networks.`,
      timestamp: "Just now",
      chips: [
        "What sessions are scheduled this week?",
        "How did members win SIH and Hackulus?",
        "Where are SGC alumni working?",
        "Who is in the 2026-27 core team?",
        "How can I share knowledge or join?"
      ]
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages, isTyping]);

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { AudioContext: typeof AudioContext }).AudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(580, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // AudioContext fallback
    }
  };

  const generateBotReply = (query: string): { text: string; actionLink?: { label: string; href: string }; chips?: string[] } => {
    const q = query.toLowerCase();

    if (q.includes("motto") || q.includes("mantra") || q.includes("zeal")) {
      return {
        text: `🔥 **Official SGC Motto & Philosophy**:\n• **Motto**: "${SGC_IDENTITY.motto}" (Zeal and Zest to Be)\n• **Core Mantra**: "OF THE STUDENTS • FOR THE STUDENTS • BY THE STUDENTS"\n• **Founders**: Late Mr. Tanveer Ahmed & Mr. Mohammed Imran (Est. 2010).\n\nSGC is built to foster autonomous peer mentorship, turning curious learners into technical leaders.`,
        actionLink: { label: "Learn About SGC Heritage", href: "#about" },
        chips: ["Who are the leads?", "Explore Hackathon Wins"]
      };
    }

    if (q.includes("session") || q.includes("schedule") || q.includes("daily") || q.includes("timetable")) {
      return {
        text: `📅 **Peer-Led Daily Power Sessions** run Monday to Friday from **1:00 PM to 1:30 PM IST** in college innovation pods:\n\n• **Week 1**: Orientation (Samiiksha C), Deductive Logic (Pooja Sri M), Financial Literacy (Affan Basha A).\n• **Week 2**: AI Prompting & GenAI (Zakwan Haaziq), Critical Debate (Mohamed Abbas T A), Hackathon Prep (Mohammed Yasar M).\n\nAll verified photos from our classroom sessions are available in the schedule section!`,
        actionLink: { label: "View Daily Sessions & Photos", href: "#daily-sessions" },
        chips: ["Who is Zakwan Haaziq?", "How can I join daily sessions?"]
      };
    }

    if (q.includes("hackathon") || q.includes("sih") || q.includes("hackulus") || q.includes("win") || q.includes("achievement")) {
      return {
        text: `🏆 **Major Proven Victories**:\n1. **VIT Hackulus 2026 Winner**: ₹50,000+ prize won by Mohamed Zahangir (CARDIA 3D Medical Simulation).\n2. **Smart India Hackathon**: 1st Place National Trophy & ₹1,00,000 Cash Prize.\n3. **National Level Project Expo**: 1st Prize.\n4. **IBM & Skill India Honors**: Multiple certified achievements.`,
        actionLink: { label: "Explore Verified Proofs", href: "#achievements" },
        chips: ["What is CARDIA?", "Where are SGC alumni working?"]
      };
    }

    if (q.includes("alumni") || q.includes("placement") || q.includes("company") || q.includes("salary") || q.includes("7.5")) {
      const companies = ["Zoho", "TCS", "Accenture", "Honeywell", "Startups"];
      const totalAlumni = ALL_ALUMNI_RECORDS.length;
      return {
        text: `💼 **Placements & Alumni Fraternity**:\n• **Peak Placement Package**: 7.5 LPA.\n• **Network Size**: ${totalAlumni} verified alumni tracked in our directory.\n• **Top Employers**: ${companies.join(", ")}, plus leading tech startups.\n• **Notable Alumni**: Abubakkar Siddiq (TCS), Dhanush Kandhan (Letretro), Harish G, and more.\n\nOur alumni actively mentor 3rd and 4th-year students for technical interviews and coding rounds.`,
        actionLink: { label: "Browse All 41 Alumni Profiles", href: "#team" },
        chips: ["Show Zoho alumni", "How to connect on LinkedIn?"]
      };
    }

    if (q.includes("lead") || q.includes("team") || q.includes("president") || q.includes("council") || q.includes("who is")) {
      const president = TEAM_MEMBERS.find((m) => m.role.toLowerCase().includes("president"))?.name || "Mohammed Ayaz.A";
      const admins = TEAM_MEMBERS.filter((m) => m.role.toLowerCase().includes("admin")).map((m) => m.name).join(", ");
      return {
        text: `👥 **2026–27 Executive Council**:\n• **President**: ${president} (IV Year CSE)\n• **Vice Presidents**: Kashif Ulhaq K, Mohamed Melhan K O\n• **Administrators**: ${admins}\n• **Faculty Advisor**: Raja Rajeswari S\n• Plus 15+ Session Handlers across GenAI, Full-Stack, and Logic.\n\nAll members have real portrait photos and LinkedIn links on the website!`,
        actionLink: { label: "View Active Council Directory", href: "#team" },
        chips: ["Who is Mohamed Zahangir?", "How to apply as a member?"]
      };
    }

    if (q.includes("contact") || q.includes("phone") || q.includes("call") || q.includes("email") || q.includes("where") || q.includes("address") || q.includes("location") || q.includes("reach")) {
      return {
        text: `📍 **Official SGC Contact & Council Coordinates**:\n• **Location**: 2nd Floor, Main Block, CAHCET Campus, Hakeem Nagar, Melvisharam - 632509, Tamil Nadu.\n• **President Phone**: +91 99439 46886 (Mohammed Ayaz)\n• **Admin Phone**: +91 95852 70647 (Aasif)\n• **Email**: contact@teamsgc.in\n• **Social Channels**: LinkedIn, Instagram, GitHub & Medium (@sgc-cahcet)\n\nYou can also dispatch a message directly via the Contact section!`,
        actionLink: { label: "Go to Contact Section", href: "#contact" },
        chips: ["Who is the president?", "What time are daily sessions?"]
      };
    }

    if (q.includes("join") || q.includes("register") || q.includes("portal") || q.includes("share") || q.includes("contribute")) {
      return {
        text: `🚀 **How to Get Involved**:\n1. **Member Portal**: Register through our student portal using your CAHCET Register Number.\n2. **Daily Sprints**: Attend daily KT sessions at 1:00 PM.\n3. **Knowledge Commons**: Anyone can share a guide, cheat sheet, or roadmap in the Knowledge Discovery Hub.`,
        actionLink: { label: "Open Knowledge Hub", href: "#knowledge-discovery" },
        chips: ["Tell me about the motto", "What are the core pillars?"]
      };
    }

    return {
      text: `Thanks for asking! As **ZealBot**, I can give you detailed answers on:\n• 📅 **Daily 1:00 PM Sessions** & classroom photos\n• 🏆 **National Hackathon Wins** (SIH, VIT Hackulus)\n• 💼 **41 Alumni** at Zoho, TCS, Honeywell\n• 👥 **2026–27 Student Council** & Leads\n• 💡 **Knowledge Sharing** & Member Registration`,
      chips: [
        "What sessions are scheduled this week?",
        "Where are alumni working?",
        "Tell me about the motto & mantra"
      ]
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    playClickSound();

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const replyData = generateBotReply(query);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: replyData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionLink: replyData.actionLink,
        chips: replyData.chips
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      playClickSound();
    }, 450);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => {
            playClickSound();
            setIsOpen(true);
          }}
          className="fixed bottom-20 right-5 sm:bottom-6 sm:right-6 z-40 p-3.5 rounded-full bg-neutral-950 text-white shadow-2xl hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer group"
          aria-label="Open SGC AI Assistant"
        >
          <div className="relative">
            <Bot size={20} className="text-amber-400 group-hover:rotate-12 transition-transform" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
            )}
          </div>
          <span className="text-xs font-semibold pr-1 hidden sm:inline">Ask ZealBot</span>
        </button>
      )}

      {/* Modern Executive Chat Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[410px] h-[580px] max-h-[86vh] rounded-2xl bg-white border border-neutral-200/90 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-4 border-b border-neutral-100 bg-neutral-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 p-1 flex items-center justify-center shadow-xs shrink-0">
                <img src="/logo.png" alt="SGC" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-neutral-900">
                    ZealBot
                  </h3>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                    SGC AI
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-medium">
                  <Flame size={11} className="text-amber-600" />
                  <span>{SGC_IDENTITY.motto}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-colors"
                title={soundEnabled ? "Mute audio" : "Enable audio"}
              >
                {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setMessages(initialMessages);
                }}
                className="p-1.5 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-colors"
                title="Reset Conversation"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-colors"
                title="Close chat"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-neutral-900 text-white font-medium"
                      : "bg-neutral-50 text-neutral-900 border border-neutral-200/70"
                  }`}
                >
                  <div className="whitespace-pre-wrap">
                    {msg.text.split("\n").map((line, i) => (
                      <p key={i} className={line === "" ? "h-2" : "mb-1 last:mb-0"}>
                        {line}
                      </p>
                    ))}
                  </div>

                  {msg.actionLink && (
                    <div className="mt-2.5 pt-2 border-t border-neutral-200/50">
                      <a
                        href={msg.actionLink.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 font-semibold text-amber-700 hover:underline text-[11px]"
                      >
                        <span>{msg.actionLink.label}</span>
                        <ArrowUpRight size={12} />
                      </a>
                    </div>
                  )}
                </div>

                {/* Optional Chips */}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(chip)}
                        className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200 transition-all text-left cursor-pointer"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-neutral-400 mt-1 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60 text-neutral-500 w-24">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse delay-200" />
                <span className="text-[10px] ml-1 font-mono">Typing</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Bar */}
          <div className="px-3 py-2 border-t border-neutral-100 bg-neutral-50/50 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {[
              "📅 Sessions This Week",
              "🏆 Hackathons & Wins",
              "💼 7.5 LPA Placement",
              "🔥 Motto & Mantra",
              "👥 Who are the Leads?"
            ].map((quick, i) => (
              <button
                key={i}
                onClick={() => handleSend(quick)}
                className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 transition-colors cursor-pointer"
              >
                {quick}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-neutral-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about SGC (sessions, wins, alumni)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 text-xs font-normal focus:outline-none focus:border-neutral-400"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-40 transition-all cursor-pointer shadow-xs"
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
