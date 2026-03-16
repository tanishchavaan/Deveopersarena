import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center px-6 py-16">
      {/* Hero Section */}
      <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">
        Welcome to E-Commerce Hub
      </h1>

      <p className="max-w-3xl text-lg text-gray-700 mb-4 text-center leading-relaxed">
        Discover a wide range of products curated just for you. From electronics to fashion, 
        we bring everything under one roof with amazing deals and fast delivery.
      </p>

      <p className="max-w-3xl text-lg text-gray-700 mb-4 text-center leading-relaxed">
        Add your favorite items to the cart, manage them easily, and proceed to checkout
        seamlessly. Enjoy a smooth shopping experience on any device.
      </p>

      <p className="max-w-3xl text-lg text-gray-700 mb-8 text-center leading-relaxed">
        Our platform is designed to keep you updated with new arrivals, trending products,
        and exclusive offers. Start shopping now and make the most out of your online experience.
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow transition-all"
        >
          View Products
        </button>
        <button
          onClick={() => navigate('/cart')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow transition-all"
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default Home;
