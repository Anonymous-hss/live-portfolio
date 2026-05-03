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

const proofPoints = [
  "15 shipped products",
  "Public repos + live products",
  "Private work explained clearly",
  "Full stack + AI delivery",
];

const Home = () => {
  return (
    <div className="bg-black min-h-[100dvh] xl:h-full relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticlesContainer />
      </div>

      <div className="w-full min-h-[100dvh] xl:h-full bg-transparent relative overflow-y-auto overflow-x-hidden z-20">
        <div className="text-center flex flex-col justify-center lg:pt-40 lg:text-left pt-24 pb-28 lg:pb-4 h-max lg:h-full container mx-auto">
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
            className="max-w-sm md:max-w-2xl lg:max-w-xl mx-auto lg:mx-0 mb-8 text-sm sm:text-base leading-relaxed text-white/80"
          >
            I build product-ready web, mobile, CRM, and AI systems for teams that need clean execution and reliable delivery.
            Over the last <ShinyText speed={2} spread={100} color="#94a3b8" shineColor="#ffffff" className="font-semibold">2+ years</ShinyText>, I have shipped live ecommerce experiences, internal CRMs handling <ShinyText speed={2} spread={110} color="#94a3b8" shineColor="#ffffff" className="font-semibold">10,000+ leads per month</ShinyText>, real-time products, and public AI tools.
            This portfolio is structured around proof: shipped work, public repos where possible, and clear case-study notes for private client systems.
          </motion.p>

          <motion.div
            variants={fadeIn("down", 0.35)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8 max-w-2xl"
          >
            {proofPoints.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[10px] sm:text-[11px] font-mono uppercase tracking-[2px] text-white/65"
              >
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={fadeIn("down", 0.38)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-wrap gap-4 justify-center lg:justify-start text-[11px] font-mono uppercase tracking-[2px] text-white/45 mb-8"
          >
            <Link href="/testimonials" className="hover:text-accent transition-colors">
              Proof of work
            </Link>
            <Link href="/harshal-sawatkar-resume.pdf" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              Resume
            </Link>
            <Link href="https://github.com/Anonymous-hss" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              GitHub
            </Link>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:hidden relative gap-y-4 gap-x-4 mt-4">
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
            className="hidden lg:flex items-center gap-x-8"
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

      <div className="w-[1200px] h-full absolute right-0 bottom-0 pointer-events-none z-10">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] absolute bottom-[-10%] right-[-10%] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-accent/30 via-accent/5 to-transparent blur-[120px] rounded-full mix-blend-screen opacity-70"></div>
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
