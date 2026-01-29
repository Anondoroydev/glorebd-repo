import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <div className="text-center py-10 text-lg">আপনার কার্ট খালি।</div>;
  }
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">আপনার অর্ডার</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item._id} className="flex items-center justify-between bg-white p-4 shadow rounded">
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>পরিমাণ: {item.quantity}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-blue-600 font-bold">৳ {item.price * item.quantity}</p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:underline"
              >
                মুছুন
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">মোট: ৳ {total}</p>
        <button
          onClick={clearCart}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          কার্ট খালি করুন
        </button>
      </div>
    </div>
  );
};

export default Cart;
