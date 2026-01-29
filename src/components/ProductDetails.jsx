import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useCart } from "../context/CartContext";
import {
  FaCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Navbar from "./Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [descOpen, setDescOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://glore-bd-backend-node-mongo.vercel.app/api/product")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data)) {
          setProducts(data.data);
          const foundProduct = data.data.find((p) => p._id === id);
          setProduct(foundProduct || null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-10">লোড হচ্ছে...</p>;

  if (!product)
    return (
      <p className="text-center py-10 text-red-500">প্রোডাক্ট পাওয়া যায়নি।</p>
    );

  const imageUrl =
    product?.images && product.images.length > 0
      ? product.images[0].secure_url
      : "https://via.placeholder.com/600x800?text=No+Image";

  const rating = 4.5;

  const relatedProducts = products.filter(
    (p) => p.category?._id === product.category?._id && p._id !== product._id
  );

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-[1520px] mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="md:flex-1 min-h-[600px]">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Section (Sticky) */}
          <div className="md:flex-1 sticky top-0 self-start max-h-screen overflow-auto p-6">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(rating) ? "fill-current" : "stroke-current"
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={i < Math.floor(rating) ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.455a1 1 0 00-.364 1.118l1.286 3.97c.3.922-.755 1.688-1.54 1.118l-3.385-2.455a1 1 0 00-1.176 0l-3.385 2.455c-.784.57-1.838-.196-1.539-1.118l1.285-3.97a1 1 0 00-.364-1.118L2.04 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.951-.69l1.285-3.97z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-700 font-semibold">{rating} / 5</span>
            </div>

            {/* Price */}
            <p className="text-3xl font-extrabold text-blue-700 mb-4">
              ৳ {product.price}
            </p>

            {/* Category */}
            <p className="text-gray-600 italic mb-6">
              ক্যাটাগরি: {product.category?.name || "N/A"}
            </p>

            {/* Quantity selector */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="bg-gray-200 px-3 py-1 rounded text-lg font-bold"
              >
                −
              </button>
              <span className="text-xl">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 px-3 py-1 rounded text-lg font-bold"
              >
                +
              </button>
            </div>

            {/* Description toggle */}
            <button
              onClick={() => setDescOpen(!descOpen)}
              className="flex items-center text-blue-600 font-semibold mb-4 hover:underline focus:outline-none"
            >
              <span className="mr-2">Description</span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${descOpen ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {descOpen && (
              <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6 border-l-4 border-blue-600 pl-4">
                {product.description}
                <br />
                ডেলিভারি ম্যান থেকে প্রোডাক্ট দেখে নিতে পারবেন যদি প্রোডাক্ট পছন্দ না হয় তাহলে ডেলিভারি চার্জ দিয়ে রিটার্ন করে দিতে পারবেন
              </p>
            )}

            {/* Order Button */}
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white py-4 rounded hover:bg-blue-700 transition w-full text-lg font-semibold mb-2"
            >
              অর্ডার করুন
            </button>

            {/* Info with icons */}
            <div className="text-gray-700 text-sm space-y-3 mt-6">
              <p className="flex items-center gap-3 text-blue-700 font-semibold text-base">
                <FaCheckCircle className="w-6 h-6" />
                100% Original Product.
              </p>
              <p className="flex items-center gap-3 text-blue-700 font-semibold text-base">
                <FaCheckCircle className="w-6 h-6" />
                Express Shipping
              </p>
              <p className="flex items-center gap-3 text-blue-700 font-semibold text-base">
                <FaCheckCircle className="w-6 h-6" />
                Cash on Delivery Available
              </p>
              <p className="flex items-center gap-3 text-blue-700 font-semibold text-base">
                <FaCheckCircle className="w-6 h-6" />
                Easy return and exchange policy within 3 days
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-6 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800"
                aria-label="Facebook"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-600"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-pink-600 hover:text-pink-800"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:text-blue-900"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 max-w-[1520] mx-auto">
            <h3 className="text-2xl font-bold mb-6">RELATED PRODUCTS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((prod) => (
                <Link key={prod._id} to={`/product/${prod._id}`}>
                  <ProductCard product={prod} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
