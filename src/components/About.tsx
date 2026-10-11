import { useState } from "react";
import { 
  Heart, ShieldCheck, Flame, BookOpen, Trophy, Users, Award, 
  MapPin, Sparkles, School 
} from "lucide-react";
import { ABOUT_DETAILS, SGC_IDENTITY } from "../data/sgcData";

export default function About() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: "Autonomous Peer Culture",
      icon: Users,
      badge: "Culture",
      accent: "text-amber-600 bg-amber-50 border-amber-200",
      desc: "Founded on the core mantra 'OF THE STUDENTS, FOR THE STUDENTS, BY THE STUDENTS'. No passive lectures; instead, senior student leaders guide juniors through hands-on practice.",
    },
    {
      title: "Competitive Edge",
      icon: Trophy,
      badge: "Excellence",
      accent: "text-emerald-600 bg-emerald-50 border-emerald-200",
      desc: "Rigorous algorithmic problem solving and rapid prototype sprints that propelled our teams to 1st Place at Smart India Hackathon and VIT Hackulus 2026 (CARDIA 3D simulation).",
    },
    {
      title: "Daily KT Power Sprints",
      icon: BookOpen,
      badge: "Knowledge Transfer",
      accent: "text-sky-600 bg-sky-50 border-sky-200",
      desc: "30-minute daily workshops from 1:00 PM to 1:30 PM covering Generative AI, cloud deployment, debate tournaments, and placement interview simulations.",
    },
    {
      title: "Lifelong Alumni Fraternity",
      icon: Award,
      badge: "Network",
      accent: "text-purple-600 bg-purple-50 border-purple-200",
      desc: "A powerful network of 41+ verified alumni working at Zoho, TCS, Accenture, Honeywell, and leading tech startups, returning regularly to mentor juniors.",
    },
  ];

  const milestones = [
    {
      year: "2010",
      title: "Origin & Conception",
      desc: "Founded by Late Mr. Tanveer Ahmed & Mr. Mohammed Imran at CAHCET with a vision to make students industry-ready.",
      accent: "bg-amber-100 text-amber-900 border-amber-300",
    },
    {
      year: "2015",
      title: "Placement Breakthrough",
      desc: "Alumni cracked marquee corporate offers in Zoho, TCS, and Honeywell, validating the peer-guidance model.",
      accent: "bg-blue-100 text-blue-900 border-blue-300",
    },
    {
      year: "2020-25",
      title: "National Hackathon Dominance",
      desc: "Smart India Hackathon 1st Prize, Mini Project Expo 1st Prize, and competitive coding milestones across Tamil Nadu.",
      accent: "bg-emerald-100 text-emerald-900 border-emerald-300",
    },
    {
      year: "2026",
      title: "SGC Reboot & Modern AI",
      desc: "VIT Hackulus 2026 Winner (CARDIA 3D simulation) and launch of the modern interactive knowledge portal.",
      accent: "bg-purple-100 text-purple-900 border-purple-300",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#FFFDF7] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 border border-amber-200/80 text-xs font-semibold tracking-wide mb-4 shadow-xs">
            <Flame size={14} className="text-amber-600" />
            HERITAGE &amp; COMMUNITY ETHOS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4 leading-tight">
            Of the Students. For the Students.{" "}
            <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 bg-clip-text text-transparent">
              By the Students.
            </span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            {ABOUT_DETAILS.summary}
          </p>
        </div>

        {/* PRIMARY SHOWCASE 1: OUR STORY (Authentic SGC Group Photo) */}
        <div className="rounded-3xl bg-white border border-neutral-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Real SGC Group Image */}
            <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] bg-neutral-900 overflow-hidden group">
              <img
                src="https://res.cloudinary.com/dbqjkjl0c/image/upload/v1739543508/IMG_2803_su74x2.jpg"
                alt="SGC Group Photo - Students of SGC"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-neutral-950 font-bold text-xs shadow-lg mb-2 w-fit">
                  <Sparkles size={13} />
                  Original SGC Fraternity &bull; Students of SGC
                </span>
                <p className="text-white font-medium text-xs sm:text-sm drop-shadow-md">
                  Active council members, mentors, and student volunteers assembled at CAHCET campus.
                </p>
              </div>
            </div>

            {/* Authentic Founding Text */}
            <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-[11px] font-mono tracking-widest uppercase bg-amber-100 border border-amber-300 px-3 py-1 rounded-md font-bold text-amber-900">
                    ESTABLISHED IN 2010
                  </span>
                  <span className="text-[11px] font-mono tracking-widest uppercase bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-md font-semibold text-neutral-700">
                    OUR STORY
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-4">
                  Empowering Talent &amp; Unveiling Hidden Potential
                </h3>

                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-4">
                  <strong className="text-neutral-950 font-bold">Students Guidance Cell (SGC)</strong> was established in <strong className="text-neutral-900">2010</strong> by <strong className="text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">Late Mr. Tanveer Ahmed</strong> and <strong className="text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">Mr. Mohammed Imran</strong>, dedicated to empowering students professionally.
                </p>

                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-4">
                  Grounded in the timeless mantra <span className="font-bold italic text-neutral-950 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">of, for, and by the students</span>, SGC organizes diverse events, unveiling hidden talents. Through these initiatives, it nurtures technical, communication, and leadership skills, ensuring remarkable career outcomes and aspiring to elevate every student&apos;s professionalism to new heights.
                </p>

                <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                  Our dedicated team of faculty members, alumni, and student volunteers work tirelessly to create a supportive environment where every student can thrive academically, professionally, and personally.
                </p>

                {/* Key badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs">
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-900 shadow-xs shrink-0">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-amber-800">Motto</div>
                      <div className="text-neutral-900 font-bold">&ldquo;{SGC_IDENTITY.motto}&rdquo;</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200/70 text-xs">
                    <div className="p-2 rounded-lg bg-indigo-100 text-indigo-900 shadow-xs shrink-0">
                      <Heart size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-indigo-800">Fraternity</div>
                      <div className="text-neutral-900 font-bold">100% Peer Led</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>Autonomous Student Development Body</span>
                <span className="font-semibold text-neutral-800">CAHCET &bull; 16+ Years of Legacy</span>
              </div>
            </div>
          </div>
        </div>

        {/* PRIMARY SHOWCASE 2: ABOUT OUR COLLEGE (Authentic CAHCET Campus Photo) */}
        <div className="rounded-3xl bg-white border border-neutral-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* College Narrative */}
            <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between order-2 lg:order-1">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-[11px] font-mono tracking-widest uppercase bg-sky-100 border border-sky-300 px-3 py-1 rounded-md font-bold text-sky-900">
                    ESTABLISHED IN 1998
                  </span>
                  <span className="text-[11px] font-mono tracking-widest uppercase bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-md font-bold text-emerald-900">
                    CAMPUS HERITAGE
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-4">
                  About Our College: CAHCET
                </h3>

                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-4">
                  <strong className="text-neutral-950 font-bold">C. Abdul Hakeem College Of Engineering And Technology</strong> has been a beacon of excellence in education since <strong className="text-neutral-900">1998</strong>. With a rich history of academic achievements and a forward-looking approach to education, our college has consistently ranked among the top institutions in the country.
                </p>

                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-4">
                  A well-established and well-organized College of Engineering is the desired destination of a vast majority of students. One such role model of a college is located at a distance of <strong className="text-neutral-900 font-semibold">100 kms from Anna International Airport, Chennai</strong> and at <strong className="text-neutral-900 font-semibold">4 kms from Arcot</strong>, the capital of Nawabs who ruled one-fourth of South India.
                </p>

                <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                  Right from the year of its inception, the college is consistently producing scores of first class graduates, scores of graduates with high distinction and graduates with University Rank or other academic credentials. We pride ourselves on state-of-the-art facilities, distinguished faculty, and a curriculum balancing theoretical knowledge with practical skills.
                </p>

                {/* College Key Facts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70 text-xs">
                    <div className="p-2 rounded-lg bg-sky-100 text-sky-900 shadow-xs shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-neutral-500">Location</div>
                      <div className="text-neutral-900 font-bold">Melvisharam, Arcot &bull; 100km from Chennai</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/70 text-xs">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-900 shadow-xs shrink-0">
                      <School size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-neutral-500">Affiliation</div>
                      <div className="text-neutral-900 font-bold">Anna University &amp; AICTE Approved</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>Nurturing responsible citizens &amp; high achievers</span>
                <span className="font-semibold text-neutral-800">NBA Accredited Programs</span>
              </div>
            </div>

            {/* Real CAHCET Campus Image */}
            <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] bg-neutral-900 overflow-hidden group order-1 lg:order-2">
              <img
                src="https://res.cloudinary.com/dbqjkjl0c/image/upload/v1739541663/cahcet_top_pcngpd.jpg"
                alt="CAHCET Campus - C. Abdul Hakeem College of Engineering & Technology"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500 text-neutral-950 font-bold text-xs shadow-lg mb-2 w-fit">
                  <School size={13} />
                  CAHCET Main Campus View
                </span>
                <p className="text-white font-medium text-xs sm:text-sm drop-shadow-md">
                  Aerial view of C. Abdul Hakeem College of Engineering and Technology, Melvisharam.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Interactive Pillars */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/80 shadow-md mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase bg-indigo-100 border border-indigo-300 px-3 py-1 rounded-md font-bold text-indigo-900">
                THE 4 CORE PILLARS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 mt-3">
                What Powers the SGC Machine
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md">
              Select any pillar below to explore our operational methodology and student growth framework.
            </p>
          </div>

          {/* Pillar Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActivePillar(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                    activePillar === idx
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-md scale-[1.02]"
                      : "bg-neutral-50/70 hover:bg-neutral-100 text-neutral-800 border-neutral-200/80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      activePillar === idx 
                        ? "bg-white/20 text-white border-white/30" 
                        : p.accent
                    }`}>
                      {p.badge}
                    </span>
                    <Icon size={18} className={activePillar === idx ? "text-amber-400" : "text-neutral-500"} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold">
                    {p.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Details Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-neutral-50 via-amber-50/30 to-sky-50/30 border border-neutral-200/80">
            <div className="flex items-center gap-3 mb-3 font-extrabold text-base text-neutral-950">
              <span className={`text-xs font-bold px-3 py-1 rounded-lg border shadow-xs ${pillars[activePillar].accent}`}>
                {pillars[activePillar].badge}
              </span>
              <span>{pillars[activePillar].title}</span>
            </div>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
              {pillars[activePillar].desc}
            </p>
          </div>
        </div>

        {/* Milestone Growth Timeline */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/80 shadow-md">
          <div className="mb-8">
            <span className="text-[11px] font-mono tracking-widest uppercase bg-rose-100 border border-rose-300 px-3 py-1 rounded-md font-bold text-rose-900">
              EVOLUTION &amp; MILESTONES
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 mt-3">
              Over a Decade of Continuous Growth
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Tracing the journey from a classroom circle to a recognized multi-domain powerhouse.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-neutral-50/70 border border-neutral-200/70 hover:border-neutral-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full ${m.accent} border text-xs font-extrabold mb-3 shadow-xs`}>
                    {m.year}
                  </span>
                  <h4 className="font-extrabold text-base text-neutral-950 mb-2">
                    {m.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
