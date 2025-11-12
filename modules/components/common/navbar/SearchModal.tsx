import React, { useEffect, useRef } from 'react';
import { HiOutlineX, HiOutlineSearch } from 'react-icons/hi';

// List of popular searches from your image
const popularSearches = [
  'T-Shirts for Men',
  'Casual T-Shirts for Men',
  'T-Shirts for Office',
  'Oversized T-Shirts Men',
  'Gym T-Shirts for Men',
  'Shirts for Men',
  'Casual Shirts for Men',
  'Formal Shirts for Men',
  'Jeans for Men',
  'Regular Fit Jeans for Men',
  'Denim Jeans for Men',
  'Pants for Men',
  'Stylish Pants for Men',
  'Formal Pants for Men',
];

const SearchModal = ({ isOpen, onClose }) => {
  const searchInputRef = useRef(null);

  // Auto-focus the search input when the modal opens
  useEffect(() => {
    if (isOpen) {
      // Use a short timeout to ensure the element is focusable after the transition
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100); // 100ms matches the animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle 'Escape' key press to close the modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      {/* 1. Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-40  bg-opacity-60 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* 2. Modal Panel */}
      <div
        className={`fixed inset-0 z-50 flex justify-center items-start p-4 pt-10 sm:pt-20 ${
          isOpen ? '' : 'pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
      >
        <div
          className={`relative w-full max-w-2xl bg-white rounded-lg shadow-2xl transform transition-all duration-300 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close search"
          >
            <HiOutlineX size={24} />
          </button>

          {/* Modal Content */}
          <div className="p-6 sm:p-8">
            <h2
              id="search-modal-title"
              className="text-2xl font-bold text-gray-900"
            >
              What Are You Trying To Find?
            </h2>

            {/* Search Form */}
            <form className="relative mt-6" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="search-input" className="sr-only">
                I'm looking for...
              </label>
              <input
                ref={searchInputRef}
                type="search"
                id="search-input"
                placeholder="I'm looking for..."
                className="w-full pl-5 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 rounded-md hover:bg-gray-100"
                aria-label="Submit search"
              >
                <HiOutlineSearch size={20} />
              </button>
            </form>

            {/* Popular Searches */}
            <div className="mt-8">
              <h3 className="text-base font-semibold text-gray-800">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {popularSearches.map((search) => (
                  <a
                    key={search}
                    href={`/search?q=${encodeURIComponent(search)}`}
                    className="flex items-center space-x-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400 transition-colors"
                  >
                    <HiOutlineSearch size={16} className="text-gray-400" />
                    <span>{search}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;