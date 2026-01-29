import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].secure_url
      : "https://via.placeholder.com/400x300?text=No+Image";

  const handleImageClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col h-[650px]">
      <div
        className="flex-grow overflow-hidden rounded-md mb-3 cursor-pointer"
        onClick={handleImageClick}
      >
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-top rounded-md transform transition-transform duration-300 hover:scale-110"
        />

      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white py-1.5 px-3 rounded hover:bg-blue-600 transition text-sm"
          >
            Add to Cart
          </button>
          <p className="text-blue-700 font-extrabold text-xl">৳ {product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
