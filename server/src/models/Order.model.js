import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  qty: Number,
  price: Number
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [itemSchema],
  shippingAddress: Object,
  totalAmount: Number,
  paymentStatus: { type: String, enum: ['created','paid','failed','refunded'], default: 'created' },
  orderStatus: { type: String, enum: ['placed','confirmed','shipped','delivered','cancelled'], default: 'placed' },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
