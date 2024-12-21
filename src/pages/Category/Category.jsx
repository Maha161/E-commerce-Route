import React, { useState, useEffect } from 'react';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import SubCategoryCard from '../../components/SubCategoryCard/SubCategoryCard';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';

export default function Category() {
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); 

  async function getCategories() {
    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/categories',
        method: 'GET',
      };
      const { data } = await axios.request(options);
      console.log(data.data);
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold text-center mt-10">All Categories</h1>
      <div className="grid grid-cols-12 gap-4 py-10">
        {categories ? (
          categories.map((category) => (
            <CategoryCard
              key={category._id}
              categoryInfo={category}
              onCategoryClick={(id, name) => setSelectedCategory({ id, name })} 
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
      <div>
        {selectedCategory ? (
          <SubCategoryCard
            categoryId={selectedCategory.id}
            categoryName={selectedCategory.name} 
          />
        ) : (
          <p className="text-center mt-5 text-gray-600">
            Click on a category to view its subcategories.
          </p>
        )}
      </div>
    </>
  );
}
