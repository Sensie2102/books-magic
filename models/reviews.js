import { DataTypes } from "sequelize";
import database from "../config/db";

const Reviews = database.define('reviews', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    review: {
        type: DataTypes.TEXT,
    },
    rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
    }
})

export default Reviews;