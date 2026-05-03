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

const qualityData = [
  {
    icon: <RxLayers />,
    title: "Full-Stack Delivery",
    description:
      "Shipped public websites and internal systems across React, Next.js, Node.js, Go, and PostgreSQL with ownership spanning UI, APIs, and operational flows.",
    proof: "https://rebornclinics.in/",
    proofLabel: "Reborn Clinics",
    proofContext: "Live healthcare platform tied to lead and CRM workflows.",
    glowColor: "220 80 70",
    colors: ["#38bdf8", "#818cf8", "#60a5fa"],
  },
  {
    icon: <HiOutlineCpuChip />,
    title: "AI Product Work",
    description:
      "Built practical AI products with LangChain-style workflows, typed web stacks, local model integrations, and agent-oriented product design.",
    proof: "https://github.com/Anonymous-hss/local-mind",
    proofLabel: "Local Mind repo",
    proofContext: "Public codebase for a local-first AI coding assistant.",
    glowColor: "280 70 70",
    colors: ["#a78bfa", "#c084fc", "#f472b6"],
  },
  {
    icon: <RxCube />,
    title: "Systems and Operations",
    description:
      "Built systems that support real-time behavior, workforce coordination, and production workflows instead of one-off demo builds.",
    proof: "https://play.google.com/store/apps/details?id=com.zizbey.zizbeyjobs&hl=en_IN",
    proofLabel: "Zizbey Jobs",
    proofContext: "Production mobile app on Google Play.",
    glowColor: "140 70 60",
    colors: ["#34d399", "#6ee7b7", "#38bdf8"],
  },
  {
    icon: <RxRocket />,
    title: "Leadership and Community",
    description:
      "Led placement and community initiatives, organized events, and helped create opportunities outside day-to-day product delivery work.",
    proof: "https://photos.app.goo.gl/p4334N94eRTqLEYAA",
    proofLabel: "Event gallery",
    proofContext: "Public record of talks, meetups, and community work.",
    glowColor: "30 90 65",
    colors: ["#f472b6", "#c084fc", "#38bdf8"],
  },
  {
    icon: <RxLightningBolt />,
    title: "Performance and Conversion",
    description:
      "Worked on storefronts and growth-facing products where load time, usability, and faster follow-up directly affect business outcomes.",
    proof: "https://arlyn.us/",
    proofLabel: "Arlyn live site",
    proofContext: "Public ecommerce site used as live proof of shipping quality.",
    glowColor: "40 85 65",
    colors: ["#fbbf24", "#f59e0b", "#f472b6"],
  },
];

const stats = [
  { value: 2, suffix: "+", label: "Years Exp." },
  { value: 15, suffix: "+", label: "Shipped Products" },
  { value: 10, suffix: "k+", label: "Leads Per Month" },
  { value: 5, suffix: "", label: "Proof Areas" },
];

const Qualities = () => {
  const [isMounted, setIsMounted] = useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-primary text-center xl:text-left relative z-10 w-full overflow-x-hidden">
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

      <div
        className="absolute inset-0 opacity-10 pointer-events-none -z-20"
        style={{
          backgroundImage: `linear-gradient(#4b3792 1px, transparent 1px), linear-gradient(90deg, #4b3792 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <Circles />

      <div className="container mx-auto relative z-10 px-4 xl:px-0">
        <div className="flex flex-col xl:flex-row gap-x-12 w-full pt-20 xl:pt-32 pb-24 xl:pb-4 xl:h-[100dvh]">
          <div className="text-center flex xl:w-[18vw] flex-col xl:text-left mb-6 xl:mb-0 shrink-0">
            <motion.h2
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-8"
            >
              Proof Areas <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-6 max-w-[400px] mx-auto xl:mx-0 text-white/60 leading-relaxed text-sm"
            >
              Not self-ratings. Just the areas where I can point to real shipped work, public links, or concrete supporting evidence.
            </motion.p>

            <motion.div
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid grid-cols-2 xl:grid-cols-2 gap-4 mb-6 xl:mb-0"
            >
              {stats.map((item, index) => (
                <div key={index} className="text-left">
                  <div className="text-2xl font-extrabold text-accent drop-shadow-[0_0_15px_rgba(241,48,36,0.4)]">
                    {isMounted && <CountUp start={0} end={item.value} duration={3} />}
                    {item.suffix}
                  </div>
                  <div className="text-[9px] uppercase tracking-[3px] text-white/30 mt-1">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full flex-grow xl:overflow-y-auto xl:card-scroll xl:mt-4 pr-0 xl:pr-1 pb-2"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              {qualityData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
                  className={index === qualityData.length - 1 ? "lg:col-span-2" : ""}
                >
                  <BorderGlow
                    glowColor={item.glowColor}
                    colors={item.colors}
                    backgroundColor="#0d0d14"
                    borderRadius={18}
                    glowRadius={40}
                    glowIntensity={0.9}
                    coneSpread={28}
                    edgeSensitivity={25}
                    fillOpacity={0.35}
                    className="w-full group"
                  >
                    <div className="p-5 xl:p-6 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl text-accent">{item.icon}</div>
                        <h3 className="text-base xl:text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-white/55 text-[12px] leading-relaxed text-left">{item.description}</p>

                      <div className="text-[10px] font-mono uppercase tracking-[2px] text-white/25 text-left">
                        {item.proofContext}
                      </div>

                      <a
                        href={item.proof}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[2px] text-white/30 hover:text-accent transition-colors mt-1 group/link"
                      >
                        {item.proofLabel}
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
