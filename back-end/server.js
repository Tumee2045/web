// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhook } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

// --- Connect services
connectDB();
connectCloudinary();

import rateLimit from 'express-rate-limit';

// 100 requests / 15 min window per IP (tweak as you like)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

// Apply only to user auth routes
app.use('/api/user', authLimiter);


// --- Stripe Webhook (must be BEFORE express.json and mounted ONLY here)
app.post('/api/order/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

// --- Normal middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,           // e.g. https://yourapp.com
  process.env.FRONTEND_URL_ALT,       // optional: e.g. https://staging.yourapp.com
  'http://localhost:5173',            // Vite dev (optional: keep during dev)
  'http://127.0.0.1:5173',            // Vite dev alt
    'http://localhost:5174',       // admin (vite)
  'http://127.0.0.1:5174',
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // Allow non-browser tools (Postman/Curl = no origin)
    if (!origin) return cb(null, true);
    return allowedOrigins.includes(origin)
      ? cb(null, true)
      : cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: false, // not needed for Bearer tokens
}));

// Optional: handle CORS errors cleanly
app.use((err, _req, res, next) => {
  if (err?.message === 'Not allowed by CORS') {
    return res.status(403).json({ success: false, message: 'CORS: origin not allowed' });
  }
  return next(err);
});
app.use(express.json()); // use once, after webhook

// --- API routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// --- Health check
app.get('/', (_req, res) => {
  res.send('API Working');
});

// --- Global error guard (optional)
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Server error' });
});

app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
