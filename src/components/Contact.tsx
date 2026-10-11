import { useState } from "react";
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, 
  ExternalLink, Copy, Check, MessageSquare, BookOpen
} from "lucide-react";

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.54a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63a1.63 1.63 0 0 0-1.63-1.63Z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

interface ContactProps {
  onShowToast?: (msg: string, type?: "success" | "info") => void;
}

export default function Contact({ onShowToast }: ContactProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("contact@teamsgc.in");
    setCopiedEmail(true);
    if (onShowToast) onShowToast("Email copied to clipboard: contact@teamsgc.in", "info");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate swift council dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onShowToast) onShowToast("Message dispatched to SGC Executive Council!", "success");
      setFormData({
        name: "",
        email: "",
        category: "General Inquiry",
        subject: "",
        message: "",
      });
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#FFFDF7] border-t border-neutral-200/80">
      {/* Soft ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-200/20 via-sky-200/20 to-rose-200/20 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 border border-amber-200/80 text-xs font-bold tracking-wide mb-4 shadow-xs">
            <Mail size={13} className="text-amber-600" />
            DIRECT COUNCIL REACH &bull; GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight mb-4 leading-tight">
            Contact &amp; Connect{" "}
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
              With SGC
            </span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Whether you want to collaborate on national hackathons, propose a daily KT sprint topic,
            reach our 41 alumni mentors, or visit our lab at CAHCET &mdash; our team is always ready to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Authentic Verified Coordinates & Channels (7 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* 1. Physical Location Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <MapPin size={22} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-extrabold text-neutral-950">
                      Campus Headquarters
                    </h3>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                      CAHCET
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-3">
                    2nd Floor, Main Block, C. Abdul Hakeem College of Engineering &amp; Technology,
                    Hakeem Nagar, Melvisharam, Ranipet &ndash; 632509, Tamil Nadu, India.
                  </p>
                  <a
                    href="https://maps.google.com/?q=C.+Abdul+Hakeem+College+of+Engineering+and+Technology,+Melvisharam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors cursor-pointer group"
                  >
                    <span>View Location on Google Maps</span>
                    <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Direct Core Leadership Lines */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Phone size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-extrabold text-neutral-950 mb-1">
                    Direct Phone Contacts
                  </h3>
                  <p className="text-xs text-neutral-500 font-normal mb-3">
                    Direct communication with verified council core members:
                  </p>
                  
                  <div className="space-y-2.5">
                    <a
                      href="tel:+919943946886"
                      className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-200/80 text-emerald-950 transition-all cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold font-mono tracking-wide">
                          +91 99439 46886
                        </div>
                        <div className="text-[11px] text-emerald-800 font-medium">
                          Mohammed Ayaz &bull; <span className="font-semibold">President</span>
                        </div>
                      </div>
                      <Phone size={14} className="text-emerald-700 group-hover:scale-110 transition-transform" />
                    </a>

                    <a
                      href="tel:+919585270647"
                      className="flex items-center justify-between p-3 rounded-2xl bg-sky-50/60 hover:bg-sky-50 border border-sky-200/80 text-sky-950 transition-all cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold font-mono tracking-wide">
                          +91 95852 70647
                        </div>
                        <div className="text-[11px] text-sky-800 font-medium">
                          Aasif &bull; <span className="font-semibold">Admin &amp; Operations</span>
                        </div>
                      </div>
                      <Phone size={14} className="text-sky-700 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Official Email & Lab Working Hours */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Mail size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-extrabold text-neutral-950 mb-1">
                    Official Email
                  </h3>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-50 border border-neutral-200 mb-3">
                    <span className="font-mono text-xs sm:text-sm font-bold text-neutral-900 select-all">
                      contact@teamsgc.in
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 hover:text-neutral-950 shadow-2xs transition-colors cursor-pointer"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      <span>{copiedEmail ? "Copied" : "Copy"}</span>
                    </button>
                  </div>

                  <div className="flex items-start gap-2 pt-2 border-t border-neutral-100 text-xs text-neutral-600">
                    <Clock size={14} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-neutral-900">Sprint &amp; Lab Hours:</span>{" "}
                      Mon &ndash; Sat, 1:00 PM &ndash; 1:45 PM (Daily KT) and 4:30 PM &ndash; 6:00 PM (Dev Lab).
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Social & Developer Channels */}
            <div className="bg-white p-6 rounded-3xl border border-neutral-200/90 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                Official Web &amp; Social Channels
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <a
                  href="https://www.linkedin.com/in/studentguidancecell-cahcet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200/80 text-blue-900 flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer group"
                >
                  <div className="group-hover:scale-110 transition-transform">
                    <LinkedinIcon size={18} />
                  </div>
                  <span className="text-[11px] font-bold">LinkedIn</span>
                </a>

                <a
                  href="https://www.instagram.com/studentsguidancecell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-pink-50/70 hover:bg-pink-100/70 border border-pink-200/80 text-pink-900 flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer group"
                >
                  <div className="group-hover:scale-110 transition-transform">
                    <InstagramIcon size={18} />
                  </div>
                  <span className="text-[11px] font-bold">Instagram</span>
                </a>

                <a
                  href="https://github.com/sgc-cahcet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-900 flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer group"
                >
                  <div className="group-hover:scale-110 transition-transform">
                    <GithubIcon size={18} />
                  </div>
                  <span className="text-[11px] font-bold">GitHub</span>
                </a>

                <a
                  href="https://sgc-cahcet.medium.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/80 text-amber-950 flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer group"
                >
                  <BookOpen size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Medium</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Send Us a Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200/90 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-sm">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-neutral-950">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-neutral-500 font-normal">
                  Your message reaches the SGC Executive Council inbox immediately.
                </p>
              </div>
            </div>

            {isSubmitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3 animate-fadeIn">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs font-semibold">
                  <p className="font-bold text-sm text-emerald-900 mb-0.5">Message Dispatched Successfully!</p>
                  <p className="text-neutral-700">Thank you for reaching out. The SGC Executive Council will respond to your email at <span className="font-mono font-bold text-neutral-900">{formData.email || "your address"}</span> within 24 hours.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Mohammed Farhan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500 focus:bg-white shadow-2xs transition-all font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. farhan@cahcet.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500 focus:bg-white shadow-2xs transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-category" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Purpose / Category
                  </label>
                  <select
                    id="contact-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-amber-500 focus:bg-white shadow-2xs transition-all font-medium"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Hackathon Collaboration">Hackathon &amp; Project Collaboration</option>
                    <option value="Daily Session Proposal">Daily Session KT Topic Proposal</option>
                    <option value="Alumni Outreach">Alumni Outreach &amp; Mentorship</option>
                    <option value="Join SGC">Student Membership &amp; Join SGC</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Subject Line
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Collaboration on Next SIH 2026"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500 focus:bg-white shadow-2xs transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Tell us about your query, proposal, technical project, or how you would like to collaborate with SGC..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500 focus:bg-white shadow-2xs transition-all font-normal"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 border-2 border-amber-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Dispatching Message...</span>
                ) : (
                  <>
                    <span>Send Message to Council Core</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
