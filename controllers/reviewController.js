import { Books } from "../models/index.js"
export const addReview = async (req, res) => {
    const { bookId } = req.params
    const { userId } = req.user
    const { rating, comment } = req.body
    try {
        const book = await Books.findByPk(bookId)

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            })
        }

        const review = await Reviews.create({
            bookId,
            userId,
            rating,
            comment
        })

        res.status(201).json({
            message: 'Review added successfully',
            reviewId: review.id
        })
    } catch (error) {
        res.status(500).json({
            message: 'Unable to add review',
            error: error.message
        })
    }
}