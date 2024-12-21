import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from '../../components/Loading/Loading';
export default function Orders() {
    const { token } = useContext(UserContext);
    const [orders, setOrders] = useState(null);
    let { id } = jwtDecode(token);

    // Fetch orders from API
    async function getUserOrder() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method: "GET",
                headers: {
                    token,
                },
            };

            let { data } = await axios.request(options);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserOrder();
    }, []);

    return (
        <>
            {orders ? (
                <section className="space-y-4 my-8">
                    {orders.map((order) => {
                        return ( // Add return here
                            <div key={order.id} className="order p-4 border-2 border-gray-500 border-opacity-25 rounded-lg">
                                <header className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-gray-500">Order ID</h2>
                                        <span className="font-semibold text-gray-700">#{order.id}</span>
                                    </div>
                                    <div>
                                        {order.isPaid ? (
                                            <span className="inline-block px-3 py-1 bg-lime-500 mx-2 text-white rounded-full">Paid</span>
                                        ) : (
                                            <span className="inline-block px-3 py-1 bg-red-500 text-white rounded-full">Unpaid</span>
                                        )}
                                        {order.isDelivered ? (
                                            <span className="inline-block px-3 py-1 bg-lime-500 text-white rounded-full">Delivered</span>
                                        ) : (
                                            <span className="inline-block px-3 py-1 bg-blue-500 mx-2 text-white rounded-full">Under Delivery</span>
                                        )}
                                    </div>
                                </header>
                                <div className="grid mt-4 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                                    {order.cartItems.map((product) => (
                                        <div key={product._id} className="product-item overflow-hidden border-gray-400 rounded-lg border-opacity-30">
                                        <img src={product.product.imageCover} alt="" className="w-full h-52 object-cover" />
                                         <div className="p-4">
                                         <h3 className="text-sm font-semibold line-clamp-2 ">
                                            <Link to={`/product/${product.product.id}`}>
                                            {product.product.title}
                                            </Link>
                                         </h3>
                                        <div className="flex justify-between items-center">
                                            <p className="mt-2">
                                                <span className="font-bold underline">{product.count}</span>
                                            </p>
                                            <span>{product.price} L.E</span>
                                        </div>
                                            </div>
                                    </div>
                    ))}
                                  
                                </div>
                                <p>Yout Total Order Price is <span className="mx-1 font-bold text-primary-500">{order.totalOrderPrice}</span>L.E</p>
                            </div>
                        );
                    })}
                </section>
            ) : (
                <Loading/>
            )}
        </>
    );
}
