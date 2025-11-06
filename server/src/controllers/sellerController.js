import User from '../models/User.model.js';

export const applySeller = async (req, res, next) => {
  try {
    const { storeName, documents } = req.body; // documents as array of cloudinary URLs
    const user = req.user;
    user.sellerApplied = { status: 'pending', storeName, documents };
    await user.save();
    res.json({ message: 'Seller application submitted' });
  } catch (err) {
    next(err);
  }
};
