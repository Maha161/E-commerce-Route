import React from "react";
import { useLocation } from "react-router-dom";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";
import { useState } from "react";

export default function Productdetails() {
  const images = [
    { original: img1, thumbnail: img1 },
    { original: img2, thumbnail: img2 },
    { original: img3, thumbnail: img3 },
    { original: img4, thumbnail: img4 },
  ];
  const location = useLocation();
  const product = location.state; 
 

  if (!product) {
    return <p>No product data available</p>; // Handle case where no product data is passed
  }

  const { image, category, title, price, rating, description } = product;
  const [selectedImage, setSelectedImage] = useState(image);
  return (
    <div className="flex bg-slate-100 p-2 mt-10">
      <div className="flex gap-6 items-start max-w-6xl w-full mx-auto">
      <div className="flex flex-col gap-4 pt-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={img.thumbnail}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer border ${
                img.original === selectedImage ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img.original)} // Set selected image
            />
          ))}
        </div>
        <div>
          <img
             src={selectedImage}
            alt={title}
            className="w-full h-80 object-contain rounded-md"
          />
        </div>
        <div className="content py-4 space-y-2 w-72">
          <h3 className="text-xs text-gray-500 uppercase">{category}</h3>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <span className="font-bold  text-gray-900">{price} LE</span>
          <h3 className="flex items-center text-gray-700">
            {rating}
            <i className="fa-solid fa-star text-yellow-400 text-sm ml-1"></i>
          </h3>
          <div>
            <h2 className="font-bold text-sm">Description</h2>
            <p className="text-xs text-gray-600 pt-1 line-clamp-5 leading-relaxed">
              {description}
            </p>
          </div>
           <div className="flex gap-2 pt-1">
           <button className="flex items-center justify-center gap-2 text-xs bg-gray-900 text-white border border-gray-900 rounded-md px-2 py-1 hover:bg-white hover:text-gray-900 transition-colors duration-300">
            Add to cart
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
          <button className="flex items-center justify-center gap-2 text-xs bg-green-500 text-white border border-white rounded-md px-2 py-1 hover:bg-white hover:text-green-600 transition-colors duration-300">
            <i className="fa-solid fa-heart"></i>
          </button>
           </div>
        </div>
      </div>
    </div>
  );
}
