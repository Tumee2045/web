import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import About from './pages/About';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Placeorder from './pages/Placeorder';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/404'; // Import your 404 Page
import Verify from './pages/Verify';
import Other from './pages/Other';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (you can change 800ms or tie this to real data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#000000] text-white">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#000000] text-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/about" element={<About />} />
          <Route path="/other" element={<Other />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<Placeorder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Verify />} />

          {/* Catch-all route for invalid routes */}
          <Route path="*" element={<NotFound />} /> 
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
