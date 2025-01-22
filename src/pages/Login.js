import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserCart, loginUser } from "../features/user/userSlice";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  console.log(authState);
  const { user, isSuccess, isLoading } = authState;

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(loginUser(values)).unwrap();
        formik.resetForm();
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      if (user) {
        dispatch(getUserCart());
        window.scrollTo(0, 0);
      }
    }
  }, [isSuccess, user, navigate, dispatch]);

  const renderError = (field) =>
    formik.errors[field] && formik.touched[field] ? (
      <div className="error text-sm text-red-600">{formik.errors[field]}</div>
    ) : null;

  return (
    <div>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />
      <div className="login-wrapper bg-white py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card shadow-2xl">
              <h3 className="text-center text-gray-800 font-normal text-3xl mb-3">
                Login
              </h3>
              <form
                className="d-flex flex-column gap-8"
                onSubmit={formik.handleSubmit}
              >
                <div className="mt-10">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control  "
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "1px",
                      padding: "10px", // Optional
                    }}
                    {...formik.getFieldProps("email")}
                  />
                  {renderError("email")}
                </div>
                <div className="mt-1">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "1px", // Optional
                      padding: "10px", // Optional
                    }}
                    {...formik.getFieldProps("password")}
                  />
                  {renderError("password")}
                </div>
                <div>
                  <Link to="/forget-password">Forget Password?</Link>
                  <div className="d-flex justify-content-center gap-15 align-items-center">
                    <button
                      className="button signup border-0"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </button>
                    <Link to="/signup" className="button text-white">
                      Sign Up
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
