import Link from "next/link";

import {
  RiInstagramLine,
  RiFacebookBoxLine,
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
        className="hover:text-accent transition-all duration-300"
      >
        <RiTwitterLine></RiTwitterLine>
      </Link>

      <Link
        href={"https://github.com/Anonymous-hss"}
        className="hover:text-accent transition-all duration-300"
      >
        <RiGithubLine></RiGithubLine>
      </Link>
      <Link
        href={"https://www.linkedin.com/in/harshal-sawatkar/"}
        className="hover:text-accent transition-all duration-300"
      >
        <RiLinkedinLine></RiLinkedinLine>
      </Link>
      <Link
        href={"https://www.instagram.com/hss.exe/"}
        className="hover:text-accent transition-all duration-300"
      >
        <RiInstagramLine></RiInstagramLine>
      </Link>
      <Link
        href={"https://www.facebook.com/harshal.sawatkar/"}
        className="hover:text-accent transition-all duration-300"
      >
        <RiFacebookBoxLine></RiFacebookBoxLine>
      </Link>
      {/* <Link href={""} className="hover:text-accent transition-all duration-300">
        <RiPinterestLine></RiPinterestLine>
      </Link> */}
    </div>
  );
};

export default Socials;
