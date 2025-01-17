import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import * as Yup from "yup";
import { registerUser } from "../features/user/userSlice";

const userSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string().email().required("Email is required"),
  mobile: Yup.number().required("Mobile is required"),
  password: Yup.string().required("Password is required"),
});

function Signup() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <div>
      <Meta title={"Signup"} />
      <BreadCrumb title="Signup" />
      <div className="login-wrapper bg-white py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card shadow-2xl">
              <h3 className="text-center text-gray-800 font-normal text-3xl mb-3">
                Signup
              </h3>
              <form
                action=""
                className="d-flex flex-column gap-15"
                onSubmit={formik.handleSubmit}
              >
                <div className="border-1 border-gray-200 mt-10">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    className="form-control"
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                    value={formik.values.firstname}
                  />
                </div>
                <div className="error text-sm text-red-600">
                  {formik.errors.firstname && formik.touched.firstname ? (
                    <div>{formik.errors.firstname}</div>
                  ) : null}
                </div>
                <div className="border-1 border-gray-200 mt-2">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    className="form-control"
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                    value={formik.values.lastname}
                  />
                </div>
                <div className="error text-sm text-red-600">
                  {formik.errors.lastname && formik.touched.lastname ? (
                    <div>{formik.errors.lastname}</div>
                  ) : null}
                </div>
                <div className="border-1 border-gray-200 mt-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    value={formik.values.email}
                  />
                </div>
                <div className="error text-sm text-red-600">
                  {formik.errors.email && formik.touched.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="border-1 border-gray-200 mt-2">
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    className="form-control"
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                    value={formik.values.mobile}
                  />
                </div>
                <div className="error text-sm text-red-600">
                  {formik.errors.mobile && formik.touched.mobile ? (
                    <div>{formik.errors.mobile}</div>
                  ) : null}
                </div>
                <div className="border-1 border-gray-200 mt-2">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    value={formik.values.password}
                  />
                </div>
                <div className="error text-sm text-red-600">
                  {formik.errors.password && formik.touched.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
                <div>
                  {/* <Link to="/forget-password">Forget Password</Link> */}
                  <div className="d-flex justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
