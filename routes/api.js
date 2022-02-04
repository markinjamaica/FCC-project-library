/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

module.exports = async function (app, db) {
    // connect to database and get book model
    const Book = db();

    app.route('/api/books')
        .get(function (req, res) {
            Book.find()
                .select('title _id commentcount')
                .then((books) => res.json(books))
                .catch((error) => console.log(error));
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
        });

    app.route('/api/books/:id')
        .get(function (req, res) {
            let bookid = req.params.id;

            Book.findById(bookid)
                .select('title _id comments')
                .then((book) => {
                    if (!book) {
                        throw new Error();
                    }
                    res.json(book);
                })
                .catch((error) => res.send('no book exists'));
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
                    book.commentcount = book.comments.length;
                    book.save().then((book) =>
                        res.json({
                            title: book.title,
                            _id: book._id,
                            comments: book.comments,
                        })
                    );
                })
                .catch((error) => res.send('no book exists'));
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
                .catch((error) => res.send('no book exists'));
        });
};
