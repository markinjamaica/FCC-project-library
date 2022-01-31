const mongoose = require('mongoose');

module.exports = () => {
    // Connect to database
    mongoose.connect(process.env.DB);

    // Define schemas
    const { Schema, model } = mongoose;

    const bookSchema = new Schema({
        book_title: String,
        comments: [String],
    });

    // Define models
    // const Project = model('Project', projectSchema);
    const Book = model('Book', bookSchema);

    return Book;
};
