const mongoose = require('mongoose');

module.exports = () => {
    // Connect to database
    mongoose.connect(process.env.DB);

    // Define schema
    const { Schema, model } = mongoose;

    const bookSchema = new Schema({
        book_title: String,
        comments: [String],
    });

    // Define model
    const Book = model('Book', bookSchema);

    return Book;
};
