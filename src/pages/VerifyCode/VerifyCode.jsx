import { useFormik } from "formik";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function VerifyResetCode() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);

  const validationSchema = object({
    resetCode: string().required("Reset code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: verifyCode,
  });

  async function verifyCode(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);

      if (data.status === "Success") {
        navigate("/Auth-Password/resetPassword");
      } else {
        setError("Invalid reset code. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  }

  return (
    <>
      <div className="my-5 py-5">
        <div className="col-sm-9 col-md-6">
          <h3 className="mb-3 font-bold text-lg">Reset your account password</h3>

          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="resetCode" className="font-bold">Code:</label>
              <input
                name="resetCode"
                type="text"
                className="form-control"
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.resetCode && formik.touched.resetCode && (
                <p className="text-red-500 text-sm mt-2 ps-2">
                  *{formik.errors.resetCode}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn bg-main text-white"
              disabled={!(formik.dirty && formik.isValid)}
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
