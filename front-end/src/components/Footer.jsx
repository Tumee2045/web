import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white border-t border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 md:px-16 lg:px-24 py-16">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-sm mb-12">
          
          {/* Left: About */}
          <div>
            <img src={assets.logo} className="mb-5 w-32" alt="CryptoLedger Logo" />
            <p className="text-gray-400 leading-relaxed max-w-md">
              ShopHardWallet.com is your trusted destination for secure and authentic cryptocurrency hardware wallets. We deliver quality, reliability, and peace of mind.
            </p>
          </div>

          {/* Middle: Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Company</h3>
            <ul className="flex flex-col gap-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/wallet" className="hover:text-white transition">All Wallets</Link></li>
            </ul>
          </div>

          {/* Right: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Get in Touch</h3>
            <ul className="flex flex-col gap-2 text-gray-400">
              <li>Phone: +1 (262) xxx-xxxx</li>
              <li>Email: support@xxxxxxxxxxx.com</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800" />

        {/* Bottom Copyright */}
        <p className="text-center text-xs text-gray-500 pt-6">
          © 2025 ShopHardWallet.com All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
