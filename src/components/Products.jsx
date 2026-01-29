import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://glore-bd-backend-node-mongo.vercel.app/api/product')
      .then(res => res.json())
      .then(data => {
        if (data?.data && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error('Unexpected API structure:', data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-lg">লোড হচ্ছে...</div>;
  }

  return (
    <div className='max-w-[1520px] mx-auto'>
       <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">আমাদের পণ্যসমূহ</h2>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
