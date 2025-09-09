import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [guestMode, setGuestMode] = useState(false);
  const navigate = useNavigate();

  // ✅ Add to cart with guest handling
  const addToCart = async (itemId) => {
    const prevCart = structuredClone(cartItems);
    const newCart = structuredClone(cartItems);
    newCart[itemId] = (newCart[itemId] || 0) + 1;

    setCartItems(newCart);

    if (!token && !guestMode) {
      toast.info('Please log in to add items to your cart.');
      localStorage.setItem('pendingCartItem', itemId);
      setCartItems(prevCart); // rollback
      navigate('/login');
      return;
    }

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Added to cart!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to add to cart');
        setCartItems(prevCart); // rollback
      }
    }
  };

  // ✅ Update quantity with guest handling
  const updateQuantity = async (itemId, quantity) => {
    const prevCart = structuredClone(cartItems);
    const newCart = structuredClone(cartItems);

    if (quantity === 0) {
      delete newCart[itemId];
    } else {
      newCart[itemId] = quantity;
    }

    setCartItems(newCart);

    if (!token && !guestMode) {
      toast.info('Please log in to update your cart.');
      setCartItems(prevCart);
      navigate('/login');
      return;
    }

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, quantity }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.error(error);
        toast.error('Failed to update cart');
        setCartItems(prevCart); // rollback
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        totalCount += cartItems[itemId];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    let hasMissingItems = false;

    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      const product = products.find((p) => p._id === itemId);

      if (product && quantity > 0) {
        totalAmount += product.price * quantity;
      } else if (!product && quantity > 0) {
        hasMissingItems = true;
      }
    }

    if (hasMissingItems) {
      toast.warn("Some items in your cart are no longer available.");
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // 🧠 Initial product load
  useEffect(() => {
    getProductsData();
  }, []);

  // 🧠 On load: check for token or guestMode
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedGuest = localStorage.getItem('guest');

    if (storedGuest === 'true') {
      setGuestMode(true);
    }

    if (storedToken) {
      setToken(storedToken);
      setGuestMode(false); // prioritize logged-in user
      getUserCart(storedToken);
    }
  }, []);

  // 🧹 Clear guestMode when logged in + handle pending cart item
  useEffect(() => {
    if (token) {
      localStorage.removeItem('guest');
      setGuestMode(false);

      // ✅ Handle pending add-to-cart after guest login
      const pendingItem = localStorage.getItem('pendingCartItem');
      if (pendingItem) {
        addToCart(pendingItem);
        localStorage.removeItem('pendingCartItem');
      }
    }
  }, [token]);

  const value = {
    products, currency, delivery_fee,
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCart,
    getCartCount, updateQuantity,
    getCartAmount, navigate, backendUrl,
    setToken, token, setCartItems,
    guestMode, setGuestMode
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
