// testimonial data
const testimonialData = [
  {
    image: "/pp.png",
    name: "Versatile",
    message:
      "I can work upon different Tech-Stack for Development and have Knowledge of variouus domains such as Cyber Security, Blockchain, Web Development and etc",
  },
  {
    image: "/pp3.png",
    name: "Leader",
    message:
      "Lead a team of 10+ coordinators for Student Placement Cell and successfully conduncted over 15+ college events, also I have been coordinating with The Hacker's Meetup-Nagpur and Conducted 5+ Meetups on Cyber Security",
  },
  {
    image: "/TG2.png",
    name: "Tech Geek",
    message:
      "Apart from My Tech and Non-tech Skills I have keen interest in exploring new Technologies, Gadgets and etc which makes me feel motivated to work in this field.",
  },
];

// data

import { Navigation, Pagination } from "swiper";

// icons

import { FaQuoteLeft } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const TestimonialSlider = () => {
  return (
    <Swiper
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="h-[400px]"
    >
      {testimonialData.map((person, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center md:flex-row gap-x-8 h-full px-16">
              <div className="w-full max-w-[300px] flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0">
                <div className="flex flex-col justify-center text-center">
                  <div className="mb-2 mx-auto">
                    <Image
                      src={person.image}
                      width={100}
                      height={100}
                      alt=""
                      className="max-w-[200px] max-h-[200px]"
                    ></Image>
                  </div>
                  <div className="text-lg text-accent">{person.name}</div>
                  {/* <div className="text-[12px] uppercase font-extralight tracking-widest">
                    {person.position}
                  </div> */}
                </div>
              </div>
              <div className=" flex-1 flex flex-col justify-center before:w-[1px] xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-[200px] relative xl:pt-20">
                <div className="mb-4">
                  <FaQuoteLeft className="text-4xl xl:text-6xl text-white/20 mx-auto md:mx-0"></FaQuoteLeft>
                </div>

                <div className="xl:text-lg text-center md:text-left">
                  {person.message}
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TestimonialSlider;
