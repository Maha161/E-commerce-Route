import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tokenContext } from "../../context/Tokencontext";
import { object, string } from "yup";

export default function ResetPassword() {
  let { updateToken } = useContext(tokenContext);

  let navigate = useNavigate();

  const passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    newPassword: string()
      .required("Password is required")
      .matches(
        passRegex,
        "Password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });

  async function resetPassword(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };

      let { data } = await axios.request(options);

      if (data.token) {
        navigate("/login");
      }
    } catch (error) {
      setincorrectError(error.response.data.message);
    }
  }

  return (
    <>
  
      <div className="my-5  py-5">
        <div className="col-sm-9 col-md-6">
          <h3 className="mb-3 font-bold text-lg">Reset Password</h3>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <label>Email:</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-sm mt-2 ps-2">
                  *{formik.errors.email}
                </p>
              )}
            </div>

            <div className="mb-3 ">
              <label htmlFor="newPassword">New-Password:</label>
              <div className="position-relative">
                <input
                  name="newPassword"
                  type="password"
                  className="form-control"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.errors.newPassword && formik.touched.newPassword && (
                <p className="text-red-500 text-sm mt-2 ps-2">
                  *{formik.errors.email}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn bg-main text-white"
              disabled={!(formik.dirty && formik.isValid)}
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
