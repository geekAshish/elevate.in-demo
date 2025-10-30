import React, { useState, useEffect } from 'react';
import { HiOutlineX, HiOutlineShoppingCart, HiOutlineTrash } from 'react-icons/hi';

// --- NEW: Mock Data for Demonstration ---
// In a real app, this data would come from your global cart state (like React Context)
const mockCartItems = [
  {
    id: 1,
    name: 'Stay Wild Stay Free Wolf Graphic T-Shirt',
    size: 'XL',
    price: 299.00,
    originalPrice: 599.00,
    quantity: 1,
    imageUrl: 'https://placehold.co/100x100/7c9a7d/white?text=Item', // Use the product's image
  },
  // You could add more items here to test scrolling
];

/**
 * --- NEW: Cart Item Sub-Component ---
 * This component renders a single item in the cart.
 */
const CartItem = ({ item }) => {
  // This state is local just for UI demo.
  // In a real app, this would be tied to your global cart state.
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1)); // Don't go below 1
  
  const handleRemove = () => {
    // In a real app, you'd call a function from your context
    // e.g., removeFromCart(item.id)
    alert(`Removing ${item.name}`);
  };

  return (
    <li className="flex py-4">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-sm font-medium text-gray-800">
            <h3>
              <a href="#">{item.name}</a>
            </h3>
            <button 
              type="button" 
              className="ml-4 text-gray-400 hover:text-gray-600"
              onClick={handleRemove}
              aria-label="Remove item"
            >
              <HiOutlineTrash size={20} />
            </button>
          </div>

          <div className='flex justify-between'>
            <div>
              <p className="mt-1 text-xs text-gray-500">Size: {item.size}</p>
              <div className="flex items-baseline space-x-1.5 mt-1">
                <span className="text-sm font-semibold text-gray-900">₹{item.price.toFixed(2)}</span>
                <span className="text-xs text-gray-500 line-through">₹{item.originalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-end justify-between text-sm">
          <div className="flex items-center border border-gray-200 rounded">
            <button
              onClick={handleDecrement}
              className="px-2.5 py-1 text-base font-semibold text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-3 py-1 text-sm border-l border-gray-200 border-r">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="px-2.5 py-1 text-base font-semibold text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
          </div>
        </div>
      </div>
    </li>
  );
};


/**
 * --- Main Cart Sidebar Component ---
 * Now uses mock data to show either the empty or populated state.
 */
const CartSidebar = ({ isOpen, onClose }) => {
  // --- Use mock data for now ---
  const cartItems = mockCartItems;
  
  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handle 'Escape' key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      {/* 1. Backdrop Overlay (No change) */}
      <div
        className={`fixed inset-0 z-40 bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* 2. Menu Panel (No change) */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-header"
      >
        {/* Header (No change) */}
        <div
          id="cart-header"
          className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 rounded-md hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close cart"
          >
            <HiOutlineX size={24} />
          </button>
        </div>

        {/* --- Cart Content (UPDATED) --- */}
        {/* Fills remaining height (header is 64px) */}
        <div className="flex flex-col h-[calc(100vh-64px)]"> 
          {cartItems.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
              <HiOutlineShoppingCart className="w-16 h-16 text-gray-300" />
              <p className="mt-4 text-sm font-medium text-gray-700">
                No products available
              </p>
              <a
                href="/shop"
                onClick={onClose}
                className="inline-block mt-4 px-6 py-2.5 bg-gray-800 text-white text-sm font-medium rounded-md shadow-sm hover:bg-gray-700"
              >
                Shop Now
              </a>
            </div>
          ) : (
            // --- Populated State (NEW) ---
            <>
              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </ul>
              </div>

              {/* Cart Footer */}
              <div className="border-t border-gray-200 px-4 sm:px-6 py-4">
                <div className="flex justify-between text-base font-semibold text-gray-900">
                  <p>Total:</p>
                  <p>₹{subtotal.toFixed(2)}</p>
                </div>
                <div className="mt-4">
                  <a
                    href="/checkout" // Link to your checkout page
                    className="w-full flex items-center justify-center px-6 py-3 bg-gray-800 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-700"
                  >
                    Checkout
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;