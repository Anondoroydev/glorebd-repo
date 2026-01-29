import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { RiMenu2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logoT.webp";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Sticky navbar on scroll (throttled)
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    const throttled = () => requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", throttled);
    return () => window.removeEventListener("scroll", throttled);
  }, []);

  // Cart subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Category filtering
  const handleCategoryFilter = (subCategory) => {
    setMenuOpen(false);
    navigate(`/products?subcategory=${encodeURIComponent(subCategory)}`);
  };

  // Search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setMenuOpen(false);
      setShowSearchInput(false);
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        className={`z-50 w-full transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 bg-pink-100 shadow-md"
            : "relative bg-transparent"
        }`}
      >
        <div className="max-w-[1520px] mx-auto px-4">
          <div className="flex items-center justify-between text-black py-4 relative">
            {/* Left */}
            <div className="flex items-center gap-6">
              <div
                role="button"
                aria-label="Toggle Menu"
                onClick={() => setMenuOpen(true)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <RiMenu2Line className="text-2xl" />
                <span className="text-sm">Menu</span>
              </div>
              <div
                role="button"
                aria-label="Toggle Search"
                onClick={() => setShowSearchInput((prev) => !prev)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <FaSearch className="text-xl" />
                <span className="text-sm">Search</span>
              </div>
            </div>

            {/* Logo */}
            <Link to="/">
              <div className="w-[250px] h-[100px]">
                <img
                  src={logo}
                  alt="GloreBD Logo"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
            </Link>

            {/* Right */}
            <div className="flex items-center gap-6">
              <Link to="/productPage">
                <div className="flex items-center gap-1 cursor-pointer">
                  <GiShoppingBag className="text-2xl" />
                  <span className="text-sm">Shop</span>
                </div>
              </Link>
              <div
                role="button"
                aria-label="Open Cart"
                onClick={() => setCartOpen(true)}
                className="flex items-center gap-1 cursor-pointer relative"
              >
                <FaShoppingCart className="text-2xl" />
                <span className="text-sm">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Search Input */}
          {showSearchInput && (
            <form
              onSubmit={handleSearchSubmit}
              className="mt-4 w-full max-w-md mx-auto flex bg-white border rounded-md shadow-sm"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
              >
                <FaSearch />
              </button>
            </form>
          )}
        </div>
      </nav>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-96 bg-white shadow-md transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl hover:text-red-500"
            aria-label="Close menu"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="p-4">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="font-medium text-left w-full"
          >
            Women Clothing
          </button>
          {dropdownOpen && (
            <ul className="pl-6 mt-4 space-y-4 text-gray-700">
              <li
                className="cursor-pointer hover:underline"
                onClick={() => handleCategoryFilter("Jamdhani Sharee")}
              >
                Jamdhani Sharee
              </li>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => handleCategoryFilter("Three Pieces")}
              >
                Three Pieces
              </li>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => handleCategoryFilter("Unstitched Party Dress")}
              >
                Unstitched Party Dress
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Sidebar Cart */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-md flex flex-col transition-transform duration-300 z-50 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-2xl hover:text-red-500"
            aria-label="Close cart"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 space-y-4 overflow-y-auto flex-grow">
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4">
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-full max-w-[100px] h-28 object-cover rounded-md"
                />
                <div className="flex flex-col flex-grow text-left">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.quantity - 1))
                      }
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right font-bold text-blue-700 text-xl min-w-[80px]">
                  ৳ {item.price * item.quantity}
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="ml-2 text-red-600 hover:text-red-800"
                  aria-label="Remove item"
                >
                  <AiOutlineDelete size={24} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Subtotal & Actions */}
        <div className="p-4 border-t border-gray-300">
          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Subtotal:</span>
            <span>৳ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="flex-grow bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Clear All
            </button>
            <button
              onClick={() => {
                setCartOpen(false);
                navigate("/checkout");
              }}
              className="flex-grow bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {(menuOpen || cartOpen) && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={() => {
            setMenuOpen(false);
            setCartOpen(false);
            setShowSearchInput(false);
          }}
        ></div>
      )}
    </div>
  );
}

export default Navbar;
