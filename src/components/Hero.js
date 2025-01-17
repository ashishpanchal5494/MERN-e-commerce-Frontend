import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const slides = [
    {
      id: 1,
      title: "Your Home Smart Devices & Best Solution",
      image: "images/inner-img/hero-1-1.webp",
      bgImage: "images/inner-img/hero-1-1.webp",
    },
    {
      id: 2,
      title: "Your Home Smart Devices & Best Solution",
      image: "images/inner-img/hero-1-1.webp",
      bgImage: "images/inner-img/hero-1-1.webp",
    },
  ];

  return (
    <div className="section">
      <div
        className="hero-slider"
        style={{
          backgroundImage: `url(/images/banner/hero-bg-1.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 5000 }}
          direction="vertical"
          loop={true}
          className="h-[700px]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="hero-slide-item flex items-center h-full">
                <div className="container mx-auto h-full flex items-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="hero-slide-content text-white space-y-4">
                      <span className="category text-lg font-semibold ">
                        Welcome To Hmart
                      </span>
                      <h2 className="text-4xl md:text-7xl font-bold leading-tight">
                        {slide.title}
                      </h2>
                      <a
                        href="shop-left-sidebar.html"
                        className="btn  hover:bg-blue-700 text-white py-3 px-6 rounded-2xl text-lg uppercase border-sky-100 "
                      >
                        Shop All Devices
                      </a>
                    </div>

                    <div className="show-case flex justify-center items-end mt-20 mr-20">
                      <img
                        src={slide.image}
                        alt={`Slide ${slide.id}`}
                        className=" h-[650px] "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
