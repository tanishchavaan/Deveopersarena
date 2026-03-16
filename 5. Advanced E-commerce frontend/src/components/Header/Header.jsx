import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();

  return (
    <header className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo or Site Name */}
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
          E-Commerce
        </h1>

        {/* Menu buttons */}
        <div className="flex gap-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
            onClick={() => navigate('/products')}
          >
            Products
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
            onClick={() => navigate('/cart')}
          >
            Cart ({cartItems.length})
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
