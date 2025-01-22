import React from "react";
import videoPromo from "../images/about/promo-video-img.webp";
import { FaPlayCircle } from "react-icons/fa";
import team1 from "../images/team/1.webp";
import team2 from "../images/team/2.webp";
import team3 from "../images/team/3.webp";
import icon1 from "../images/icons/1.png";
import icon2 from "../images/icons/2.png";
import icon3 from "../images/icons/3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import Meta from "../components/Meta";
import { Navigation } from "swiper/modules";
import BreadCrumb from "../components/BreadCrumb";

const About = () => {
  const testimonials = [
    {
      id: 1,
      content:
        "Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/images/testimonial/1.webp",
      name: "Regan Rosen",
      role: "Client",
    },
    {
      id: 2,
      content:
        "Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/images/testimonial/1.webp",
      name: "Regan Rosen",
      role: "Client",
    },
    {
      id: 3,
      content:
        "Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/images/testimonial/1.webp",
      name: "Regan Rosen",
      role: "Client",
    },
    {
      id: 4,
      content:
        "Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/images/testimonial/1.png",
      name: "Regan Rosen",
      role: "Client",
    },
  ];

  return (
    <div>
      <Meta title={"About"} />
      <BreadCrumb title="About" />

      <div className="pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="">
              <p className="text-gray-700 font-light text-6xl">Smart Fashion</p>
              <p className="text-7xl font-extrabold font-sans mb-4">
                With Smart Devices
              </p>
              <p className="text-gray-600 text-lg max-w-4xl py-10 mx-auto tracking-widest">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea comml consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
            <div className="mt-8 relative inline-block">
              <img
                src={videoPromo}
                alt="Promo Video"
                className="rounded-lg shadow-lg"
              />
              <a
                href="https://www.youtube.com/watch?v=jfKfPfyJRdk"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
              >
                <span className="fa fa-play text-white text-4xl">
                  <FaPlayCircle size={70} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold py-4">Team Member</h2>
            <p className="text-gray-600 text-xl">
              There are many variations of passages of Lorem Ipsum available
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Sara Koivisto", image: team1 },
              { name: "Anaiah Whitten", image: team2 },
              { name: "Rachel Leonard", image: team3 },
            ].map((member, index) => (
              <div key={index} className="  overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-auto object-cover"
                />
                <div className="p-6 text-center">
                  <h6 className="text-lg font-semibold">{member.name}</h6>
                  <span className="text-gray-500">Team Member</span>
                  <div className="flex justify-center mt-4 space-x-4">
                    {["facebook", "tumblr", "twitter", "instagram"].map(
                      (platform, idx) => (
                        <a
                          key={idx}
                          href="/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-500"
                        >
                          <i className={`fa fa-${platform}`}></i>
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 border-2 border-gray-300 m-4 rounded-2xl">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {[
            {
              title: "Free Shipping",
              subtitle: "Capped at $39 per order",
              icon: icon1,
            },
            {
              title: "Card Payments",
              subtitle: "12 Months Installments",
              icon: icon2,
            },
            {
              title: "Easy Returns",
              subtitle: "Shop With Confidence",
              icon: icon3,
            },
          ].map((feature, index) => (
            <div key={index} className="text-center flex ">
              <img
                src={feature.icon}
                alt={feature.title}
                className="mx-4 mb-4 bg-blue-600 p-4 rounded-full"
              />
              <div className="mt-2">
                <h4 className="text-2xl font-semibold">{feature.title}</h4>
                <span className=" text-black my-4">{feature.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonial-area py-12 bg-[#F2F8FD]">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold mb-4">Client Feedback</h2>
            <p className="text-gray-600 text-xl">
              There are many variations of passages of Lorem Ipsum available
            </p>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={2}
            className="testimonial-slider"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <img
                  src="/images/testimonial/quote-shape.png"
                  className=" h-14 "
                  alt="testimomial"
                />
                <div className="p-6 w-[600px] rounded-lg relative bottom-16 ">
                  {/* Testimonial Content */}
                  <p className="text-black text-2xl italic mb-6">
                    {testimonial.content}
                  </p>

                  {/* Author Details */}
                  <div className="flex gap-2 items-center p-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-blue-600">
                        {testimonial.name}
                      </h4>
                      <span className="text-gray-500">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
        </div>
      </div>
    </div>
  );
};

export default About;
