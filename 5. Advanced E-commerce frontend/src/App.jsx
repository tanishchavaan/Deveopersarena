import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";

import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import './custom.css';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      {/* Top black official bar */}
      <div className="w-full bg-black text-white text-sm py-2 tracking-wide">
        <div className="max-w-7xl mx-auto flex justify-between px-6">
          <span>Free shipping on orders over $50</span>
          <span>New arrivals just dropped!</span>
        </div>
      </div>

      {/* Header */}
      <Header />

      {/* Routes */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
