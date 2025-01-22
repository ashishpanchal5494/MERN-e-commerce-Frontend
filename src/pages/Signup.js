import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import * as Yup from "yup";
import { registerUser } from "../features/user/userSlice";

const userSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required."),
  lastname: Yup.string().required("Last name is required."),
  email: Yup.string()
    .email("Enter a valid email address.")
    .required("Email is required."),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number.")
    .required("Mobile number is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

function Signup() {
  const navigate = useNavigate();
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
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(registerUser(values)).unwrap();
        formik.resetForm();
        navigate("/login");
      } catch (error) {
        console.error("Signup failed:", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <Meta title="Signup" />
      <BreadCrumb title="Signup" />
      <div className="signup-wrapper bg-white py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card shadow-2xl">
              <h3 className="text-center text-gray-800 font-normal text-3xl mb-3">
                Signup
              </h3>
              <form
                className="d-flex flex-column gap-8"
                onSubmit={formik.handleSubmit}
              >
                {[
                  {
                    name: "firstname",
                    type: "text",
                    placeholder: "First Name",
                  },
                  { name: "lastname", type: "text", placeholder: "Last Name" },
                  { name: "email", type: "email", placeholder: "Email" },
                  { name: "mobile", type: "tel", placeholder: "Mobile Number" },
                  {
                    name: "password",
                    type: "password",
                    placeholder: "Password",
                  },
                ].map((field, index) => (
                  <div key={index} className="form-group">
                    <input
                      {...field}
                      aria-label={field.placeholder}
                      className="form-control border-1 border-gray-200 mt-2"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "1px", // Optional
                        padding: "10px", // Optional
                      }}
                      onChange={formik.handleChange(field.name)}
                      onBlur={formik.handleBlur(field.name)}
                      value={formik.values[field.name]}
                    />
                    {formik.touched[field.name] &&
                      formik.errors[field.name] && (
                        <div className="error text-sm text-red-600 mt-1">
                          {formik.errors[field.name]}
                        </div>
                      )}
                  </div>
                ))}
                <div className="d-flex justify-content-center gap-15 align-items-center mt-4">
                  <button
                    type="submit"
                    className="button text-white border-0 "
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
                  </button>
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
