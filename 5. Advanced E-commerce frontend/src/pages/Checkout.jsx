import { useState } from "react";

const Checkout = () => {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!name || !address) {
      alert("Please fill all fields");
      return;
    }

    alert("Order placed successfully 🎉");
  };

  return (

    <div className="p-10 max-w-lg mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full mb-4"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Address"
          className="border p-2 w-full mb-4"
          onChange={(e)=>setAddress(e.target.value)}
        />

        <button
          className="bg-green-600 text-white px-4 py-2 w-full"
        >
          Place Order
        </button>

      </form>

    </div>

  );
};

export default Checkout;
