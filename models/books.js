import { DataTypes } from 'sequelize';
import database from '../config/db.js';

const Books = database.define('books',{
    id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
    },
    title:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false
    },
    genre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    average_rating:{
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        defaultValue: 0.0
    }
})

export default Books;