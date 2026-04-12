import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const transitionVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "-100%",
    transition: { delay: 0.4, duration: 0.6, ease: [0.76, 0, 0.24, 1] }, // Speed up
  },
  exit: {
    y: ["100%", "0%"],
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }, // Speed up
  },
};

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    let interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration >= text.length) {
        clearInterval(interval);
      }
    }, 15); // Faster scramble iteration

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const Transition = () => {
  return (
    <>
      <motion.div
        className="fixed top-0 bottom-0 left-0 w-screen h-screen z-50 bg-[#0a0a0e] flex flex-col items-center justify-center overflow-hidden"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Animated Cyber Grid */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(#4b3792 1px, transparent 1px), linear-gradient(90deg, #4b3792 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.15, scale: 1 }}
          exit={{ opacity: 0.3, scale: 1.05 }}
          transition={{ duration: 1 }}
        ></motion.div>

        {/* Glow */}
        <div className="absolute inset-0 bg-radial-at-c from-[#4b3792]/10 via-[#0a0a0e]/80 to-[#0a0a0e]"></div>

        {/* Branding Element */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-4xl md:text-7xl font-extrabold text-white tracking-[15px] uppercase drop-shadow-[0_0_15px_rgba(75,55,146,0.6)]"
          >
            <ScrambleText text="HARSHAL" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-xs md:text-sm tracking-[5px] text-white/50 uppercase font-mono"
          >
            SYS.READY_
          </motion.div>
        </div>
      </motion.div>

      {/* Secondary Wipe (The Polish Layer) */}
      <motion.div
        className="fixed top-0 bottom-0 left-0 w-screen h-screen z-40 bg-[#4b3792]"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        exit={{ y: ["100%", "0%"] }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      ></motion.div>
    </>
  );
};

export default Transition;
