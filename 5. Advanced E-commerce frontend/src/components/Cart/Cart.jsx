import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../../store/cartSlice";

const Cart = () => {

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  if (cartItems.length === 0) {
    return <p className="text-gray-500">Your cart is empty.</p>;
  }

  return (

    <div>

      {cartItems.map((item) => (

        <div
          key={item.id}
          className="flex justify-between items-center border-b py-4"
        >

          <div>
            <h3 className="font-bold">{item.name}</h3>
            <p>${item.price}</p>
          </div>

          <div className="flex items-center gap-3">

            <button
              className="bg-gray-300 px-2"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              className="bg-gray-300 px-2"
              onClick={() => dispatch(addToCart(item))}
            >
              +
            </button>

          </div>

          <p className="font-semibold">
            ${item.price * item.quantity}
          </p>

        </div>

      ))}

      <div className="mt-6 text-xl font-bold">
        Total: ${calculateTotal()}
      </div>

    </div>

  );
};

export default Cart;
