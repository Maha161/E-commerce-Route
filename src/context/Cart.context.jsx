import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(UserContext); // Get token from UserContext
  const [cartInfo , setCartInfo]= useState(null)

  async function addProductToCart({ productId }) {
    const loadingID = toast.loading("Adding product...");

    try {
      if (!token) {
        toast.error("You must be logged in to add a product to the cart.");
        return;
      }

      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };

      const { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success(data.message);
        getCartProduct()
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the product.");
    } finally {
      toast.dismiss(loadingID); // Dismiss the loading toast
    }
  }

  async function getCartProduct() {
    try {
      if (!token) {
        toast.error("You must be logged in to view the cart.");
        return;
      }

      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);

      if (data.status === "success") {
        setCartInfo(data)
      }
    } catch (error) {
      console.error(error);
    } 
  }

  async function removeProductFromCart({productId}){
    let toastId = toast.loading("Deleteing Product ...")
    try {  
        const options = {
          url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          method: "DELETE",
          headers: {
            token,
          },
        };
  
        const { data } = await axios.request(options);
  
        if (data.status === "success") {
          toast.success("Product has been deleted")  
          setCartInfo(data)

        }
      } catch (error) {
        console.error(error);
      } finally{
        toast.dismiss(toastId)
      }
  }

  async function clearCart(){
    // let toastId = toast.loading("Clearing Cart ...")
    try {  
        const options = {
          url: "https://ecommerce.routemisr.com/api/v1/cart",
          method: "DELETE",
          headers: {
            token
          },
        };
  
        const { data } = await axios.request(options);
          console.log(data) 
        if (data.message === "success") {
          toast.success("Cart has been cleared")  
          setCartInfo({
            numOfCartItems: 0
          })
        }
      } catch (error) {
        console.error(error);
      } finally{
        toast.dismiss(toastId)
      }
  }

  async function updateProductCount({productId , count}){
    try{
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method: "PUT",
            headers:{
                token
            },
            data:{
               count 
            }
        }
        let {data} = await axios.request(options);
        if(data.status === "success"){
            setCartInfo(data)
        }
    } catch(error){
        console.log(error)
    }
    
  }


  return (
    <CartContext.Provider value={{ addProductToCart, getCartProduct , cartInfo , removeProductFromCart , clearCart , updateProductCount }}>
      {children}
    </CartContext.Provider>
  );
}
