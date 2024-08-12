import React, { useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { Link } from "react-router-dom";
import { GoGitCompare } from "react-icons/go";
import { CiHeart } from "react-icons/ci";

function SingleProduct() {
  const props = {
    width: 600,
    height: 500,
    zoomWidth: 600,
    img: "https://media.istockphoto.com/id/1371695315/photo/iphone-13-pro-sierra-blue.jpg?s=612x612&w=0&k=20&c=-0Mr9DdIRHFoLUozdltlHdkum0ChCNTGfLhxc-3oHmI=",
  };
  const [orderProduct, setOrderProduct] = useState(true);

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  return (
    <div>
      <Meta title={"Product name"} />
      <BreadCrumb title="Product name" />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl ">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  <ReactImageZoom {...props} />
                </div>
              </div>
              <div className="other-product-images d-flex flex-wrap gap-15">
                <div>
                  <img
                    className="img-fluid"
                    src="https://media.istockphoto.com/id/1371695315/photo/iphone-13-pro-sierra-blue.jpg?s=612x612&w=0&k=20&c=-0Mr9DdIRHFoLUozdltlHdkum0ChCNTGfLhxc-3oHmI="
                  />
                </div>
                <div>
                  <img
                    className="img-fluid"
                    src="https://media.istockphoto.com/id/1371695315/photo/iphone-13-pro-sierra-blue.jpg?s=612x612&w=0&k=20&c=-0Mr9DdIRHFoLUozdltlHdkum0ChCNTGfLhxc-3oHmI="
                  />
                </div>
                <div>
                  <img
                    className="img-fluid"
                    src="https://media.istockphoto.com/id/1371695315/photo/iphone-13-pro-sierra-blue.jpg?s=612x612&w=0&k=20&c=-0Mr9DdIRHFoLUozdltlHdkum0ChCNTGfLhxc-3oHmI="
                  />
                </div>
                <div>
                  <img
                    className="img-fluid"
                    src="https://media.istockphoto.com/id/1371695315/photo/iphone-13-pro-sierra-blue.jpg?s=612x612&w=0&k=20&c=-0Mr9DdIRHFoLUozdltlHdkum0ChCNTGfLhxc-3oHmI="
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">
                    Kids headphones bulk multi colored for students
                  </h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">$ 100</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value="3"
                      edit={true}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 t-review">(2 Reviews)</p>
                  </div>
                  <a href="#review">write a review</a>
                </div>
                <div className="border-bottom py-3">
                  <div className="d-flex gap-10 align-items-center">
                    <h3 className="product-heading">Type :</h3>{" "}
                    <p className="product-data">Watch</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center">
                    <h3 className="product-heading">Brand :</h3>
                    <p className="product-data">Havells</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center">
                    <h3 className="product-heading">Category :</h3>
                    <p className="product-data">Watch</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center">
                    <h3 className="product-heading">Availablity :</h3>
                    <p className="product-data">In Stock</p>
                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Size :</h3>
                    <div className="d-flex flex-wrap gap-15">
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        S
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        M
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XL
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XXL
                      </span>
                    </div>
                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Color :</h3>
                    <Color />
                  </div>
                  <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                    <h3 className="product-heading">Quantity :</h3>
                    <div className="">
                      <input
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        className="form-control"
                        style={{ width: 70 }}
                        id=""
                      />
                    </div>
                    <div className="d-flex align-items-center gap-30 ms-5">
                      <button className="button border-0">Add to Cart</button>
                      <button className="button signup">Buy Now</button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-15">
                    <div>
                      <a href="">
                        <GoGitCompare className="fs-5" /> Add to Campare
                      </a>
                    </div>
                    <div>
                      <a href="">
                        <CiHeart className="fs-5" /> Add to Wishlist
                      </a>
                    </div>
                  </div>
                  <div className="d-flexflex-column gap-10  my-3">
                    <h3 className="product-heading">Shipping & Return :</h3>{" "}
                    <p className="product-data">
                      Free Shipping and return available on all orders <br />
                      we ship all US domastic orders within
                      <b>5-10 business days</b>
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-3">
                    <h3 className="product-heading mb-0">Copy product :</h3>{" "}
                    <a
                      href="javascript:void(0)"
                      onClick={() =>
                        copyToClipboard(
                          "https://media.istockphoto.com/id/1371695315/photo/iphone-13-pro-sierra-blue.jpg?s=612x612&w=0&k=20&c=-0Mr9DdIRHFoLUozdltlHdkum0ChCNTGfLhxc-3oHmI="
                        )
                      }
                    >
                      Copy Product Link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="discription-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="bg-white p-3">
                <h4>Description</h4>
                <p className="">
                  Troper, broke the news of her demise with a Facebook post. “It
                  is with profound sadness that I share the news of Susan
                  Wojcicki passing. My beloved wife of 26 years and mother to
                  our five children left us today after 2 years of living with
                  non-small cell lung cancer. Susan was not just my best friend
                  and partner in life, but a brilliant mind, a loving mother,
                  and a dear friend to many. Her impact on our family and the
                  world was immeasurable. We are heartbroken, but grateful for
                  the time we had with her. Please keep our family in your
                  thoughts as we navigate this difficult time,” he wrote, as
                  quoted by Hindustan Times report.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="reviews-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 id="review">Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="reviews-head d-flex justify-content-between aling-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value="3"
                        edit={true}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">Based on 2 Reviews</p>
                    </div>
                  </div>
                  {orderProduct && (
                    <div>
                      <a
                        className="text-dark text-decoration-underline"
                        href=""
                      >
                        Write a Review
                      </a>
                    </div>
                  )}
                </div>
                <div className="review-form py-4">
                  <h4>Write a Reviews</h4>
                  <form action="" className="d-flex flex-column gap-15">
                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        value="3"
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        placeholder="Comments"
                        id=""
                        className="w-100 form-control"
                        cols="38"
                        rows="4"
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="button boder-0">Submit Review</button>
                    </div>
                  </form>
                </div>
                <div className="reviews mt-4">
                  <div className="review">
                    <div className="d-flex gap-10 align-items-center">
                      <h6 className="mb-0">Navdeep</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value="3"
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="mt-3">
                      and partner in life, but a brilliant mind, a loving
                      mother, and a dear friend to many. Her impact on our
                      family and the world was immeasurable. We are heartbroken,
                      but grateful for the time we had with her. Please keep our
                      family in your thoughts as we navigate this difficult
                      time,” he wrote, as quoted by Hindustan Times report.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
          </div>
          <div className="row">
            <ProductCard />
          </div>
        </div>
      </section>
    </div>
  );
}

export default SingleProduct;
