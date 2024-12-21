import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function SubCategoryCard({ categoryId, categoryName }) {
  const [subCategories, setSubCategories] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getSubCategories() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
        method: 'GET',
      };
      const { data } = await axios.request(options);
      console.log(data.data);
      setSubCategories(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      getSubCategories();
    }
  }, [categoryId]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-center mb-5 text-primary-600">
        Subcategories of {categoryName}
      </h2>
      {loading ? (
        <Loading />
      ) : subCategories && subCategories.length > 0 ? (
        <div className="grid grid-cols-12 gap-4">
          {subCategories.map((subCategory) => (
            <div
              key={subCategory._id}
              className="col-span-4 border border-gray-400 shadow-md rounded-sm hover:shadow-primary-500 transition-all duration-300 p-3"
            >
              <h2 className="text-black text-center font-medium">
                {subCategory.name}
              </h2>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No subcategories found.</p>
      )}
    </div>
  );
}
