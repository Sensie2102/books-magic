import express from 'express';
import { deleteReview, updateReview } from '../controllers/reviewController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const reviewRoute = express.Router();

reviewRoute.put('/:id', authenticateToken, updateReview)
reviewRoute.delete('/:id', authenticateToken, deleteReview)

export default reviewRoute;