// src/pages/ProductPage.jsx

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  const minPriceAllowed = 0;
  const maxPriceAllowed = 10000;

  const [priceFilter, setPriceFilter] = useState({
    min: minPriceAllowed,
    max: maxPriceAllowed,
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    axios
      .get("https://glore-bd-backend-node-mongo.vercel.app/api/product")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.products || res.data.data || [];
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (selectedSubCategories.length > 0) {
      updated = updated.filter((p) =>
        selectedSubCategories.includes(p.subCategory)
      );
    }

    updated = updated.filter(
      (p) => p.price >= priceFilter.min && p.price <= priceFilter.max
    );

    if (searchQuery) {
      updated = updated.filter((p) =>
        p.name?.toLowerCase().includes(searchQuery)
      );
    }

    if (sortOrder === "lowToHigh") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
  }, [products, selectedSubCategories, priceFilter, sortOrder, searchQuery]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), priceFilter.max);
    setPriceFilter((prev) => ({ ...prev, min: value }));
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), priceFilter.min);
    setPriceFilter((prev) => ({ ...prev, max: value }));
  };

  const subCategories = [
    "Women Clothing",
    "Sharee",
    "Jamdhani Sharee",
    "Dress",
    "Three Prics",
    "unstitched party dress",
  ];

  const toggleSubCategory = (subCat) => {
    if (selectedSubCategories.includes(subCat)) {
      setSelectedSubCategories(
        selectedSubCategories.filter((cat) => cat !== subCat)
      );
    } else {
      setSelectedSubCategories([...selectedSubCategories, subCat]);
    }
  };

  const minPercent =
    ((priceFilter.min - minPriceAllowed) / (maxPriceAllowed - minPriceAllowed)) *
    100;
  const maxPercent =
    ((priceFilter.max - minPriceAllowed) / (maxPriceAllowed - minPriceAllowed)) *
    100;

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="w-full md:w-[300px] max-h-[48vh] overflow-y-auto bg-pink-200 p-4 rounded shadow space-y-6 flex-shrink-0">
        {/* Subcategory Filter */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Filter by Sub-Category</h2>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSubCategories.length === 0}
                onChange={() => setSelectedSubCategories([])}
                className="mt-1"
              />
              <span className="ml-2 break-words text-sm max-w-[160px]">
                All Products
              </span>
            </label>

            {subCategories.map((subCat) => (
              <label
                key={subCat}
                className="inline-flex items-start cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedSubCategories.includes(subCat)}
                  onChange={() => toggleSubCategory(subCat)}
                  className="mt-1"
                />
                <span className="ml-2 break-words text-sm max-w-[160px]">
                  {subCat}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Filter by Price</h2>

          <div className="relative h-6 mb-4">
            <div
              className="absolute top-3 h-1 bg-blue-500 rounded"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
            ></div>

            <input
              type="range"
              min={minPriceAllowed}
              max={maxPriceAllowed}
              value={priceFilter.min}
              onChange={handleMinChange}
              className="absolute w-full h-6 appearance-none bg-transparent z-10"
            />
            <input
              type="range"
              min={minPriceAllowed}
              max={maxPriceAllowed}
              value={priceFilter.max}
              onChange={handleMaxChange}
              className="absolute w-full h-6 appearance-none bg-transparent z-20"
            />
          </div>

          <div className="flex justify-between text-gray-800 font-medium text-sm">
            <div className="flex items-center space-x-2">
              <span>Min</span>
              <span className="font-semibold text-blue-800">৳{priceFilter.min}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Max</span>
              <span className="font-semibold text-blue-800">৳{priceFilter.max}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex justify-end mb-4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-3 py-1 rounded text-sm"
          >
            <option value="">Sort by Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              কোনো পণ্য খুঁজে পাওয়া যায়নি।
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
