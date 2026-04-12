import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import Circles from "../../components/Circles";
import Bulb from "../../components/Bulb";
import BorderGlow from "../../components/BorderGlow";
import CountUp from "react-countup";
import React, { useState } from "react";

import {
  RxLayers,
  RxCube,
  RxRocket,
  RxLightningBolt,
  RxArrowTopRight,
} from "react-icons/rx";
import { HiOutlineCpuChip } from "react-icons/hi2";

// ─── Quality cards data ──────────────────────────────────────────────────────
const qualityData = [
  {
    icon: <RxLayers />,
    title: "Full-Stack Architecture",
    description:
      "Designs scalable multi-tenant APIs, real-time systems with WebSockets, and production CRMs processing 10k+ leads/month. End-to-end ownership from schema design to deployment.",
    proof: "https://www.linkedin.com/in/harshal-sawatkar/",
    proofLabel: "LinkedIn",
    glowColor: "220 80 70",
    colors: ["#38bdf8", "#818cf8", "#60a5fa"],
  },
  {
    icon: <HiOutlineCpuChip />,
    title: "AI & LLM Engineering",
    description:
      "Builds RAG pipelines with LangChain/LangGraph, FAISS vector search, and multi-model orchestration. AI-native solutions from the ground up.",
    proof: "https://github.com/Anonymous-hss",
    proofLabel: "GitHub",
    glowColor: "280 70 70",
    colors: ["#a78bfa", "#c084fc", "#f472b6"],
  },
  {
    icon: <RxCube />,
    title: "System Design & DevOps",
    description:
      "Docker, AWS, CI/CD pipelines, microservices architecture, Redis caching. Owns the infrastructure layer alongside application code.",
    proof: "https://www.hackerrank.com/profile/harshalsawatkar1",
    proofLabel: "HackerRank",
    glowColor: "140 70 60",
    colors: ["#34d399", "#6ee7b7", "#38bdf8"],
  },
  {
    icon: <RxRocket />,
    title: "Leadership & Initiative",
    description:
      "President of Student Placement Cell, core team at The Hackers Meetup Nagpur. Led 15+ events, facilitated 100+ student placements.",
    proof: "https://photos.app.goo.gl/p4334N94eRTqLEYAA",
    proofLabel: "See Events",
    glowColor: "30 90 65",
    colors: ["#f472b6", "#c084fc", "#38bdf8"],
  },
  {
    icon: <RxLightningBolt />,
    title: "Performance Optimization",
    description:
      "Achieved 50% load-time reduction at Arlyn through performance profiling, lazy loading, and data-structure optimizations. Reduced lead-to-dashboard latency from minutes to real-time at Reborn Clinics.",
    proof: "https://github.com/Anonymous-hss",
    proofLabel: "GitHub",
    glowColor: "40 85 65",
    colors: ["#fbbf24", "#f59e0b", "#f472b6"],
  },
];

const stats = [
  { value: 2, suffix: "+", label: "Years Exp." },
  { value: 13, suffix: "+", label: "Shipped Products" },
  { value: 10, suffix: "k+", label: "Leads/mo Processed" },
  { value: 50, suffix: "%", label: "Load Time Cut" },
];

const Qualities = () => {
  const [isMounted, setIsMounted] = useState(false);
  React.useEffect(() => { setIsMounted(true); }, []);

  return (
    <div className="h-[100dvh] bg-primary pt-32 pb-4 text-center xl:text-left overflow-hidden relative z-10 w-full flex items-center">
      {/* Animated Teal Aura Orb */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-teal-500/30 blur-[130px] rounded-full pointer-events-none -z-10 -translate-x-1/3 translate-y-1/3"
      />

      {/* Cyber Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none -z-20"
        style={{
          backgroundImage: `linear-gradient(#4b3792 1px, transparent 1px), linear-gradient(90deg, #4b3792 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <Circles />

      <div className="container mx-auto h-full relative z-10">
        <div className="flex flex-col xl:flex-row gap-x-12 w-full h-[calc(100vh-160px)] mt-4">
          {/* ── Left Panel ── */}
          <div className="text-center flex xl:w-[18vw] flex-col lg:text-left mb-6 xl:mb-0 shrink-0">
            <motion.h2
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-8"
            >
              My Qualities <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-6 max-w-[400px] mx-auto lg:mx-0 text-white/60 leading-relaxed text-sm"
            >
              A robust blend of technical excellence, leadership, and
              proactive problem-solving. I own the entire journey — from
              architecture to deployment.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="hidden xl:grid grid-cols-2 gap-4"
            >
              {stats.map((s, i) => (
                <div key={i} className="text-left">
                  <div className="text-2xl font-extrabold text-accent drop-shadow-[0_0_15px_rgba(241,48,36,0.4)]">
                    {isMounted && <CountUp start={0} end={s.value} duration={3} />}
                    {s.suffix}
                  </div>
                  <div className="text-[9px] uppercase tracking-[3px] text-white/30 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Bento Grid ── */}
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full flex-grow overflow-y-auto card-scroll pr-1 pb-2"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              {qualityData.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                  className={i === qualityData.length - 1 ? "lg:col-span-2" : ""}
                >
                  <BorderGlow
                    glowColor={q.glowColor}
                    colors={q.colors}
                    backgroundColor="#0d0d14"
                    borderRadius={18}
                    glowRadius={40}
                    glowIntensity={0.9}
                    coneSpread={28}
                    edgeSensitivity={25}
                    fillOpacity={0.35}
                    className="w-full group"
                  >
                    <div className="p-6 flex flex-col gap-3">
                      {/* Icon + Title row */}
                      <div className="flex items-center gap-3">
                        <div className="text-2xl text-accent">{q.icon}</div>
                        <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">
                          {q.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-white/50 text-[12px] leading-relaxed">
                        {q.description}
                      </p>

                      {/* Proof Link */}
                      <a
                        href={q.proof}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[2px] text-white/30 hover:text-accent transition-colors mt-1 group/link"
                      >
                        {q.proofLabel}
                        <RxArrowTopRight className="group-hover/link:rotate-45 transition-transform duration-300" />
                      </a>
                    </div>
                  </BorderGlow>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default Qualities;
