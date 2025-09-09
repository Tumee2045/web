import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingItemId, setRemovingItemId] = useState(null);

  // Build local cart rows when items or products change
  useEffect(() => {
    const entries = Object.entries(cartItems || {}).filter(([, qty]) => qty > 0);
    const rows = entries.map(([id, qty]) => ({ _id: id, quantity: qty }));
    setCartData(rows);

    // consider products "ready" once we've tried to resolve rows
    // (prevents endless skeletons if cart is empty)
    setIsLoading(false);
  }, [cartItems, products]);

  const handleRemove = async (productId) => {
    setRemovingItemId(productId);
    try {
      await updateQuantity(productId, 0);
      toast.success('Item removed');
    } catch {
      toast.error('Failed to remove item');
    } finally {
      setRemovingItemId(null);
    }
  };

  const handleCheckout = () => {
    if (cartData.length === 0) {
      toast.warn('Your cart is empty.');
      return;
    }
    // Stripe-only flow continues on the Place Order page
    navigate('/place-order');
  };

  return (
    <section className="border-t pt-20 text-white max-w-[1440px] px-4 sm:px-10 md:px-16 lg:px-24 mx-auto">
      <div className="mb-10">
        <Title text1="Your" text2="Cart" className="text-gray-100" />
      </div>

      <div className="flex flex-col gap-6 min-h-[200px]">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-24 border-b border-gray-800 bg-[#1a1a1a] animate-pulse rounded" />
          ))
        ) : cartData.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">🛒 Your cart is empty.</p>
        ) : (
          cartData.map(({ _id, quantity }, index) => {
            const product = products.find((p) => p._id === _id);

            if (!product) {
              return (
                <div key={index} className="flex items-center justify-between border-b border-gray-800 py-5">
                  <div className="text-sm text-red-400">This product is no longer available.</div>
                  <button
                    onClick={() => handleRemove(_id)}
                    className="text-xs border border-gray-700 px-3 py-1 rounded hover:bg-[#1a1a1a]"
                  >
                    Remove
                  </button>
                </div>
              );
            }

            const firstImage =
              Array.isArray(product.image) && product.image.length > 0 ? product.image[0] : null;

            return (
              <div
                key={index}
                className="flex flex-col sm:grid sm:grid-cols-[4fr_1fr_1fr_auto] items-center gap-4 border-b border-gray-800 py-5"
              >
                <div className="flex gap-4 items-center w-full">
                  {firstImage ? (
                    <img className="w-16 rounded object-cover" src={firstImage} alt={product.name} />
                  ) : (
                    <div className="w-16 h-16 rounded bg-[#1a1a1a] grid place-items-center text-[10px] text-gray-500">
                      No image
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-200">{product.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {quantity}</p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-200">
                  {currency}{(product.price * quantity).toFixed(2)}
                </p>
                <p className="text-sm sm:text-base text-gray-400">x{quantity}</p>

                <button
                  onClick={() => handleRemove(_id)}
                  disabled={removingItemId === _id}
                  className={`w-4 hover:opacity-60 transition ${
                    removingItemId === _id ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  aria-label="Remove item"
                  title="Remove item"
                >
                  <img src={assets.bin_icon} alt="" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Total + Checkout */}
      {!isLoading && cartData.length > 0 && (
        <div className="flex justify-center my-20">
          <div className="w-full sm:max-w-md">
            <CartTotal />
            <div className="text-center">
              <button
                onClick={handleCheckout}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 mt-8 rounded-full text-sm transition"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
