import { where } from 'sequelize';
import { Books, Reviews } from '../models/index.js';

export const addReview = async (req, res) => {
    const { id: bookId } = req.params;
    const userId = req.user.id;
    const { rating, comment } = req.body;

    try {
        const book = await Books.findByPk(bookId);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        const existingReview = await Reviews.findOne({
            where: {
                bookId,
                userId
            }
        });

        if (existingReview) {
            return res.status(400).json({
                message: 'You have already added a review for this book'
            });
        }

        const review = await Reviews.create({
            bookId,
            userId,
            rating,
            comment
        });

        res.status(201).json({
            message: 'Review added successfully',
            reviewId: review.id
        });

    } catch (error) {
        res.status(500).json({
            message: 'Unable to add review',
            error: error.message
        });
    }
};

export const updateReview = async (req, res) => {
    const { id: reviewId } = req.params
    const { rating, review } = req.body;

    try {
        const existingReview = await Reviews.findByPk(reviewId);

        if (!existingReview) {
            return res.status(404).json({
                message: 'Review not found'
            });
        }

        if (existingReview.userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        const updateReview = await Reviews.update(
            { rating, review },
            {
                where: { id: reviewId }
            }
        )

        res.status(200).json({ message: 'Review updated!', reviewId: updateReview.id })

    } catch (error) {
        res.status(500).json({
            message: 'Unable to update review',
            error: error.message
        });
    }
}

export const deleteReview = async (req, res) => {
    const { id: reviewId } = req.params;

    try {
        const existingReview = await Reviews.findByPk(reviewId);

        if (!existingReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (existingReview.userId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await existingReview.destroy();

        res.status(200).json({ message: 'Review deleted successfully' });

    } catch (error) {
        res.status(500).json({
            message: 'Unable to delete review',
            error: error.message
        });
    }
};
