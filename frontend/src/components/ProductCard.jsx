import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const ProductCard = React.memo(({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 p-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {product.title}
      </h2>
      <p className="text-xl font-bold text-green-600 mb-4">
        ₹{product.price}
      </p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-full transition-colors duration-150"
      >
        Add to Cart
      </button>
    </div>
  );
});

export default ProductCard;


