"use client"

import React, { useState, useEffect } from 'react';
import { 
  HiOutlineMenuAlt2, 
  HiOutlineMail, 
  HiOutlineArrowUp 
} from 'react-icons/hi';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Icon for 'X'
import Link from 'next/link';

/**
 * Back to Top Button Component
 */
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top on click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 p-3 bg-orange-500 text-white rounded-md shadow-lg transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <HiOutlineArrowUp size={20} />
    </button>
  );
};

/**
 * Main Footer Component
 */
const Footer = () => {
  const shoppingLinks = [
    { name: 'Faq', href: '/faq' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms and Conditions', href: '/terms' },
    { name: 'Return, Refund, and Cancellation', href: '/returns' },
  ];

  const categoryLinks = [
    { name: 'Latest T-Shirt', href: '/category/t-shirts' },
    { name: 'Branded Jeans', href: '/category/jeans' },
    { name: 'New Shirt', href: '/category/shirts' },
    { name: 'Colorful Hoodies', href: '/category/hoodies' },
    { name: 'Best Perfume', href: '/category/perfume' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, href: 'https://facebook.com' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
    { name: 'X', icon: FaXTwitter, href: 'https://x.com' },
  ];

  return (
    <>
      <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top section: 4-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Column 1: About */}
            <div className="space-y-6">
              <Link href="/" className="flex items-center text-2xl font-bold text-white">
                <HiOutlineMenuAlt2 size={24} className="mr-2" />
                Elevates
              </Link>
              <p className="text-sm leading-relaxed">
                At Elevates, we blend fashion with comfort, offering trendy and affordable clothing for every style. Whether you are dressing up or keeping it casual, our collection is designed to make you feel confident, stylish, and uniquely you.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-full text-gray-400 hover:text-white hover:bg-white hover:text-gray-900 transition-colors"
                    aria-label={link.name}
                  >
                    <link.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Shopping */}
            <div className="md:mt-2">
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-5">
                Shopping
              </h3>
              <ul className="space-y-3">
                {shoppingLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: New Categories */}
            <div className="md:mt-2">
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-5">
                New Categories
              </h3>
              <ul className="space-y-3">
                {categoryLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="md:mt-2">
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-5">
                Newsletter
              </h3>
              <p className="text-sm mb-4">
                Be the first to know about new arrivals, look books, sales & promos!
              </p>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-transparent border-0 border-b border-gray-600 text-white placeholder-gray-500 py-2 focus:outline-none focus:ring-0 focus:border-white transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    aria-label="Subscribe to newsletter"
                  >
                    <HiOutlineMail size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom section: Copyright */}
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-sm text-center">
              Copyright © 2025 all rights reserved | Copyright By Elevates
            </p>
          </div>
        </div>
      </footer>
      
      {/* Back to Top Button */}
      <BackToTopButton />
    </>
  );
};

export default Footer;