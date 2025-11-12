import Link from "next/link";
import { useState } from "react";

export const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = (e) => { e.preventDefault(); setQuantity(prevQty => Math.min(prevQty + 1, 5)); };
  const handleDecrement = (e) => { e.preventDefault(); setQuantity(prevQty => Math.max(prevQty - 1, 0)); };
  const handleAddToCart = (e) => { e.preventDefault(); setQuantity(1); };
  const handleBuyNow = (e) => { e.preventDefault(); console.log(`Buying product ${product.id}`); };

  return (
    <div className="group overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <Link href={`/product-details/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover object-center" />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2 truncate group-hover:text-gray-900">{product.name}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-base font-semibold text-gray-900">{product.currency}{product.salePrice.toFixed(2)}</span>
            <span className="text-sm text-gray-500 line-through">{product.currency}{product.originalPrice.toFixed(2)}</span>
          </div>
        </div>
      </Link>
      <div className="flex gap-3 p-4 pt-0 mt-auto">
        {quantity === 0 ? (
          <button onClick={handleAddToCart} className="w-full bg-gray-800 text-white py-2 px-4 text-sm font-medium rounded hover:bg-gray-700 transition-colors">Add to Cart</button>
        ) : (
          <div className="flex items-center justify-between space-x-2">
            <button onClick={handleDecrement} className="px-4 py-1.5 border border-gray-300 rounded text-lg font-bold hover:bg-gray-100">-</button>
            <span className="text-lg font-semibold w-10 text-center">{quantity}</span>
            <button onClick={handleIncrement} disabled={quantity >= 5} className="px-4 py-1.5 border border-gray-300 rounded text-lg font-bold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">+</button>
          </div>
        )}
        <button onClick={handleBuyNow} className="w-full bg-orange-500 text-white py-2 px-4 text-sm font-medium rounded hover:bg-orange-600 transition-colors">Buy Now</button>
      </div>
    </div>
  );
};