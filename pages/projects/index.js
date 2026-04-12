import ProjectGallery from "../../components/ProjectGallery";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

const Projects = () => {
  return (
    <div className="h-[100dvh] bg-primary pt-32 pb-4 text-center xl:text-left overflow-hidden relative z-10 w-full flex items-center">
      {/* Animated Purple/Violet Aura Orb */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-0 right-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[700px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none -z-10 translate-x-1/4 translate-y-1/4"
      ></motion.div>

      {/* Cyber Grid Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none -z-20"
        style={{
          backgroundImage: `linear-gradient(#4b3792 1px, transparent 1px), linear-gradient(90deg, #4b3792 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      ></div>
      
      <Circles></Circles>
      
      <div className="container mx-auto h-full relative z-10">
        <div className="flex flex-col xl:flex-row gap-x-12 w-full h-[calc(100vh-160px)] mt-4">
          {/* Text Side */}
          <div className="text-center flex xl:w-[18vw] flex-col lg:text-left mb-8 xl:mb-0 shrink-0">
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
              className="mb-8 max-w-[400px] mx-auto lg:mx-0 text-white/60 leading-relaxed text-sm"
            >
              A curated collection of my most impactful work across mobile, web,
              AI, and custom CRM architectures. Each project represents a unique 
              challenge solved with precision engineering.
            </motion.p>
            
            <div className="hidden xl:flex flex-col gap-y-2 text-[10px] font-mono uppercase tracking-[3px] text-white/20">
              <div className="flex items-center gap-x-2">
                <div className="w-1 h-1 bg-accent rounded-full"></div>
                13+ Production Releases
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-1 h-1 bg-accent rounded-full"></div>
                Scalable Architectures
              </div>
            </div>
          </div>

          {/* Gallery Side */}
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full flex-grow overflow-hidden"
          >
            <ProjectGallery />
          </motion.div>
        </div>
      </div>
      <Bulb></Bulb>
    </div>
  );
};

export default Projects;
