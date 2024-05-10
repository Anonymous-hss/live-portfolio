import Image from "next/image";

const Avatar = () => {
  return (
    <div className="hidden xl:flex xl:max-w-none">
      <Image
        src={"/avatar3.png"}
        width={637}
        height={578}
        alt=""
        className="translate-z-0 w-full h-full"
      ></Image>
    </div>
  );
};

export default Avatar;
