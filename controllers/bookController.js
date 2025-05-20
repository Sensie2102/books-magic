import { Books, Reviews, Users } from "../models/index.js";
import { Op } from "sequelize";

export const getBook = async (req, res) => {
    const bookId = req.params.id;
    const { page = 1, limit = 10 } = req.query
    const offset = (page - 1) * limit;
    try {

        const book = await Books.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        
        const reviews = await Reviews.findAndCountAll({
            where: { bookId },
            include: [
                {
                    model: Users,
                    attributes: ['username']
                }
            ],
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        
        res.json({
            book,
            reviews: reviews.rows,
            totalReviews: reviews.count,
            page: parseInt(page),
            totalPages: Math.ceil(reviews.count / limit)
        });
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch book",
            error: error.message
        })
    }
}

export const getAllBooks = async (req, res) => {
    const { author, genre, page = 1, limit = 10 } = req.query
    const offset = (page - 1) * limit;
    const where = {}

    if (author) {
        where.author = {
            [Op.iLike]: `%${author}%`
        }
    }

    if (genre) {
        where.genre = {
            [Op.iLike]: `%${genre}%`
        }
    }

    try {
        const books = await Books.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
        })

        res.json({
            total: books.count,
            page: parseInt(page),
            totalPages: Math.ceil(books.count / limit),
            data: books.rows,
        });
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch books",
            error: error.message
        })
    }
}

export const createBook = async (req, res) => {
    const { title, author, genre } = req.body
    try {
        const existingBook = await Books.findOne({
            where: {
                title: title
            }
        })

        if (existingBook) {
            return res.status(400).json({
                message: `Book with title ${title} already exists`
            })
        }

        const book = await Books.create({
            title,
            author,
            genre
        })

        res.status(201).json({
            message: 'Book created successfully',
            bookId: book.id
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to create books",
            error: error.message
        })
    }
}