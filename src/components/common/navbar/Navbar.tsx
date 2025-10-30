import React, { useState, useEffect } from 'react';
import {
  HiOutlineMenuAlt2,
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineShoppingCart,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import SearchModal from './SearchModal';
import CartSidebar from '../CartSideBar';

/**
 * Mobile Menu Component
 * This is the flyout menu that appears from the left.
 */
const MobileMenu = ({ isOpen, toggleMenu }) => {
  const menuLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Faq', href: '/faq' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms and Conditions', href: '/terms' },
    { name: 'Return, Refund, and Cancellation', href: '/returns' },
  ];

  return (
    <>
      {/* 1. Backdrop Overlay (No change) */}
      <div
      className={`fixed inset-0 z-40 bg-opacity-60 backdrop-blur-xs transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
        aria-hidden="true"
      ></div>

      {/* 2. Menu Panel (CHANGED) */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${ // CHANGED: from left-0 to right-0
          isOpen ? 'translate-x-0' : 'translate-x-full' // CHANGED: from -translate-x-full to translate-x-full
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-header"
      >
        {/* Header (No change) */}
        <div
          id="menu-header"
          className="flex items-center justify-between h-16 px-4 border-b border-gray-200"
        >
          <span className="text-lg font-semibold uppercase tracking-wide text-gray-800">
            BACK
          </span>
          <button
            onClick={toggleMenu}
            className="p-2 -mr-2 text-gray-500 rounded-md hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close menu"
          >
            <HiOutlineChevronRight size={24} />
          </button>
        </div>

        {/* Navigation Links (No change) */}
        <nav className="p-4">
          <ul className="flex flex-col space-y-1">
            {menuLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block px-3 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

/**
 * Main Navbar Component
 * This is the header bar that is always visible.
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Toggles the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  // Best Practice: Prevent body scroll when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen || isSearchOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isSearchOpen, isCartOpen]);

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left Side: Menu Toggle + Logo */}
            <div className="flex items-center space-x-3">
              <a href="/" className="text-2xl font-bold text-gray-900">
                Elevates
              </a>
            </div>

            {/* Right Side: Icons + Links */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                aria-label="Search"
              >
                <HiOutlineSearch size={24} />
              </button>
              
              <a
                href="/login"
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
              >
                <HiOutlineUser size={24} />
                <span className="hidden sm:inline text-sm font-medium">
                  Login/Signup
                </span>
              </a>
              
              <button
                onClick={openCart}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
              >
                <HiOutlineShoppingCart size={24} />
                <span className="hidden sm:inline text-sm font-medium">
                  0 Items
                </span>
              </button>
              
            <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                aria-label="Open main menu"
                aria-expanded={isMenuOpen}
              >
                <HiOutlineMenuAlt2 size={24} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Component (Rendered conditionally) */}
      <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default Navbar;