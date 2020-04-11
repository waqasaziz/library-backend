const express = require('express');


function router(nav) {
  const bookRouter = express.Router();

  const books = [{
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayeveich Tolstoy',
    read: false
  }, {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  }];

  bookRouter.route('/')
    .get((req, res) => res.render('bookListView', {
      title: 'Library',
      nav,
      books
    }));

  bookRouter.route('/:id')
    .get((req, res) => {
      const {
        id
      } = req.params;

      res.render('bookView', {
        title: 'Library',
        nav,
        book: books[id]
      });
    });

  return bookRouter;
}

module.exports = router;