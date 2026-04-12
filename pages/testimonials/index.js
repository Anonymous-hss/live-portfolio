import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import Circles from "../../components/Circles";
import BorderGlow from "../../components/BorderGlow";
import CountUp from "react-countup";
import React, { useState } from "react";

import {
  HiOutlineRocketLaunch,
  HiOutlineServerStack,
  HiOutlineCpuChip,
} from "react-icons/hi2";

// ─── Value Proposition cards ────────────────────────────────────────────────
const valueCards = [
  {
    icon: <HiOutlineRocketLaunch />,
    title: "Ownership Mentality",
    description:
      "I don't just write code — I own the entire lifecycle. Schema design, API architecture, deployment, monitoring. Every project I touch goes from idea to production under my watch.",
    badge: "End-to-End",
    glowColor: "220 80 70",
    colors: ["#38bdf8", "#818cf8", "#60a5fa"],
  },
  {
    icon: <HiOutlineServerStack />,
    title: "Production-Grade Engineering",
    description:
      "10k+ leads/month CRMs, real-time WebSocket pipelines, multi-tenant auth systems — I build things that scale in the real world, not just in demos.",
    badge: "Battle-Tested",
    glowColor: "140 70 60",
    colors: ["#34d399", "#6ee7b7", "#38bdf8"],
  },
  {
    icon: <HiOutlineCpuChip />,
    title: "AI-Native Builder",
    description:
      "RAG, LangChain, FAISS, prompt engineering — I don't bolt AI on as an afterthought. I architect AI-first solutions from the ground up with production-ready pipelines.",
    badge: "AI-First",
    glowColor: "280 70 70",
    colors: ["#a78bfa", "#c084fc", "#f472b6"],
  },
];

const stats = [
  { value: 2, suffix: "+", label: "Years of Experience" },
  { value: 13, suffix: "+", label: "Shipped Products" },
  { value: 10, suffix: "k+", label: "Leads/mo Processed" },
  { value: 50, suffix: "%", label: "Load Time Reduction" },
];

const highlights = [
  "React · Next.js · React Native · Go · Node.js",
  "PostgreSQL · Redis · Docker · AWS · CI/CD",
  "LangChain · LangGraph · RAG · FAISS · Python",
];

const Testimonials = () => {
  const [isMounted, setIsMounted] = useState(false);
  React.useEffect(() => { setIsMounted(true); }, []);

  return (
    <div className="h-[100dvh] bg-primary pt-32 pb-4 overflow-hidden relative z-10 w-full flex items-center">
      {/* Animated Gold Aura Orb */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 25, 0],
          y: [0, 25, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-amber-500/20 blur-[130px] rounded-full pointer-events-none -z-10 -translate-x-1/4 -translate-y-1/4"
      />

      {/* Secondary aura */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none -z-10 translate-x-1/4 translate-y-1/4"
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

      <div className="container mx-auto h-full relative z-10 flex flex-col justify-center">
        <div className="flex flex-col h-[calc(100vh-160px)] mt-4 overflow-y-auto card-scroll pr-1">
          
          {/* ── Hero Section ── */}
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-center mb-10 shrink-0"
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[3px] text-accent/80">
                Available for hire
              </span>
            </motion.div>

            <h2 className="h2">
              Why hire <span className="text-accent">Me?</span>
            </h2>
            <p className="text-white/50 text-sm max-w-2xl mx-auto leading-relaxed">
              I bring production-grade engineering, AI expertise, and full ownership
              mentality to every project. Here&apos;s what sets me apart.
            </p>
          </motion.div>

          {/* ── Value Proposition Cards ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8 shrink-0">
            {valueCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
              >
                <BorderGlow
                  glowColor={card.glowColor}
                  colors={card.colors}
                  backgroundColor="#0d0d14"
                  borderRadius={18}
                  glowRadius={40}
                  glowIntensity={0.9}
                  coneSpread={28}
                  edgeSensitivity={25}
                  fillOpacity={0.35}
                  className="w-full group h-full"
                >
                  <div className="p-6 flex flex-col gap-4 h-full">
                    {/* Badge */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.07] rounded text-[9px] font-mono text-white/40 uppercase tracking-wide">
                        {card.badge}
                      </span>
                      <div className="text-2xl text-accent opacity-60 group-hover:opacity-100 transition-opacity">
                        {card.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/45 text-[12px] leading-relaxed flex-grow">
                      {card.description}
                    </p>

                    {/* Bottom accent line */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-accent/30 transition-colors duration-500" />
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>

          {/* ── Stats Strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-white/[0.03] backdrop-blur-lg border border-white/[0.07] rounded-2xl p-6 mb-8 shrink-0"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl xl:text-4xl font-extrabold text-accent drop-shadow-[0_0_20px_rgba(241,48,36,0.4)]">
                    {isMounted && <CountUp start={0} end={s.value} duration={3} delay={0.5} />}
                    {s.suffix}
                  </div>
                  <div className="text-[9px] uppercase tracking-[3px] text-white/30 mt-2">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Tech Stack Ticker ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col gap-2 items-center shrink-0 pb-4"
          >
            {highlights.map((line, i) => (
              <div
                key={i}
                className="text-[10px] font-mono text-white/20 uppercase tracking-[4px]"
              >
                {line}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
