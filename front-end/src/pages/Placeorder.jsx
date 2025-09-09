import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Placeorder = () => {
  // Stripe only
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const {
    backendUrl, token,
    cartItems, setCartItems,
    getCartAmount, delivery_fee, products
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '',
    city: '', state: '', zipcode: '', country: '', phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateOrderItems = () => {
    return Object.entries(cartItems)
      .filter(([_, qty]) => qty > 0)
      .map(([itemId, quantity]) => {
        const itemInfo = products.find(p => p._id === itemId);
        if (!itemInfo) return null;
        return { ...structuredClone(itemInfo), quantity };
      })
      .filter(Boolean);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.info('Please log in to place an order.');
      return;
    }
    const hasItems = getCartAmount() > 0;
    if (!hasItems) {
      toast.error('Your cart is empty.');
      return;
    }

    const orderItems = generateOrderItems();
    const totalAmount = getCartAmount() + delivery_fee;

    const orderData = {
      address: formData,
      items: orderItems,
      amount: totalAmount,
      method: 'stripe', // Stripe only
    };

    try {
      setCreating(true);
      const res = await axios.post(
        `${backendUrl}/api/order/stripe`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success && res.data?.session_url) {
        // Hand off to Stripe Checkout
        window.location.replace(res.data.session_url);
      } else {
        toast.error(res.data?.message || 'Stripe session creation failed.');
      }
    } catch (err) {
      console.error('Stripe create session error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const disabled = creating || !token || getCartAmount() === 0;

  return (
    <form onSubmit={onSubmitHandler} className="pt-16 text-white border-t min-h-[80vh] flex flex-col sm:flex-row gap-8">
      {/* LEFT: Form */}
      <div className="w-full sm:max-w-md flex flex-col gap-4">
        <div className="text-xl mb-4">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input required name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First Name" className="form-input" />
          <input required name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last Name" className="form-input" />
        </div>

        <input required name="email" value={formData.email} onChange={onChangeHandler} type="email" placeholder="Email Address" className="form-input" />
        <input required name="street" value={formData.street} onChange={onChangeHandler} placeholder="Street" className="form-input" />

        <div className="flex gap-3">
          <input required name="city" value={formData.city} onChange={onChangeHandler} placeholder="City" className="form-input" />
          <input required name="state" value={formData.state} onChange={onChangeHandler} placeholder="State" className="form-input" />
        </div>

        <div className="flex gap-3">
          <input required name="zipcode" value={formData.zipcode} onChange={onChangeHandler} placeholder="Zipcode" type="number" className="form-input" />
          <input required name="country" value={formData.country} onChange={onChangeHandler} placeholder="Country" className="form-input" />
        </div>

        <input required name="phone" value={formData.phone} onChange={onChangeHandler} placeholder="Phone" type="number" className="form-input" />
      </div>

      {/* RIGHT: Summary + Payment (Stripe only) */}
      <div className="w-full sm:max-w-md">
        <CartTotal />

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 p-3 border border-gray-700 rounded">
              <span className="w-4 h-4 rounded-full border bg-blue-600"></span>
              <img src={assets.stripe_logo} className="h-5" alt="Stripe" />
            </div>
          </div>

        <div className="text-right mt-8">
          <button
            type="submit"
            disabled={disabled}
            className={`px-12 py-3 rounded-full text-white text-sm ${creating ? 'bg-blue-900 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
            {creating ? 'CREATING SESSION…' : 'CHECK OUT WITH STRIPE'}
          </button>
        </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
