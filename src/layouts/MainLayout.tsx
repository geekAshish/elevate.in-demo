import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/navbar/Navbar';
import Footer from '../components/common/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Outlet /> {/* This is where your routed pages will be rendered */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;