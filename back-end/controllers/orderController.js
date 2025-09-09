import { computeTotals } from '../helpers/orderTotals.js';
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Global variables (kept for compatibility with your code)
const currency = "inr";
const deliveryCharge = 10;

/**
 * Place order using COD (unchanged)
 */
const placeOrder = async (req, res) => {
    try {
        const userId = req.userId; // from auth middleware

        const { items, address } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: 'No items provided' });
        }
        if (items.length > 50) {
            return res.status(400).json({ success: false, message: 'Too many items' });
        }

        const { total } = await computeTotals(items, 10); // 10 = your deliveryCharge

        const orderData = {
            userId,
            items,
            address,
            amount: total,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };


        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        return res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

/**
 * Stripe checkout (DISABLED / no keys):
 * Keep the route but return 501 so frontend doesn’t crash the server.
 * We still create the order (optional). If you prefer NOT to create an order here, comment that section.
 */
const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.userId; // from auth middleware
        const { items, address } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: 'No items provided' });
        }
        if (items.length > 50) {
            return res.status(400).json({ success: false, message: 'Too many items' });
        }

        const { total } = await computeTotals(items, 10);

        const orderData = {
            userId,
            items,
            address,
            amount: total,           // ✅ server-trusted total
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Tell the client that payments are disabled for now
        return res
            .status(501)
            .json({ success: false, message: "Stripe is disabled until keys are configured." });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// All orders data for admin panel
const allOrders = async (_req, res) => {
    try {
        const orders = await orderModel.find({});
        return res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// User order data front-end
const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await orderModel.find({ userId });
        return res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// Update order status

const ALLOWED_STATUSES = [
  'Order Placed', 'Processing', 'Paid', 'Shipped', 'Delivered', 'Cancelled'
];

// In updateStatus:
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: 'orderId and status are required' });
    }
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }
    await orderModel.findByIdAndUpdate(orderId, { status });
    return res.json({ success: true, message: 'Status Updated' });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};


/**
 * Confirm payment after Stripe redirect (DISABLED)
 */
const confirmPayment = async (_req, res) => {
    return res
        .status(501)
        .json({ success: false, message: "Stripe is disabled until keys are configured." });
};

/**
 * Stripe webhook (DISABLED)
 */
const stripeWebhook = async (_req, res) => {
    return res
        .status(501)
        .json({ success: false, message: "Stripe is disabled until keys are configured." });
};

export {
    placeOrder,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,
    confirmPayment,
    stripeWebhook,
};
