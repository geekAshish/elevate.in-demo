import React, { useState } from 'react'; // <-- Import useState

// Mock data (no change)
const products = [
  {
    id: 1,
    name: 'Legendary Dragon Graphic T-Shirt - Black',
    imageUrl: 'https://placehold.co/500x500/333333/white?text=Product+1', 
    salePrice: 299.00,
    originalPrice: 599.00,
    currency: '₹',
  },
  {
    id: 2,
    name: 'Vintage Typography Floral T-Shirt',
    imageUrl: 'https://placehold.co/500x500/8c3a52/white?text=Product+2',
    salePrice: 299.00,
    originalPrice: 599.00,
    currency: '₹',
  },
  {
    id: 3,
    name: 'Stay Wild Stay Free Wolf Graphic T-Shirt',
    imageUrl: 'https://placehold.co/500x500/7c9a7d/white?text=Product+3',
    salePrice: 299.00,
    originalPrice: 599.00,
    currency: '₹',
  },
  {
    id: 4,
    name: 'Unlimited Potential Typography T-Shirt',
    imageUrl: 'https://placehold.co/500x500/2b2b2b/white?text=Product+4',
    salePrice: 299.00,
    originalPrice: 599.00,
    currency: '₹',
  },
];

/**
 * Individual Product Card Component (UPDATED)
 */
const ProductCard = ({ product }) => {
  // --- NEW: State for quantity ---
  const [quantity, setQuantity] = useState(0);

  // --- NEW: Handlers for quantity changes ---
  const handleIncrement = (e) => {
    e.preventDefault(); // Prevent link navigation
    setQuantity(prevQty => Math.min(prevQty + 1, 5)); // Cap at 5
  };

  const handleDecrement = (e) => {
    e.preventDefault(); // Prevent link navigation
    setQuantity(prevQty => Math.max(prevQty - 1, 0)); // Floor at 0
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link navigation
    setQuantity(1); // Set initial quantity to 1
  };
  
  // --- NEW: Buy Now Handler (you can customize this) ---
  const handleBuyNow = (e) => {
    e.preventDefault();
    // Logic for "Buy Now"
    // This would typically redirect to checkout with this item
    console.log(`Buying product ${product.id} (Quantity: ${quantity > 0 ? quantity : 1})`);
    // alert(`Buying product ${product.id}`);
  };

  return (
    // Root element is no longer a link
    <div className="group block overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col">
      
      {/* Link now wraps only image and text */}
      <a href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2 truncate group-hover:text-gray-900">
            {product.name}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-base font-semibold text-gray-900">
              {product.currency}{product.salePrice.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {product.currency}{product.originalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </a>

      {/* --- NEW: Action Buttons Section --- */}
      <div className="flex gap-2 p-4 pt-0 mt-auto"> {/* mt-auto pushes this to the bottom */}
        {quantity === 0 ? (
          // "Add to Cart" button
          <button
            onClick={handleAddToCart}
            className="w-full bg-gray-800 text-white py-2 px-4 text-sm font-medium rounded hover:bg-gray-700 transition-colors"
          >
            Add to Cart
          </button>
        ) : (
          // Quantity Counter
          <div className="flex items-center justify-between space-x-2">
            <button 
              onClick={handleDecrement}
              className="px-4 py-1 border border-gray-300 rounded text-lg font-bold hover:bg-gray-100"
            >
              -
            </button>
            <span className="text-lg font-semibold w-10 text-center">{quantity}</span>
            <button 
              onClick={handleIncrement}
              disabled={quantity >= 5}
              className="px-4 py-1 border border-gray-300 rounded text-lg font-bold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        )}
        
        {/* "Buy Now" button */}
        <button
          onClick={handleBuyNow}
          className="w-full bg-orange-500 text-white py-2 px-4 text-sm font-medium rounded hover:bg-orange-600 transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

/**
 * Main "New Arrivals" Section Component (No change)
 */
const NewArrivals = () => {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            New Arrivals
          </h2>
          <div className="w-20 h-1 bg-orange-500 mt-2 rounded"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewArrivals;