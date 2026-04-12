
import Link from "next/link";

import Socials from "../components/Socials";

const Header = () => {
  return (
    <header className="absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h[90px] min-h-[140px] pointer-events-none">
      <div className="container mx-auto pointer-events-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-2 py-1">
          <Link href={"/"}>
            <h1 className="text-3xl font-bold tracking-tight select-none">
              harshal<span className="text-accent">.</span>
            </h1>
          </Link>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <Link
              href="https://drive.google.com/file/d/1oOt5GGYGottKQ_ev91qQ5b-GVH6hzWYz/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/50 px-4 py-1.5 text-xs sm:text-sm transition-all duration-300 hover:border-accent hover:text-accent font-medium flex items-center justify-center"
            >
              Resume
            </Link>
            <Socials></Socials>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
