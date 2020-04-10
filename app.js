const express = require('express');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');
const path = require('path');

const bookRouter = express.Router();

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

bookRouter.route('/').get((req, res) => res.send('Hello Books!'));
bookRouter.route('/single').get((req, res) => res.send('Hello Single Book!'));

app.use('/books', bookRouter);
app.get('/', (req, res) => res.render('index', {
  nav: [{
    link: '/books',
    title: 'Books'
  }, {
    link: '/authors',
    title: 'Author'
  }],
  title: 'Library'
}));

app.listen(port, () => debug(`Listening on port ${chalk.green(port)}`));