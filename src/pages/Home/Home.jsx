import { useEffect, useState } from "react";
import ProductCard from "../../components/ProudctCard/ProductCard";
import axios from "axios";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import Loading from "../../components/Loading/Loading";

export default function Home() {
  const [products , setProducts] = useState(null)

  async function getProducts(){
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products" ,
      method: "GET"
    }
    const {data} = await axios.request(options)
    console.log(data.data)
    setProducts(data.data)
  }

  useEffect(()=> {getProducts()} , [])
  return <>
  <HomeSlider/>
  <CategorySlider/>
  <div className="grid grid-cols-12 gap-4">
     { products ? products.map((product) => 
      <ProductCard key={product.id} productInfo={product}/>) : <Loading/> }
  </div>
 
  </>
}
