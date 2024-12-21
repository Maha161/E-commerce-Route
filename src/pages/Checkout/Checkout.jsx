import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { UserContext } from "../../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { cartInfo } = useContext(CartContext);
    const { token } = useContext(UserContext);
    const navigate = useNavigate();
    const [paymentMethod , setPaymentMethod]= useState(null)

    async function createCashOrder(values) {
        const toastId = toast.loading("We are creating your order...");
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                method: "POST",
                headers: { token },
                data: values,
            };

            const { data } = await axios.request(options);
            if (data.status === "success") {
                toast.success("Your order has been created");
                setTimeout(() => navigate("/allorders"), 2000);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create order. Please try again.");
        } finally {
            toast.dismiss(toastId);
        }
    }

    async function handleOnlinePayment(values) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                method: "POST",
                headers: { token },
                data: values,
            };
    
            const { data } = await axios.request(options);
            if (data.status === "success") {
                toast.success("Redirecting you to Stripe...");
                setTimeout(() => {
                    window.location.assign(data.session.url);
                }, 2000);
            }
        } catch (error) {
            console.error(error);
        } 
    }
    
    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                details: "",
                phone: "",
                city: "",
            },
        },
        onSubmit: (values)=>{
           if(paymentMethod === "cash") createCashOrder(values);
           else handleOnlinePayment(values) 
        },
    });

    return (
        <section className="my-6">
            <h1 className="my-2 font-semibold text-lg text-gray-600">Shipping Address</h1>
            <form className="space-y-3" onSubmit={formik.handleSubmit}>
                <div className="city">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        value={formik.values.shippingAddress.city}
                        onChange={(e) => formik.setFieldValue("shippingAddress.city", e.target.value)}
                        name="shippingAddress.city"
                    />
                </div>
                <div className="phone">
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone"
                        value={formik.values.shippingAddress.phone}
                        onChange={(e) => formik.setFieldValue("shippingAddress.phone", e.target.value)}
                        name="shippingAddress.phone"
                    />
                </div>
                <div className="details">
                    <textarea
                        className="form-control"
                        placeholder="Details"
                        value={formik.values.shippingAddress.details}
                        onChange={(e) => formik.setFieldValue("shippingAddress.details", e.target.value)}
                        name="shippingAddress.details"
                    />
                </div>
                <button
                    onClick={()=>{
                        setPaymentMethod("cash")
                    }}
                    className="btn w-fit mr-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm"
                >
                    Cash order
                </button>
                <button
                    onClick={()=>{
                        setPaymentMethod("Online")
                    }}
                    className="btn w-fit bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm">
                    Online Payment
                </button>
            </form>
        </section>
    );
}
