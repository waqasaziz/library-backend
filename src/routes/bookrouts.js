const express = require('express');
const debug = require('debug')('app:bookRoutes');
const database = require('../data/database');

function router(nav) {
  const bookRouter = express.Router();

  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const {
          recordset
        } = await database.query('select * from books');

        res.render('bookListView', {
          title: 'Library',
          nav,
          books: recordset
        });
      }());
    });

  bookRouter.route('/:id')
    .all((req, res, next) => {
      const {
        id
      } = req.params;

      (async function query(bookId) {
        const {
          recordset
        } = await database.query(`select * from books where id = ${bookId}`);

        [req.book] = recordset;

        if (!req.book) {
          res.render('404', {
            title: 'Library',
            nav,
            book: req.book
          });
        } else {
          next();
        }
      }(id));
    })
    .get((req, res) => {
      res.render('bookView', {
        title: 'Library',
        nav,
        book: req.book
      });
    });

  return bookRouter;
}

module.exports = router;