import ProjectGallery from "../../components/ProjectGallery";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

const Projects = () => {
  return (
    <div className="min-h-[100dvh] bg-primary text-center xl:text-left relative z-10 w-full overflow-x-hidden">
      {/* Animated Purple/Violet Aura Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[700px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none -z-10 translate-x-1/4 translate-y-1/4"
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

      {/* ── Main layout: flexible, scrollable on mobile ── */}
      <div className="container mx-auto relative z-10 px-4 xl:px-0">
        <div className="flex flex-col xl:flex-row gap-x-12 w-full pt-20 xl:pt-32 pb-24 xl:pb-4 xl:h-[100dvh]">

          {/* Text Side */}
          <div className="text-center flex xl:w-[18vw] flex-col xl:text-left mb-6 xl:mb-0 shrink-0">
            <motion.h2
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-8"
            >
              Wall of <span className="text-accent underline decoration-accent/20 underline-offset-8">Fame</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-6 max-w-[400px] mx-auto xl:mx-0 text-white/60 leading-relaxed text-sm"
            >
              A curated collection of my most impactful work across mobile, web,
              AI, and custom CRM architectures. Each project represents a unique
              challenge solved with precision engineering.
            </motion.p>

            <div className="hidden xl:flex flex-col gap-y-2 text-[10px] font-mono uppercase tracking-[3px] text-white/20">
              <div className="flex items-center gap-x-2">
                <div className="w-1 h-1 bg-accent rounded-full" />
                13+ Production Releases
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-1 h-1 bg-accent rounded-full" />
                Scalable Architectures
              </div>
            </div>
          </div>

          {/* Gallery Side */}
          {/* Desktop: fixed-height scrollable column. Mobile: flows naturally */}
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full flex-grow xl:overflow-hidden xl:h-[calc(100vh-160px)] xl:mt-4"
          >
            <ProjectGallery />
          </motion.div>
        </div>
      </div>

      <Bulb />
    </div>
  );
};

export default Projects;
