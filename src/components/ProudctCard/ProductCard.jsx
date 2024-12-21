import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { WishlistContext } from "../../context/Wishlist.context"; 
import { Link } from "react-router-dom";

export default function ProductCard({ productInfo }) {
  const { images, category, title, price, ratingAverage, id } = productInfo;
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, wishlistIds, removeProductFromWishlist } = useContext(WishlistContext); 

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlistIds.includes(id));
  }, [wishlistIds, id]);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      removeProductFromWishlist({ productId: id });
    } else {
      addProductToWishlist({ productId: id });
    }
  };

  return (
    <>
      <div className="col-span-2 shadow-md rounded-md overflow-hidden">
        <div className="relative">
          <img className="w-full" src={images[0]} alt="" />
          <div className="layer opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 absolute w-full h-full left-0 top-0 bg-black bg-opacity-15 ">
            <div
              onClick={handleWishlistClick}
              className={`icon cursor-pointer w-8 h-8 rounded-full ${isInWishlist ? 'bg-red-600' : 'bg-primary-500'} flex items-center justify-center`}
            >
              <i className= "fa-solid fa-heart text-white"></i>
            </div>
            <div
              onClick={() => {
                addProductToCart({ productId: id });
              }}
              className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center"
            >
              <i className="fa-solid fa-cart-shopping text-white"></i>
            </div>
            <Link
              to={`/product/${id}`}
              className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center"
            >
              <i className="fa-solid fa-eye text-white"></i>
            </Link>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-primary-600">{category.name}</h3>
          <h2 className="text-sm font-semibold line-clamp-1">{title}</h2>
          <div className="flex items-center justify-between mt-3">
            <span>{price} L.E</span>
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <span>{ratingAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
