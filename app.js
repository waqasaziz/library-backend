const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

const nav = [{
    link: '/books',
    title: 'Book'
  },
  {
    link: '/authors',
    title: 'Author'
  }
];

const bookRouter = require('./src/routes/bookrouts')(nav);

app.use('/books', bookRouter);
app.get('/', (req, res) => res.render('index', {
  title: 'Library',
  nav
}));

app.listen(port, () => debug(`Listening on port ${chalk.green(port)}`));