import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import product2 from "../images/product-image/2.webp";
import product1 from "../images/product-image/1.webp";
import product3 from "../images/product-image/3.webp";
import { MdDelete } from "react-icons/md";
import ReactStars from "react-rating-stars-component";

function CompareProduct() {
  return (
    <div>
      <Meta title={"Compare Product"} />
      <BreadCrumb title="Compare Product" />
      <div className="compare-area py-40">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <form action="#">
                {/* Compare Table */}
                <div className="compare-table table-responsive">
                  <table className="table mb-0">
                    <tbody>
                      <tr>
                        <td className="first-column">Product</td>
                        <td className="product-image-title">
                          <a href="#" className="image">
                            <img
                              className="img-responsive"
                              src={product1}
                              alt="Compare Product"
                            />
                          </a>
                          <a href="#" className="category">
                            Device
                          </a>
                          <a href="#" className="title">
                            Modern Smart Phone
                          </a>
                        </td>
                        <td className="product-image-title">
                          <a href="#" className="image">
                            <img
                              className="img-responsive"
                              src={product2}
                              alt="Compare Product"
                            />
                          </a>
                          <a href="#" className="category">
                            Accessories
                          </a>
                          <a href="#" className="title">
                            Bluetooth Headphone
                          </a>
                        </td>
                        <td className="product-image-title">
                          <a href="#" className="image">
                            <img
                              className="img-responsive"
                              src={product3}
                              alt="Compare Product"
                            />
                          </a>
                          <a href="#" className="category">
                            Smart
                          </a>
                          <a href="#" className="title">
                            Smart Music Box
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="first-column">Description</td>
                        <td className="pro-desc">
                          <p>
                            Lorem ipsum dolor sit amet, consect adipisicing
                            elit, sed do eiusmod tempor incidi ut labore et
                            dolore magna aliqua.
                          </p>
                        </td>
                        <td className="pro-desc">
                          <p>
                            Lorem ipsum dolor sit amet, consect adipisicing
                            elit, sed do eiusmod tempor incidi ut labore et
                            dolore magna aliqua.
                          </p>
                        </td>
                        <td className="pro-desc">
                          <p>
                            Lorem ipsum dolor sit amet, consect adipisicing
                            elit, sed do eiusmod tempor incidi ut labore et
                            dolore magna aliqua.{" "}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="first-column">Price</td>
                        <td className="pro-price">₹295</td>
                        <td className="pro-price">₹275</td>
                        <td className="pro-price">₹395</td>
                      </tr>
                      <tr>
                        <td className="first-column">Color</td>
                        <td className="pro-color">Black</td>
                        <td className="pro-color">Black</td>
                        <td className="pro-color">Black</td>
                      </tr>
                      <tr>
                        <td className="first-column">Stock</td>
                        <td className="pro-stock">In Stock</td>
                        <td className="pro-stock">In Stock</td>
                        <td className="pro-stock">In Stock</td>
                      </tr>
                      <tr>
                        <td className="first-column">Add to cart</td>
                        <td className="pro-addtocart">
                          <a href="#" className="add-to-cart" tabIndex="0">
                            <span>ADD TO CART</span>
                          </a>
                        </td>
                        <td className="pro-addtocart">
                          <a href="#" className="add-to-cart" tabIndex="0">
                            <span>ADD TO CART</span>
                          </a>
                        </td>
                        <td className="pro-addtocart">
                          <a href="#" className="add-to-cart" tabIndex="0">
                            <span>ADD TO CART</span>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="first-column">Delete</td>
                        <td className="pro-remove">
                          <button>
                            <MdDelete size={25} />
                          </button>
                        </td>
                        <td className="pro-remove">
                          <button>
                            <MdDelete size={25} />
                          </button>
                        </td>
                        <td className="pro-remove">
                          <button>
                            <MdDelete size={25} />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="first-column">Rating</td>
                        <td className="pro-ratting">
                          <div className="ml-24">
                            <ReactStars
                              count={5}
                              size={30}
                              value={5}
                              edit={false}
                              activeColor="#ffd700"
                            />
                          </div>
                        </td>
                        <td className="">
                          <div className="ml-24">
                            <ReactStars
                              count={5}
                              size={30}
                              value={5}
                              edit={false}
                              activeColor="#ffd700"
                            />
                          </div>
                        </td>
                        <td className="pro-ratting ml-4">
                          <div className="ml-24">
                            <ReactStars
                              count={5}
                              size={30}
                              value={5}
                              edit={false}
                              activeColor="#ffd700"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareProduct;
