// server/src/routes/sellerRoutes.js
import express from 'express';
import { applySeller } from '../controllers/sellerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/seller/apply
router.post('/apply', protect, applySeller);

export default router;
