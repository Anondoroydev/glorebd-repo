import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems, updateQuantity } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (productId, newQty) => {
    if (newQty < 1) return;
    updateQuantity(productId, newQty);
  };

  return (
    <div className="max-w-[1520px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left: Cart Items */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Your Order</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="space-y-0">
            {cartItems.map((item, idx) => (
              <li
                key={item._id}
                className={`flex items-center justify-between py-3 ${idx !== cartItems.length - 1 ? "border-b border-gray-300" : ""
                  }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="w-32 h-32 object-cover object-top"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-lg font-semibold">
                      <div>৳ {item.price}</div>
                      <div className="select-none">×</div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        >
                          -
                        </button>
                        <span className="min-w-[24px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="font-bold text-blue-700 text-xl">
                  ৳ {item.price * item.quantity}
                </div>
              </li>
            ))}
            <div className="text-right font-semibold text-2xl mt-6 border-t pt-4">
              = ৳ {subtotal.toFixed(2)}
            </div>
          </ul>
        )}
      </div>

      {/* Right: Delivery Information Form */}
      <div className="bg-white p-6 rounded shadow space-y-6">
        <h2 className="text-2xl font-bold mb-2">DELIVERY INFORMATION</h2>
        <p className="text-gray-700 mb-4">
          অর্ডার কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার লিখে অর্ডার কনফার্ম করুন।
        </p>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="name">
              আপনার নাম<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Full Name"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="phone">
              আপনার ফোন নাম্বার<span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter Contact Number"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="address">
              আপনার ডেলিভারি ঠিকানা দিন<span className="text-red-600">*</span>
            </label>
            <textarea
              id="address"
              rows="3"
              placeholder="Enter Delivery Address"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="area">
              ডেলিভারি এলাকা<span className="text-red-600">*</span>
            </label>
            <select
              id="area"
              className="w-full border border-gray-300 rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Delivery Area</option>
              <option value="dhaka">ঢাকা</option>
              <option value="chittagong">চট্টগ্রাম</option>
              <option value="rajshahi">রাজশাহী</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="note">
              গ্রাহক নোট <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              id="note"
              rows="2"
              placeholder="Enter Your Note"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="font-semibold mb-2">Payment Method</p>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                defaultChecked
                className="form-radio"
              />
              Cash on Delivery
            </label>
          </div>

          <div className="border-t pt-4 space-y-2">
            <h3 className="text-xl font-bold">CART TOTALS</h3>
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>৳ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Delivery Charge</span>
              <span>৳ 0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>৳ {subtotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold"
          >
            অর্ডারটি নিশ্চিত করুন
          </button>
        </form>
      </div>

    </div>
  );
}

export default Checkout;
