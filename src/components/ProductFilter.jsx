// src/components/ProductFilter.jsx


const ProductFilter = ({
  subCategories = [],
  selectedSubCategory,
  setSelectedSubCategory,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6 px-4">
      {/* Sub-category Filter */}
      <div className="flex items-center gap-2">
        <label className="text-gray-700 font-medium">সাব-ক্যাটেগরি:</label>
        <select
          className="border px-3 py-1 rounded"
          value={selectedSubCategory}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
        >
          <option value="All">All Collections</option>
          {(subCategories || []).map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Order */}
      <div className="flex items-center gap-2">
        <label className="text-gray-700 font-medium">Sort:</label>
        <select
          className="border px-3 py-1 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">-- বাছাই করুন --</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
