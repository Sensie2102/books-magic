import Reviews from "../models/reviews";
import Books from "../models/books";

const updateAverageRating = async (bookId, transaction = null) => {
    const reviews = await Reviews.findAll({
        where: { BookId: bookId },
        transaction
    })

    const totalRating = reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0)
    const averageRating = review.length ? (totalRating / reviews.length).toFixed(1) : 0.0

    await Books.update({ averageRating: averageRating }, { where: { id: bookId }, transaction })
}

export default updateAverageRating;