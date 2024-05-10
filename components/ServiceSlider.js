// // icons
// import {
//   RxCrop,
//   RxPencil2,
//   RxDesktop,
//   RxReader,
//   RxRocket,
//   RxArrowTopRight,
// } from "react-icons/rx";

// // data
// const serviceData = [
//   {
//     icon: <RxCrop />,
//     title: "Lead",
//     description:
//       "Proven leader adept at steering teams, fostering collaboration.",
//   },
//   {
//     icon: <RxPencil2 />,
//     title: "Design",
//     description: "Web design proficiency for engaging digital experiences.",
//   },
//   {
//     icon: <RxDesktop />,
//     title: "Develope",
//     description: "Crafting  seamless online solutions in  development.",
//   },
//   {
//     icon: <RxReader />,
//     title: "Code",
//     description: "Precise coding for efficient, innovative digital solutions.",
//   },
//   {
//     icon: <RxRocket />,
//     title: "Problem Solving",
//     description: "Navigating challenges with effective, innovative solutions.",
//   },
// ];

// import { FreeMode, Pagination } from "swiper";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css/free-mode";
// import "swiper/css";
// import "swiper/css/pagination";

// const ServiceSlider = () => {
//   return (
//     <Swiper
//       breakpoints={{
//         320: {
//           slidesPerView: 1,
//           spaceBetween: 15,
//         },
//         640: {
//           slidesPerView: 3,
//           spaceBetween: 15,
//         },
//       }}
//       freeMode={true}
//       pagination={{
//         clickable: true,
//       }}
//       modules={[FreeMode, Pagination]}
//       className="h-[240px] sm:h-[340px]"
//     >
//       {serviceData.map((item, index) => {
//         return (
//           <SwiperSlide key={index}>
//             <div className="bg-[rgb(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300">
//               <div className="text-4xl text-accent mb-4">{item.icon}</div>
//               <div className="mb-8">
//                 <div className="mb-2 text-lg">{item.title}</div>
//                 <p className="max-w-[350px] leading-normal">
//                   {item.description}
//                 </p>
//               </div>
//               <div className="text-3xl">
//                 <RxArrowTopRight className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300" />
//               </div>
//             </div>
//           </SwiperSlide>
//         );
//       })}
//     </Swiper>
//   );
// };

// export default ServiceSlider;

// icons
import {
  RxCrop,
  RxPencil2,
  RxDesktop,
  RxReader,
  RxRocket,
  RxArrowTopRight,
} from "react-icons/rx";

// data
const serviceData = [
  {
    icon: <RxCrop />,
    title: "Lead",
    description:
      "Proven leader adept at steering teams, fostering collaboration.",
    link: "https://photos.app.goo.gl/p4334N94eRTqLEYAA",
  },

  {
    icon: <RxDesktop />,
    title: "Develop",
    description: "Crafting seamless online solutions in development.",
    link: "https://www.linkedin.com/posts/harshal-sawatkar_reactjs-firebase-ecommerce-activity-7095340787177037824-ItBr?utm_source=share&utm_medium=member_desktop",
  },
  {
    icon: <RxReader />,
    title: "Code",
    description: "Precise coding for efficient, innovative digital solutions.",
    link: "https://github.com/Anonymous-hss",
  },
  {
    icon: <RxPencil2 />,
    title: "Design",
    description: "Web design proficiency for engaging digital experiences.",
    link: "https://anonymous-hss.github.io/Portfolio-website/",
  },
  {
    icon: <RxRocket />,
    title: "Problem Solving",
    description: "Navigating challenges with effective, innovative solutions.",
    link: "https://www.hackerrank.com/profile/harshalsawatkar1",
  },
];

import { FreeMode, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/pagination";
// ... (rest of the code)

const ServiceSlider = () => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className="h-[240px] sm:h-[340px]"
    >
      {serviceData.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="bg-[rgb(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300">
              <div className="text-4xl text-accent mb-4">{item.icon}</div>
              <div className="mb-8">
                <div className="mb-2 text-lg">{item.title}</div>
                <p className="max-w-[350px] leading-normal">
                  {item.description}
                </p>
              </div>
              <div className="text-3xl">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <RxArrowTopRight className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300" />
                </a>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ServiceSlider;
