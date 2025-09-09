import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="group block text-white hover:text-white transition-colors"
    >
      {/* Image Container */}
      <div className="overflow-hidden rounded-lg bg-[#1a1a1a] aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <p className="mt-3 text-sm sm:text-base font-medium text-white truncate">{name}</p>
      <p className="text-sm sm:text-base text-gray-300 font-semibold">{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;
