import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard/ProductCard";

export default function ProductList() {

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  let filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  if (sort === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (

    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">

        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-full sm:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full sm:w-52"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
        </select>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>

    </div>
  );
}
