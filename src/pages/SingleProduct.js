import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Color from "../components/Color";
import { CiHeart } from "react-icons/ci";
import commentIcon from "../images/testimonial/1.webp";
import { SlRefresh } from "react-icons/sl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getAProduct,
  getAllProducts,
} from "../features/product/productSlice";
import { toast } from "react-toastify";
import {
  addProdToCart,
  addUserWishlist,
  getUserCart,
} from "../features/user/userSlice";
import SingleProductCard from "../components/SingleProductCard";

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  const [selectedColor, setSelectedColor] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];

  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.singleproduct);

  const productsState = useSelector((state) => state?.product?.product);
  const cartState = useSelector((state) => state?.auth?.cartProducts);

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
    dispatch(getAllProducts());
  }, [getProductId, dispatch]);

  useEffect(() => {
    const isProductInCart = cartState?.some(
      (cartItem) =>
        cartItem.color._id === selectedColor &&
        cartItem.productId._id === getProductId
    );
    setAlreadyAdded(isProductInCart);
  }, [cartState, getProductId, selectedColor]);

  useEffect(() => {
    if (productState?.images?.length > 0) {
      setActiveImage(productState.images[0].url); // Set the first image as default
    }
  }, [productState]);

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please Choose Color");
      return false;
    } else {
      dispatch(
        addProdToCart({
          productId: productState?._id,
          quantity,
          color: selectedColor,
          price: productState?.price,
        })
      );
      navigate("/cart");
    }
  };

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const [popularProduct, setPopularProduct] = useState([]);
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState.length; index++) {
      const element = productsState[index];
      if (element.tags === "popular") {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productsState]);

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Please add star rating");
      return false;
    } else if (comment === null) {
      toast.error("Please Write Review About the Product.");
      return false;
    } else {
      const data = { star: star, comment: comment, prodId: getProductId };
      console.log(data);
      dispatch(addRating(data));
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
    }
    return false;
  };

  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <div className="product-details-area py-24">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12 col-xs-12 mb-lm-30px mb-md-30px mb-sm-30px">
              <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                className="swiper-container zoom-top"
              >
                {productState?.images.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="img-responsive m-auto"
                      src={item?.url}
                      alt="Product Zoom"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                modules={[Navigation]}
                navigation
                slidesPerView={4}
                spaceBetween={10}
                className="swiper-container mt-20 zoom-thumbs slider-nav-style-1 small-nav"
              >
                {productState?.images.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="img-responsive m-auto"
                      src={item?.url}
                      alt="Product Zoom"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div
              className="col-lg-6 col-sm-12 col-xs-12"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="product-details-content quickview-content ml-25px">
                <h2>{productState?.title}</h2>
                <div className="pricing-meta">
                  <ul className="d-flex">
                    <li className="new-price">₹ {productState?.price}</li>
                  </ul>
                </div>
                <div className="pro-details-rating-wrap">
                  <div className="rating-product">
                    <ReactStars
                      count={5}
                      size={24}
                      value={productState?.totalrating}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    {/* {productState?.totalrating.map((_, i) => (
                      // <i className="fa fa-star" key={i}></i>
                      <FaStar color="yellow" key={i} />
                    ))} */}
                  </div>
                  <span className="read-review">
                    <a className="reviews" href="#">
                      (5 Customer Review)
                    </a>
                  </span>
                </div>
                <p
                  className="mt-10"
                  dangerouslySetInnerHTML={{
                    __html: productState?.description,
                  }}
                ></p>
                <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                  <span>Brand:</span>
                  <ul className="d-flex">
                    <li>
                      <Link>{productState?.brand}</Link>
                    </li>
                  </ul>
                </div>
                <div className="pro-details-categories-info pro-details-same-style d-flex my-1">
                  <span>Categories: </span>
                  <ul className="d-flex">
                    <li>
                      <Link>{productState?.category} </Link>
                    </li>
                  </ul>
                </div>
                <div className="pro-details-categories-info pro-details-same-style d-flex my-1">
                  <span>Tags: </span>
                  <ul className="d-flex">
                    <li>
                      <Link>{productState?.tags}</Link>
                    </li>
                  </ul>
                </div>
                <div className="pro-details-categories-info pro-details-same-style d-flex my-1">
                  <span>Availablity:</span>
                  <ul className="d-flex">
                    <li>
                      <Link>In Stock</Link>
                    </li>
                  </ul>
                </div>
                <div className="pro-details-categories-info pro-details-same-style d-flex my-1">
                  <span>SKU:</span>
                  <ul className="d-flex">
                    <li>
                      <Link>Ch-256xl</Link>
                    </li>
                  </ul>
                </div>
                <div className="pro-details-categories-info pro-details-same-style d-flex my-1">
                  <span>Product Link:</span>
                  <ul className="d-flex">
                    <li>
                      <a
                        href="javascript:void(0)"
                        onClick={() => {
                          copyToClipboard(window.location.href);
                        }}
                      >
                        Copy Product Link
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="pro-details-categories-info pro-details-same-style d-flex my-4">
                  <span>Color:</span>
                  <ul className="d-flex mx-2">
                    <li>
                      <Color
                        setColor={setColor}
                        colorData={productState?.color}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                      />
                    </li>
                  </ul>
                </div>

                <div className="pro-details-quality">
                  {alreadyAdded === false && (
                    <>
                      <div className="cart-plus-minus">
                        <input
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          className="cart-plus-minus-box"
                          style={{ width: "70px" }}
                          id=""
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        />
                      </div>
                    </>
                  )}
                  <div className="pro-details-cart">
                    {/* <button className="add-cart">Add To Cart</button> */}
                    <button
                      className="add-cart"
                      type="button"
                      onClick={() => {
                        alreadyAdded ? navigate("/cart") : uploadCart();
                      }}
                    >
                      {alreadyAdded ? "Go To Cart" : "Add to Cart"}
                    </button>
                  </div>
                  <div className="pro-details-compare-wishlist pro-details-wishlist">
                    <Link
                      onClick={() =>
                        dispatch(addUserWishlist(productState._id))
                      }
                    >
                      <CiHeart size={30} />
                    </Link>
                  </div>
                  <div className="pro-details-compare-wishlist pro-details-wishlist">
                    <Link>
                      <SlRefresh />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="description-review-wrapper">
                <div className="description-review-topbar nav">
                  <button data-bs-toggle="tab" data-bs-target="#des-details2">
                    Information
                  </button>
                  <button
                    className="active"
                    data-bs-toggle="tab"
                    data-bs-target="#des-details1"
                  >
                    Description
                  </button>
                  <button data-bs-toggle="tab" data-bs-target="#des-details3">
                    Reviews (02)
                  </button>
                </div>
                <div className="tab-content description-review-bottom">
                  <div id="des-details2" className="tab-pane">
                    <div className="product-anotherinfo-wrapper text-start">
                      <ul>
                        <li>
                          <span>Weight</span> 400 g
                        </li>
                        <li>
                          <span>Dimensions</span> 10 x 10 x 15 cm
                        </li>
                        <li>
                          <span>Materials</span> 60% cotton, 40% polyester
                        </li>
                        <li>
                          <span>Other Info</span> American heirloom jean shorts
                          pug seitan letterpress
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div id="des-details1" className="tab-pane active">
                    <div className="product-description-wrapper">
                      <p
                        className="mt-10"
                        dangerouslySetInnerHTML={{
                          __html: productState?.description,
                        }}
                      ></p>
                    </div>
                  </div>
                  <div id="des-details3" className="tab-pane">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="review-wrapper">
                          {productState &&
                            productState.ratings?.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className="single-review child-review py-2"
                                >
                                  <div className="review-img">
                                    <img src={commentIcon} alt="comment" />
                                  </div>
                                  <div className="review-content">
                                    <div className="review-top-wrap">
                                      <div className="review-left">
                                        <ReactStars
                                          count={5}
                                          size={24}
                                          value={item?.star}
                                          edit={false}
                                          activeColor="#ffd700"
                                        />
                                      </div>
                                    </div>
                                    <div className="review-bottom">
                                      <p>{item?.comment}</p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="ratting-form-wrapper pl-50">
                          <h2 className="text-2xl">Add a Review</h2>
                          <div className="ratting-form">
                            <form action="#">
                              <div className="star-box">
                                <span>Your rating:</span>
                                <ReactStars
                                  count={5}
                                  size={24}
                                  value={4}
                                  edit={true}
                                  activeColor="#ffd700"
                                  onChange={(e) => {
                                    setStar(e);
                                  }}
                                />
                              </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="rating-form-style form-submit">
                                    <textarea
                                      id=""
                                      name="Your Review"
                                      cols="30"
                                      rows="4"
                                      placeholder="Comments"
                                      onChange={(e) => {
                                        setComment(e.target.value);
                                      }}
                                    ></textarea>
                                    <button
                                      onClick={addRatingToProduct}
                                      className="btn btn-primary btn-hover-color-primary"
                                      type="submit"
                                      value="Submit"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Container class1="popular-wrapper py-5 ">
          <div className="row">
            <div className="col-12">
              <div className="section-title text-center m-0">
                <h2 className="title text-black text-6xl font-semibold py-4">
                  Related Products
                </h2>
                <p className="text-2xl text-gray-600 pb-12">
                  There are many variations of passages of Lorem Ipsum available
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-4 gap-6">
            {popularProduct &&
              popularProduct
                ?.slice(0, 4)
                .map((product) => (
                  <SingleProductCard key={product.id} product={product} />
                ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default SingleProduct;
