import Cart from "../components/Cart/Cart";
import { Link } from "react-router-dom";

const CartPage = () => {

  return (

    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-2">
        Shopping Cart
      </h1>

      <p className="text-gray-600 mb-6">
        Review the products you’ve added to your cart.
        You can manage your items before proceeding
        to checkout.
      </p>

      <Cart />

      <div className="mt-6">

        <Link to="/checkout">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Proceed to Checkout
          </button>
        </Link>

      </div>

    </div>

  );
};

export default CartPage;
