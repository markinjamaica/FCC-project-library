/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

// TODO: sample front end showing 0 comments, and is not deleting single book
// Error message saying 'Cast to ObjectId failed for value "undefined" (type string) at path "_id" for model "Book"

module.exports = async function (app, db) {
    // connect to database and get book model
    const Book = db();

    app.route('/api/books')
        .get(function (req, res) {
            Book.find()
                .select('title _id commentcount')
                .then((books) => res.send(books))
                .catch((error) => console.log(error));
            //response will be array of book objects
            //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
        })

        .post(function (req, res) {
            let title = req.body.title;

            if (!title) {
                return res.send('missing required field title');
            }

            const book = new Book({
                title: title,
            });

            book.save()
                .then((savedBook) => {
                    res.json({
                        title: savedBook.title,
                        _id: savedBook._id,
                    });
                })
                .catch((error) => res.send(error));
        })

        .delete(function (req, res) {
            Book.deleteMany()
                .then(() => res.send('complete delete successful'))
                .catch((error) => console.log(error));
            //if successful response will be 'complete delete successful'
        });

    app.route('/api/books/:id')
        .get(function (req, res) {
            let bookid = req.params.id;

            Book.findById(bookid)
                .select('title _id comments')
                .then((book) => res.send(book))
                .catch((error) => res.send('no book exists'));
            //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
        })

        .post(function (req, res) {
            let bookid = req.params.id;
            let comment = req.body.comment;
            if (!comment) {
                return res.send('missing required field comment');
            }

            Book.findById(bookid)
                .then((book) => {
                    book.comments.push(comment);
                    book.save().then((book) => res.send(book));
                })
                .catch((error) => res.send('no book exists'));
            //json res format same as .get
        })

        .delete(function (req, res) {
            let bookid = req.params.id;

            Book.findById(bookid)
                .deleteOne()
                .then((object) => {
                    if (object.deletedCount !== 1) {
                        throw new Error('no book exists');
                    }
                    res.send('delete successful');
                })
                .catch((error) => res.send(error));
        });
};
