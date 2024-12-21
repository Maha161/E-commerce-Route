import { useContext } from "react";
import { WishlistContext } from "../../context/Wishlist.context"; 
import { CartContext } from "../../context/Cart.context";  
import { Link } from "react-router-dom"; 

export default function WishlistItem({ productInfo }) {
  const { removeProductFromWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext); 
  const { title, imageCover, category, _id, price } = productInfo; 

  return (
    <div className="flex gap-4 items-center bg-gray-100 p-4 rounded-lg shadow-md">
      <img
        src={imageCover}
        alt={title}
        className="w-20 h-20 rounded-lg object-cover border-2 border-white"
      />

      <div className="flex-grow">
        <h3 className="text-md text-gray-700 font-semibold">
          <Link to={`/product/${_id}`}>{title}</Link>
        </h3>

        <h4 className="text-gray-500 font-semibold">{category.name}</h4>
        
        <p className="text-lg text-primary-600 font-bold">{price} L.E</p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => removeProductFromWishlist({ productId: _id })}
          className="text-red-600 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          <i className="fa-solid fa-trash"></i>
        </button>

        <button
          onClick={() => addProductToCart({ productId: _id })}
          className="text-green-600 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          <i className="fa-solid fa-cart-plus"></i> 
        </button>
      </div>
    </div>
  );
}
