// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from "react-icons/hi2";

// nav data
export const navData = [
  { name: "home", path: "/", icon: <HiHome /> },
  { name: "about", path: "/about", icon: <HiUser /> },
  { name: "projects", path: "/projects", icon: <HiViewColumns /> },
  { name: "qualities", path: "/qualities", icon: <HiRectangleGroup /> },
  {
    name: "proof",
    path: "/testimonials",
    icon: <HiChatBubbleBottomCenterText />,
  },
  {
    name: "contact",
    path: "/contact",
    icon: <HiEnvelope />,
  },
];

import Link from "next/link";

import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <nav className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen pointer-events-none">
      {/* Outer Wrapper: Shadow and Shape */}
      <div className="w-full h-[80px] xl:h-max xl:rounded-full pointer-events-auto xl:shadow-[0_0_20px_rgba(0,0,0,0.5)] relative">
        
        {/* Layer 1: Animated Border (Clipped) */}
        <div className="nav-border-container xl:rounded-full">
           <div className="w-full h-full nav-border-glow" />
        </div>

        {/* Layer 2: Interior Content (Unclipped) */}
        <div className="flex w-full h-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 xl:py-8 nav-glass-interior text-3xl xl:text-xl xl:rounded-full overflow-visible relative">
          {navData.map((link, index) => {
            const isActive = link.path === pathname;
            return (
              <Link
                href={link.path}
                key={index}
                className={`${
                  isActive ? "text-accent drop-shadow-[0_0_8px_rgba(241,48,36,0.6)]" : "text-slate-400"
                } group relative flex items-center justify-center w-[50px] h-[50px]`}
                data-cursor="hover"
              >
                {/* Desktop Dynamic Expansion Pill */}
                <div className="hidden xl:flex absolute right-0 items-center justify-end h-full w-full rounded-full group-hover:w-[140px] bg-transparent group-hover:bg-white/10 transition-all duration-300 ease-out overflow-hidden group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] z-0">
                  <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-[56px] text-[13px] font-semibold text-white capitalize tracking-wide">
                    {link.name}
                  </span>
                </div>

                {/* Foreground Icon */}
                <div className="relative z-10 transition-all duration-300 group-hover:text-white flex items-center justify-center">
                  {link.icon}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
