import { Link, NavLink } from "react-router-dom";
import freashCartLogo from "../../assets/images/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";
import {WishlistContext} from "../../context/Wishlist.context"

export default function Navbar() {
  const { token, logOut } = useContext(UserContext);
  const { cartInfo, getCartProduct } = useContext(CartContext);
  const { wishlistInfo, getWishlistProducts } = useContext(WishlistContext);  

  useEffect(() => {
    getCartProduct();
    getWishlistProducts();  
  }, []);

  return (
    <>
      <nav className="bg-slate-100 py-3 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="container flex items-center gap-12">
          <Link to="/">
            <img src={freashCartLogo} alt="FreshCart logo" />
          </Link>

          {token && (
            <>
              <ul className="flex gap-4 items-center">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative text-sm before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative text-sm before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`
                    }
                    to="/cart"
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative text-sm before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`
                    }
                    to="/product"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative text-sm before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`
                    }
                    to="/category"
                  >
                    Category
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative text-sm before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`
                    }
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative text-sm before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`
                    }
                    to="/allorders"
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>

              <Link to="/cart" className="cursor-pointer ml-auto relative">
                <i className="fa-solid fa-cart-shopping text-lg"></i>
                <div className="flex items-center justify-center absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 card-count h-4 w-4 rounded-full bg-primary-800 text-white">
                  {cartInfo === null ? (
                    <i className="fa-solid fa-spinner fa-spin text-xs"></i>
                  ) : (
                    <span className="text-xs font-semibold">{cartInfo.numOfCartItems}</span>
                  )}
                </div>
              </Link>

              <Link to="/wishlist" className="cursor-pointer ml-4 relative">
                <i className="fa-solid fa-heart text-lg"></i>
                <div className="flex items-center justify-center absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 card-count h-4 w-4 rounded-full bg-primary-800 text-white">
                  {wishlistInfo === null ? (
                    <i className="fa-solid fa-spinner fa-spin text-xs"></i>
                  ) : (
                    <span className="text-xs font-semibold">{wishlistInfo.count}</span>
                  )}
                </div>
              </Link>
            </>
          )}

          <ul className={`flex gap-4 items-center ${!token && "ms-auto"}`}>
            <li>
              <a href="https://instagram.com" target="_blank">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://tiktok.com" target="_blank">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>
            <li>
              <a href="https://x.com" target="_blank">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>

          <ul className="flex gap-3 items-center">
            {!token && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative text-sm before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`
                    }
                    to="/signup"
                  >
                    Sign up
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `relative text-sm before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <li onClick={logOut}>
                <a>
                  <i className="fa-solid fa-right-from-bracket text-lg mt-2"></i>
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
