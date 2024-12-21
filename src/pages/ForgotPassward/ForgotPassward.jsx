import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ForgotPassword() {
  let navigate = useNavigate();
  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgetPassword,
  });
  async function forgetPassword(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);

      if (data.statusMsg === "success") {
        navigate("/Auth-Password/verifyCode");
      }
    } catch (error) {
      setincorrectError(error.response.data.message);
    }
  }

  return (
    <>

      <div className="my-5 py-5">
        <div className="col-sm-9 col-md-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3 space-y-1">
              <label htmlFor="email" className="font-bold text-lg">Email:</label>
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

            <button type="submit" className="btn bg-main text-white py-2">
              Send code
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
