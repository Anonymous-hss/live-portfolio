import Image from "next/image";

import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";

import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const Home = () => {
  return (
    <div className="bg-primary/60 h-full">
      <div className="m-full h-full bg-gradient-to-t from-gray-900 to-purple-900 via-black">
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left pt-16 h-full container mx-auto">
          <motion.h2
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            I&apos;m <br />
            <span className="text-accent">Harshal </span>
          </motion.h2>
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
          >
            Hey, welcome to my development playground! 👋 Here's where the magic
            happens. Delve into my tech odyssey and witness a whirlwind of
            projects, experiences, and more. From AI SaaS platforms to sleek web
            designs, my portfolio is a kaleidoscope of creativity and
            problem-solving prowess. 💻✨
          </motion.p>
          <div className="flex justify-center xl:hidden relative">
            <ProjectsBtn></ProjectsBtn>
          </div>
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden xl:flex"
          >
            <ProjectsBtn></ProjectsBtn>
          </motion.div>
        </div>
      </div>
      <div className="w-[1200px] h-full absolute right-0 bottom-0">
        <div className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"></div>
        <ParticlesContainer></ParticlesContainer>
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full max-w-[737px] max-h-[678px] absolute -bottom-32 lg:bottom-0 lg:right-[8%]"
        >
          <Avatar></Avatar>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
