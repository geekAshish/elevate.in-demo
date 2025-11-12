'use client'
import React, { useState } from 'react';

/**
 * LoginForm Component
 * Handles the mobile number input and OTP submission.
 */
const LoginForm = () => {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // --- Add your OTP sending logic here ---
    console.log('Sending OTP to:', mobileNumber);
    alert(`OTP sent to ${mobileNumber}! (In a real app, this would be handled by your backend)`);
    // You would typically call an API endpoint here
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-lg max-w-sm w-full">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2 font-poppins">
        Welcome To Elevates
      </h2>
      <p className="text-gray-600 text-center mb-6 font-roboto text-sm">
        Login with your mobile number to continue
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="mobileNumber" className="sr-only">
            Enter Your Mobile Number
          </label>
          <input
            type="tel" // Use type="tel" for mobile numbers
            id="mobileNumber"
            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none text-gray-800 text-lg placeholder-gray-400 font-roboto"
            placeholder="Enter Your Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            pattern="[0-9]{10}" // Basic pattern for 10 digits
            title="Please enter a 10-digit mobile number"
            maxLength={10} // Limit input to 10 digits
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 rounded-md hover:from-orange-600 hover:to-amber-600 transition-colors duration-200 shadow-md font-poppins"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

/**
 * LoginPage Component
 * Integrates the illustration and the login form.
 */
const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF9] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-repeat opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          backgroundSize: '80px', // Adjust pattern density
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden min-h-[450px]">
        
        {/* Left Section: Illustration */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center justify-center bg-[#F9F6F1] min-h-[250px] lg:min-h-[450px]">
          {/* Using an img tag for your illustration */}
          <img
            src="https://framerusercontent.com/images/k2u5m3qUj7S0J1N8p3R2Wn2fA.svg" // Replace with your actual SVG or image path
            alt="Person logging in with mobile, surrounded by abstract UI elements"
            className="w-full h-auto max-w-md object-contain"
            aria-hidden="true" // If decorative, hide from screen readers
          />
        </div>

        {/* Right Section: Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;