import WorkSlider from "../../components/WorkSlider";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import Link from "next/link";

const Work = () => {
  return (
    <div className="h-full bg-gradient-to-t from-gray-900 to-purple-900 via-black py-36 flex items-center">
      <Circles></Circles>
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-x-8">
          <div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0">
            <motion.h2
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-12"
            >
              My Work <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto lg:mx-0"
            >
              Some of my experience include AI, Web Development, and Blockchain,
              solving real-world problems effectively. Developed an AI SaaS
              platform and a Fashion Recommendation Engine. Created a live
              user-friendly e-commerce website for
              <Link href="https://arlyn.us/"> Arlyn Perfumes</Link>.
            </motion.p>
          </div>
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:max-w-[65%]"
          >
            <WorkSlider></WorkSlider>
          </motion.div>
        </div>
      </div>
      <Bulb></Bulb>
    </div>
  );
};

export default Work;
