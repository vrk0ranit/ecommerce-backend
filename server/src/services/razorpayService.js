import { razorpay } from '../config/razorpay.js';
import crypto from 'crypto';

export const createRazorpayOrder = async (amount, currency = 'INR', receipt = undefined) => {
  const options = {
    amount: Math.round(amount * 100), // in paise
    currency,
    receipt: receipt || `rcpt_${Date.now()}`,
    payment_capture: 1
  };
  const order = await razorpay.orders.create(options);
  return order;
};

export const verifySignature = ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }, keySecret) => {
  const shasum = crypto.createHmac('sha256', keySecret);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest('hex');
  return digest === razorpay_signature;
};
