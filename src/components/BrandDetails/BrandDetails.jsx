import React, { useState, useEffect } from 'react';

export default function BrandDetails({ brand, closeModal }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); 
  }, []);

  const handleClose = () => {
    setIsVisible(false); 
    setTimeout(closeModal, 300); 
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 transition-transform duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white p-3 rounded-lg w-1/3 transition-transform transform ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >  
         <div className='flex items-end justify-end p-1 border border-gray-300 border-x-0 border-t-0'>
            <i  onClick={handleClose} className='fa-solid fa-xmark text-lg text-gray-400 cursor-pointer'></i>
         </div>
      <div className='flex justify-between items-center ps-2'>
        <div >
        <h2 className="text-2xl font-bold  text-primary-600">{brand.name}</h2>
        <p className=" text-gray-600">{brand.slug}</p>
        </div> 
        <img
          className=" w-52 h-48 object-contain"
          src={brand.image}
          alt={brand.name}
        />
            
      </div>
      <div className="flex justify-end border border-b-0 border-x-0">
          <button onClick={handleClose} className="text-white text-xs p-1 rounded-md mt-1  bg-gray-500">
              Close
          </button>
        </div>
      </div>

    </div>
  );
}
