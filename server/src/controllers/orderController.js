import Order from '../models/Order.model.js';
import { createRazorpayOrder } from '../services/razorpayService.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: 'No items' });
    // create local order
    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      totalAmount,
      paymentStatus: 'created'
    });
    // create razorpay order
    const rzOrder = await createRazorpayOrder(totalAmount, 'INR', `order_${order._id}`);
    order.razorpayOrderId = rzOrder.id;
    await order.save();
    res.json({ order, razorpayOrder: rzOrder });
  } catch (err) {
    next(err);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};
