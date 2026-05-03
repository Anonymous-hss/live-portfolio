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
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { RxArrowTopRight } from "react-icons/rx";

const proofCards = [
  {
    icon: <HiOutlineRocketLaunch />,
    title: "Shipped products",
    description:
      "The projects section now includes a proof brief for every card: role, outcome, and how to verify the work even when the code is private.",
    badge: "Projects",
    href: "/projects",
    hrefLabel: "Open projects",
    glowColor: "220 80 70",
    colors: ["#38bdf8", "#818cf8", "#60a5fa"],
  },
  {
    icon: <HiOutlineServerStack />,
    title: "Public product links",
    description:
      "Live work is linked directly where possible, including public websites and a production mobile app listing on Google Play.",
    badge: "Live Proof",
    href: "https://play.google.com/store/apps/details?id=com.zizbey.zizbeyjobs&hl=en_IN",
    hrefLabel: "View production app",
    glowColor: "140 70 60",
    colors: ["#34d399", "#6ee7b7", "#38bdf8"],
  },
  {
    icon: <HiOutlineCpuChip />,
    title: "Inspectable code",
    description:
      "Public repositories are linked for the AI and CRM products that can be reviewed in the open, so technical reviewers can inspect implementation quality.",
    badge: "GitHub",
    href: "https://github.com/Anonymous-hss",
    hrefLabel: "Open GitHub",
    glowColor: "280 70 70",
    colors: ["#a78bfa", "#c084fc", "#f472b6"],
  },
  {
    icon: <HiOutlineDocumentText />,
    title: "Resume and references",
    description:
      "The resume is available directly on the site, and references can be shared on request for serious opportunities.",
    badge: "Resume",
    href: "/harshal-sawatkar-resume.pdf",
    hrefLabel: "Open resume",
    glowColor: "35 85 60",
    colors: ["#fbbf24", "#f59e0b", "#f97316"],
  },
];

const stats = [
  { value: 15, suffix: "+", label: "Shipped Products" },
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "k+", label: "Leads Per Month" },
  { value: 4, suffix: "", label: "Public Proof Paths" },
];

const quickLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/harshal-sawatkar-resume.pdf" },
  { label: "GitHub", href: "https://github.com/Anonymous-hss" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harshal-sawatkar/" },
];

const Testimonials = () => {
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-primary relative z-10 w-full overflow-x-hidden">
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

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none -z-10 translate-x-1/4 translate-y-1/4"
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
        <div className="pt-20 xl:pt-32 pb-24 xl:pb-8">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-center mb-8 xl:mb-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full mb-5"
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[3px] text-accent/80">
                Proof-focused profile
              </span>
            </motion.div>

            <h2 className="h2">
              Proof of <span className="text-accent">Work</span>
            </h2>
            <p className="text-white/55 text-sm max-w-2xl mx-auto leading-relaxed">
              This page exists to reduce trust friction. Instead of self-written testimonials, it points to the strongest public signals available: shipped products, live links, open repositories, and a direct resume.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 xl:mb-8">
            {proofCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.12 }}
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
                  <div className="p-5 xl:p-6 flex flex-col gap-4 h-full">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.07] rounded text-[9px] font-mono text-white/40 uppercase tracking-wide">
                        {card.badge}
                      </span>
                      <div className="text-2xl text-accent opacity-60 group-hover:opacity-100 transition-opacity">
                        {card.icon}
                      </div>
                    </div>

                    <h3 className="text-lg xl:text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                      {card.title}
                    </h3>

                    <p className="text-white/45 text-[12px] leading-relaxed flex-grow">{card.description}</p>

                    <a
                      href={card.href}
                      target={card.href.startsWith("/") ? "_blank" : "_blank"}
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[2px] text-white/35 hover:text-accent transition-colors mt-1"
                    >
                      {card.hrefLabel}
                      <RxArrowTopRight />
                    </a>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-white/[0.03] backdrop-blur-lg border border-white/[0.07] rounded-2xl p-5 xl:p-6 mb-6 xl:mb-8"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
              {stats.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl xl:text-4xl font-extrabold text-accent drop-shadow-[0_0_20px_rgba(241,48,36,0.4)]">
                    {isMounted && <CountUp start={0} end={item.value} duration={3} delay={0.5} />}
                    {item.suffix}
                  </div>
                  <div className="text-[9px] uppercase tracking-[3px] text-white/30 mt-2">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="bg-white/[0.03] backdrop-blur-lg border border-white/[0.07] rounded-2xl p-5 xl:p-6"
          >
            <div className="text-[10px] font-mono uppercase tracking-[3px] text-white/30 mb-4 text-center">
              Quick proof links
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {quickLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-mono uppercase tracking-[2px] text-white/55 hover:text-accent hover:border-accent/40 transition-all duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <p className="text-white/35 text-xs text-center max-w-2xl mx-auto mt-5 leading-relaxed">
              References are available on request for serious interview processes. Private client systems are documented in the portfolio with role, outcome, and verification notes even when the underlying code cannot be shared publicly.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
