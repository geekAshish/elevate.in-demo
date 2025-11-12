import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import toast from 'react-hot-toast';

/**
 * A reusable form input field
 */
const FormField = ({ id, label, placeholder, type = 'text', value, onChange, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      {...props}
    />
  </div>
);

export const AddNewAddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    flat: '',
    area: '',
    pincode: '',
    city: '',
    state: '',
  });

  const initialFocusRef = useRef(null);

  // Auto-focus the first input when the modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        initialFocusRef.current?.focus();
      }, 100);
    } else {
      // Reset form on close
      setFormData({
        fullName: '', mobile: '', flat: '',
        area: '', pincode: '', city: '', state: '',
      });
    }
  }, [isOpen]);

  // Handle 'Escape' key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.fullName || !formData.mobile || !formData.flat || !formData.pincode || !formData.city || !formData.state) {
      toast.error('Please fill out all required fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <>
      {/* 1. Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* 2. Modal Panel */}
      <div
        className={`fixed inset-0 z-50 flex justify-center items-center p-4 ${
          isOpen ? '' : 'pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="address-modal-title"
      >
        <div
          className={`relative w-full max-w-lg bg-white rounded-lg shadow-2xl transform transition-all duration-300 ${
            isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 id="address-modal-title" className="text-lg font-semibold text-gray-900">
              Add New Address
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close modal"
            >
              <HiOutlineX size={24} />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <FormField
                id="fullName"
                label="Full Name"
                placeholder="Who's receiving this order?"
                value={formData.fullName}
                onChange={handleChange}
                ref={initialFocusRef} // Auto-focus this field
                required
              />
              <FormField
                id="mobile"
                label="Mobile Number"
                type="tel"
                placeholder="10-digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
                required
                maxLength={10}
              />
              <FormField
                id="flat"
                label="Flat No, Building, Street"
                placeholder="Ex: 401, Sunshine Apartments, MG Road"
                value={formData.flat}
                onChange={handleChange}
                required
              />
              <FormField
                id="area"
                label="Area, Locality, Landmark"
                placeholder="Nearby landmarks make it easier to find"
                value={formData.area}
                onChange={handleChange}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <FormField
                    id="pincode"
                    label="Pincode"
                    placeholder="6-digit postal code"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    maxLength={6}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FormField
                    id="city"
                    label="City"
                    placeholder="Enter your city name"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <FormField
                id="state"
                label="State"
                placeholder="Enter your state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Footer / Actions */}
            <div className="flex items-center justify-end gap-3 p-4 bg-gray-50 rounded-b-lg border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-medium text-white bg-orange-500 rounded-md shadow-sm hover:bg-orange-600"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};