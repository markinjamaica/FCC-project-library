const mongoose = require('mongoose');

module.exports = () => {
    // Connect to database
    mongoose.connect(process.env.DB);

    // Define schema
    const { Schema, model } = mongoose;

    const bookSchema = new Schema({
        title: String,
        comments: [String],
        commentcount: Number,
    });

    // Define model
    const Book = model('Book', bookSchema);

    return Book;
};
