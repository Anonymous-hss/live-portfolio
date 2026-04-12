/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../../variants";
import CountUp from "react-countup";

// ─── Data ───────────────────────────────────────────────────────────────────
const aboutData = {
  bio: {
    heading: "Who am I?",
    bio: "I am a results-driven Full-Stack Developer with over 2 years of experience engineering production-grade, AI-integrated applications. I specialize in designing scalable backend architectures, real-time systems, and multi-tenant platforms using React, Go, and Node.js. From scaling CRMs processing 10k+ leads monthly to architecting RAG-based platforms with LangChain and LangGraph, I own the entire development lifecycle — from schema design to deployment.",
    stats: [
      { value: 2, label: "Years Exp." },
      { value: 15, label: "Projects" },
      { value: 20, label: "Events" },
    ],
  },
  skills: [
    { category: "Core & Frameworks", items: ["React.js", "Next.js", "React Native", "TypeScript", "JavaScript", "Vue.js", "HTML5", "CSS3"] },
    { category: "Backend & Databases", items: ["Node.js", "Go", "Express.js", "REST APIs", "WebSockets", "PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma"] },
    { category: "AI / ML", items: ["LangChain", "LangGraph", "RAG", "FAISS", "Vector DBs", "Python", "Ollama"] },
    { category: "DevOps & Tools", items: ["Docker", "AWS", "Git", "GitHub", "CI/CD", "Jest", "Postman", "Linux/Kali"] },
    { category: "Design", items: ["Figma", "Tailwind CSS", "Framer Motion", "Glassmorphism"] },
  ],
  experience: [
    {
      title: "Full-Stack Developer",
      company: "Zizbey Consultancy",
      stage: "2026",
      desc: "Developing enterprise-grade, multi-tenant platforms and internal tooling. Working with React, Go microservices, and PostgreSQL to build production-ready, scalable systems.",
    },
    {
      title: "Full-Stack Developer",
      company: "Reborn Skin & Hair Clinics",
      stage: "2024 – 2025",
      desc: "Engineered a production CRM platform processing 10k+ leads/month. Built real-time notification systems, multi-branch reporting dashboards, and automated patient flow pipelines.",
    },
    {
      title: "Web Development Intern",
      company: "ARLYN",
      stage: "2024",
      desc: "Developed and delivered responsive web interfaces and backend modules. Gained production experience with React and Node.js in an agency environment.",
    },
  ],
  background: [
    {
      type: "_Education",
      items: [
        { title: "B.Tech — Computer Science & Engineering", sub: "PBCOE, Nagpur · 2020 – 2024", desc: "Graduated with a focus on distributed systems, algorithms, and applied AI." },
        { title: "HSC — Bifocal Science (Computer)", sub: "St. Paul Jr. College, Nagpur · 2020", desc: "" },
      ],
    },
    {
      type: "_Leadership",
      items: [
        { title: "President — Student Placement Cell", sub: "PBCOE · 2022 – 2023", desc: "Led placement drives securing internships and full-time roles for 100+ students." },
        { title: "Core Team Member", sub: "The Hackers Meetup, Nagpur · 2023 – Present", desc: "Organise technical workshops, hackathons, and cybersecurity talks across Nagpur's dev community." },
      ],
    },
  ],
};

// ─── Nav items ───────────────────────────────────────────────────────────────
const NAV = [
  { id: "bio",        label: "01 // Bio" },
  { id: "skills",     label: "02 // Tech Stack" },
  { id: "experience", label: "03 // Experience" },
  { id: "background", label: "04 // Background" },
];

// ─── Content pane variants ───────────────────────────────────────────────────
const paneVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, x: -20, transition: { duration: 0.25 } },
};

// ─── Component ───────────────────────────────────────────────────────────────
const About = () => {
  const [activeTab, setActiveTab] = useState("bio");
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => { setIsMounted(true); }, []);

  return (
    <div className="h-[100dvh] bg-primary overflow-hidden relative z-10 w-full">

      {/* — Background aura — */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-0 right-0 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-cyan-600/40 blur-[120px] rounded-full pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3"
      />
      {/* — Cyber grid — */}
      <div className="fixed inset-0 opacity-10 pointer-events-none -z-20" style={{
        backgroundImage: `linear-gradient(#4b3792 1px, transparent 1px), linear-gradient(90deg, #4b3792 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />

      <Circles />

      {/* ═══ Main shell ═══════════════════════════════════════════════════════ */}
      <div className="flex h-full w-full">

        {/* ── LEFT SIDEBAR (30%) ───────────────────────────────────────────── */}
        <motion.aside
          variants={fadeIn("right", 0.15)}
          initial="hidden"
          animate="show"
          className="hidden xl:flex flex-col w-[30%] h-full relative border-r border-white/10 pt-28 pb-0 px-8"
        >
          {/* Nav menu — at the top below navbar */}
          <nav className="relative z-10 flex flex-col gap-y-2 pt-4">
            {NAV.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`group relative text-left px-5 py-3.5 rounded-2xl font-mono text-sm uppercase tracking-[2px] transition-all duration-300 overflow-hidden
                    ${isActive
                      ? "bg-white/10 text-white border border-white/20"
                      : "text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent"
                    }`}
                >
                  {/* Active accent bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent rounded-r-full"
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Avatar — decorative, pinned to bottom of sidebar */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none z-0 mix-blend-lighten overflow-hidden">
            <div className="scale-[0.72] origin-bottom opacity-90">
              <Avatar />
            </div>
          </div>
        </motion.aside>

        {/* ── RIGHT CONTENT PANE (70%) ─────────────────────────────────────── */}
        <div className="flex-1 h-full pt-28 pb-8 pr-6 xl:pr-12 pl-6 xl:pl-10 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* ── BIO ── */}
            {activeTab === "bio" && (
              <motion.div key="bio" variants={paneVariants} initial="initial" animate="animate" exit="exit"
                className="h-full flex flex-col justify-center max-w-3xl"
              >
                <h2 className="text-4xl xl:text-6xl font-semibold mb-6">
                  Who am I<span className="text-accent">?</span>
                </h2>
                <p className="text-white/70 leading-[1.9] text-base xl:text-lg mb-10 max-w-2xl">
                  {aboutData.bio.bio}
                </p>
                {/* Stats */}
                <div className="flex gap-x-12 pt-8 border-t border-white/10">
                  {aboutData.bio.stats.map((s, i) => (
                    <div key={i}>
                      <div className="text-4xl xl:text-5xl font-extrabold text-accent drop-shadow-[0_0_20px_rgba(241,48,36,0.4)]">
                        {isMounted && <CountUp start={0} end={s.value} duration={4} />}+
                      </div>
                      <div className="text-xs uppercase tracking-[3px] text-white/40 mt-2">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── SKILLS ── */}
            {activeTab === "skills" && (
              <motion.div key="skills" variants={paneVariants} initial="initial" animate="animate" exit="exit"
                className="h-full flex flex-col overflow-y-auto card-scroll"
              >
                <h2 className="text-3xl xl:text-5xl font-semibold mb-8 shrink-0">
                  Tech <span className="text-accent">Stack</span>
                </h2>
                <div className="flex flex-col gap-y-8">
                  {aboutData.skills.map((cat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                    >
                      <div className="text-accent font-mono text-xs uppercase tracking-[3px] mb-3">
                        // {cat.category}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item, j) => (
                          <motion.div
                            key={j}
                            whileHover={{ scale: 1.06, borderColor: "rgba(241,48,36,0.6)" }}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-white/70 hover:text-white transition-colors cursor-default"
                          >
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── EXPERIENCE ── */}
            {activeTab === "experience" && (
              <motion.div key="experience" variants={paneVariants} initial="initial" animate="animate" exit="exit"
                className="h-full flex flex-col overflow-y-auto card-scroll"
              >
                <h2 className="text-3xl xl:text-5xl font-semibold mb-10 shrink-0">
                  Work <span className="text-accent">Experience</span>
                </h2>
                <div className="relative flex flex-col gap-y-10 pl-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
                  {aboutData.experience.map((exp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[30px] top-1.5 w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(241,48,36,0.7)] z-10" />

                      <div className="text-[11px] text-accent font-mono uppercase tracking-[2px] mb-2">{exp.stage}</div>
                      <h3 className="text-xl xl:text-2xl font-bold text-white mb-1">{exp.title}</h3>
                      <div className="text-sm text-white/40 font-mono mb-3">{exp.company}</div>
                      <p className="text-white/60 text-sm leading-relaxed max-w-2xl">{exp.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── BACKGROUND ── */}
            {activeTab === "background" && (
              <motion.div key="background" variants={paneVariants} initial="initial" animate="animate" exit="exit"
                className="h-full flex flex-col overflow-y-auto card-scroll"
              >
                <h2 className="text-3xl xl:text-5xl font-semibold mb-10 shrink-0">
                  Background & <span className="text-accent">Impact</span>
                </h2>
                <div className="flex flex-col gap-y-12">
                  {aboutData.background.map((section, si) => (
                    <div key={si}>
                      <div className="text-accent font-mono text-xs uppercase tracking-[3px] mb-6">
                        {section.type}
                      </div>
                      <div className="relative flex flex-col gap-y-8 pl-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
                        {section.items.map((item, ii) => (
                          <motion.div
                            key={ii}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (si * 3 + ii) * 0.08, duration: 0.4 }}
                            className="relative"
                          >
                            <div className="absolute -left-[30px] top-1.5 w-3 h-3 rounded-full bg-white/40 z-10" />
                            <h3 className="text-lg xl:text-xl font-bold text-white mb-1">{item.title}</h3>
                            <div className="text-xs text-white/40 font-mono mb-2">{item.sub}</div>
                            {item.desc && <p className="text-white/60 text-sm leading-relaxed max-w-2xl">{item.desc}</p>}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile Tab Bar (shows on < xl) ────────────────────────────────── */}
      <div className="xl:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-[1px] rounded-xl transition-all
              ${activeTab === item.id ? "bg-accent text-white" : "text-white/40 hover:text-white"}`}
          >
            {item.label.split("//")[1].trim()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default About;
