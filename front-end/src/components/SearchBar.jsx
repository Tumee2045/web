import React, { useContext, useEffect, useRef, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const isOnCollectionPage = location.pathname.startsWith('/wallet');

  const [localQuery, setLocalQuery] = useState(search || '');
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalQuery(search || '');
  }, [search]);

  useEffect(() => {
    if (!showSearch) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(localQuery);
    }, 200);
    return () => clearTimeout(debounceRef.current);
  }, [localQuery, setSearch, showSearch]);

  if (!showSearch || !isOnCollectionPage) return null;

  return (
    <div className="sticky top-0 z-40 border-t border-b border-neutral-800 bg-[#0b0b0b]/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
      <div className="max-w-[720px] mx-auto px-4 py-4">
        <div className="flex items-center gap-2 rounded-full px-4 py-2 border border-neutral-700 bg-[#0e0e0e] focus-within:ring-2 ring-blue-500 transition">
          <img src={assets.search_icon} alt="search" className="w-4 opacity-80" />
          <input
            ref={inputRef}
            autoFocus
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none text-sm placeholder-gray-400"
            type="text"
            placeholder="Search wallets by name or brand…"
            aria-label="Search products"
          />
          {localQuery && (
            <button
              type="button"
              onClick={() => { setLocalQuery(''); inputRef.current?.focus(); }}
              className="text-gray-400 hover:text-gray-200 transition text-lg leading-none px-1"
              aria-label="Clear search"
              title="Clear"
            >
              ×
            </button>
          )}
          <img
            onClick={() => setShowSearch(false)}
            src={assets.cross_icon}
            alt="close"
            className="w-5 ml-1 cursor-pointer opacity-80 hover:opacity-100"
            title="Close"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
