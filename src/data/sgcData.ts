export interface Announcement {
  id: string;
  title: string;
  content: string;
  image: string;
  link?: string;
  linkText?: string;
  tag: string;
}

export interface Achievement {
  id: string;
  heading: string;
  description: string;
  image: string;
  badge: string;
  link: string;
  date?: string;
}

export interface DailySessionItem {
  id: string;
  title: string;
  date: string;
  time: string;
  handler: string;
  domain: string;
  overview: string;
  image?: string;
  status: "Completed" | "Upcoming" | "Active";
}

export interface WeekSchedule {
  weekNumber: number;
  weekTitle: string;
  dateRange: string;
  status: "Completed" | "Coming Soon";
  sessions: DailySessionItem[];
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface TeamMemberData {
  name: string;
  role: string;
  department: string;
  year: string;
  image: string;
  linkedin?: string;
  category: "Office Bearer" | "Lead & Handler" | "Committee Member";
}

export interface AlumniRecord {
  name: string;
  department: string;
  currentPosition: string;
  company: string;
  contact: string;
}

export const SGC_IDENTITY = {
  motto: "Zeal and Zest to Be",
  mantra: [
    "OF THE STUDENTS",
    "FOR THE STUDENTS",
    "BY THE STUDENTS",
  ],
  foundedYear: 2010,
  founders: "Late Mr. Tanveer Ahmed & Mr. Mohammed Imran",
  institution: "C. Abdul Hakeem College of Engineering & Technology (CAHCET)",
  location: "Melvisharam, Ranipet, Tamil Nadu",
};

export const ABOUT_DETAILS = {
  founders: "Late Mr. Tanveer Ahmed & Mr. Mohammed Imran",
  establishedYear: 2010,
  institution: "C. Abdul Hakeem College of Engineering & Technology (CAHCET)",
  location: "Melvisharam, Ranipet, Tamil Nadu",
  motto: "Zeal and Zest to Be",
  tagline: "Of the Students, For the Students, By the Students",
  summary: `Established in 2010 by late Mr. Tanveer Ahmed and Mr. Mohammed Imran, the Student Guidance Cell (SGC) lives by the fiery spirit of "Zeal and Zest to Be". Guided fundamentally by the principle "OF THE STUDENTS, FOR THE STUDENTS, BY THE STUDENTS", SGC provides an autonomous campus launchpad where raw talent transforms into national hackathon champions, tier-1 software placements, and inspiring leadership.`,
  pillars: [
    {
      title: "Peer-Driven Knowledge Transfer",
      description: "Hands-on student-led daily KT sessions breaking down cutting-edge technologies like Generative AI, Full-Stack engineering, and cloud platforms.",
      badge: "Hands-on Learning",
    },
    {
      title: "National Hackathon Sprint Culture",
      description: "Nurturing agile sprint teams that build working prototypes and win premier competitions including the Smart India Hackathon and VIT Hackulus.",
      badge: "Competitive Sprint",
    },
    {
      title: "Career & Placement Acceleration",
      description: "Structured coding rounds, system design reviews, and mock HR simulations enabling students to secure premier packages including 7.5 LPA at TCS.",
      badge: "Industry Readiness",
    },
    {
      title: "Executive Communication & Public Speaking",
      description: "JAM (Just A Minute) sessions, debate forums, and pitch masterclasses that transform introverted tech builders into persuasive leaders.",
      badge: "Leadership Development",
    },
  ],
  milestones: [
    { year: "2010", event: "Founded by Late Mr. Tanveer Ahmed & Mr. Mohammed Imran with the motto 'Zeal and Zest to Be'." },
    { year: "2018", event: "Expanded technical training into modern web development, IoT, and competitive programming pods." },
    { year: "2024", event: "Member Mohameed Zabeer honored by Deputy Chief Minister Thiru. Udhayanidhi Stalin at state-level competition." },
    { year: "2025", event: "Team clinched 1st Place at Smart India Hackathon (SIH); member Abubakkar secured 7.5 LPA offer at TCS." },
    { year: "2026", event: "Members won VIT Hackulus 2026 24h Hackathon with CARDIA AI heart simulation; SGC Reboot launched." },
  ],
};

export const STATS: StatItem[] = [
  {
    value: "100+",
    label: "Active Trainees",
    description: "Recruited across departments learning in cohort pods",
  },
  {
    value: "₹50K+",
    label: "Hackathon Prizes",
    description: "Won at national and state level technical expos",
  },
  {
    value: "7.5 LPA",
    label: "Peak Placement",
    description: "Top-tier tech offers secured by active members",
  },
  {
    value: "50+",
    label: "KT Sessions",
    description: "Knowledge transfers and hands-on build workshops",
  },
];

export const SCHEDULE_WEEKS: WeekSchedule[] = [
  {
    weekNumber: 1,
    weekTitle: "Week 1: Orientation, Logic & Rhetoric",
    dateRange: "29 June – 3 July 2026",
    status: "Completed",
    sessions: [
      {
        id: "w1-s1",
        title: "SGC Sessions 2026–27 Commenced Successfully",
        date: "Monday, 29 June 2026",
        time: "1:00 PM – 1:30 PM",
        handler: "Samiiksha",
        domain: "Orientation",
        overview: "The Student Guidance Cell officially commenced the 2026–27 session with an inspiring welcome, introducing members to the annual vision, cohort learning objectives, and interactive culture.",
        image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1783242170/IMG-20260630-WA0011_eczb2q.jpg",
        status: "Completed",
      },
      {
        id: "w1-s2",
        title: "Debate Session – Mornings vs Nights",
        date: "Wednesday, 1 July 2026",
        time: "1:00 PM – 1:30 PM",
        handler: "Mohammed Abbas & Mohammed Yasar M",
        domain: "Soft Skills & Rhetoric",
        overview: "Members engaged in a lively parliamentary-style debate on 'Mornings vs Nights — Which is Better?', strengthening logical argumentation, counter-point handling, and persuasive articulation.",
        image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1783242296/IMG-20260701-WA0049_izzgf6.jpg",
        status: "Completed",
      },
      {
        id: "w1-s3",
        title: "Secret Word Challenge",
        date: "Thursday, 2 July 2026",
        time: "1:00 PM – 1:30 PM",
        handler: "Pooja Sri M",
        domain: "Deductive Logic",
        overview: "Participants deduced hidden target terminology using only strictly binary Yes/No interrogation patterns, sharpening analytical elimination strategies and team coordination.",
        image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1783242442/IMG-20260422-WA0010_lkjxaq.jpg",
        status: "Completed",
      },
      {
        id: "w1-s4",
        title: "Dialogue vs Action Challenge",
        date: "Friday, 3 July 2026",
        time: "1:00 PM – 1:30 PM",
        handler: "Afra Naushine S",
        domain: "Team Dynamics",
        overview: "Collaborative problem-solving drills requiring participants to alternate between verbal instructions and execution tasks without visual cues, testing leadership communication.",
        image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1783242619/IMG-20260417-WA0010_rkh9yr.jpg",
        status: "Completed",
      },
    ],
  },
  {
    weekNumber: 2,
    weekTitle: "Week 2: Generative AI, Communication & Personal Finance",
    dateRange: "6 July – 10 July 2026",
    status: "Completed",
    sessions: [
      {
        id: "w2-s1",
        title: "Generative AI Fundamentals – Understanding ChatGPT",
        date: "Monday, 6 July 2026",
        time: "1:00 PM – 1:30 PM",
        handler: "Zakwan Haaziq",
        domain: "Generative AI",
        image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1783792649/ad02e093-e218-4d66-ad4f-93701c2e6958_n6gkbh.jpg",
        overview: "Comprehensive breakdown of large language models: tokenization, embedding vectors in latent space, multi-head self-attention mechanisms, and probabilistic next-token generation.",
        status: "Completed",
      },
      {
        id: "w2-s2",
        title: "Hands-on Generative AI with Google AI Studio",
        date: "Tuesday, 7 July 2026",
        time: "1:00 PM – 1:30 PM",
        handler: "Zakwan Haaziq",
        domain: "Generative AI",
        image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1783792681/a4a0c25d-d2a5-496f-9d7f-31a8a03e13f5_kc3hgg.jpg",
        overview: "Practical lab using Google AI Studio: multi-turn prompt engineering, schema-enforced structured JSON generation, system instruction tailoring, and temperature/top-p parameter tuning.",
        status: "Completed",
      },
      {
        id: "w2-s3",
        title: "Speak Beyond Words: JAM (Just A Minute) Session",
        date: "Wednesday, 8 July 2026",
        time: "1:00 PM – 1:30 PM",
        handler: "Raja Rajeswari S",
        domain: "Soft Skills",
        image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1783792730/c401708e-f63f-4cb7-96ff-4f37c545e40d_zagf3v.jpg",
        overview: "High-octane JAM challenge focusing on spontaneous technical improvisation, elimination of hesitation filler words, clear vocal modulation, and stage presence.",
        status: "Completed",
      },
      {
        id: "w2-s4",
        title: "Money Matters: From Education to Financial Freedom",
        date: "Thursday, 9 July 2026",
        time: "1:00 PM – 1:30 PM",
        handler: "Affan Basha A",
        domain: "Financial Literacy",
        image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1783793020/WhatsApp_Image_2026-07-11_at_11.19.04_PM_u4hnz3.jpg",
        overview: "Essential financial foundations for engineering students: smart budgeting, index fund investing, freelance IP contracts, understanding compounding, and long-term planning.",
        status: "Completed",
      },
      {
        id: "w2-s5",
        title: "Spy Among Us: Collaborative Deduction",
        date: "Friday, 10 July 2026",
        time: "1:00 PM – 1:30 PM",
        handler: "Banusree R",
        domain: "Critical Thinking",
        image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1783793144/WhatsApp_Image_2026-07-11_at_11.19.03_PM_ofru8o.jpg",
        overview: "Gamified social deduction activity emphasizing behavioural observation, body language cues, strategic interrogations, and team consensus under pressure.",
        status: "Completed",
      },
    ],
  },
  {
    weekNumber: 3,
    weekTitle: "Week 3: Full-Stack Web Development & Modern API Engineering",
    dateRange: "13 July – 17 July 2026",
    status: "Coming Soon",
    sessions: [
      {
        id: "w3-s1",
        title: "Modern React 19 & Component State Architectures",
        date: "Monday, 13 July 2026",
        time: "1:00 PM – 1:30 PM",
        handler: "Web Dev Pod",
        domain: "Full-Stack Dev",
        overview: "Deep dive into React 19 features, useActionState, client vs server components, and performant state trees.",
        status: "Upcoming",
      },
      {
        id: "w3-s2",
        title: "REST & GraphQL API Design with Node.js & Supabase",
        date: "Wednesday, 15 July 2026",
        time: "1:00 PM – 1:30 PM",
        handler: "Backend Pod",
        domain: "Cloud & APIs",
        overview: "Building resilient microservice APIs, implementing JWT authentication, and relational database modeling.",
        status: "Upcoming",
      },
      {
        id: "w3-s3",
        title: "Tailwind CSS & Micro-Animations with GSAP",
        date: "Friday, 17 July 2026",
        time: "1:00 PM – 1:30 PM",
        handler: "Design Pod",
        domain: "Frontend UI/UX",
        overview: "Creating fluid user experiences using scroll-driven GSAP timelines, responsive layouts, and modern aesthetics.",
        status: "Upcoming",
      },
    ],
  },
  {
    weekNumber: 4,
    weekTitle: "Week 4: Internal Hackathon Sprint & Product Demos",
    dateRange: "20 July – 24 July 2026",
    status: "Coming Soon",
    sessions: [
      {
        id: "w4-s1",
        title: "Problem Statement Deconstruction & MVP Scoping",
        date: "Monday, 20 July 2026",
        time: "1:00 PM – 1:30 PM",
        handler: "Hackathon Mentors",
        domain: "Hackathons",
        overview: "Techniques for rapid architectural scoping, avoiding feature creep, and delivering tangible proof-of-concepts.",
        status: "Upcoming",
      },
      {
        id: "w4-s2",
        title: "The 3-Minute Winning Demo: Pitching to Jury",
        date: "Wednesday, 22 July 2026",
        time: "1:00 PM – 1:30 PM",
        handler: "SIH Winners",
        domain: "Pitch & Demo",
        overview: "Structuring high-impact demo presentations, highlighting value propositions, and handling jury Q&A.",
        status: "Upcoming",
      },
      {
        id: "w4-s3",
        title: "SGC Mini-Hackathon Showcase & Awards",
        date: "Friday, 24 July 2026",
        time: "1:00 PM – 2:00 PM",
        handler: "Core Committee",
        domain: "Exhibition",
        overview: "Live exhibition of trainee projects, peer evaluations, and presentation of certificates and prizes.",
        status: "Upcoming",
      },
    ],
  },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "revibe-26",
    title: "🎉 Revibe '26 — Successfully Completed!",
    content: "Thank you to everyone who participated and helped make Revibe '26 a grand success with thrilling competitions and student innovations!",
    image: "/announcements/revibe-poster.jpg",
    link: "#memories",
    linkText: "View Event Highlights",
    tag: "Flagship Event",
  },
  {
    id: "kt-sessions",
    title: "🎓 Knowledge Transfer (KT) Session Initiative",
    content: "SGC launches the Knowledge Transfer (KT) Session Initiative for hands-on, peer-led learning in modern Web, AI, and Cloud technologies.",
    image: "/announcements/kt_session.jpg",
    link: "#daily-sessions",
    linkText: "Explore Sessions",
    tag: "Learning Hub",
  },
  {
    id: "session-summary",
    title: "📝 Introducing the SGC Session Summary Document",
    content: "Comprehensive Session Summary Documents are distributed after every session for rapid revision, code snippets, and takeaway notes.",
    image: "/announcements/session-summary.jpg",
    link: "#daily-sessions",
    linkText: "Browse Summaries",
    tag: "Documentation",
  },
  {
    id: "committee-2026",
    title: "👥 New SGC Committee 2026–27 Announced",
    content: "Meet the newly appointed office bearers, leads, and committee members driving SGC forward for the academic year 2026–27.",
    image: "/announcements/committee.jpg",
    link: "#team",
    linkText: "View Committee",
    tag: "Leadership",
  },
  {
    id: "new-initiatives",
    title: "🌟 New SGC Initiatives for 2026–27",
    content: "Introducing the new Social Media and Financial Development departments to expand SGC outreach, career mentorship, and sponsorship.",
    image: "/announcements/initiatives.jpg",
    link: "#about",
    linkText: "Learn More",
    tag: "Expansion",
  },
  {
    id: "academic-plan",
    title: "📅 Tentative SGC Academic Plan 2026–27",
    content: "The complete roadmap for technical bootcamps, internal hackathons, Revibe 2K26, and project incubators is now published.",
    image: "/announcements/academic.jpg",
    link: "#daily-sessions",
    linkText: "See Roadmap",
    tag: "Roadmap",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "vit-hackulus-2026",
    heading: "Zahangir & Yasar Won VIT Hackulus 2026",
    description: "SGC members Md. Zahangir and Md. Yasar won the 24-hour VIT Hackulus 2026 hackathon during VIT graVITas. They built CARDIA, an interactive 3D heart simulation combining Three.js spatial anatomy, blood-flow physics, and an AI-powered medical RAG layer.",
    image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1791032149/IMG-20261003-WA0059_yz9nn0.jpg",
    badge: "VIT Hackulus 2026 Winner",
    link: "https://lnkd.in/p/dNEEEqsk",
    date: "Oct 2026",
  },
  {
    id: "sih-2025-winner",
    heading: "Dhanush Won Smart India Hackathon (SIH) 2025",
    description: "SGC member Dhanush and his team clinched 1st place in India's largest innovation competition, Smart India Hackathon 2025, solving critical government problem statements with scalable architecture.",
    image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1739477562/abuanddhanu_ivohht.jpg",
    badge: "Smart India Hackathon 1st Prize",
    link: "https://www.linkedin.com/posts/dhanushkandhan_won-the-smart-india-hackathon-2025-with-my-ugcPost-7405246829681901568-MGpq/",
    date: "2025",
  },
  {
    id: "tcs-placement",
    heading: "Abubakkar Siddiq Secured 7.5 LPA Offer at TCS",
    description: "Abubakkar Siddiq, a core pillar of SGC, cracked the high-tier 7.5 LPA placement offer at Tata Consultancy Services (TCS), reflecting the technical caliber and peer-guidance ethos nurtured inside SGC.",
    image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1783163846/Abuannapic_qvtmq0.jpg",
    badge: "7.5 LPA Premium Placement",
    link: "https://www.linkedin.com/in/studentguidancecell-cahcet/",
    date: "2025",
  },
  {
    id: "printmate-mini-project",
    heading: "Ayaz & Kashif Won 1st Prize at Mini Project Expo",
    description: "Mohammed Ayaz and Kashif Ulhaq secured First Prize at the CAHCET Mini Project Expo for PRINTMATE, taking home a ₹5,000 cash award for embedded systems and software synergy.",
    image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1783332114/Ayaz_kashifpic2_asiuwu.jpg",
    badge: "1st Prize & ₹5,000 Award",
    link: "https://www.linkedin.com/posts/mohammed-ayaz-profile_printmate-miniprojectexpo-firstplace-ugcPost-7472157852346986496-OfSr/",
    date: "2025",
  },
  {
    id: "guro-ibm-build2learn",
    heading: "Dhanush & Abubakkar Presented GURO at IBM Build2Learn",
    description: "SGC leads Dhanush and Abubakkar Siddiq presented their custom open-source Python package, GURO, live before 50+ IT professionals, architects, and senior engineers at IBM Build2Learn Chennai.",
    image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1739477562/abuanddhanu_ivohht.jpg",
    badge: "IBM Build2Learn Chennai",
    link: "https://www.linkedin.com/posts/reach2ashish_build2learn-activity-7289192302000947200--9fb?utm_source=social_share_send&utm_medium=member_desktop_web",
    date: "2025",
  },
  {
    id: "zabeer-state-level",
    heading: "Mohameed Zabeer Honoured by Deputy CM",
    description: "Mohameed Zabeer represented CAHCET at the State Level Speech Competition in Chennai and was felicitated on stage by the Honorable Deputy Chief Minister of Tamil Nadu, Thiru. Udhayanidhi Stalin.",
    image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1739544327/0M0A9950_v3n45f.jpg",
    badge: "State Level Honor",
    link: "https://www.linkedin.com/in/studentguidancecell-cahcet/",
    date: "2024",
  },
];

export const TEAM_MEMBERS: TeamMemberData[] = [
  {
    name: "Mohammed Ayaz.A",
    role: "President",
    department: "Computer Science",
    year: "IV Year",
    image: "https://res.cloudinary.com/drgwlnf67/image/upload/v1782542238/WhatsApp_Image_2026-06-27_at_9.12.04_AM_vv5fls.jpg",
    linkedin: "https://www.linkedin.com/in/mohammed-ayaz-2b16062a5",
    category: "Office Bearer",
  },
  {
    name: "Kashif Ulhaq K",
    role: "Vice President",
    department: "Computer Science",
    year: "IV Year",
    image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1739469250/Kashif_Ul_haq_pgq5mb.jpg",
    linkedin: "https://www.linkedin.com/in/kashif-ulhaq-k-a43956278/",
    category: "Office Bearer",
  },
  {
    name: "Mohamed Melhan K O",
    role: "Vice President",
    department: "Artificial Intelligence and Data Science",
    year: "IV Year",
    image: "https://res.cloudinary.com/drgwlnf67/image/upload/v1782659638/melhan_sedtgb.jpg",
    linkedin: "https://www.linkedin.com/in/mohamed-melhan-k-o-1bb3872a6",
    category: "Office Bearer",
  },
  {
    name: "Mohammed Aasif",
    role: "Administrator",
    department: "Computer Science",
    year: "IV Year",
    image: "https://res.cloudinary.com/devn2ez7p/image/upload/v1782652275/prof_link_pic_3_2.jpg_w85kkn.jpg",
    linkedin: "https://www.linkedin.com/in/mohammed-aasif-6a36062a5",
    category: "Office Bearer",
  },
  {
    name: "Mohamed Zahangir",
    role: "Administrator",
    department: "Artificial Intelligence and Data Science",
    year: "III Year",
    image: "https://res.cloudinary.com/drgwlnf67/image/upload/f_auto,q_auto/dcb3e81a-ec96-49ea-aad0-05ad796b053e_rifahc",
    linkedin: "https://www.linkedin.com/in/mohd-zahangir-ali-molla/",
    category: "Office Bearer",
  },
  {
    name: "Raja Rajeswari S",
    role: "Advisor",
    department: "Artificial Intelligence and Data Science",
    year: "III Year",
    image: "https://res.cloudinary.com/drgwlnf67/image/upload/v1782659637/advisor_lz99kh.jpg",
    linkedin: "https://www.linkedin.com/in/raja-rajeswari-srinivasan-10711b3b0",
    category: "Office Bearer",
  },
  {
    name: "Mohammed Abuzar J",
    role: "Social Media Lead",
    department: "Computer Science",
    year: "IV Year",
    image: "https://res.cloudinary.com/douhcccb7/image/upload/v1739525912/WhatsApp_Image_2025-02-14_at_5.06.32_AM_nasmey.jpg",
    linkedin: "https://www.linkedin.com/in/md-abuzar-1892882a6/",
    category: "Lead & Handler",
  },
  {
    name: "Shafifa Naaz.D",
    role: "COC Moderator",
    department: "Information Technology",
    year: "IV Year",
    image: "https://res.cloudinary.com/douhcccb7/image/upload/v1739638247/WhatsApp_Image_2025-02-15_at_10.07.35_PM_zn9aaw.jpg",
    linkedin: "https://www.linkedin.com/in/shafifa-naaz-7442472a6",
    category: "Lead & Handler",
  },
  {
    name: "Mohamed Abbas T A",
    role: "Session Handler",
    department: "Computer Science",
    year: "IV Year",
    image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1739474337/Mohammed_Abbas_z7hbpd.jpg",
    linkedin: "https://www.linkedin.com/in/mohamed-abbas-46b49a2a5/",
    category: "Lead & Handler",
  },
  {
    name: "Mohammed Yasar M",
    role: "Session Handler",
    department: "Artificial Intelligence and Data Science",
    year: "III Year",
    image: "https://res.cloudinary.com/djm8qhle1/image/upload/f_auto,q_auto/Screenshot_2026-03-31_163341_uwuv0c",
    linkedin: "https://www.linkedin.com/in/mohammed-yasar-28b821334",
    category: "Lead & Handler",
  },
  {
    name: "Zakwan Haaziq",
    role: "Member",
    department: "Computer Science",
    year: "III Year",
    image: "https://res.cloudinary.com/doknhsy61/image/upload/v1776162058/mee_prof_wzcf0y.jpg",
    linkedin: "https://www.linkedin.com/in/zakwan-haaziq-533392322/",
    category: "Committee Member",
  },
  {
    name: "Abishek",
    role: "Session Handler",
    department: "Information Technology",
    year: "IV Year",
    image: "/abishek.jpg",
    linkedin: "https://www.linkedin.com/in/ak-abishek/",
    category: "Lead & Handler",
  },
  {
    name: "Samiiksha C",
    role: "Member",
    department: "Computer Science and Engineering",
    year: "III Year",
    image: "https://res.cloudinary.com/dnbifmfhl/image/upload/v1774977981/WhatsApp_Image_2026-03-31_at_10.45.05_PM_rzanjh.jpg",
    linkedin: "https://www.linkedin.com/in/samiiksha-c",
    category: "Committee Member",
  },
  {
    name: "R.Banusree",
    role: "Member",
    department: "Computer Science",
    year: "III Year",
    image: "https://res.cloudinary.com/dvfzsmzbt/image/upload/f_auto,q_auto/R_BANUSREE_iexzmz",
    linkedin: "https://www.linkedin.com/in/r-banu-sree-5893a9379/",
    category: "Committee Member",
  },
  {
    name: "Afra Naushine",
    role: "Member",
    department: "Computer Science and Engineering",
    year: "III Year",
    image: "https://res.cloudinary.com/dnxvo9np0/image/upload/v1775233033/WhatsApp_Image_2026-04-03_at_9.45.33_PM_mqbcte.jpg",
    linkedin: "https://www.linkedin.com/in/afra-naushine",
    category: "Committee Member",
  },
  {
    name: "Pooja Sri M",
    role: "Member",
    department: "Computer Science and Engineering",
    year: "III Year",
    image: "https://res.cloudinary.com/dxdieopb8/image/upload/v1775223179/pooja_pic_kt3mta.jpg",
    linkedin: "https://www.linkedin.com/in/pooja-sri-m-a52487379",
    category: "Committee Member",
  },
  {
    name: "Affan Basha A",
    role: "Member",
    department: "Information Technology",
    year: "III Year",
    image: "https://res.cloudinary.com/drgwlnf67/image/upload/v1782659637/affan_jnnr58.jpg",
    linkedin: "https://www.linkedin.com/in/affanbasha",
    category: "Committee Member",
  },
  {
    name: "Abdul Gaffoor Asjad M",
    role: "Member",
    department: "Computer Science",
    year: "IV Year",
    image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1739474332/Abdul_Gaffoor_Asjad_d9uolc.jpg",
    linkedin: "https://www.linkedin.com/in/abdul-gaffoor-asjad-b6b2412a6",
    category: "Committee Member",
  },
  {
    name: "Mudassir S F",
    role: "Member",
    department: "Artificial Intelligence & Data Science",
    year: "IV Year",
    image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1739469242/Mohammed_Mudassir461_dwng1y.jpg",
    linkedin: "https://www.linkedin.com/in/mohammed-mudassir-a3b6322a5",
    category: "Committee Member",
  },
  {
    name: "Gokul S",
    role: "Member",
    department: "Information Technology",
    year: "III Year",
    image: "https://gokuls2028.neocities.org/sgc.jpeg",
    linkedin: "https://www.linkedin.com/in/gokul-s202428/",
    category: "Committee Member",
  },
  {
    name: "Swetha V",
    role: "Member",
    department: "Information Technology",
    year: "IV Year",
    image: "https://res.cloudinary.com/douhcccb7/image/upload/v1739638258/WhatsApp_Image_2025-02-15_at_9.56.53_PM_s9oghq.jpg",
    linkedin: "https://www.linkedin.com/in/swetha-venkatesan-7b32492a6/",
    category: "Committee Member",
  },
  {
    name: "Dhurga prasad S",
    role: "Member",
    department: "Electrical and Electronics Engineering",
    year: "IV Year",
    image: "https://res.cloudinary.com/douhcccb7/image/upload/v1739638236/WhatsApp_Image_2025-02-15_at_9.36.39_PM_uzlpgq.jpg",
    category: "Committee Member",
  },
  {
    name: "Akshaya A",
    role: "Member",
    department: "Computer Science",
    year: "III Year",
    image: "https://gokuls2028.neocities.org/Akshaya%20A.jpeg",
    linkedin: "https://www.linkedin.com/in/akshaya-a-343731340/",
    category: "Committee Member",
  },
];

export const ALL_ALUMNI_RECORDS: AlumniRecord[] = [
  {
    "name": "Abubakkar Siddiq",
    "department": "IT",
    "currentPosition": "System Engineer at TCS",
    "company": "TCS",
    "contact": "https://www.linkedin.com/in/abubakkarsiddiq17/"
  },
  {
    "name": "Dhanush Kandhan",
    "department": "IT",
    "currentPosition": "Product Builder at Letretro",
    "company": "Startups",
    "contact": "https://www.linkedin.com/in/dhanushkandhan/"
  },
  {
    "name": "Harish G",
    "department": "EEE",
    "currentPosition": "JE. EE at CDC Pvt Ltd",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/harish-g-a4b0b8294/"
  },
  {
    "name": "Samreen Humera",
    "department": "AIDS",
    "currentPosition": "Proud SGC Alumnus",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/samreen-humera-546223294"
  },
  {
    "name": "Syed Naveeth S N",
    "department": "AIDS",
    "currentPosition": "Team Coordinator at ORVIONAR",
    "company": "Startups",
    "contact": "https://www.linkedin.com/in/syed-naveeth-0b72a2294"
  },
  {
    "name": "Abishek P",
    "department": "MECH",
    "currentPosition": "Internal auditor at chamundi die casting ",
    "company": "Internships",
    "contact": "https://www.linkedin.com/in/lovely-gameing-155535258"
  },
  {
    "name": "Ruqyya Nazeene",
    "department": "AIDS",
    "currentPosition": "Proud SGC Alumnus",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/ruqyya-nazeene-907947292"
  },
  {
    "name": "Zaina Afreen A.P",
    "department": "CSE",
    "currentPosition": "Proud SGC Alumnus",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/studentguidancecell-cahcet/"
  },
  {
    "name": "Kamali K",
    "department": "IT",
    "currentPosition": "Proud SGC Alumnus",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/kamali-k-10b4722bb/"
  },
  {
    "name": "Sweatha S",
    "department": "CSE",
    "currentPosition": "Proud SGC Alumnus",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/sweatha-singaravelu-60710b294"
  },
  {
    "name": "Mukesh D",
    "department": "AIDS",
    "currentPosition": "Proud SGC Alumnus",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/mukesh1014325/"
  },
  {
    "name": "Yumnah Safiya",
    "department": "CSE",
    "currentPosition": "Mobile App Developer",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/"
  },
  {
    "name": "Zayd Bilal S.A",
    "department": "IT",
    "currentPosition": "Software Engineering Intern",
    "company": "Internships",
    "contact": "https://www.linkedin.com/in/zaid-bilal-347473247"
  },
  {
    "name": "Sneha",
    "department": "CSE",
    "currentPosition": "Junior Software Developer",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/"
  },
  {
    "name": "Priya Narayanan",
    "department": "CSE",
    "currentPosition": "QA Engineer",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/priya-narayanan-a64383250/"
  },
  {
    "name": "Varun M",
    "department": "CSE",
    "currentPosition": "Assistant Software Engineer Intern",
    "company": "Internships",
    "contact": "https://www.linkedin.com/in/varun-mayilvaganan-662781234/"
  },
  {
    "name": "Vallarasu J",
    "department": "CSE",
    "currentPosition": "UPSC Aspirant",
    "company": "Higher Studies",
    "contact": "https://www.linkedin.com/in/vallarasuj"
  },
  {
    "name": "Thaseem M",
    "department": "CSE",
    "currentPosition": "Software Engineering Intern",
    "company": "Internships",
    "contact": "https://www.linkedin.com/in/thaseem-m-6136b92a4"
  },
  {
    "name": "Mohammed Zabeer. Z",
    "department": "ECE",
    "currentPosition": "Startup and Public Speaker",
    "company": "Startups",
    "contact": "https://www.linkedin.com/in/mohammed-zabeer-z/"
  },
  {
    "name": "Delhi Ganesh",
    "department": "IT",
    "currentPosition": "Software Engineering Intern",
    "company": "Internships",
    "contact": "https://www.linkedin.com/in/delhi-ganesh-4a76a9326"
  },
  {
    "name": "Mohammed Rafique A",
    "department": "CSE",
    "currentPosition": "Software Engineer",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/mdrafique"
  },
  {
    "name": "Jeya Murugan L",
    "department": "CSE",
    "currentPosition": "Full Stack Developer",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/jeyamuruganl/"
  },
  {
    "name": "Prakash K",
    "department": "IT",
    "currentPosition": "Proud SGC Alumnus",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/prakashkbtech/"
  },
  {
    "name": "Vahitha Hafeez",
    "department": "CSE",
    "currentPosition": "Software Engineer",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/vahitha-hafeez-912740212/"
  },
  {
    "name": "Sathakathulla S ",
    "department": "IT",
    "currentPosition": "Network Engineer at Movate",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/sathakathulla-s/"
  },
  {
    "name": "Gnanasekaran B",
    "department": "IT",
    "currentPosition": "MTS at Zoho Corp",
    "company": "Zoho",
    "contact": "https://www.linkedin.com/in/gnana-sekaran/"
  },
  {
    "name": "Yuvaraj A.D",
    "department": "IT",
    "currentPosition": "Java Developer",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/yuvaraj-a-d/"
  },
  {
    "name": "Gokul M",
    "department": "IT",
    "currentPosition": "Software Developer",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/gokul-murugesan-btech/"
  },
  {
    "name": "Shewetha V.V.",
    "department": "CSE",
    "currentPosition": "MBA at CAHCET SOM",
    "company": "Higher Studies",
    "contact": "https://www.linkedin.com/in/shwetha-v-v-31b556224/"
  },
  {
    "name": "Almohammed Bilal N",
    "department": "CSE",
    "currentPosition": "DevOps Engineer",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/almohammed-bilal/"
  },
  {
    "name": "Lokesh V",
    "department": "CSE",
    "currentPosition": "Cloud Platform Engineer at E2E Networks",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/lokeshvasudevan/"
  },
  {
    "name": "Mohanapriya V",
    "department": "CSE",
    "currentPosition": "TSE at Zoho Corp",
    "company": "Zoho",
    "contact": "https://www.linkedin.com/in/mohanapriya-vigneshwaran-2002b61b7/"
  },
  {
    "name": "Sivapriya T",
    "department": "CSE",
    "currentPosition": "M.Tech at VIT Vellore",
    "company": "Higher Studies",
    "contact": "https://www.linkedin.com/in/siva-priya-thirumalai2022/"
  },
  {
    "name": "Arun Srinivasan",
    "department": "IT",
    "currentPosition": "Software Enginner at Relevantz",
    "company": "Industry",
    "contact": "http://linkedin.com/in/arunsrinivasan03/"
  },
  {
    "name": "Mohamed Waseem B",
    "department": "CSE",
    "currentPosition": "Salesforce Associate at Pentacloud Consulting",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/mohamed-waseem-b-15a19a223/"
  },
  {
    "name": "Priyadharshini S",
    "department": "CSE",
    "currentPosition": "Software Engineer",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/priyadharshini-s-94114022a/"
  },
  {
    "name": "Harun J",
    "department": "CSE",
    "currentPosition": "Software Tester",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/harunkhanj/"
  },
  {
    "name": "Sneha Baskaran",
    "department": "CSE",
    "currentPosition": "Junior Software Develepor",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/snehabaskaran/"
  },
  {
    "name": "Aneesur Rahman P M",
    "department": "IT",
    "currentPosition": "Packaged App Development Senior Analyst at Accenture",
    "company": "Accenture",
    "contact": "https://www.linkedin.com/in/aneesurrahmanpm/"
  },
  {
    "name": "Arel Shane G",
    "department": "IT",
    "currentPosition": "Instructional Designer at LKQ Corp",
    "company": "Industry",
    "contact": "https://www.linkedin.com/in/arelshane/"
  },
  {
    "name": "Chithira Menon P S",
    "department": "IT",
    "currentPosition": "Software Engineer at Honeywell HTS",
    "company": "Honeywell",
    "contact": "https://www.linkedin.com/in/chithira-menon-p-s-3146b7160/"
  }
];

export const KNOWLEDGE_RESOURCES = [
  {
    id: "res-1",
    title: "Full-Stack Web Engineering Roadmap 2026",
    category: "Web Dev",
    format: "Interactive Guide",
    difficulty: "Beginner to Advanced",
    topics: ["React 19", "Vite", "Tailwind CSS", "TypeScript", "Node.js", "PostgreSQL"],
    contributor: "SGC Tech Team",
  },
  {
    id: "res-2",
    title: "Hackathon Winning Playbook & Pitch Deck Template",
    category: "Hackathons",
    format: "Document & Deck",
    difficulty: "All Levels",
    topics: ["Problem Formulation", "MVP Scoping", "Architecture Diagramming", "3-Min Pitch"],
    contributor: "Dhanush & Yasar (Winners)",
  },
  {
    id: "res-3",
    title: "Smart India Hackathon (SIH) Preparation Blueprint",
    category: "National Contests",
    format: "Case Study",
    difficulty: "Intermediate",
    topics: ["Government Problem Statements", "Idea Submission", "Hardware/Software Prototype"],
    contributor: "SIH 2025 Winning Pod",
  },
  {
    id: "res-4",
    title: "Generative AI & LLM Systems from Scratch",
    category: "Artificial Intelligence",
    format: "Code Lab",
    difficulty: "Intermediate",
    topics: ["RAG Pipelines", "Vector Databases", "Prompt Engineering", "Fine-Tuning"],
    contributor: "Zakwan Haaziq (AI Handler)",
  },
  {
    id: "res-5",
    title: "Technical Interview & Placement Mastery (Tier-1 Tech)",
    category: "Career",
    format: "Curated Repo",
    difficulty: "Placement Prep",
    topics: ["Data Structures & Algorithms", "System Design", "Core CS Fundamentals", "Mock Scenarios"],
    contributor: "Abubakkar Siddiq (TCS 7.5 LPA)",
  },
  {
    id: "res-6",
    title: "SGC Weekly Session Summary Archive (KT Vault)",
    category: "Internal Vault",
    format: "PDF Notes & Slides",
    difficulty: "All SGCians",
    topics: ["Recorded Labs", "Lecture Summaries", "Quiz Repositories", "Hands-on Tasks"],
    contributor: "SGC Core Council",
  },
];

export const SOCIAL_LINKS = {
  website: "https://teamsgc.in",
  portal: "http://portal.teamsgc.in/login",
  instagram: "https://www.instagram.com/studentsguidancecell",
  linkedin: "https://www.linkedin.com/in/studentguidancecell-cahcet/",
  github: "https://github.com/sgc-cahcet",
  medium: "https://sgc-cahcet.medium.com/",
  college: "C. Abdul Hakeem College of Engineering and Technology (CAHCET)",
};


export const ALUMNI_MEMBERS = [
  {
    name: "Abubakkar Siddiq",
    formerRole: "Core Pillar & Technical Lead",
    currentDesignation: "Software Engineer",
    companyOrInstitution: "Tata Consultancy Services (TCS)",
    packageOrHonor: "7.5 LPA Tier-1 Placement",
    image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1783163846/Abuannapic_qvtmq0.jpg",
    linkedin: "https://www.linkedin.com/in/studentguidancecell-cahcet/",
    batch: "Class of 2025",
  },
  {
    name: "Dhanush Kandhan",
    formerRole: "Hackathon Head & Python Lead",
    currentDesignation: "Smart India Hackathon Champion",
    companyOrInstitution: "Letretro / IBM Build2Learn",
    packageOrHonor: "SIH 2025 1st Prize",
    image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1739477562/abuanddhanu_ivohht.jpg",
    linkedin: "https://www.linkedin.com/in/dhanushkandhan/",
    batch: "Class of 2025",
  },
];


export const SESSIONS = [
  {
    id: 1,
    title: "AI Fundamentals: ChatGPT & LLM Internals",
    category: "Generative AI",
    description: "Tokenization, embeddings, transformers, and next-token prediction.",
    image: "https://res.cloudinary.com/dbqjkjl0c/image/upload/v1783792649/ad02e093-e218-4d66-ad4f-93701c2e6958_n6gkbh.jpg",
    instructor: "Zakwan Haaziq",
  },
];
