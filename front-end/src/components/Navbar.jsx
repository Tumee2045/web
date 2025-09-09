import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false); // sidebar
  const [showProfileMenu, setShowProfileMenu] = useState(false); // profile dropdown
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const location = useLocation();
  

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
  };

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/wallet', label: 'WALLETS' },
    { path: '/about', label: 'ABOUT US' },
    { path: '/other', label: 'OTHER SERVICES' },
  ];

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'auto';
  }, [visible]);

  return (
    <div className="bg-[#000000] text-white border-b border-white z-50 relative">
      <div className="max-w-[1440px] px-4 sm:px-10 md:px-16 lg:px-24 mx-auto flex items-center justify-between py-4 font-medium">

        <Link to="/">
          <img src={assets.logo} className="w-32 sm:w-36" alt="CryptoLedger Logo" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex gap-6 text-sm">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 transition-all ${isActive ? 'font-semibold text-white' : 'text-gray-400 hover:text-white'}`
              }
            >
              {({ isActive }) => (
                <>
                  <p>{label}</p>
                  <div className={`h-[1.5px] w-6 bg-white transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />
                </>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-6 relative">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />

          {/* Profile icon behavior changes based on login status */}
          <div className="relative">
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="Profile"
              onClick={() => {
                if (!token) {
                  navigate('/login');
                } else {
                  setShowProfileMenu(prev => !prev);
                }
              }}
            />
            {token && showProfileMenu && (
              <div className="absolute right-0 mt-4 z-50 bg-[#000000] text-gray-300 rounded py-3 px-5 flex flex-col gap-2 w-36 shadow-md">
                <p className="cursor-pointer hover:text-white">My Profile</p>
                <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-white">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-white">Logout</p>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5" alt="Cart" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 h-4 text-center leading-4 bg-white text-black rounded-full text-[10px]">
              {getCartCount()}
            </p>
          </Link>

          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt="Menu"
          />
        </div>
      </div>

      {/* Overlay */}
      {visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setVisible(false)}></div>
      )}

      {/* Sidebar Menu */}
      <div className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-[#000000] z-50 p-6 transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div onClick={() => setVisible(false)} className="flex items-center gap-4 mb-6 cursor-pointer">
          <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="Close" />
          <p>Back</p>
        </div>
        {navLinks.map(({ label, path }) => (
          <NavLink
            key={label}
            to={path}
            onClick={() => setVisible(false)}
            className="py-3 pl-3 border-b border-gray-700 block text-white hover:text-gray-300"
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
