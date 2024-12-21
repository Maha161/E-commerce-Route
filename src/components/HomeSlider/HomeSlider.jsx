import image1 from "../../assets/images/slider-image-1.jpeg"
import image2 from "../../assets/images/slider-image-2.jpeg"
import image3 from "../../assets/images/slider-image-3.jpeg"
export default function HomeSlider() {
  return (
   <>
     <div className="grid grid-cols-12 pb-4">
        <div className="col-span-8">     
        <swiper-container style={{height: "100%"}}  loop={true}>
        <swiper-slide style={{height: "100%"}}> <img className="w-full h-full object-cover" src={image3} alt=""/></swiper-slide>
        <swiper-slide style={{height: "100%"}}> <img className="w-full h-full object-cover" src={image1} alt=""/></swiper-slide>
        <swiper-slide style={{height: "100%"}}> <img className="w-full h-full object-cover" src={image2} alt=""/></swiper-slide>
       </swiper-container>
        </div>
        <div className="col-span-4">
             <div className="h-1/2">
                <img className="w-full h-full object-cover" src={image2} alt=""/>
             </div>
             <div className="h-1/2">
                <img className="w-full h-full object-cover" src={image1} alt=""/>
             </div>
        </div>
     </div>

   </>
  )
}
