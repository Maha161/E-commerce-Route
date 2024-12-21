import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import ProductCard from '../../components/ProudctCard/ProductCard';

export default function Products() {
  const [products, setProducts] = useState(null);


  async function getProducts() {
    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/products',
        method: 'GET',
      };
      const { data } = await axios.request(options);
      console.log(data.data);
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold text-center mt-10">All Products</h1>
      <div className="grid grid-cols-12 gap-4 py-10">
        {products ? (
            products.map((product) => (
            <ProductCard
              key={ProductCard.id}
              productInfo={product}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
