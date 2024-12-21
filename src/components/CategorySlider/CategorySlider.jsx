import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export default function CategorySlider() {
    const [categories, setCategories] = useState(null);
    async function getCategories() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/categories",
                method: "GET",
            };
            const { data } = await axios.request(options);
            console.log(data.data)
            setCategories(data.data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
           {categories? <section className="py-6">
             <h2 className="font-semibold">Shop Popular Categories</h2>
             <Swiper slidesPerView={6} loop={true}>
             {categories.map((category)=>
               <SwiperSlide key={category._id}>
                 <Link to={`/category/${category._id}`}>
                 <img src={category.image} className="w-full h-52 object-cover" alt=""/>
                 <h3>{category.name}</h3>
                 </Link>
               </SwiperSlide>  ) }               
             </Swiper>
           </section> : <h2>Loading</h2>
           }
        </>
    );
}
