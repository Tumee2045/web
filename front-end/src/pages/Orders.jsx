import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import SkeletonProductItem from '../components/SkeletonProductItem';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        setOrderData([]);
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data?.success) {
        const allOrderItem = [];
        (response.data.orders || []).forEach((order) => {
          (order.items || []).forEach((item) => {
            allOrderItem.push({
              ...item,
              // keep only non-payment fields
              status: order.status,
              date: order.date,
            });
          });
        });
        setOrderData(allOrderItem.reverse());
      } else {
        setOrderData([]);
      }
    } catch (error) {
      console.error('loadOrderData error:', error);
      setOrderData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <section className="border-t pt-20 text-white max-w-[1440px] px-4 sm:px-10 md:px-16 lg:px-24 mx-auto">
      <div className="mb-10">
        <Title text1="My" text2="Orders" />
      </div>

      {loading ? (
        <div className="flex flex-col gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <SkeletonProductItem key={idx} />
          ))}
        </div>
      ) : orderData.length === 0 ? (
        <div className="text-gray-400 text-sm">
          You don’t have any orders yet.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 border border-gray-800 rounded-md bg-[#111111] flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
            >
              <div className="flex items-start gap-4 text-sm sm:text-base">
                <img
                  src={Array.isArray(item.image) ? item.image[0] : item.image}
                  alt={item.name}
                  className="w-16 sm:w-20 rounded object-cover"
                />
                <div>
                  <p className="font-medium text-white">{item.name}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-gray-400 text-xs sm:text-sm">
                    <span>{currency}{item.price}</span>
                    <span>Quantity: {item.quantity}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Date: {item.date ? new Date(item.date).toDateString() : '—'}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center md:justify-end gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>{item.status || 'Processing'}</span>
                </div>
                <button className="border border-gray-600 px-4 py-2 rounded-full hover:bg-gray-800 transition">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Orders;
