import React from 'react';

export default function CategoryCard({ categoryInfo, onCategoryClick }) {
  const { image, name, _id } = categoryInfo;

  return (
    <div
      className="col-span-3 shadow-md rounded-md overflow-hidden border border-transparent hover:border-primary-600 transition-all duration-300 cursor-pointer"
      onClick={() => onCategoryClick(_id, name)} 
    >
      <img className="w-full h-48 object-cover" src={image} alt={name} />
      <div className="p-3">
        <h2 className="text-primary-600 text-center font-semibold">{name}</h2>
      </div>
    </div>
  );
}
