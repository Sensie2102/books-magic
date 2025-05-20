import Reviews from "./reviews.js";
import Users from "./users.js";
import Books from "./books.js";


Users.hasMany(Reviews);
Books.hasMany(Reviews);
Reviews.belongsTo(Users);
Reviews.belongsTo(Books);

export { sequelize, User, Book, Review };