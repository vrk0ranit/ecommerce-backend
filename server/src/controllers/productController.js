import Product from '../models/Product.model.js';

export const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    data.seller = req.user._id;
    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { q, category, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q }; // requires text index
    if (category) filter.category = category;
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};
