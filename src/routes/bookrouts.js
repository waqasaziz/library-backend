const express = require('express');
const debug = require('debug')('app:bookRoutes');
const database = require('../data/database');

function router(nav) {
  const bookRouter = express.Router();

  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const result = await database('select * from books');

        res.render('bookListView', {
          title: 'Library',
          nav,
          books: result.recordset
        });
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const {
        id
      } = req.params;

      (async function query(bookId) {
        const result = await database(`select * from books where id = ${bookId}`);
        res.render('bookView', {
          title: 'Library',
          nav,
          book: result.recordset[0]
        });
      }(id));
    });

  return bookRouter;
}

module.exports = router;