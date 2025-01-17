import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { BsCart2 } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";
import { HiArrowCircleRight } from "react-icons/hi";
import Hero from "../components/Hero";
import SingleProductCard from "../components/SingleProductCard";
import { getAllBlogs } from "../features/blog/blogSlice";
import { getUserCart } from "../features/user/userSlice";

function Home() {
  const [activeTab, setActiveTab] = useState("popular");

  const brands = [
    { id: 1, image: "/images/brand/brand-01.png", alt: "Brand 1" },
    { id: 2, image: "/images/brand/brand-02.png", alt: "Brand 2" },
    { id: 3, image: "/images/brand/brand-03.png", alt: "Brand 3" },
    { id: 4, image: "/images/brand/brand-04.png", alt: "Brand 4" },
    { id: 5, image: "/images/brand/brand-05.png", alt: "Brand 5" },
    { id: 6, image: "/images/brand/brand-06.png", alt: "Brand 6" },
    { id: 7, image: "/images/brand/brand-07.png", alt: "Brand 7" },
    { id: 8, image: "/images/brand/brand-08.png", alt: "Brand 8" },
  ];

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

  const featuredProducts = [
    {
      id: 1,
      image: "/images/feature-image/1.webp",
      title: "Bluetooth Headphone",
      oldPrice: "$48.50",
      newPrice: "$38.50",
      countdown: "2023/09/15",
      link: "single-product.html",
    },
    {
      id: 2,
      image: "/images/feature-image/2.webp",
      title: "Ladies Smart Watch",
      oldPrice: "$48.50",
      newPrice: "$38.50",
      countdown: "2024/09/15",
      details: [
        { label: "Predecessor", value: "None." },
        { label: "Support Type", value: "Neutral." },
        { label: "Cushioning", value: "High Energizing." },
        { label: "Total Weight", value: "300gm" },
      ],
      link: "single-product.html",
    },
    {
      id: 3,
      image: "/images/feature-image/3.webp",
      title: "Ladies Smart Watch",
      oldPrice: "$48.50",
      newPrice: "$38.50",
      countdown: "2023/09/15",
      details: [
        { label: "Predecessor", value: "None." },
        { label: "Support Type", value: "Neutral." },
        { label: "Cushioning", value: "High Energizing." },
        { label: "Total Weight", value: "300gm" },
      ],
      link: "single-product.html",
    },
  ];

  const tabs = [
    { id: "special", label: "Special" },
    { id: "popular", label: "Popular" },
    { id: "featured", label: "Featured" },
  ];

  const banners = [
    {
      id: 1,
      img: "/images/3.webp",
      title: "Smart Watch For Your Hand",
      category: "From $29.00",
      link: "shop-left-sidebar.html",
    },
    {
      id: 2,
      img: "/images/4.webp",
      title: "Headphones",
      category: "From $95.00",
      link: "shop-left-sidebar.html",
    },
    {
      id: 3,
      img: "/images/5.webp",
      title: "Smartphone",
      category: "From $69.00",
      link: "shop-left-sidebar.html",
    },
  ];

  const blogState = useSelector((state) => state?.blog?.blogs);
  console.log(blogState);

  const productState = useSelector((state) => state?.product?.product);
  console.log(productState);

  const dispatch = useDispatch();

  const authState = useSelector((state) => state?.auth);

  useEffect(() => {
    if (authState?.user) {
      dispatch(getUserCart());
    }
  }, [dispatch, authState?.user]);

  useEffect(() => {
    getblogs();
    getallProducts();
  }, []);

  const getblogs = () => {
    dispatch(getAllBlogs());
  };

  const getallProducts = () => {
    dispatch(getAllProducts());
  };

  return (
    <div>
      <Hero />
      <div className="banner-area style-one pt-20 ">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="col">
              <div className="single-banner flex">
                <img
                  src={banners[0].img}
                  alt="Smart Watch"
                  className="w-full h-auto object-cover"
                />
                <div className="banner-content relative bottom-16 p-12">
                  <h2 className="text-5xl text-[#999DA0] font-extrabold relative top-[350px] right-[550px] w-96 ">
                    {banners[0].title}
                  </h2>
                  <span className="relative top-80 right-[540px] text-3xl">
                    {banners[0].category}
                  </span>
                  <a
                    href={banners[0].link}
                    className="shop-link inline-block mt-4 relative top-[340px] right-[360px] text-blue-600"
                  >
                    <HiArrowCircleRight size={60} />
                  </a>
                </div>
              </div>
            </div>

            <div className="col space-y-6">
              {banners.slice(1).map((banner) => (
                <div key={banner.id} className="single-banner flex">
                  <img
                    src={banner.img}
                    alt={banner.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="banner-content p-12 relative">
                    <h3 className="text-5xl text-[#999DA0] font-extrabold right-[570px] relative ">
                      {banner.title}
                    </h3>
                    <span className="relative right-[570px] bottom-10 text-3xl">
                      {banner.category}
                    </span>
                    <a
                      href={banner.link}
                      className="shop-link inline-block mt-4 relative right-[700px] top-10 text-blue-600"
                    >
                      <HiArrowCircleRight size={60} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="tab-slider flex flex-col md:flex-row justify-between items-center p-20">
            <ul className="product-tab-nav flex justify-start items-center space-x-4">
              {tabs.map((tab) => (
                <li key={tab.id} className="nav-item">
                  <button
                    className={`px-16 py-3 text-2xl rounded-2xl font-bold border-1 ${
                      activeTab === tab.id
                        ? "border-[#266BF9] text-white bg-[#266BF9]"
                        : "border-[#E1E1E1] text-gray-500"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="shop-category-area py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-4 gap-6">
            {productState &&
              productState
                ?.filter((product) => product.tags === activeTab)
                ?.map((product) => (
                  <SingleProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </div>

      <div
        className="fashion-area h-[450px] bg-center "
        style={{ backgroundImage: "url('/images/fashion/fashion-bg.webp')" }}
      >
        <div className="container h-full">
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl  mb-4">
                <div className="text-white text-6xl font-normal mb-8">
                  Smart Fashion
                </div>
                <div className="text-white text-7xl font-extrabold">
                  With Smart Devices
                </div>
              </h2>
              <a
                href="shop-left-sidebar.html"
                className="btn border-2 border-white hover:bg-blue-700 hover:border-blue-700  text-white text-lg uppercase py-3 px-6 rounded-2xl"
              >
                Shop All Devices
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="feature-product-area py-12">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold pt-10 pb-6 text-black">
              Featured Offers
            </h2>
            <p className="text-gray-700 text-2xl">
              There are many variations of passages of Lorem Ipsum available
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="single-feature-content border-2 border-gray-300 rounded-2xl h-[920px] ">
              <div className="top-content text-center mt-4 top-10 relative">
                <h4 className="text-xl font-semibold">
                  <a
                    href={featuredProducts[0].link}
                    className="text-black hover:text-blue-500 text-4xl mb-4"
                  >
                    {featuredProducts[0].title}
                  </a>
                </h4>
                <div className="price text-4xl text-gray-700">
                  <del className="text-gray-400 mr-2">
                    {featuredProducts[0].oldPrice}
                  </del>
                  <span className="font-bold text-red-500">
                    - {featuredProducts[0].newPrice}
                  </span>
                </div>
              </div>
              <div className="feature-image mb-10 h-[700px]">
                {" "}
                <img
                  src={featuredProducts[0].image}
                  alt={featuredProducts[0].title}
                  className="w-full h-full object-cover rounded bg-center"
                />
              </div>
              <div className="bottom-content text-center mt-6 relative bottom-64">
                <div className="deal-timing flex text-center justify-center gap-4 mb-3">
                  <div className="text-4xl text-black font-semibold py-4 px-[33px] border-2 border-gray-300 rounded-full">
                    0
                  </div>

                  <div className="text-4xl text-black font-semibold p-4 border-2 border-gray-300 rounded-full">
                    00
                  </div>
                  <div className="text-4xl text-black font-semibold p-4 border-2 border-gray-300 rounded-full">
                    00
                  </div>
                </div>
                <div className="deal-timing flex text-center justify-center gap-20 mb-4">
                  <div className="text-lg text-gray-500 font-semibold">HRS</div>

                  <div className="text-lg text-gray-500 font-semibold ">
                    MIN
                  </div>
                  <div className="text-lg text-gray-500 font-semibold ">
                    SEC
                  </div>
                </div>
                <a
                  href="single-product-variable.html"
                  className="btn btn-primary bg-blue-600 text-white font-bold text-xl py-3 px-16 rounded-2xl "
                >
                  Shop Now
                </a>
              </div>
            </div>

            <div>
              {featuredProducts.slice(1).map((product) => (
                <div
                  key={product.id}
                  className="feature-right-content flex items-start mb-8 border-[2.5px] border-gray-300 rounded-xl"
                >
                  <div className="image-side relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className=" h-[440px] border-gray-300 border-r-[2.5px]"
                    />
                    <button
                      title="Add To Cart"
                      className="absolute top-2 right-2 bg-gray-200 p-2 rounded-xl hover:bg-blue-500 hover:text-white"
                    >
                      <BsCart2 size={20} />
                    </button>
                  </div>

                  <div className="content-side ml-6">
                    <div className="border-gray-300 border-b-[2.5px]">
                      <div className="deal-timing mb-2 flex gap-2 p-1 rounded-r-full mt-16 mr-12 bg-blue-600">
                        <span className="text-xl font-bold pl-2 text-white">
                          End In:
                        </span>
                        <div className="text-xl font-semibold text-white">
                          {" "}
                          0 : 00 : 00
                        </div>
                      </div>
                      <div className="prize-content">
                        <h5 className="text-lg font-bold">
                          <a
                            href={product.link}
                            className=" text-black py-2 hover:text-blue-500"
                          >
                            {product.title}
                          </a>
                        </h5>
                        <div className="price text-xl py-3 text-gray-700">
                          <span className="old text-gray-400 line-through mr-2">
                            {product.oldPrice}
                          </span>
                          <span className="new text-red-500 font-bold">
                            {product.newPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ul className="product-feature text-gray-500 py-4 mt-2">
                      {product.details.map((detail, index) => (
                        <li
                          key={index}
                          className="text-black font-semibold py-1"
                        >
                          {detail.label} :{" "}
                          <span className=" text-xl font-normal">
                            {detail.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                />
                <div className="p-6 w-[600px] rounded-lg relative bottom-16 ">
                  <p className="text-black text-2xl italic mb-6">
                    {testimonial.content}
                  </p>

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

          <div className="swiper-buttons mt-4">
            <div className="swiper-button-next text-gray-600"></div>
            <div className="swiper-button-prev text-gray-600"></div>
          </div>
        </div>
      </div>

      <div className="brand-area my-20 mx-10 p-4 border-[2.5px] border-gray-300 rounded-3xl ">
        <div className="container mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={5}
            loop={true}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand.id}>
                <div className="brand-slider-item text-center">
                  <a href="#">
                    <img
                      className="img-fluid mx-auto h-40"
                      src={brand.image}
                      alt={brand.alt}
                    />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="main-blog-area pb-24">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-6xl font-extrabold mb-4">Latest Blog</h2>
            <p className="text-gray-600 mt-2 text-xl">
              There are many variations of passages of Lorem Ipsum available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogState.map((blog) => (
              <BlogCard blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
