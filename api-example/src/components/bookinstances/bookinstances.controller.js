var BookInstance = require('./bookinstance.entity');

exports.bookinstance_list = function(req, res, next) {

    BookInstance.find()
      .populate('book')
      .exec(function (err, bookinstances) {
        if (err) {
            return next(err);
        }
        res.json({ title: 'Book Instance List', bookinstance_list: bookinstances });
      });
};

exports.bookinstance_detail = function(req, res, next) {

    BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, bookinstance) {
        if (err) { return next(err); }
        if (bookinstance==null) {
            var err = new Error('Book copy not found');
            err.status = 404;
            return next(err);
        }
        res.json({ title: 'Copy: ' + bookinstance.book.title, bookinstance:  bookinstance});
    })
};