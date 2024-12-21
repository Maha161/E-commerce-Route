import { useContext, useEffect } from "react";
import { CartContext } from "../../context/Cart.context";
import CartItem from "../../components/cartItem/CartItem";
import { Link } from "react-router-dom"; // Import Link

export default function Cart() {
  const { getCartProduct, cartInfo , clearCart } = useContext(CartContext);

  // Fetch cart products on component mount
  useEffect(() => {
    getCartProduct();
  }, []);

  return (
    <>
      {cartInfo === null ? (
        <h2>Loading...</h2>
      ) : (
        <section className="space-y-3">
          <div className="flex gap-1 items-center space-x-2 my-6">
            <i className="fa-brands fa-opencart"></i>
            <span className="font-semibold">|</span>
            <h2 className="font-semibold">Your Shopping Cart</h2>
          </div>

          {cartInfo.numOfCartItems === 0 ? (
            <div className="mt-6 bg-gray-100 space-y-2 p-5 rounded-md shadow flex justify-center items-center flex-col">
              <h2>
                Oops! Your cart is empty. Start shopping now by clicking the
                button below and find something you love!
              </h2>
              <Link
                to="/"
                className="btn w-fit bg-primary-600 hover:bg-primary-700 text-white"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mt-6">
                {cartInfo.data?.products.map((product) => (
                  <CartItem key={product._id} productInfo={product} />
                ))}
              </div>
              <div className="flex justify-between items-center">
                <p>
                  <i className="fa-solid fa-dollar-sign mr-2 text-primary-500"></i>
                  Your Total Cart Price:{" "}
                  <span className="text-primary-600 font-bold">
                    {cartInfo.data?.totalCartPrice}
                  </span>
                </p>
                <button
                onClick={clearCart}
                 className="btn text-md w-fit bg-red-500 hover:bg-red-600 text-white">
                  <i className="fa-solid fa-trash mr-1"></i>Clear Cart
                </button>
              </div>
              <Link to="/checkout" className="inline-block text-center font-semibold my-3 btn bg-primary-500 hover:bg-primary-600 text-white">
                Next Step (Payment)
              </Link>
            </>
          )}
        </section>
      )}
    </>
  );
}
