import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import { createAnOrder, emptyItemFromCart } from "../features/user/userSlice";
import completeLogo from "../../src/images/icons/cmpted_logo.png";

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
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  const [cartProductState, setCartProductState] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);

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
        "http://localhost:5000/api/user/order/checkout",
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
        name: "Infinity",
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
            const verificationResult = await axios.post(
              "http://localhost:5000/api/user/order/paymentVerification",
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
                setOrderSuccess(true); // Set success state to true
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
          address: "Infinity Office",
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

  return (
    <>
      {orderSuccess ? (
        <div className="thank-you-area">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-8">
                <div className="inner_complated">
                  <div className="img_cmpted flex text-center justify-center">
                    <img src={completeLogo} alt="complete" />
                  </div>
                  <p className="dsc_cmpted text-xl">
                    Thank you for ordering in our store. You will receive a
                    confirmation email shortly.
                  </p>
                  <div className="btn_cmpted">
                    <a href="/store" className="shop-btn" title="Go To Shop">
                      Continue Shopping
                    </a>
                  </div>
                </div>
                <div className="main_quickorder text-align-center">
                  <h3 className="title">Call Us for Quick Order</h3>
                  <div className="cntct typewriter-effect">
                    <span className="call_desk">
                      <Link to="tel:+01234567890" id="typewriter_num">
                        01 234 567 890
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Container class1="checkout-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">Vshwakarma</h3>
                <nav
                  style={{ "--bs-breadcrumb-divider": ">" }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link className="text-dark total-price" to="/cart">
                        Cart
                      </Link>
                    </li>
                    &nbsp; /&nbsp;
                    <li
                      className="breadcrumb-ite total-price active"
                      aria-current="page"
                    >
                      Information
                    </li>
                    &nbsp; /
                    <li className="breadcrumb-item total-price active">
                      Shipping
                    </li>
                    &nbsp; /
                    <li
                      className="breadcrumb-item total-price active"
                      aria-current="page"
                    >
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className="title total">Contact Information</h4>
                <p className="user-details total">
                  Sristy Verma(dreamlicious.srs@gmail.com)
                </p>
                <h4 className="mb-3">Shipping Address</h4>
                <form
                  onSubmit={formik.handleSubmit}
                  action=""
                  className="d-flex gap-15 flex-wrap justify-content-between"
                >
                  <div className="w-100">
                    <select
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange("country")}
                      onBlur={formik.handleBlur("country")}
                      className="form-control form-select"
                      id=""
                    >
                      <option value="" selected disabled>
                        Select Country
                      </option>
                      <option value="India">India</option>
                    </select>
                    <div className="error ms-2 my-1">
                      {formik.touched.country && formik.errors.country}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.firstName && formik.errors.firstName}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.lastName && formik.errors.lastName}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Apartment, Suite ,etc"
                      className="form-control"
                      name="other"
                      value={formik.values.other}
                      onChange={formik.handleChange("other")}
                      onBlur={formik.handleBlur("other")}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.city && formik.errors.city}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <select
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                      className="form-control form-select"
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
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
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

                    <div className="error ms-2 my-1">
                      {formik.touched.state && formik.errors.state}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Zipcode"
                      className="form-control"
                      name="pincode"
                      value={formik.values.pincode}
                      onChange={formik.handleChange("pincode")}
                      onBlur={formik.handleBlur("pincode")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.pincode && formik.errors.pincode}
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart" className="text-dark">
                        <BiArrowBack className="me-2" />
                        Return to Cart
                      </Link>
                      <Link to="/cart" className="button">
                        Continue to Shipping
                      </Link>
                      <button className="button" type="submit">
                        Place Order
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4">
                {cartState &&
                  cartState?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex gap-10 mb-2 align-align-items-center"
                      >
                        <div className="w-75 d-flex gap-10">
                          <div className="w-25 position-relative">
                            <span
                              style={{ top: "-10px", right: "2px" }}
                              className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                            >
                              {item?.quantity}
                            </span>
                            <img
                              width={100}
                              height={100}
                              src={item?.productId?.images[0]?.url}
                              alt="product"
                            />
                          </div>
                          <div>
                            <h5 className="total-price">
                              {" "}
                              {item?.productId?.title
                                .split(" ")
                                .slice(0, 10)
                                .join(" ")}
                              ...
                            </h5>
                            <p className="total-price">{item?.color?.title}</p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="total">
                            ₹ {item?.price * item?.quantity}
                          </h5>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Subtotal</p>
                  <p className="total-price">
                    ₹ {totalAmount ? totalAmount : "0"}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">₹ 5</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">
                  ₹ {totalAmount ? totalAmount + 5 : "0"}
                </h5>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Checkout;
