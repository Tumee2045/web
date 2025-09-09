import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

export const finalizePaidOrder = async (orderId, userId) => {
  const order = await orderModel.findById(orderId).select('payment userId');
  if (!order) return { ok:false, reason:'order_not_found' };
  if (userId && order.userId.toString() !== String(userId)) {
    return { ok:false, reason:'unauthorized' };
  }
  if (!order.payment) {
    await orderModel.findByIdAndUpdate(orderId, { payment: true, status: 'Paid' });
    await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
  }
  return { ok:true };
};
