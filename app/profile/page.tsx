"use client"

import { AddNewAddressModal } from '@/modules/components/common/AddNewAddressModal';
import { useState } from 'react';
import { 
  HiOutlineUserCircle, 
  HiOutlineClipboardList, 
  HiOutlineLocationMarker, 
  HiOutlineCog, 
  HiOutlineHeart, 
  HiOutlineLogout,
  HiOutlineCreditCard
} from 'react-icons/hi';
import toast from 'react-hot-toast';

// --- Mock Data ---
const dummyUser = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  memberSince: 'January 2023',
};

const dummyOrders = [
  {
    id: 'ORD001',
    date: '2024-03-15',
    status: 'Delivered',
    total: 599.00,
    items: [
      { name: 'Wolf Graphic T-Shirt', quantity: 1, price: 229.00, imageUrl: 'https://placehold.co/50x50/7c9a7d/white?text=T' },
      { name: 'Denim Jeans', quantity: 1, price: 370.00, imageUrl: 'https://placehold.co/50x50/333333/white?text=J' },
    ],
  },
  {
    id: 'ORD002',
    date: '2024-02-28',
    status: 'Processing',
    total: 299.00,
    items: [
      { name: 'Oversized Hoodie', quantity: 1, price: 299.00, imageUrl: 'https://placehold.co/50x50/555555/white?text=H' },
    ],
  },
];

const dummyAddresses = [
  {
    id: 1,
    name: 'Jane Doe',
    address: '123 Main St, Apt 4B',
    city: 'Anytown',
    state: 'CA',
    zip: '90210',
    country: 'USA',
    type: 'Shipping',
  },
  {
    id: 2,
    name: 'Jane Doe',
    address: '456 Oak Ave',
    city: 'Otherville',
    state: 'NY',
    zip: '10001',
    country: 'USA',
    type: 'Billing',
  },
];

const dummyPaymentMethods = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', icon: 'https://cdn.jsdelivr.net/npm/payment-icons@latest/svg/visa.svg' },
  { id: 2, type: 'Mastercard', last4: '5555', expiry: '08/25', icon: 'https://cdn.jsdelivr.net/npm/payment-icons@latest/svg/mastercard.svg' },
];


// --- Sub-components for each section ---

const DashboardSection = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Welcome back, {dummyUser.name}!</h3>
    <p className="text-gray-600 mb-4">From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="font-medium text-gray-800">Total Orders</h4>
        <p className="text-2xl font-bold text-blue-600">{dummyOrders.length}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-md">
        <h4 className="font-medium text-gray-800">Pending Orders</h4>
        <p className="text-2xl font-bold text-green-600">{dummyOrders.filter(o => o.status === 'Processing').length}</p>
      </div>
      <div className="bg-yellow-50 p-4 rounded-md">
        <h4 className="font-medium text-gray-800">Wishlist Items</h4>
        <p className="text-2xl font-bold text-yellow-600">5</p> {/* Placeholder */}
      </div>
    </div>
  </div>
);

const OrdersSection = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">My Orders</h3>
    {dummyOrders.length === 0 ? (
      <p className="text-gray-600">You have not placed any orders yet.</p>
    ) : (
      <div className="space-y-6">
        {dummyOrders.map(order => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-3">
              <div>
                <p className="text-sm text-gray-500">Order ID: <span className="font-medium text-gray-800">{order.id}</span></p>
                <p className="text-sm text-gray-500">Date: <span className="font-medium text-gray-800">{order.date}</span></p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex items-center space-x-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded" />
                    <p className="text-sm text-gray-700">{item.name} (x{item.quantity})</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 sm:mt-0 text-right">
                <p className="text-lg font-bold text-gray-900">Total: ₹{order.total.toFixed(2)}</p>
                <button className="mt-2 text-sm text-orange-600 hover:text-orange-800">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const AddressesSection = ({ onOpenModal }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">My Addresses</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {dummyAddresses.map(address => (
        <div key={address.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col">
          <p className="text-lg font-semibold text-gray-800 mb-2">{address.type} Address</p>
          <p className="text-gray-700">{address.name}</p>
          <p className="text-gray-700">{address.address}</p>
          <p className="text-gray-700">{address.city}, {address.state} {address.zip}</p>
          <p className="text-gray-700">{address.country}</p>
          <div className="mt-4 flex space-x-3">
            <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
            <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
          </div>
        </div>
      ))}
      <button onClick={onOpenModal} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors flex items-center justify-center">
        <HiOutlineLocationMarker className="h-5 w-5 mr-2" /> Add New Address
      </button>
    </div>
  </div>
);

const PaymentMethodsSection = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Methods</h3>
    {dummyPaymentMethods.length === 0 ? (
      <p className="text-gray-600">No payment methods added yet.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dummyPaymentMethods.map(method => (
          <div key={method.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center space-x-3">
              {method.icon && <img src={method.icon} alt={method.type} className="h-6 w-auto" />}
              <div>
                <p className="font-medium text-gray-800">{method.type} ending in {method.last4}</p>
                <p className="text-sm text-gray-600">Expires {method.expiry}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
              <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
            </div>
          </div>
        ))}
      </div>
    )}
    <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
      Add New Card
    </button>
  </div>
);

const AccountSettingsSection = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h3>
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" defaultValue={dummyUser.name} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" defaultValue={dummyUser.email} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
        <input type="password" id="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500" />
      </div>
      <button type="submit" className="px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">Save Changes</button>
    </form>
  </div>
);

const WishlistSection = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">My Wishlist</h3>
    <p className="text-gray-600">Your wishlist is empty. Start adding some products!</p>
    {/* You'd typically display actual product cards here */}
  </div>
);


const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('dashboard'); // Default active section

  // --- 5. Add state for the new modal ---
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // --- 6. Add handlers for the modal ---
  const handleOpenAddressModal = () => setIsAddressModalOpen(true);
  const handleCloseAddressModal = () => setIsAddressModalOpen(false);

  const handleSaveAddress = (addressData) => {
    // In a real app, you'd send this to your API and refetch addresses
    console.log("Saving new address:", addressData);
    toast.success("Address added successfully!");
    handleCloseAddressModal();
    // You would likely trigger a refetch of addresses here
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'orders':
        return <OrdersSection />;
      case 'addresses':
        return <AddressesSection onOpenModal={handleOpenAddressModal} />;
      case 'payment-methods':
        return <PaymentMethodsSection />;
      case 'settings':
        return <AccountSettingsSection />;
      case 'wishlist':
        return <WishlistSection />;
      default:
        return <DashboardSection />;
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: HiOutlineUserCircle, section: 'dashboard' },
    { name: 'My Orders', icon: HiOutlineClipboardList, section: 'orders' },
    { name: 'Addresses', icon: HiOutlineLocationMarker, section: 'addresses' },
    { name: 'Payment Methods', icon: HiOutlineCreditCard, section: 'payment-methods' },
    { name: 'Wishlist', icon: HiOutlineHeart, section: 'wishlist' },
    { name: 'Account Settings', icon: HiOutlineCog, section: 'settings' },
    { name: 'Logout', icon: HiOutlineLogout, section: 'logout' }, // Special case for logout
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 bg-white rounded-lg shadow-sm p-4 lg:p-6 flex-shrink-0">
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200">
              <img
                src="https://placehold.co/40x40/FF7E00/white?text=JD" // Placeholder for user avatar
                alt={dummyUser.name}
                className="w-10 h-10 rounded-full object-cover border border-orange-300"
              />
              <div>
                <p className="font-semibold text-gray-800">{dummyUser.name}</p>
                <p className="text-sm text-gray-500">Member since {dummyUser.memberSince}</p>
              </div>
            </div>

            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.section}>
                    <button
                      onClick={() => {
                        if (item.section === 'logout') {
                          alert('Logging out...'); // Replace with actual logout logic
                        } else {
                          setActiveSection(item.section);
                        }
                      }}
                      className={`flex items-center w-full px-4 py-2 rounded-md text-left transition-colors duration-150 ${
                        activeSection === item.section && item.section !== 'logout'
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      } ${item.section === 'logout' ? 'text-red-600 hover:bg-red-50 hover:text-red-800' : ''}`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {renderSection()}
          </main>
        </div>
      </div>
      <AddNewAddressModal 
        isOpen={isAddressModalOpen}
        onClose={handleCloseAddressModal}
        onSubmit={handleSaveAddress}
      />
    </div>
  );
};

export default ProfilePage;