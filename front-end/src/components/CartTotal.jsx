import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full text-sm text-gray-300">
      <div className="text-xl mb-6">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-3 bg-[#181818] p-6 rounded-md border border-gray-700">
        <div className="flex justify-between">
          <p className="text-gray-400">Subtotal</p>
          <p>{currency} {subtotal}.00</p>
        </div>
        <hr className="border-gray-700" />
        <div className="flex justify-between">
          <p className="text-gray-400">Shipping Fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr className="border-gray-700" />
        <div className="flex justify-between font-semibold text-white">
          <p>Total</p>
          <p>{currency} {total}.00</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;