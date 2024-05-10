// data
const workSlides = {
  slides: [
    {
      images: [
        {
          title: "Ai-SaaS",
          path: "/tumbnew.png",
          href: "https://github.com/Anonymous-hss/Ai-SaaS",
        },
        {
          title: "Fashion Recommendation Engine",
          path: "/thumb1.png",
          href: "https://github.com/Anonymous-hss/Fashion-Recommendation-Engine-Updated",
        },
        {
          title: "Fashion Recommendation Chatbot",
          path: "/thumb2.png",
          href: "https://github.com/Anonymous-hss/Fashion-Recommendation-Chatbot",
        },
        {
          title: "Designer Portfolio",
          path: "/thumb31.jpg",
          href: "https://anonymous-hss.github.io/Portfolio-website/",
        },
        {
          title: "AR-VR Try-on",
          path: "/thumb41.jpg",
          href: "https://github.com/Anonymous-hss/AR-VR-TRY-ON",
        },
      ],
    },
    {
      images: [
        {
          title: "Amazon Clone",
          path: "/thumb5.png",
          href: "https://github.com/Anonymous-hss/amazon-clone-new",
        },
        {
          title: "UbTech",
          path: "/thumb6.png",
          href: "https://github.com/Anonymous-hss/Ubtech",
        },
        {
          title: "SimpleStorage SmartContract",
          path: "/thumb7.png",
          href: "https://github.com/Anonymous-hss/Blockchain-Project1-SimpleStorage",
        },
        {
          title: "FundMe Smartcontract",
          path: "/thumb8.png",
          href: "https://github.com/Anonymous-hss/Fund-me-smart-contract-",
        },
      ],
    },
  ],
};

// data

import { Pagination } from "swiper";

// icons

import { BsArrowRight } from "react-icons/bs";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const WorkSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="h-[280px] sm:h-[480px]"
    >
      {workSlides.slides.map((slide, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 cursor-pointer">
              {slide.images.map((image, index) => {
                return (
                  <div
                    className="relative rounded-lg overflow-hidden flex items-center justify-center group"
                    key={index}
                  >
                    <a
                      href={image.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center justify-center relative overflow-hidden">
                        <Image
                          src={image.path}
                          width={500}
                          height={300}
                          alt=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent vai-[#e838cc] to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700"></div>
                        <div className="absolute bottom-0 translate-y-full group-hover:-translate-y-10 group-hover:xl:-translate-y-20 transition-all duration-300">
                          <div className="flex items-center gap-x-2 text-[13px] tracking-[0.2em]">
                            <div className="delay-100">PROJECT</div>
                            <div className="translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                              CODES
                            </div>
                            <div className=" text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-200">
                              <BsArrowRight />{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default WorkSlider;
