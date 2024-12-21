import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CartContext } from "../../context/Cart.context"
import ReactImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Core Swiper styles

import ProductCard from "../../components/ProudctCard/ProductCard"

export default function ProductDetalis() {
   let {id} = useParams()
   const [productDetails , SetProductDetails] = useState(null)
   const [realtedProducts , setRelatedProducts] = useState(null)
   const {addProductToCart} = useContext(CartContext)
   async function getProductDetails(){
    try{
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method: "GET"
        };        
    
        let {data} = await axios.request(options)
        console.log(data.data)
        SetProductDetails(data.data)
    } catch (error){
        console.log(error)
    }
  }

   async function getRelatedProducts() {
    try{
      const options = {
          url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
          method: "GET"
      };        
  
      let {data} = await axios.request(options)
      console.log(data.data)
      setRelatedProducts(data.data)
  } catch (error){
      console.log(error)
  }
   }

  useEffect(()=> {
    getProductDetails()
  } , [])
  
  useEffect(()=>{
    if(productDetails === null) return;
    getRelatedProducts();
  }, [productDetails])
  
  return (
    <>
      {productDetails ? 
      <>
       <section className="grid gap-12 grid-cols-12 py-8">
         <div className="col-span-3">
            <ReactImageGallery
             showFullscreenButton={false}
             showPlayButton={false}
             showNav={false}

             items={productDetails.images.map((image)=> {
              return {
                original: image,
                thumbnail: image
              } 
            })}/>
           </div> 
            <div className="col-span-9 space-y-4 pt-5">
               <div>
                 <h2 className="text-xl font-semibold text-gray-600">{productDetails.title}</h2>
                 <h3 className="text-primary-600 font-semibold">{productDetails.category.name}</h3>
               </div>
                <p className="text-gray-400">{productDetails.description}</p>
                <div className="flex justify-between items-center">
                    <span>{productDetails.price} L.E</span>
                    <div className="flex items-center">
                        <i className="fa-solid fa-star mr-2 text-yellow-500"></i>
                        <span>{productDetails.ratingsAverage}</span>
                    </div>
                </div>
                <button
                onClick={()=> {
                  addProductToCart({productId: id})
                }}
                 type="submit" className="btn bg-primary-500 hover:bg-primary-600 text-white font-semibold w-full">ADD TO CART</button>
            </div>
        </section>
       <section>
         <h2 className="font-semibold py-4 pl-2">Related Products</h2>
          {realtedProducts? <Swiper slidesPerView={6}>
          {realtedProducts.map((product)=> <SwiperSlide key={product._id}>
             <ProductCard productInfo={product}/>
          </SwiperSlide>)}
         </Swiper> : <h2>Loading</h2>}
       </section>
       </>
      : <h2>Loading</h2>}
    </>
  )
}