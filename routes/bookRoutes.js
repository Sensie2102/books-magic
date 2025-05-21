import express from 'express';
import authenticateToken from '../middlewares/authMiddleware.js';
import { createBook, getAllBooks, getBook, searchBook } from '../controllers/bookController.js';
import { addReview } from '../controllers/reviewController.js';

const bookRoute = express.Router();

bookRoute.get('/search', searchBook)
bookRoute.get('/', getAllBooks);
bookRoute.get('/:id', getBook);

//Authenticated Route
bookRoute.post('/', authenticateToken, createBook);
bookRoute.post('/:id/review', authenticateToken, addReview)

export default bookRoute;