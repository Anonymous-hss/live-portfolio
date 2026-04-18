import Link from "next/link";
import Socials from "../components/Socials";
import { useEffect, useState } from "react";

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Hide header when scrolling down more than 60px, show when scrolling up
      if (currentY > lastY && currentY > 60) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-30
        flex items-center px-5 xl:px-0 min-h-[70px] xl:min-h-[90px]
        transition-transform duration-300
        ${hidden ? "-translate-y-full" : "translate-y-0"}
        pointer-events-none
      `}
    >
      <div className="container mx-auto pointer-events-auto">
        <div className="flex flex-row justify-between items-center gap-y-2 py-2 xl:py-4">
          <Link href={"/"}>
            <h1 className="text-2xl xl:text-3xl font-bold tracking-tight select-none">
              harshal<span className="text-accent">.</span>
            </h1>
          </Link>
          <div className="flex items-center gap-x-3 xl:gap-x-6">
            <Link
              href="/harshal-sawatkar-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/50 px-3 xl:px-4 py-1.5 text-xs transition-all duration-300 hover:border-accent hover:text-accent font-medium flex items-center justify-center"
            >
              Resume
            </Link>
            <Socials />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
