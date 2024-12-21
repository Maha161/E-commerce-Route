import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import UserProvider from "./context/User.context";
import CartProvider from "./context/Cart.context";
import WishlistProvider from "./context/Wishlist.context";
import Cart from "./pages/Cart/Cart";
import ProductDetalis from "./pages/ProductDetails/ProductDetalis";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Category from "./pages/Category/Category";
import Brands from "./pages/Brands/Brands";
import WishList from "./pages/WishList/WishList";
import TokenProvider from "./context/Tokencontext";
import ForgotPassword from "./pages/ForgotPassward/ForgotPassward";
import ResetPassword from "./pages/ResetPassward/ResetPassward";
import VerifyResetCode from "./pages/VerifyCode/VerifyCode";
import Products from "./pages/Products/Products";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "wishlist", element: <WishList /> },
        { path: "product/:id", element: <ProductDetalis /> },
        { path: "checkout", element: <Checkout /> },
        { path: "allorders", element: <Orders /> },
        { path: "category", element: <Category /> },
        { path: "product", element: <Products/> },
        { path: "brands", element: <Brands /> }

      ],
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "Auth-Password/forgetPassword", element: <ForgotPassword /> },
        { path: "Auth-Password/resetPassword", element: <ResetPassword /> },
        { path: "Auth-Password/verifyCode", element: <VerifyResetCode /> }
      ],
    },
  ]);

  return (
    <TokenProvider> 
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router} />
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
      <Toaster position="top right" />
    </TokenProvider>
  );
}
