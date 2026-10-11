import { useState, useEffect } from "react";
import { X, Lock, Mail, User, CheckCircle, ArrowRight, Sparkles, ExternalLink, ShieldCheck } from "lucide-react";
import { SGC_IDENTITY, SOCIAL_LINKS } from "../data/sgcData";
import { isSupabaseConfigured, signInMember, signUpMember, supabase } from "../lib/supabase";

interface MemberPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberPortalModal({ isOpen, onClose }: MemberPortalModalProps) {
  const [tab, setTab] = useState<"LOGIN" | "REGISTER" | "DASHBOARD_PREVIEW">("LOGIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [dept, setDept] = useState("CSE • III Year");
  const [role, setRole] = useState<"Trainee" | "Session Handler" | "Executive Lead">("Trainee");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  // Check existing session if Supabase is connected
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user?.email) {
          setCurrentUserEmail(session.user.email);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user?.email) {
          setCurrentUserEmail(session.user.email);
        } else {
          setCurrentUserEmail(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback(null);

    if (tab === "LOGIN") {
      if (!email.includes("@")) {
        setIsLoading(false);
        setFeedback({ type: "error", text: "Please enter a valid college or personal email address." });
        return;
      }
      if (password.length < 6) {
        setIsLoading(false);
        setFeedback({ type: "error", text: "Password must be at least 6 characters." });
        return;
      }

      if (isSupabaseConfigured) {
        const { data, error } = await signInMember(email, password);
        setIsLoading(false);
        if (error) {
          setFeedback({ type: "error", text: error.message || "Failed to authenticate with Supabase Auth." });
          return;
        }
        setCurrentUserEmail(data.user?.email || email);
        setFeedback({
          type: "success",
          text: `Welcome back! Authenticated via Supabase Auth (${data.user?.email}). Redirecting...`,
        });
        setTimeout(() => {
          setTab("DASHBOARD_PREVIEW");
        }, 1200);
      } else {
        // Fallback for local development or demo
        setTimeout(() => {
          setIsLoading(false);
          setFeedback({
            type: "success",
            text: `Welcome back! Signed in as ${role} (Local workspace preview).`,
          });
          setTimeout(() => {
            setTab("DASHBOARD_PREVIEW");
          }, 1000);
        }, 500);
      }
    } else {
      // REGISTER
      if (!name || !regNo) {
        setIsLoading(false);
        setFeedback({ type: "error", text: "Please provide your full name and college Register Number." });
        return;
      }

      if (isSupabaseConfigured) {
        const { data, error } = await signUpMember(email, password, {
          full_name: name,
          reg_no: regNo,
          department: dept,
          role,
        });
        setIsLoading(false);
        if (error) {
          setFeedback({ type: "error", text: error.message || "Could not register user with Supabase." });
          return;
        }
        setCurrentUserEmail(data.user?.email || email);
        setFeedback({
          type: "success",
          text: "Registration successful! Account created in Supabase Auth. Check inbox if email confirmation is required.",
        });
        setTimeout(() => {
          setTab("DASHBOARD_PREVIEW");
        }, 1400);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setFeedback({
            type: "success",
            text: "Registration application received! Verification dispatched to SGC Executive Council.",
          });
          setTimeout(() => {
            setTab("DASHBOARD_PREVIEW");
          }, 1000);
        }, 500);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-xl rounded-2xl bg-white border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with SGC Logo */}
        <div className="p-5 border-b border-neutral-100 bg-neutral-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 p-1 shadow-xs flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="SGC Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-neutral-900 tracking-tight">
                  SGC Member Portal
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                  portal.teamsgc.in
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-normal">
                Autonomous Peer Fraternity &bull; {SGC_IDENTITY.motto}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-neutral-100 bg-neutral-50/50 text-xs font-semibold p-1 gap-1">
          <button
            onClick={() => {
              setTab("LOGIN");
              setFeedback(null);
            }}
            className={`flex-1 py-2 text-center rounded-lg transition-all ${
              tab === "LOGIN" ? "bg-white text-neutral-950 shadow-xs" : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Member Sign In
          </button>
          <button
            onClick={() => {
              setTab("REGISTER");
              setFeedback(null);
            }}
            className={`flex-1 py-2 text-center rounded-lg transition-all ${
              tab === "REGISTER" ? "bg-white text-neutral-950 shadow-xs" : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            New Student Onboarding
          </button>
          <button
            onClick={() => {
              setTab("DASHBOARD_PREVIEW");
              setFeedback(null);
            }}
            className={`flex-1 py-2 text-center rounded-lg transition-all ${
              tab === "DASHBOARD_PREVIEW" ? "bg-white text-neutral-950 shadow-xs" : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Portal Preview
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {feedback && (
            <div
              className={`p-3.5 rounded-xl border text-xs font-medium flex items-center gap-2 ${
                feedback.type === "success"
                  ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                  : "bg-red-50 text-red-900 border-red-200"
              }`}
            >
              <CheckCircle size={15} />
              <span>{feedback.text}</span>
            </div>
          )}

          {tab === "LOGIN" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Role Classification
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Trainee", "Session Handler", "Executive Lead"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        role === r
                          ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                          : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Student / College Email
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-3 text-neutral-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@cahcet.edu.in or personal email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-3 text-neutral-400" />
                  <input
                    type="password"
                    required
                    placeholder="Enter your member password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-1.5 font-normal text-neutral-600 cursor-pointer">
                  <input type="checkbox" className="rounded accent-neutral-900" defaultChecked />
                  <span>Remember session on this device</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password reset link has been dispatched to college webmaster.")}
                  className="font-semibold text-neutral-900 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? "Authenticating Member..." : "Enter Official Member Workspace"}
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          {tab === "REGISTER" && (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-normal text-neutral-700 flex items-center gap-2">
                <Sparkles size={15} className="text-amber-500 shrink-0" />
                <span>Open to all passionate CAHCET students across CSE, AI&amp;DS, ECE, MECH, and IT.</span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-neutral-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mohamed Zahangir"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    College Register Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 510422104001"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Department &amp; Year
                  </label>
                  <select
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 shadow-xs"
                  >
                    <option>CSE &bull; III Year</option>
                    <option>AI&amp;DS &bull; III Year</option>
                    <option>CSE &bull; II Year</option>
                    <option>AI&amp;DS &bull; II Year</option>
                    <option>ECE / MECH &bull; Any Year</option>
                    <option>I Year Foundation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  College / Primary Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@cahcet.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-3 text-neutral-400" />
                  <input
                    type="password"
                    required
                    placeholder="Create a password (min 6 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 shadow-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? "Submitting Application..." : "Submit Membership Application"}
                <CheckCircle size={15} />
              </button>
            </form>
          )}

          {tab === "DASHBOARD_PREVIEW" && (
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                      {currentUserEmail ? currentUserEmail.slice(0, 2).toUpperCase() : "MZ"}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-neutral-900">
                        {currentUserEmail ? currentUserEmail : "Mohamed Zahangir (III Year AI&DS)"}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        {currentUserEmail ? `Role: ${role} • Supabase Verified` : "Role: Administrator • VIT Hackulus '26 Winner (CARDIA)"}
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck size={11} />
                    {isSupabaseConfigured ? "SUPABASE LIVE" : "ACTIVE MEMBER"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 text-center">
                  <div className="p-2.5 rounded-lg bg-white border border-neutral-200/80 shadow-xs">
                    <div className="text-lg font-bold text-neutral-900">100%</div>
                    <div className="text-[10px] text-neutral-500">KT Attendance</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-neutral-200/80 shadow-xs">
                    <div className="text-lg font-bold text-neutral-900">1st</div>
                    <div className="text-[10px] text-neutral-500">Hackulus &apos;26</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-neutral-200/80 shadow-xs">
                    <div className="text-lg font-bold text-neutral-900">4+</div>
                    <div className="text-[10px] text-neutral-500">Projects Built</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase text-neutral-700">
                  Upcoming Internal Sprint Tasks
                </div>
                <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
                  <span className="font-medium text-neutral-800">&bull; Next Daily Session: Full-Stack React 19 sprint</span>
                  <span className="text-neutral-500 font-mono">1:00 PM IST</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
                  <span className="font-medium text-neutral-800">&bull; Smart India Hackathon internal team registration</span>
                  <span className="text-emerald-700 font-semibold">Open</span>
                </div>
              </div>

              <a
                href={SOCIAL_LINKS.portal}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 font-semibold text-xs border border-amber-200 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Launch Live Production Portal (teamsgc.in)</span>
                <ExternalLink size={13} />
              </a>
            </div>
          )}
        </div>

        {/* Footer info note */}
        <div className="p-3 bg-neutral-50 border-t border-neutral-100 text-center text-[11px] font-mono text-neutral-500 flex items-center justify-center gap-2">
          <span>Secure Student Authentication &bull; CAHCET Melvisharam Campus Network</span>
          {isSupabaseConfigured && (
            <span className="text-emerald-700 font-bold">• Supabase Connected</span>
          )}
        </div>
      </div>
    </div>
  );
}
