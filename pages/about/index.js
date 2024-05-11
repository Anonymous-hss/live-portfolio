/* eslint-disable react/jsx-key */
import React, { useState } from "react";

// icons
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma,
  FaJava,
  FaGit,
  FaGithub,
  FaBootstrap,
  FaNodeJs,
  FaPhp,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiFramer,
  SiAdobexd,
  SiAdobephotoshop,
  SiTailwindcss,
  SiPostman,
  SiC,
  SiCplusplus,
  SiSolidity,
  SiPython,
  SiMysql,
  SiKalilinux,
  SiLeaderprice,
  SiJquery,
  SiMongodb,
  SiMongoose,
  SiExpress,
  SiPrisma,
} from "react-icons/si";

//  data
const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Web Development",
        icons: [
          <FaHtml5 />,
          <FaCss3 />,
          <FaJs />,
          <FaReact />,
          <SiNextdotjs />,
          <SiTailwindcss />,
          <SiPostman />,
          <SiMysql />,
          <FaBootstrap />,
        ],
      },
      {
        title: "            ",
        icons: [
          <SiJquery />,
          <SiMongodb />,
          <SiMongoose />,
          <SiExpress />,
          <FaNodeJs />,
          <SiMysql />,
          <SiPrisma />,
          <FaWordpress />,
          <FaPhp />,
        ],
      },
      {
        title: "Programming Languages",
        icons: [
          <SiC />,
          <SiCplusplus />,
          <FaJava />,
          <SiSolidity />,
          <SiPython />,
        ],
      },
      {
        title: "Other",
        icons: [<FaGit />, <FaGithub />, <SiKalilinux />],
      },
    ],
  },
  {
    title: "Leadership",
    info: [
      {
        title: "President - Student Placement Cell(PBCOE)",
        stage: "2022 - 2023",
      },
      {
        title: "Core Team Member - The Hackers Meetup Nagpur",
        stage: "2023 - Present",
      },
    ],
  },
  {
    title: "experience",
    info: [
      {
        title: "Software Tainee",
        stage: "Jan 2024 - Present",
      },
      {
        title: "Web Development Intern - ITNetworkZ Infosystem",
        stage: "Mar - Jun 2022",
      },
    ],
  },
  {
    title: "Education",
    info: [
      {
        title:
          "B Tech in Computer Science - Priyadarshini Bhagwati College of Engineering, Nagpur",
        stage: "2024",
      },
      {
        title: "HSC Bifocal Science Computer - St Paul Jr College, Nagpur",
        stage: "2020",
      },
      {
        title: "SSC - C. G. Wanjari, Nagpur",
        stage: "2018",
      },
    ],
  },
];

import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";

import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

import CountUp from "react-countup";

const About = () => {
  const [index, setIndex] = useState(0);
  console.log(index);
  return (
    <div className="h-screen bg-gradient-to-t from-gray-900 to-purple-900 via-black py-32 text-center xl:text-left overflow-auto">
      <Circles></Circles>
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0.2 -left-[370px]"
      >
        <Avatar></Avatar>
      </motion.div>
      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6 mt-14">
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2"
          >
            Who am I<span className="text-accent"> ?</span>
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:px-0"
          >
            I am a final-year engineering student with a knack for programming,
            website development, and competitive coding. A cybersecurity
            enthusiast and Web3 enthusiast, I am enthusiastic about adopting new
            tech trends. I thrive on challenges, always ready to take
            responsibility for pushing the boundaries of digital innovation.
          </motion.p>
          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden md:flex md: max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
          >
            <div className="flex flex-1 xl:gap-x-6">
              {/* <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={10} duration={5}></CountUp>+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Years of experience
                </div>
              </div>
              
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={250} duration={5}></CountUp>+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Satisfied clients
                </div>
              </div>
               */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={15} duration={5}></CountUp>+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Finished projects
                </div>
              </div>
              {/* awards */}
              <div className="relative flex-1 ">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={20} duration={5}></CountUp>+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Tech Events/Meetups
                </div>
              </div>
              <div className="relative flex-1 ">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={5} duration={5}></CountUp>+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Client Work
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col w-full xl:max-w-[48%] h-[480px]"
        >
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4">
            {aboutData.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className={`${
                    index === itemIndex &&
                    "text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300"
                  } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                  onClick={() => setIndex(itemIndex)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
          <div className=" py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start">
            {aboutData[index].info.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className="cursor-pointer flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-white/60"
                >
                  <div className="font-light mb-2 md:mb-0">{item.title}</div>
                  <div className="hidden md:flex"></div>
                  <div>{item.stage}</div>
                  <div className="flex gap-x-4">
                    {item.icons?.map((icon, itemIndex) => {
                      return <div className="text-2xl text-white"> {icon}</div>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
