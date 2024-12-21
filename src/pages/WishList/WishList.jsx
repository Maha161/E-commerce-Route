import { useContext, useEffect } from "react";
import { WishlistContext } from "../../context/Wishlist.context"; 
import WishlistItem from "../../components/WishlistIItem/WishlistItem";
import { Link } from "react-router-dom"; 

export default function WishList() {
  const { getWishlistProducts, wishlistInfo, removeProductFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    getWishlistProducts(); 
  }, [getWishlistProducts]);

  console.log("Wishlist Info:", wishlistInfo); 

  if (wishlistInfo === null) {
    return <h2>Loading...</h2>;
  }


  if (wishlistInfo.count === 0) { 
       return (
      <section className="mt-6 bg-gray-100 p-5 rounded-md shadow flex justify-center items-center flex-col">
        <h2 className="text-center">
          Oops! Your wishlist is empty. Start shopping now by clicking the button below and find something you love!
        </h2>
        <Link to="/" className="btn w-fit bg-primary-600 hover:bg-primary-700 text-white mt-4">
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex gap-1 items-center space-x-2 my-6">
        <i className="fa-solid fa-heart"></i>
        <span className="font-semibold">|</span>
        <h2 className="font-semibold">Your Wishlist</h2>
      </div>

      <div className="space-y-4 mt-6">
        {wishlistInfo?.data?.map((product) => (
          <WishlistItem
            key={product._id}
            productInfo={product}
            removeProductFromWishlist={removeProductFromWishlist} 
          />
        ))}
      </div>

    </section>
  );
}