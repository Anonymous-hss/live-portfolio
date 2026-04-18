import Link from "next/link";

import {
  RiPinterestLine,
  RiBehanceLine,
  RiTwitterLine,
  RiLinkedinLine,
  RiGithubLine,
} from "react-icons/ri";

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-lg">
      <Link
        href={"https://twitter.com/HarshalSawatkar"}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Twitter profile"
        className="hover:text-accent transition-all duration-300"
      >
        <RiTwitterLine></RiTwitterLine>
      </Link>

      <Link
        href={"https://github.com/Anonymous-hss"}
        target="_blank"
        rel="noreferrer"
        aria-label="Open GitHub profile"
        className="hover:text-accent transition-all duration-300"
      >
        <RiGithubLine></RiGithubLine>
      </Link>
      <Link
        href={"https://www.linkedin.com/in/harshal-sawatkar/"}
        target="_blank"
        rel="noreferrer"
        aria-label="Open LinkedIn profile"
        className="hover:text-accent transition-all duration-300"
      >
        <RiLinkedinLine></RiLinkedinLine>
      </Link>
    </div>
  );
};

export default Socials;
