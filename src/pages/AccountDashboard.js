import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";
import moment from "moment";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { FiEdit } from "react-icons/fi";
import * as yup from "yup";
import { updateProfile } from "../features/user/userSlice";

const profileSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup
    .string()
    .email("EMail Should be valid")
    .required("Email Address is Required"),
  mobile: yup.string().required("Mobile No is Required"),
});

const AccountDashboard = () => {
  const userState = useSelector((state) => state.auth.user);
  const [edit, setEdit] = useState(true);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateProfile(values));
      setEdit(true);
    },
  });

  const [activeTab, setActiveTab] = useState("dashboard");

  const dispatch = useDispatch();
  const orderState = useSelector(
    (state) => state?.auth?.getorderedProduct?.orders
  );
  console.log(orderState);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="account-dashboard py-40">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div
              className="dashboard_tab_button"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <ul role="tablist" className="nav flex-column dashboard-list">
                <li>
                  <button
                    className={`nav-link px-20 ${
                      activeTab === "dashboard" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("dashboard")}
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    className={`nav-link px-[97px] ${
                      activeTab === "orders" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("orders")}
                  >
                    Orders
                  </button>
                </li>
                <li>
                  <button
                    className={`nav-link px-[80px] ${
                      activeTab === "downloads" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("downloads")}
                  >
                    Downloads
                  </button>
                </li>
                <li>
                  <button
                    className={`nav-link px-[82px] ${
                      activeTab === "address" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("address")}
                  >
                    Addresses
                  </button>
                </li>
                <li>
                  <button
                    className={`nav-link px-[58px] ${
                      activeTab === "account-details" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("account-details")}
                  >
                    Account details
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLogout()}
                    className="nav-link px-[97px]"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-sm-12 col-md-9 col-lg-9">
            <div
              className="tab-content dashboard_content"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {activeTab === "dashboard" && (
                <div id="dashboard">
                  <h4>Dashboard</h4>
                  <p>
                    From your account dashboard, you can easily check &amp; view
                    your <a href="#">recent orders</a>, manage your{" "}
                    <a href="#">shipping and billing addresses</a>, and{" "}
                    <a href="#">edit your password and account details</a>.
                  </p>
                </div>
              )}
              {activeTab === "orders" && (
                <div id="orders">
                  <h4>Orders</h4>
                  <div className="table_page table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Total</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderState &&
                          orderState.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item?._id}</td>
                                <td>
                                  {moment(item?.createdAt).format(
                                    "MMMM Do YYYY, h:mm a"
                                  )}
                                </td>
                                <td>
                                  <span className="success">
                                    {item?.orderStatus}
                                  </span>
                                </td>
                                <td>₹ {item?.totalPrice}</td>
                                <td>
                                  {item?.orderItems.map((item, index) => (
                                    <div key={index}>
                                      <Link
                                        className="view"
                                        to={`/product/${item?.product}`}
                                      >
                                        View Product
                                      </Link>
                                    </div>
                                  ))}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTab === "downloads" && (
                <div id="downloads">
                  <h4>Downloads</h4>
                  <div className="table_page table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Downloads</th>
                          <th>Expires</th>
                          <th>Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Shopnovilla - Free Real Estate PSD Template</td>
                          <td>May 10, 2018</td>
                          <td>
                            <span className="danger">Expired</span>
                          </td>
                          <td>
                            <a href="#" className="view">
                              Click Here To Download Your File
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>Organic - ecommerce html template</td>
                          <td>Sep 11, 2018</td>
                          <td>Never</td>
                          <td>
                            <a href="#" className="view">
                              Click Here To Download Your File
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTab === "address" && (
                <div id="address">
                  <h4>
                    The following addresses will be used on the checkout page by
                    default.
                  </h4>
                  <h5 className="billing-address">Billing address</h5>

                  <p className="mb-2 capitalize">
                    <strong>
                      {orderState?.[orderState.length - 1]?.shippingInfo
                        ?.firstName +
                        " " +
                        orderState?.[orderState.length - 1]?.shippingInfo
                          ?.lastName || "Full Name"}
                    </strong>
                  </p>
                  <address>
                    <span className="mb-1 d-inline-block">
                      <strong>Address:</strong>{" "}
                      {
                        orderState?.[orderState.length - 1]?.shippingInfo
                          ?.address
                      }
                      {" , "}
                      {orderState?.[orderState.length - 1]?.shippingInfo?.other}
                    </span>
                    ,<br />
                    <span className="mb-1 d-inline-block">
                      <strong>City:</strong>{" "}
                      {orderState?.[orderState.length - 1]?.shippingInfo?.city}
                    </span>
                    ,<br />
                    <span className="mb-1 d-inline-block">
                      <strong>State:</strong>{" "}
                      {orderState?.[orderState.length - 1]?.shippingInfo?.state}
                    </span>
                    ,<br />
                    <span className="mb-1 d-inline-block">
                      <strong>ZIP:</strong>{" "}
                      {
                        orderState?.[orderState.length - 1]?.shippingInfo
                          ?.pincode
                      }
                    </span>
                    ,<br />
                    <span>
                      <strong>Country:</strong> India
                    </span>
                  </address>
                </div>
              )}
              {activeTab === "account-details" && (
                <div id="account-details">
                  <h4>Account details</h4>
                  <div className="login">
                    <div className="login_form_container">
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                          <h3 className="my-3"> Update Profile</h3>
                          <FiEdit
                            className="fs-3 cursor-pointer"
                            onClick={() => setEdit(false)}
                          />
                        </div>
                      </div>
                      <div className="account_login_form">
                        <form onSubmit={formik.handleSubmit}>
                          <p>
                            Already have an account?{" "}
                            <Link to="/login">Log in instead!</Link>
                          </p>
                          <div className="input-radio">
                            <span className="custom-radio">
                              <input type="radio" value="1" name="id_gender" />{" "}
                              Mr.
                            </span>
                            <span className="custom-radio">
                              <input type="radio" value="2" name="id_gender" />{" "}
                              Mrs.
                            </span>
                          </div>
                          <br />
                          <div className="default-form-box mb-20">
                            <label>First Name</label>
                            <input
                              type="text"
                              name="firstname"
                              disabled={edit}
                              className="form-control"
                              id="example1"
                              value={formik.values.firstname}
                              onChange={formik.handleChange("firstname")}
                              onBlur={formik.handleBlur("firstname")}
                            />
                            <div className="error">
                              {formik.touched.firstname &&
                                formik.errors.firstname}
                            </div>
                          </div>
                          <div className="default-form-box mb-20">
                            <label>Last Name</label>
                            <input
                              type="text"
                              name="lastname"
                              className="form-control"
                              disabled={edit}
                              id="example2"
                              value={formik.values.lastname}
                              onChange={formik.handleChange("lastname")}
                              onBlur={formik.handleBlur("lastname")}
                            />
                            <div className="error">
                              {formik.touched.lastname &&
                                formik.errors.lastname}
                            </div>
                          </div>
                          <div className="default-form-box mb-20">
                            <label>Email</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              disabled={edit}
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              value={formik.values.email}
                              onChange={formik.handleChange("email")}
                              onBlur={formik.handleBlur("email")}
                            />
                            <div className="error">
                              {formik.touched.email && formik.errors.email}
                            </div>
                          </div>

                          <div className="default-form-box mb-20">
                            <label> Mobile No</label>
                            <input
                              type="number"
                              name="mobile"
                              disabled={edit}
                              className="form-control"
                              id="exampleInputEmail2"
                              aria-describedby="emailHelp"
                              value={formik.values.mobile}
                              onChange={formik.handleChange("mobile")}
                              onBlur={formik.handleBlur("mobile")}
                            />
                            <div className="error">
                              {formik.touched.mobile && formik.errors.mobile}
                            </div>
                          </div>
                          <span className="example">(E.g.: 05/31/1970)</span>
                          <br />
                          <label className="checkbox-default" htmlFor="offer">
                            <input type="checkbox" id="offer" />
                            <span>Receive offers from our partners</span>
                          </label>
                          <br />
                          <label
                            className="checkbox-default checkbox-default-more-text"
                            htmlFor="newsletter"
                          >
                            <input type="checkbox" id="newsletter" />
                            <span>
                              Sign up for our newsletter
                              <br />
                              <em>
                                You may unsubscribe at any moment. For that
                                purpose, please find our contact info in the
                                legal notice.
                              </em>
                            </span>
                          </label>
                          <div className="save_button mt-10">
                            {edit === false && (
                              <button
                                type="submit"
                                className="btn btn-primary "
                              >
                                Save
                              </button>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;
