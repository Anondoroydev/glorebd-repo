import { Route, Routes, useLocation } from "react-router-dom";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer"; // Footer import করো
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import ProductPage from "./components/ProductPage";
import { CartProvider } from "./context/CartContext";

function App() {
  const location = useLocation();
  const hideNavbarAndBanner = location.pathname.startsWith("/product/");

  return (
    <CartProvider>
      {!hideNavbarAndBanner && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productPage" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      {!hideNavbarAndBanner && <Footer />} {/* Footer শর্তসাপেক্ষে দেখাও */}
    </CartProvider>
  );
}

export default App;
