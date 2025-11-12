"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  HiOutlineUser, 
  HiOutlineMail, 
  HiOutlineHome, 
  HiOutlineLocationMarker, 
  HiOutlineCreditCard,
  HiOutlineShoppingCart,
  HiOutlineChevronDown,
  HiOutlineLockClosed,
  HiOutlineCalendar,
  HiOutlineMenuAlt2,
  HiOutlinePlus
} from 'react-icons/hi';
import { AddNewAddressModal } from '@/modules/components/common/AddNewAddressModal';
import toast from 'react-hot-toast';

// --- Mock Data (Keep as is) ---
const mockCartItems = [
  {
    id: 1,
    name: 'Stay Wild Stay Free Wolf Graphic T-Shirt',
    size: 'XL',
    price: 299.00,
    quantity: 1,
    imageUrl: 'https://placehold.co/100x100/7c9a7d/white?text=Item',
  },
  {
    id: 2,
    name: 'Legendary Dragon T-Shirt',
    size: 'L',
    price: 299.00,
    quantity: 2,
    imageUrl: 'https://placehold.co/100x100/333333/white?text=Item',
  },
];


// --- COMPONENT MOVED OUTSIDE ---
/**
 * A single item in the order summary
 */
const OrderSummaryItem = ({ item }) => (
  <li className="flex py-4">
    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="h-full w-full object-cover object-center"
      />
    </div>
    <div className="ml-4 flex flex-1 flex-col">
      <div>
        <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
        <p className="mt-1 text-xs text-gray-500">Size: {item.size}</p>
        <p className="mt-1 text-xs text-gray-500">Qty: {item.quantity}</p>
      </div>
    </div>
    <span className="text-sm font-medium text-gray-900">
      ₹{(item.price * item.quantity).toFixed(2)}
    </span>
  </li>
);

// --- COMPONENT MOVED OUTSIDE ---
/**
 * Reusable component for form fields
 */
const FormField = ({ id, label, type, icon, ...props }) => (
  <div className="relative">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        {icon}
      </span>
      <input
        type={type}
        id={id}
        name={id}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        {...props}
      />
    </div>
  </div>
);

// --- COMPONENT MOVED OUTSIDE ---
/**
 * The content for the order summary (reused on mobile and desktop)
 */
const OrderSummaryContent = ({ items, subtotal, shippingCost, taxes, total }) => (
  <div className="bg-gray-50 rounded-lg p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
    
    <ul className="divide-y divide-gray-200">
      {items.map(item => (
        <OrderSummaryItem key={item.id} item={item} />
      ))}
    </ul>
    
    <div className="mt-6 space-y-2 border-t pt-4">
      <div className="flex justify-between text-sm text-gray-600">
        <p>Subtotal</p>
        <p className="font-medium">₹{subtotal.toFixed(2)}</p>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <p>Shipping</p>
        <p className="font-medium">₹{shippingCost.toFixed(2)}</p>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <p>Taxes (18%)</p>
        <p className="font-medium">₹{taxes.toFixed(2)}</p>
      </div>
      <div className="flex justify-between text-base font-semibold text-gray-900 border-t pt-2 mt-2">
        <p>Total</p>
        <p>₹{total.toFixed(2)}</p>
      </div>
    </div>
  </div>
);

const dummyAddresses = [
  {
    id: 1,
    name: 'Jane Doe',
    address: '123 Main St, Apt 4B',
    city: 'Anytown',
    state: 'CA',
    zip: '90210',
    type: 'Shipping',
  },
  {
    id: 2,
    name: 'Jane Doe',
    address: '456 Oak Ave',
    city: 'Otherville',
    state: 'NY',
    zip: '10001',
    type: 'Billing',
  },
];


/**
 * The main Checkout Page
 */
const CheckoutPage = () => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [sameAsShipping, setSameAsShipping] = useState(true);

  // --- 5. Add new state for modal and address selection ---
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(dummyAddresses[0]?.id || null);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const handleOpenAddressModal = () => setIsAddressModalOpen(true);
  const handleCloseAddressModal = () => setIsAddressModalOpen(false);
  
  const handleSaveAddress = (addressData) => {
    // In a real app, you'd save this and refetch addresses
    console.log("Saving new address:", addressData);
    toast.success("Address added successfully!");
    handleCloseAddressModal();
    // You would likely add the new address to your 'dummyAddresses' state
    // and automatically select it.
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // toast.loading('Processing your order...');
  };

  // --- Calculate Totals ---
  const subtotal = mockCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = shippingMethod === 'standard' ? 50.00 : 150.00;
  const taxes = subtotal * 0.18; // 18% tax
  const total = subtotal + shippingCost + taxes;

  const summaryProps = {
    items: mockCartItems,
    subtotal,
    shippingCost,
    taxes,
    total
  };

  return (
    <>
      <Head>
        <title>Checkout - Elevates</title>
      </Head>
      <div className="min-h-screen bg-white">
        
        {/* Simplified Header for Checkout */}
        <header className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3 text-2xl font-bold text-gray-900">
                <HiOutlineMenuAlt2 size={24} />
                <span>Elevates</span>
              </Link>
              <div className="text-sm text-gray-500">
                Secure Checkout
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">

            {/* --- 1. Mobile Order Summary (Accordion) --- */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                className="w-full flex justify-between items-center p-4 bg-gray-100 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <HiOutlineShoppingCart className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-800">
                    {isSummaryOpen ? 'Hide' : 'Show'} order summary
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">₹{total.toFixed(2)}</span>
                  <HiOutlineChevronDown className={`h-5 w-5 text-gray-600 transition-transform ${isSummaryOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {isSummaryOpen && (
                <div className="mt-4">
                  <OrderSummaryContent {...summaryProps} />
                </div>
              )}
            </div>

            {/* --- 2. Form (Left Column on Desktop) --- */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
              
              {/* Contact Information */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <FormField
                  id="email"
                  label="Email Address"
                  type="email"
                  icon={<HiOutlineMail className="h-5 w-5" />}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </section>

              {/* Shipping Address */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Map over saved addresses */}
                  {dummyAddresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddressId(address.id)}
                      className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedAddressId === address.id
                          ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                    >
                      {/* Radio button for visual selection */}
                      <input
                        type="radio"
                        name="shippingAddress"
                        checked={selectedAddressId === address.id}
                        readOnly
                        className="absolute top-4 right-4 h-4 w-4 text-orange-600 focus:ring-orange-500"
                      />
                      <p className="font-semibold text-gray-800">{address.name}</p>
                      <p className="text-sm text-gray-600">{address.address}</p>
                      <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zip}</p>
                    </div>
                  ))}

                  {/* Add New Address Button */}
                  <button
                    type="button"
                    onClick={handleOpenAddressModal}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <HiOutlinePlus className="h-5 w-5" />
                    <span>Add New Address</span>
                  </button>
                </div>
              </section>
              
              {/* Shipping Method */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Method</h2>
                <div className="space-y-3">
                  <div className={`relative border rounded-md p-4 flex justify-between cursor-pointer ${shippingMethod === 'standard' ? 'bg-orange-50 border-orange-500' : 'border-gray-300'}`} onClick={() => setShippingMethod('standard')}>
                    <label htmlFor="standard" className="flex flex-col cursor-pointer">
                      <span className="font-medium text-gray-900">Standard Shipping</span>
                      <span className="text-sm text-gray-600">4-7 business days</span>
                    </label>
                    <span className="font-medium text-gray-900">₹50.00</span>
                    <input type="radio" id="standard" name="shippingMethod" value="standard" checked={shippingMethod === 'standard'} className="absolute right-4 top-1/2 -translate-y-1/2 focus:ring-orange-500 text-orange-600" />
                  </div>
                  <div className={`relative border rounded-md p-4 flex justify-between cursor-pointer ${shippingMethod === 'express' ? 'bg-orange-50 border-orange-500' : 'border-gray-300'}`} onClick={() => setShippingMethod('express')}>
                    <label htmlFor="express" className="flex flex-col cursor-pointer">
                      <span className="font-medium text-gray-900">Express Shipping</span>
                      <span className="text-sm text-gray-600">1-2 business days</span>
                    </label>
                    <span className="font-medium text-gray-900">₹150.00</span>
                    <input type="radio" id="express" name="shippingMethod" value="express" checked={shippingMethod === 'express'} className="absolute right-4 top-1/2 -translate-y-1/2 focus:ring-orange-500 text-orange-600" />
                  </div>
                </div>
              </section>

              {/* Payment Details */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Details</h2>
                <div className="space-y-4">
                  <FormField id="cardName" label="Name on Card" type="text" icon={<HiOutlineUser className="h-5 w-5" />} placeholder="Jane M. Doe" value={formData.cardName} onChange={handleInputChange} required />
                  <FormField id="cardNumber" label="Card Number" type="text" icon={<HiOutlineCreditCard className="h-5 w-5" />} placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleInputChange} required />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField id="cardExpiry" label="Expiration Date (MM/YY)" type="text" icon={<HiOutlineCalendar className="h-5 w-5" />} placeholder="MM / YY" value={formData.cardExpiry} onChange={handleInputChange} required />
                    <FormField id="cardCVC" label="CVC" type="text" icon={<HiOutlineLockClosed className="h-5 w-5" />} placeholder="123" value={formData.cardCVC} onChange={handleInputChange} required />
                  </div>
                </div>
              </section>
              
              {/* Billing Address Checkbox */}
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="sameAsShipping"
                    name="sameAsShipping"
                    type="checkbox"
                    checked={sameAsShipping}
                    onChange={() => setSameAsShipping(!sameAsShipping)}
                    className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="sameAsShipping" className="font-medium text-gray-700">
                    Billing address is the same as my shipping address
                  </label>
                </div>
              </div>
              
              {/* Conditional Billing Address Form */}
              {!sameAsShipping && (
                <section className="p-4 border border-gray-200 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
                  {/* Add billing address form fields here, similar to shipping */}
                  <p className="text-sm text-gray-600">Please enter your billing address.</p>
                </section>
              )}

              {/* Submit Button */}
              <div className="border-t pt-6">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-3 bg-orange-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-orange-600 transition-colors"
                >
                  Pay ₹{total.toFixed(2)}
                </button>
              </div>
            </form>

            {/* --- 3. Desktop Order Summary (Right Column) --- */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="sticky top-24">
                <OrderSummaryContent {...summaryProps} />
              </div>
            </div>
          </div>
        </main>
      </div>

      <AddNewAddressModal 
        isOpen={isAddressModalOpen}
        onClose={handleCloseAddressModal}
        onSubmit={handleSaveAddress}
      />
    </>
  );
};

export default CheckoutPage;