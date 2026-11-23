import React, { useState } from "react";
import ParticlesContainer from "../components/ParticlesContainer";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../variants";
import Link from "next/link";
import {
  BsArrowRight,
  BsGithub,
  BsLinkedin,
  BsFileEarmarkPdf,
  BsBoxArrowUpRight,
  BsCpu,
  BsLightningCharge,
  BsShieldCheck,
  BsDiagram3,
} from "react-icons/bs";

const uspHighlights = [
  {
    metric: ">60%",
    label: "LLM Token Spend Cut",
    detail: "3-Layer LangGraph StateGraph with <30ms deterministic Shannon entropy gate & ±2.5 score clamping.",
    tag: "DataGlow · MCP",
    accent: "from-cyan-400/20 to-indigo-500/10 border-cyan-400/30 text-cyan-300",
  },
  {
    metric: "85%",
    label: "Broker Rate-Limit Cut",
    detail: "Sub-50ms binary Protobuf WebSocket gateway with global reference-counted subscription pooling.",
    tag: "StockGenius AI",
    accent: "from-emerald-400/20 to-teal-500/10 border-emerald-400/30 text-emerald-300",
  },
  {
    metric: "<20ms",
    label: "Neural Voice Cache",
    detail: "HTTP chunked Azure Neural TTS streaming with phonetic speech sanitizer & Gemini SQLite vector memory.",
    tag: "ACE (Life OS)",
    accent: "from-purple-400/20 to-fuchsia-500/10 border-purple-400/30 text-purple-300",
  },
  {
    metric: "10,000+",
    label: "Monthly Leads Scaled",
    detail: "Sub-second Redis Pub/Sub triage across 8 branches with atomic idempotent Meta/WhatsApp webhooks.",
    tag: "99.9% Uptime CRM",
    accent: "from-amber-400/20 to-orange-500/10 border-amber-400/30 text-amber-300",
  },
];

const flagshipArchitectures = [
  {
    id: "dataglow",
    badge: "01 · AGENTIC DATA READINESS & MCP",
    title: "DataGlow (SCAIDR Engine)",
    subtitle: "3-Layer Hybrid LangGraph StateGraph · Model Context Protocol (MCP) · Lakehouse Remediation",
    liveUrl: "https://dataglow.ai/",
    githubUrl: null,
    metrics: [
      { k: "Layer-1 Gate", v: "<30ms (0 Tokens)" },
      { k: "Token Savings", v: ">60% Routine Cut" },
      { k: "Judge Anchor", v: "±2.5 Math Clamp" },
    ],
    pipeline: [
      {
        step: "L1 · Deterministic Python MetricEngine",
        desc: "Vectorized NumPy/Pandas checks: Shannon entropy (<1.0 synthetic leakage detection), IQR outliers, completeness, and PII regex in <30ms.",
      },
      {
        step: "L2 · 5-Agent Parallel Committee",
        desc: "Concurrent Pydantic-validated specialist agents (Quality, Governance, Fairness, Schema, Business Mapping) over Azure OpenAI.",
      },
      {
        step: "L3 · CDO Consensus Judge & Do-No-Harm Gate",
        desc: "Clamps LLM scores within ±2.5 of Layer-1 ground truth; applies per-fix Do-No-Harm rollback on Parquet checkpoints + HITL SQL approval.",
      },
      {
        step: "MCP HTTP/SSE Connector & Meridian Drift",
        desc: "Dynamic catalog discovery, bounded sampling, and remote Databricks Delta Lake jobs via MCP with OpenTelemetry (@observe) & PSI/KS-test drift interrupts.",
      },
    ],
    stack: ["Python", "FastAPI", "LangGraph", "MCP (HTTP/SSE)", "Pydantic", "Databricks Delta Lake", "PostgreSQL", "OpenTelemetry"],
  },
  {
    id: "stockgenius",
    badge: "02 · REAL-TIME FINTECH & AI COPILOT",
    title: "StockGenius AI",
    subtitle: "Sub-50ms Binary Protobuf WebSocket Fan-Out · Classify → Parallel Fan-Out Copilot · Concurrency Ledger",
    liveUrl: "https://stockgenius.ai/",
    githubUrl: null,
    metrics: [
      { k: "Tick Latency", v: "Sub-50ms Stream" },
      { k: "Upstream Load", v: "-85% Rate Limits" },
      { k: "Stress Suite", v: "87% (100 Prompts)" },
    ],
    pipeline: [
      {
        step: "Binary Protobuf WebSocket Gateway",
        desc: "Decodes upstream Upstox MarketDataFeed.proto binary frames with global reference-counted pooling (Map<ticker, Set<clientId>>) & instant cached price replay.",
      },
      {
        step: "Ask Genius: Classify → 8-Thread Parallel Fan-Out",
        desc: "Replaces slow sequential ReAct round-trips with 1 intent classification pass + concurrent ThreadPool fetches (Fundamentals, Technicals, Live LTP, News, Portfolio) + 1 synthesis call.",
      },
      {
        step: "Concurrency-Safe Paper Trading Engine",
        desc: "Per-user distributed order locks (acquireOrderLock), dynamic slippage simulation, statutory Indian fee modeling (STT, SEBI, GST), and penny-stock (<₹10) guards.",
      },
    ],
    stack: ["Node.js", "Python (FastAPI)", "React 18", "Socket.IO", "Protobuf", "Redis", "PostgreSQL", "MongoDB", "TanStack Virtual"],
  },
  {
    id: "ace",
    badge: "03 · NEURAL VOICE AI & VECTOR MEMORY",
    title: "ACE (Life OS — Aura Companion)",
    subtitle: "HTTP Chunked Azure Neural Voice · Phonetic Speech Sanitizer · Embedded Gemini Vector Memory",
    liveUrl: "https://ace.stealthgrowth.in",
    githubUrl: "https://github.com/harshalsawatkar/ace-",
    metrics: [
      { k: "Phrase Cache", v: "<20ms Playback" },
      { k: "Embeddings", v: "3072-d Gemini" },
      { k: "Availability", v: "Offline Fallback" },
    ],
    pipeline: [
      {
        step: "Semantic Vector Memory + Offline Fallback",
        desc: "Queries SQLite VectorMemoryStore via gemini-embedding-001 cosine similarity with a zero-downtime deterministic L2 hashing vectorizer fallback.",
      },
      {
        step: "Closed-Loop Agentic Tool Calling",
        desc: "Executes autonomous progressive overload calculations, workout split mutations, and multi-device Server-Sent Events (SSE) synchronization.",
      },
      {
        step: "Phonetic Sanitizer & Chunked Neural TTS",
        desc: "Strips Markdown/code/emojis, expands spoken units ($50k → fifty thousand dollars, 100kg → one hundred kilograms), and streams audio/mpeg chunks.",
      },
    ],
    stack: ["Node.js", "Express", "Azure Neural Voice", "Gemini API", "SQLite Vector", "Server-Sent Events (SSE)", "PWA"],
  },
  {
    id: "deskhand",
    badge: "04 · COMPUTER-USE & CYCLIC BROWSER AGENTS",
    title: "Deskhand & Ghost Agent",
    subtitle: "Sandboxed Playwright Browser Host · Hard 150-Call Disk Budget · iOS FaceID HITL Approval Gates",
    liveUrl: null,
    githubUrl: "https://github.com/harshalsawatkar",
    metrics: [
      { k: "Call Budget", v: "150 Hard Disk Cap" },
      { k: "SDR Cycle Cut", v: "70% Faster Triage" },
      { k: "Safety Gate", v: "FaceID + Kill Switch" },
    ],
    pipeline: [
      {
        step: "Sandboxed Playwright Host & Asset Interception",
        desc: "Isolated Chromium contexts aborting non-essential media/font requests to cut page parse latency by 65% while extracting DOM tech-stack signals.",
      },
      {
        step: "Hard Budget & Allowlist Perimeter",
        desc: "Enforces strict domain allowlist.json rules and an atomic 150-call disk counter that auto-halts on HTTP 429/401/403 or OS kill switch (Ctrl+Shift+K).",
      },
      {
        step: "LangGraph Cyclic HITL Checkpoints",
        desc: "Pauses execution before high-risk browser mutations or outbound sales dispatch, requiring 1-tap iOS SwiftUI FaceID or dashboard operator approval.",
      },
    ],
    stack: ["TypeScript", "Python", "LangGraph", "Playwright", "FastAPI", "SwiftUI (iOS)", "Azure OpenAI", "NVIDIA NIM"],
  },
];

const capabilityPills = [
  "LangGraph Cyclic StateMachines",
  "Model Context Protocol (MCP)",
  "Production Hybrid RAG & Evals",
  "Sub-50ms Protobuf WebSockets",
  "Chunked Neural Voice AI",
  "Next.js · FastAPI · Node.js · Go",
  "Redis · PostgreSQL · Delta Lake",
];

const Home = () => {
  const [activeArchId, setActiveArchId] = useState("dataglow");
  const activeArch =
    flagshipArchitectures.find((a) => a.id === activeArchId) || flagshipArchitectures[0];

  return (
    <div className="bg-[#05070e] min-h-[100dvh] xl:h-full relative overflow-hidden">
      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <ParticlesContainer />
      </div>
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="w-[650px] h-[650px] absolute -top-40 -right-40 bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="w-[550px] h-[550px] absolute -bottom-40 -left-40 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Scrollable Main Content Viewport */}
      <div className="w-full h-[100dvh] bg-transparent relative overflow-y-auto overflow-x-hidden z-20 card-scroll">
        <div className="container mx-auto px-4 sm:px-6 xl:px-4 pt-20 sm:pt-24 xl:pt-24 pb-28 xl:pb-12">
          {/* Top Live Telemetry Status Bar */}
          <motion.div
            variants={fadeIn("down", 0.1)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-wrap items-center justify-between gap-2 mb-5 px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
          >
            <div className="flex items-center gap-2.5 text-[11px] font-mono text-white/80">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-emerald-300 tracking-wider uppercase">
                AGENTIC SYSTEMS ONLINE
              </span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span className="hidden sm:inline text-white/65">
                Pune, India (IST · Full EU &amp; US-East Overlap)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/40 text-accent font-semibold">
                Open to Pune In-Office &amp; Global Remote
              </span>
            </div>
          </motion.div>

          {/* Main 2-Column Command Center Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-7 items-start">
            {/* LEFT COLUMN (7 cols): Positioning + 4 Hard-Metric USPs + CTAs */}
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="xl:col-span-7 flex flex-col text-left"
            >
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[2.5px] text-cyan-300/90 mb-2">
                <BsCpu className="text-sm" />
                <span>Full-Stack AI &amp; Distributed Systems Engineer</span>
              </div>

              <h1 className="text-3xl sm:text-4xl xl:text-[2.65rem] font-extrabold tracking-tight text-white leading-[1.12] mb-3">
                Harshal Sawatkar{" "}
                <span className="block text-lg sm:text-xl xl:text-[1.35rem] font-semibold text-white/75 mt-1.5">
                  Building Production{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-rose-400">
                    LangGraph Agents, MCP Connectors, RAG
                  </span>{" "}
                  &amp; Sub-50ms Streaming Backends.
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-5 max-w-2xl">
                I turn complex AI product concepts into deterministic, fault-tolerant production software. Over{" "}
                <span className="text-white font-semibold">2+ years</span>, I have architected enterprise data-readiness platforms (
                <a href="https://dataglow.ai" target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">
                  DataGlow
                </a>
                ), institutional FinTech terminals (
                <a href="https://stockgenius.ai" target="_blank" rel="noreferrer" className="text-emerald-300 hover:underline">
                  StockGenius AI
                </a>
                ), chunked neural voice companions (
                <a href="https://ace.stealthgrowth.in" target="_blank" rel="noreferrer" className="text-purple-300 hover:underline">
                  ACE
                </a>
                ), and real-time CRMs processing <span className="text-white font-semibold">10,000+ monthly leads</span>.
              </p>

              {/* 4 Hard-Metric USP Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {uspHighlights.map((u) => (
                  <div
                    key={u.label}
                    className={`p-3.5 rounded-xl border bg-gradient-to-br ${u.accent} backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5`}
                  >
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span className="text-2xl sm:text-[1.6rem] font-extrabold text-white tracking-tight">
                        {u.metric}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 border border-white/10">
                        {u.tag}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white/95 mb-1">{u.label}</div>
                    <div className="text-[11px] text-white/65 leading-snug">{u.detail}</div>
                  </div>
                ))}
              </div>

              {/* Capability Stack Strip */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {capabilityPills.map((pill) => (
                  <span
                    key={pill}
                    className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.04] text-[10.5px] font-mono text-white/75"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              {/* Action Buttons Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(241,48,36,0.35)] transition-all"
                >
                  <span>Explore All 20+ Systems</span>
                  <BsArrowRight className="text-base" />
                </Link>

                <a
                  href="/Harshal_Sawatkar_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/[0.05] hover:border-cyan-400/60 hover:text-cyan-300 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all"
                >
                  <BsFileEarmarkPdf className="text-accent" />
                  <span>ATS Resume (PDF)</span>
                </a>

                <a
                  href="https://github.com/harshalsawatkar"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/[0.03] hover:border-white/40 text-white/85 text-xs sm:text-sm flex items-center gap-2 transition-all"
                >
                  <BsGithub />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/harshal-sawatkar/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/[0.03] hover:border-white/40 text-white/85 text-xs sm:text-sm flex items-center gap-2 transition-all"
                >
                  <BsLinkedin className="text-sky-400" />
                  <span>LinkedIn</span>
                </a>

                <Link
                  href="/contact"
                  className="px-3.5 py-2.5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-semibold text-xs sm:text-sm transition-all"
                >
                  Hire / Book Call
                </Link>
              </div>
            </motion.div>

            {/* RIGHT COLUMN (5 cols): Interactive Flagship Agentic Architecture Console */}
            <motion.div
              variants={fadeIn("left", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="xl:col-span-5 w-full"
            >
              <div className="rounded-2xl border border-white/15 bg-[#0a0f1d]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden">
                {/* Console Header */}
                <div className="px-4 py-3 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    <span className="ml-1.5 text-[11px] font-mono uppercase tracking-wider text-white/70 flex items-center gap-1.5">
                      <BsDiagram3 className="text-cyan-400" />
                      Flagship Architecture Inspector
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300/80">VERIFIED PROD</span>
                </div>

                {/* System Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-white/10 bg-black/40">
                  {flagshipArchitectures.map((arch) => {
                    const isActive = arch.id === activeArch.id;
                    return (
                      <button
                        key={arch.id}
                        type="button"
                        onClick={() => setActiveArchId(arch.id)}
                        className={`px-2.5 py-2.5 text-[11px] font-mono font-semibold transition-all border-b-2 text-center truncate ${
                          isActive
                            ? "border-cyan-400 bg-cyan-400/10 text-white"
                            : "border-transparent text-white/45 hover:text-white/80 hover:bg-white/[0.02]"
                        }`}
                      >
                        {arch.title.split(" ")[0]}
                      </button>
                    );
                  })}
                </div>

                {/* Active System Blueprint Body */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeArch.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 text-left"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-0.5">
                          {activeArch.badge}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                          {activeArch.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {activeArch.liveUrl && (
                          <a
                            href={activeArch.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/25 text-[11px] font-mono flex items-center gap-1"
                          >
                            <span>Live</span>
                            <BsBoxArrowUpRight className="text-[10px]" />
                          </a>
                        )}
                        {activeArch.githubUrl && (
                          <a
                            href={activeArch.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white/85 hover:bg-white/20 text-[11px] font-mono flex items-center gap-1"
                          >
                            <BsGithub />
                            <span>Code</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-[11.5px] text-white/60 mb-3">{activeArch.subtitle}</p>

                    {/* 3 Telemetry Mini-Counters */}
                    <div className="grid grid-cols-3 gap-2 mb-3.5">
                      {activeArch.metrics.map((m) => (
                        <div
                          key={m.k}
                          className="p-2 rounded-lg bg-white/[0.03] border border-white/10"
                        >
                          <div className="text-[9.5px] font-mono uppercase text-white/45">
                            {m.k}
                          </div>
                          <div className="text-xs font-bold text-cyan-300 mt-0.5">{m.v}</div>
                        </div>
                      ))}
                    </div>

                    {/* Execution Pipeline Nodes */}
                    <div className="space-y-2 mb-3.5">
                      {activeArch.pipeline.map((node, i) => (
                        <div
                          key={node.step}
                          className="p-2.5 rounded-lg bg-black/45 border border-white/10 hover:border-cyan-400/30 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-xs font-semibold text-white mb-0.5">
                            <span className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-[10px] font-mono flex items-center justify-center shrink-0">
                              {i + 1}
                            </span>
                            <span>{node.step}</span>
                          </div>
                          <div className="text-[11px] text-white/65 pl-6 leading-snug">
                            {node.desc}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Verified Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                      {activeArch.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-400/25 text-[10px] font-mono text-indigo-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
