import express from 'express'
import {placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import { confirmPayment,stripeWebhook } from '../controllers/orderController.js';


const orderRouter = express.Router()

//Admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)

// User feature
orderRouter.post('/userorders',authUser,userOrders)

// Stripte payment confirmation
orderRouter.post('/confirm-payment', authUser, confirmPayment);

export default orderRouter