import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import {
  deleteCartProduct,
  getUserCart,
  updateCartProduct,
  emptyItemFromCart,
} from "../features/user/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [prodctUpdateDetail, setProdctUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const userCartState = useSelector((state) => state.auth.cartProducts);
  const authState = useSelector((state) => state?.auth);

  useEffect(() => {
    if (authState?.user) {
      dispatch(getUserCart());
    }
  }, [dispatch, authState?.user]);

  useEffect(() => {
    if (prodctUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: prodctUpdateDetail?.cartItemId,
          quantity: prodctUpdateDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart());
      }, 200);
    }
  }, [prodctUpdateDetail, dispatch]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  const emptyCart = () => {
    dispatch(emptyItemFromCart());
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  useEffect(() => {
    let sum = 0;
    userCartState?.forEach((item) => {
      sum += Number(item.quantity) * item.price;
    });
    setTotalAmount(sum);
  }, [userCartState]);

  return (
    <>
      {/* <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {userCartState &&
              userCartState?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                  >
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={item?.productId?.images[0]?.url}
                          className="img-fluid"
                          alt="product"
                        />
                      </div>
                      <div className="w-75">
                        <p>{item?.productId?.title}</p>

                        <p className="d-flex gap-3">
                          Color:{" "}
                          <ul className="colors ps-0">
                            <li
                              style={{ backgroundColor: item?.color?.title }}
                            ></li>
                          </ul>
                        </p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">₹ {item?.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          id=""
                          value={
                            prodctUpdateDetail?.quantity || item?.quantity || 1
                          }
                          onChange={(e) => {
                            setProdctUpdateDetail({
                              cartItemId: item?._id,
                              quantity: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <AiFillDelete
                          onClick={() => {
                            deleteACartProduct(item?._id);
                          }}
                          className="text-danger "
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        ₹ {item?.price * item?.quantity}
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/store" className="button">
                Continue To Shopping
              </Link>
              {totalAmount !== null && totalAmount !== 0 && (
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: ₹ {totalAmount}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container> */}

      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container>
        <div className="cart-main-area pt-100px pb-100px py-32">
          <div className="container">
            <h3 className="cart-page-title">Your cart items</h3>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <form action="#">
                  <div className="table-content table-responsive cart-table-content">
                    <table>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Until Price</th>
                          <th>Qty</th>
                          <th>Subtotal</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userCartState &&
                          userCartState?.map((item, index) => (
                            <tr key={index}>
                              <td className="product-thumbnail">
                                <div>
                                  <img
                                    src={item?.productId?.images[0]?.url}
                                    className="img-responsive ml-2"
                                    alt="product"
                                  />
                                </div>
                              </td>
                              <td className="product-name">
                                <p>
                                  {item?.productId?.title
                                    .split(" ")
                                    .slice(0, 4)
                                    .join(" ")}
                                </p>
                              </td>
                              <td className="product-price-cart">
                                <span className="amount">₹ {item?.price}</span>
                              </td>
                              <td className="product-quantity">
                                <div className="cart-plus-minus">
                                  <input
                                    className="cart-plus-minus-box"
                                    type="number"
                                    min={1}
                                    max={10}
                                    name="qtybutton"
                                    defaultValue={
                                      prodctUpdateDetail?.quantity ||
                                      item?.quantity ||
                                      1
                                    }
                                    onChange={(e) => {
                                      setProdctUpdateDetail({
                                        cartItemId: item?._id,
                                        quantity: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="product-subtotal">
                                ₹ {item?.price * item?.quantity}
                              </td>
                              <td className="product-remove">
                                <Link>
                                  <MdDelete
                                    size={25}
                                    onClick={() => {
                                      deleteACartProduct(item?._id);
                                    }}
                                  />
                                </Link>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="cart-shiping-update-wrapper">
                        <div className="cart-shiping-update">
                          <Link to="/store">Continue Shopping</Link>
                        </div>
                        <div className="cart-clear">
                          <button type="button">Update Shopping Cart</button>
                          <Link onClick={() => emptyCart()}>
                            Clear Shopping Cart
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-lg-4 col-md-6 mb-lm-30px">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Estimate Shipping And Tax
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select mb-25px">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Get A Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-lm-30px">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 mt-md-30px">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        Total products <span>₹ {totalAmount}</span>
                      </h5>
                      <div className="total-shipping">
                        <h5>Total shipping</h5>
                        <ul>
                          <li>
                            <input type="checkbox" /> Standard{" "}
                            <span>$20.00</span>
                          </li>
                          <li>
                            <input type="checkbox" /> Express{" "}
                            <span>$30.00</span>
                          </li>
                        </ul>
                      </div>
                      <h4 className="grand-totall-title">
                        Grand Total <span>₹ {totalAmount}</span>
                      </h4>
                      <Link to="/checkout">Proceed to Checkout</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
