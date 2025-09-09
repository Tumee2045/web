import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [mode, setMode] = useState('login');
  const isLogin = mode === 'login';

  const {
    token, setToken, guestMode, setGuestMode,
    navigate, backendUrl, addToCart
  } = useContext(ShopContext);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password || (!isLogin && !name)) {
        toast.error('Please fill all required fields');
        return;
      }

      const payload = isLogin ? { email, password } : { name, email, password };
      const endpoint = isLogin ? '/api/user/login' : '/api/user/register';

      const response = await axios.post(backendUrl + endpoint, payload);

      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem('token', token);
        setGuestMode(false);
        toast.success(isLogin ? 'Logged in!' : 'Account created!');
      } else {
        toast.error(response.data.message || 'Authentication failed');
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleGuestLogin = () => {
    setGuestMode(true);
    localStorage.setItem('guest', 'true');
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  useEffect(() => {
    if (token) {
      localStorage.removeItem('guest');
      setGuestMode(false);

      // ✅ Restore pending cart item if it exists
      const pendingItem = localStorage.getItem('pendingCartItem');
      if (pendingItem) {
        addToCart(pendingItem);
        localStorage.removeItem('pendingCartItem');
      }

      navigate('/');
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] px-4 pt-20 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#121212] p-6 rounded-xl shadow-md space-y-6 border border-gray-700"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-1 text-gray-100">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Log in to continue' : 'Join CryptoLedger today'}
          </p>
        </div>

        {!isLogin && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Full Name"
            className="w-full bg-transparent border border-gray-600 placeholder-gray-400 text-sm px-4 py-2 rounded-md"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email Address"
          className="w-full bg-transparent border border-gray-600 placeholder-gray-400 text-sm px-4 py-2 rounded-md"
          required
        />

        <div className="relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full bg-transparent border border-gray-600 placeholder-gray-400 text-sm px-4 py-2 rounded-md pr-10"
            required
          />
          {password && (
            <span
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer text-sm"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          )}
        </div>

        {isLogin && (
          <div className="text-right text-xs text-gray-400 hover:text-white cursor-pointer">
            Forgot password?
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 transition text-white text-sm py-2 rounded-full"
        >
          {isLogin ? 'Log in' : 'Sign Up'}
        </button>

        <button
          type="button"
          onClick={handleGuestLogin}
          className="w-full border border-gray-600 text-gray-300 hover:bg-gray-700 transition py-2 rounded-full text-sm"
        >
          Continue as Guest
        </button>

        <p className="text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => setMode(isLogin ? 'signup' : 'login')}
            className="text-white underline cursor-pointer"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
