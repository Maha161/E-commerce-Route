import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";

export default function CartItem({productInfo}) {
    let {removeProductFromCart , updateProductCount} = useContext(CartContext)
    const {count , price , product} = productInfo;
    const {title , imageCover , category , id} = product
    return (
    <>
      <div className="flex - gap-2">
       <div className="card-item grow bg-gray-200 flex justify-between items-center py-3 px-5 rounded-lg">
        <img src={imageCover} alt={title} className="w-20 h-20 rounded-full object-cover border-2 border-white" />
        <h3 className="text-md text-gray-700 font-semibold">
          <Link to={`/product/${id}`} >
           {title}
          </Link>
        </h3>
        <h4 className="text-gray-500 font-semibold">{category.name}</h4>
         
         <div className="count flex gap-5 items-center">
            <span className="text-lg font-bold text-gray-600">{count}</span>
            <div className="icons space-y-2">
                <div 
                 onClick={()=> {
                    updateProductCount({productId: id , count: count+1})
                 }}
                className="plus w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center cursor-pointer">
                    <i className="fa-solid fa-plus"></i>
                </div>
                <div
                  onClick={()=> {
                    updateProductCount({productId: id , count: count-1})
                 }}
                 className="miuns w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center cursor-pointer">
                    <i className="fa-solid fa-minus"></i>
                </div>
            </div>
            <span>{price} L.E</span>
         </div>
        </div>
        <button
         onClick={()=> {
            removeProductFromCart({productId: id})
         }}
         className="rounded-md p-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
          <i className="fa-solid fa-xmark"></i>  
        </button>
      </div>
    
    </>
  )
}
