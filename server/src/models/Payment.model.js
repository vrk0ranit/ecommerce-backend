import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  amount: Number,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Payment', paymentSchema);
