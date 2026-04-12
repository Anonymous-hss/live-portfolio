import Image from "next/image";

import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";

import { motion } from "framer-motion";
import { fadeIn } from "../variants";

import { Press_Start_2P } from "next/font/google";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const Shuffle = dynamic(() => import("../components/Shuffle"), { ssr: false });
const ShinyText = dynamic(() => import("@/components/ShinyText"), { ssr: false });

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const Home = () => {
  return (
    <div className="bg-primary/60 h-full">
      <div className="m-full h-full bg-gradient-to-t from-gray-900 to-purple-900 via-black relative overflow-y-auto overflow-x-hidden">
        <ParticlesContainer />
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left pt-36 pb-24 h-max xl:h-full container mx-auto">
          <motion.h2
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className={`h2 ${pressStart.className}`}
          >
            <Shuffle
              text="Harshal Sawatkar"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
              loop={false}
              loopDelay={0}
              className="text-white text-[1.2rem] sm:text-3xl md:text-5xl mb-4 md:mb-0"
            />
            <Shuffle
              text="Full Stack Developer"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
              loop={false}
              loopDelay={0}
              className="text-accent text-[0.8rem] sm:text-xl md:text-3xl mt-4 xl:mt-2 block"
            />
          </motion.h2>
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
          >
            I don’t just build projects, I design and ship products that scale, perform, and create real impact.

            With <ShinyText speed={1} spread={120} color="#b5b5b5" shineColor="#f13024" className="font-semibold text-white">2+ years of experience</ShinyText>, I’ve worked across <ShinyText speed={2} spread={100} color="#b5b5b5" shineColor="#f13024" className="font-semibold text-white">MERN, Next.js, Go, and modern AI stacks</ShinyText> to build production-grade systems end-to-end.

            From scaling CRMs handling
            <ShinyText speed={2} spread={110} color="#b5b5b5" shineColor="#f13024" className="font-semibold text-white">10,000+ leads/month across multi-branch operations</ShinyText>,
            to developing real-time architectures using <ShinyText speed={2} spread={90} color="#b5b5b5" shineColor="#f13024" className="font-semibold text-white">WebSockets, Redis, and microservices</ShinyText>,
            I focus on performance, reliability, and clean system design.

            I’ve built SEO-driven platforms, high-conversion landing pages, and AI-powered products leveraging <ShinyText speed={2} spread={100} color="#b5b5b5" shineColor="#f13024" className="font-semibold text-white">RAG, LangChain, and LLM integrations</ShinyText> always owning everything from backend architecture to deployment pipelines.

            Driven by curiosity and a product-first mindset, my goal is simple <ShinyText speed={2} spread={130} color="#b5b5b5" shineColor="#f13024" className="font-semibold text-white">build things that don’t just work, but stand out.</ShinyText>
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center xl:hidden relative gap-y-4 gap-x-4 mt-8">
            <ProjectsBtn></ProjectsBtn>
            <Link
              href="/contact"
              className="btn rounded-full border border-white/50 px-8 py-3 w-[185px] sm:w-auto h-[50px] transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group relative"
            >
              <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500 font-medium">
                Connect with me
              </span>
              <BsArrowRight className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px] text-accent"></BsArrowRight>
            </Link>
          </div>
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden xl:flex items-center gap-x-8"
          >
            <ProjectsBtn></ProjectsBtn>
            <Link
              href="/contact"
              className="btn rounded-full border border-white/50 px-8 py-3 transition-all h-[56px] duration-300 flex items-center justify-center overflow-hidden hover:border-accent group relative"
            >
              <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500 font-medium">
                Connect with me
              </span>
              <BsArrowRight className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px] text-accent"></BsArrowRight>
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="w-[1200px] h-full absolute right-0 bottom-0">
        <div className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"></div>
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
