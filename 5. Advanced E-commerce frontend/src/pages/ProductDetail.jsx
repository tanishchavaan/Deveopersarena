import { useParams } from "react-router-dom";
import products from "../data/products";

export default function ProductDetail() {

  const { id } = useParams();

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      <img
        src={product.image}
        alt={product.name}
        className="w-64 mb-4"
      />

      <p className="text-lg mb-2">${product.price}</p>

      <p className="text-gray-600">
        This is a high quality product available in our store.
      </p>

    </div>
  );
}
