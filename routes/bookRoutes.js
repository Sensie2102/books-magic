import express from 'express';
import authenticateToken from '../middlewares/authMiddleware.js';
import { createBook, getAllBooks, getBook } from '../controllers/bookController.js';
import { addReview } from '../controllers/reviewController.js';

const bookRoute = express.Router();

bookRoute.get('/', getAllBooks);
bookRoute.get('/:id', getBook);

//Authenticated Route
bookRoute.post('/', authenticateToken, createBook);
bookRoute.put('/:id/review', authenticateToken, addReview)

export default bookRoute;