import Razorpay from 'razorpay';
import { RZP_KEY_ID, RZP_KEY_SECRET } from './env.js';

export const razorpay = new Razorpay({
  key_id: RZP_KEY_ID,
  key_secret: RZP_KEY_SECRET
});
