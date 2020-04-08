let express = require('express');
let chalk = require('chalk');
let debug = require('debug');
let morgan = require('morgan');
let path = require('path');

let app = express();

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css',express.static(path.join(__dirname,"node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"node_modules/bootstrap/dist/js")));
app.use('/js',express.static(path.join(__dirname,"node_modules/jquery/dist")));
app.use('/js',express.static(path.join(__dirname,"node_modules/popper.js/dist/")));




app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(3000, function () {
    debug(`Listening on port ${chalk.green(3000)}`);
});