import axios from "axios";
import { Formik, useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string, ref } from "yup"; // Added `ref` import
import { UserContext } from "../../context/User.context";

export default function Login() {
  const {setToken} = useContext(UserContext)
  const [inCorrectEmailorPasswordError , SetinCorrectEmailorPasswordError ] = useState(null)
  const navigate = useNavigate()
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  
  const validationSchema = object({  
    email: string()
      .required("Email is required")
      .email("Email is not valid"),
    password: string()
      .required("Password is required")
      .matches(passwordRegex, "Password must include uppercase, lowercase, number, and special character"),
  });

  async function sendDataToLogin(values) {
    const loadingID = toast.loading("Waiting...")
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };

      let {data} = await axios.request(options);
       if(data.message === "success"){
        localStorage.setItem("token" , data.token)
         setToken(data.token)
        toast.success("User Logged in successfully");
        setTimeout(()=> {
          navigate("/")
        },2000)
       }
     
    } catch (error) {
        console.log(error)
       SetinCorrectEmailorPasswordError(error.response.data.message) 
     } finally{
      toast.dismiss(loadingID)
     }
  }

  const formik = useFormik({
    initialValues: {   
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendDataToLogin,
  });

  return (
    <>
      <section className="my-7">
        <h1 className="text-xl text-slate-700 font-semibold">
          <i className="fa-regular fa-circle-user mr-2"></i> Login
        </h1>
        <form className="py-4 space-y-3" onSubmit={formik.handleSubmit}>
  
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
           {inCorrectEmailorPasswordError &&
              <p className="text-red-500 mt-1 text-sm">*{inCorrectEmailorPasswordError}</p>
            }
          <button
            type="submit"
            className="btn bg-primary-700 hover:bg-primary-800 text-white" >
            Login
          </button>
          <p className="mb-3 font-sm ">
                  Forgot your password?
                  <Link
                    to="/Auth-Password/forgetPassword"
                    className="text-main ms-1 fw-bold text-primary-600"
                  >
                    Reset it here
                  </Link>
                </p>
        </form>
      </section>
    </>
  );
}
