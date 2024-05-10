import ServiceSlider from "../../components/ServiceSlider";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

const Services = () => {
  return (
    <div className="h-full bg-primary/30 py-36 flex items-center">
      <Circles></Circles>
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-x-8">
          <div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0">
            <motion.h2
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-8 mt-12"
            >
              My Services <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto lg:mx-0"
            >
              I offer a versatile skill set encompassing programming, website
              development, and competitive coding. With leadership experience as
              the President of the Student Placement Cell and roles in The
              Hacker&apos;s Meetup, I excel in problem-solving and effective
              teamwork. Beyond development, I bring a passion for cybersecurity
              and Web3. In essence, I&apos;m your go-to for innovative
              solutions, leading initiatives, and collaborative endeavors.
            </motion.p>
          </div>
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:max-w-[65%]"
          >
            <ServiceSlider></ServiceSlider>
          </motion.div>
        </div>
      </div>
      <Bulb></Bulb>
    </div>
  );
};

export default Services;
