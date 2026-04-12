import Image from "next/image";

const Avatar = () => {
  return (
    <div className="hidden xl:flex xl:max-w-none">
      <Image
        src={"/prof-pic.png"}
        width={637}
        height={578}
        alt="Hero Image"
        className="translate-z-0 w-full h-full object-contain"
      ></Image>
    </div>
  );
};

export default Avatar;
