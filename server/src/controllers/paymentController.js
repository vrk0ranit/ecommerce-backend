import Order from '../models/Order.model.js';
import Payment from '../models/Payment.model.js';
import { verifySignature } from '../services/razorpayService.js';
import { RZP_KEY_SECRET } from '../config/env.js';

export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
    const valid = verifySignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature }, RZP_KEY_SECRET);
    if (!valid) return res.status(400).json({ message: 'Invalid signature' });
    const order = await Order.findOne({ _id: orderId, razorpayOrderId: razorpay_order_id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.paymentStatus = 'paid';
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();
    await Payment.create({
      order: order._id,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      amount: order.totalAmount,
      status: 'paid'
    });
    res.json({ message: 'Payment verified', order });
  } catch (err) {
    next(err);
  }
};
