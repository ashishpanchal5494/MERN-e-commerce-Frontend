import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserCart, loginUser } from "../features/user/userSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });
  const authState = useSelector((state) => state.auth);

  const { user, isSuccess, isLoading } = authState;

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      if (user) {
        dispatch(getUserCart());
        window.location.reload();
        window.scrollTo(0, 0);
      }
    }
  }, [isSuccess, navigate, dispatch, user]);

  return (
    <div>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />
      <div className="login-wrapper bg-white py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 ">
            <div className="auth-card shadow-2xl">
              <h3 className="text-center text-gray-800 font-normal text-3xl mb-3">
                Login
              </h3>
              <form
                action=""
                className="d-flex flex-column gap-15"
                onSubmit={formik.handleSubmit}
              >
                <div className=" border-1 border-gray-200 mt-10">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    onChange={formik.handleChange("email")}
                    value={formik.values.email}
                    onBlur={formik.handleBlur("email")}
                  />
                </div>
                <div className="error text-sm text-red-600">
                  {formik.errors.email && formik.touched.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="mt-1 border-1 border-gray-200">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    onChange={formik.handleChange("password")}
                    value={formik.values.password}
                    onBlur={formik.handleBlur("password")}
                  />
                </div>
                <div className="error text-sm text-red-600">
                  {formik.errors.password && formik.touched.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
                <div>
                  <Link to="/forget-password">Forget Password ?</Link>
                  <div className="d-flex justify-content-center gap-15 align-items-center">
                    <button
                      className="button border-0"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </button>
                    <Link to="/signup" className="button signup">
                      SIgn Up
                    </Link>
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

export default Login;
