import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import {
  createAnOrder,
  emptyItemFromCart,
  getUserCart,
} from "../features/user/userSlice";

const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  address: yup.string().required("Address Details are Required"),
  state: yup.string().required("State is Required"),
  city: yup.string().required("City is Required"),
  country: yup.string().required("Country is Required"),
  pincode: yup.number().required("Pincode is Required"),
});

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  const [cartProductState, setCartProductState] = useState([]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum += Number(cartState[index].quantity) * cartState[index].price;
    }
    setTotalAmount(sum); // Update the state once after the loop
  }, [cartState]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      checkOutHandler(values);
    },
  });

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject("Failed to load Razorpay script.");
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color._id,
        price: cartState[index].price,
      });
    }
    setCartProductState(items);
  }, [cartState]);

  const checkOutHandler = async (values) => {
    try {
      // Load the Razorpay checkout script
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Razorpay SDK failed to load. Please check your connection.");
        return;
      }

      // Create an order on the server
      const result = await axios.post(
        "https://vishwakarma-backend.onrender.com/api/user/order/checkout",
        { amount: totalAmount + 5 },
        config
      );

      if (!result || !result.data || !result.data.order) {
        alert("Failed to create an order. Please try again.");
        return;
      }

      const { amount, id: order_id, currency } = result.data.order;

      // Define Razorpay options
      const options = {
        key: "rzp_test_ssuStjwYl3ZvvZ", // Replace with your Razorpay API key
        amount: amount,
        currency: currency,
        name: "Vishwakarma",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          try {
            const paymentData = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
            };

            // Verify payment on the server
            // const verificationResult = await axios.post(
            //   "https://mern-e-commerce-frontend-steel.vercel.app/user/order/paymentVerification",
            //   paymentData,
            //   config
            // );

            const verificationResult = await axios.post(
              "https://vishwakarma-backend.onrender.com/api/user/order/paymentVerification",
              paymentData,
              config
            );

            if (verificationResult.status === 200) {
              // Update payment info state
              await setPaymentInfo({
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
              });

              // Dispatch order creation
              setTimeout(() => {
                dispatch(
                  createAnOrder({
                    totalPrice: totalAmount,
                    totalPriceAfterDiscount: totalAmount,
                    orderItems: cartProductState,
                    paymentInfo: {
                      razorpayPaymentId: response.razorpay_payment_id,
                      razorpayOrderId: response.razorpay_order_id,
                    },
                    shippingInfo: values,
                  })
                );
                dispatch(emptyItemFromCart());
                window.location.href = "/thankyou";
              }, 300);
            }
          } catch (error) {
            console.error("Payment handler error:", error);
            alert("Something went wrong during payment verification.");
          }
        },
        prefill: {
          name: "Vishwakarma", // Update with dynamic user data
          email: "sristy@example.com", // Update with dynamic user data
          contact: "9999999999", // Update with dynamic user data
        },
        notes: {
          address: "Vishwakarma Office",
        },
        theme: {
          color: "#61dafb", // Theme color for the Razorpay modal
        },
      };

      // Open the Razorpay payment modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Checkout handler error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    if (checkOutHandler === true) {
      dispatch(getUserCart());
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <div className="checkout-area py-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="billing-info-wrap">
                <h3>Billing Details</h3>
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="billing-info mb-4">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange("firstName")}
                        onBlur={formik.handleBlur("firstName")}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="billing-info mb-4">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange("lastName")}
                        onBlur={formik.handleBlur("lastName")}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="billing-info mb-4">
                      <label>Company Name</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="billing-select mb-4">
                      <label>Country</label>
                      <select
                        name="country"
                        value={formik.values.country}
                        onChange={formik.handleChange("country")}
                        onBlur={formik.handleBlur("country")}
                        id=""
                      >
                        <option>Select a country</option>
                        <option>India</option>
                        <option>Azerbaijan</option>
                        <option>Bahamas</option>
                        <option>Bahrain</option>
                        <option>Bangladesh</option>
                        <option>Barbados</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="billing-info mb-4">
                      <label>Address</label>
                      <input
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange("address")}
                        onBlur={formik.handleBlur("address")}
                        className="billing-address"
                        placeholder="House number and street name"
                        type="text"
                      />
                      <input
                        name="other"
                        value={formik.values.other}
                        onChange={formik.handleChange("other")}
                        onBlur={formik.handleBlur("other")}
                        placeholder="Apartment, suite, unit etc."
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="billing-info mb-4">
                      <label>Town / City</label>
                      <input
                        type="text"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange("city")}
                        onBlur={formik.handleBlur("city")}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="billing-select mb-4">
                      <label>State / County</label>
                      <select
                        name="state"
                        value={formik.values.state}
                        onChange={formik.handleChange("state")}
                        onBlur={formik.handleBlur("state")}
                        id=""
                      >
                        <option value="" selected disabled>
                          Select State
                        </option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">
                          Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Puducherry">Puducherry</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="billing-info mb-4">
                      <label>Postcode / ZIP</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formik.values.pincode}
                        onChange={formik.handleChange("pincode")}
                        onBlur={formik.handleBlur("pincode")}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="billing-info mb-4">
                      <label>Phone</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="billing-info mb-4">
                      <label>Email Address</label>
                      <input type="text" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 mt-md-30px mt-lm-30px ">
              <div className="your-order-area">
                <h3>Your order</h3>
                <div className="your-order-wrap gray-bg-4">
                  <div className="your-order-product-info">
                    <div className="your-order-top">
                      <ul>
                        <li>Product</li>
                        <li>Total</li>
                      </ul>
                    </div>
                    <div className="your-order-middle">
                      <ul>
                        {cartState &&
                          cartState?.map((item, index) => {
                            return (
                              <li key={index}>
                                <span className="order-middle-left">
                                  {item?.productId?.title
                                    .split(" ")
                                    .slice(0, 3)
                                    .join(" ")}
                                  ... X {item?.quantity}
                                </span>{" "}
                                <span className="order-price">
                                  {" "}
                                  ₹ {item?.price * item?.quantity}{" "}
                                </span>
                              </li>
                              // {/* <div
                              //   key={index}
                              //   className="d-flex gap-10 mb-2 align-align-items-center"
                              // >
                              //   <div className="w-75 d-flex gap-10">
                              //     <div className="w-25 position-relative">
                              //       <span
                              //         style={{ top: "-10px", right: "2px" }}
                              //         className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                              //       >
                              //         {item?.quantity}
                              //       </span>
                              //       <img
                              //         width={100}
                              //         height={100}
                              //         src={item?.productId?.images[0]?.url}
                              //         alt="product"
                              //       />
                              //     </div>
                              //     <div>
                              //       <h5 className="total-price">
                              //         {" "}
                              //         {item?.productId?.title
                              //           .split(" ")
                              //           .slice(0, 10)
                              //           .join(" ")}
                              //         ...
                              //       </h5>
                              //       <p className="total-price">{item?.color?.title}</p>
                              //     </div>
                              //   </div>
                              //   <div className="flex-grow-1">
                              //     <h5 className="total">
                              //       ₹ {item?.price * item?.quantity}
                              //     </h5>
                              //   </div>
                              // </div> */}
                            );
                          })}
                      </ul>
                    </div>
                    <div className="your-order-bottom">
                      <ul>
                        <li className="your-order-shipping">Shipping</li>
                        <li>₹ 5</li>
                      </ul>
                    </div>
                    <div className="your-order-total">
                      <ul>
                        <li className="order-total">Total</li>
                        <li> ₹ {totalAmount ? totalAmount + 5 : "0"}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="payment-method">
                    <div className="payment-accordion element-mrg">
                      <div id="faq" className="panel-group">
                        <div className="panel panel-default single-my-account m-0">
                          <div className="panel-heading my-account-title">
                            <h4 className="panel-title">
                              <a
                                data-bs-toggle="collapse"
                                href="#my-account-1"
                                className="collapsed"
                                aria-expanded="true"
                              >
                                Direct bank transfer
                              </a>
                            </h4>
                          </div>
                          <div
                            id="my-account-1"
                            className="panel-collapse collapse show"
                            data-bs-parent="#faq"
                          >
                            <div className="panel-body">
                              <p>
                                Please send a check to Store Name, Store Street,
                                Store Town, Store State / County, Store
                                Postcode.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="panel panel-default single-my-account m-0">
                          <div className="panel-heading my-account-title">
                            <h4 className="panel-title">
                              <a
                                data-bs-toggle="collapse"
                                href="#my-account-2"
                                aria-expanded="false"
                                className="collapsed"
                              >
                                Check payments
                              </a>
                            </h4>
                          </div>
                          <div
                            id="my-account-2"
                            className="panel-collapse collapse"
                            data-bs-parent="#faq"
                          >
                            <div className="panel-body">
                              <p>
                                Please send a check to Store Name, Store Street,
                                Store Town, Store State / County, Store
                                Postcode.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="panel panel-default single-my-account m-0">
                          <div className="panel-heading my-account-title">
                            <h4 className="panel-title">
                              <a data-bs-toggle="collapse" href="#my-account-3">
                                Cash on delivery
                              </a>
                            </h4>
                          </div>
                          <div
                            id="my-account-3"
                            className="panel-collapse collapse"
                            data-bs-parent="#faq"
                          >
                            <div className="panel-body">
                              <p>
                                Please send a check to Store Name, Store Street,
                                Store Town, Store State / County, Store
                                Postcode.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Place-order mt-25">
                  <Link className="btn-hover" onClick={formik.handleSubmit}>
                    Place Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
