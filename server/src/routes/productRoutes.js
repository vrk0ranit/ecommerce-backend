import express from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, authorizeRoles('seller','admin'), createProduct);

export default router;
