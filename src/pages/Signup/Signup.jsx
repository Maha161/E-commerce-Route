import axios from "axios";
import { Formik, useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string, ref } from "yup"; // Added `ref` import

export default function Signup() {
  const navigate = useNavigate()
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;
  const [accountexistError, setAccountExistError] = useState(null);
  
  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "Name can't be less than 3 characters")
      .max(20, "Name can not be more than 20 characters"),
    email: string()
      .required("Email is required")
      .email("Email is not valid"),
    password: string()
      .required("Password is required")
      .matches(passwordRegex, "Password must include uppercase, lowercase, number, and special character"),
    rePassword: string()
      .required("Confirm Password is required")
      .oneOf([ref("password")], "Passwords must match"), // `ref` now works
    phone: string()
      .required("Phone is required")
      .matches(phoneRegex, "Phone must be a valid Egyptian number"),
  });

  async function sendDataToRegister(values) {
    const loadingID = toast.loading("Waiting...")
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };

      let {data} = await axios.request(options);
      if(data.message === "success" )
        toast.success("User created successfully")
        setTimeout(()=>navigate("/login") , 2000)
        console.log("Registration successful:"); // Handle success
         
    } catch (error) {
      toast.error(error.response.data.message)
      setAccountExistError(error.response.data.message)
     } finally{
      toast.dismiss(loadingID)
     }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendDataToRegister,
  });

  return (
    <>
      <section className="my-8">
        <h1 className="text-xl text-slate-700 font-semibold">
          <i className="fa-regular fa-circle-user mr-2"></i> Register Now
        </h1>
        <form className="py-4 space-y-3" onSubmit={formik.handleSubmit}>
          <div className="username">
            <input
              className="form-control"
              type="text"
              placeholder="type your name"
              name="name"
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 mt-1 text-sm">*{formik.errors.name}</p>
            )}
          </div>
          <div className="email">
            <input
              className="form-control"
              type="text"
              placeholder="type your email"
              name="email"
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 mt-1 text-sm">*{formik.errors.email}</p>
            )}
            {accountexistError && (
              <p className="text-red-500 mt-1 text-sm">*{accountexistError}</p>
            )}
          </div>
          <div className="password">
            <input
              className="form-control"
              type="password"
              placeholder="type your password"
              name="password"
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 mt-1 text-sm">*{formik.errors.password}</p>
            )}
          </div>
          <div className="rePassword">
            <input
              className="form-control"
              type="password"
              placeholder="type your rePassword"
              name="rePassword"
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              onChange={formik.handleChange}
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <p className="text-red-500 mt-1 text-sm">*{formik.errors.rePassword}</p>
            )}
          </div>
          <div className="phone">
            <input
              className="form-control"
              type="tel"
              placeholder="type your phone"
              name="phone"
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="text-red-500 mt-1 text-sm">*{formik.errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-primary-700 hover:bg-primary-800 text-white"
          >
            Sign Up
          </button>
        </form>
      </section>
    </>
  );
}
