let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
let defaultRoute = require('./server/routes/index');
let user = require('./server/routes/user');
let movie = require('./server/routes/movie');
let winston = require('winston');
let mongoose = require('mongoose');
let config = require('./config');

const app = express();

mongoose.connect(config.database.local, { useMongoClient: true });
let db = mongoose.connection;
db.on('error', winston.error.bind('error', 'connection error!!!'));
db.once('open', function() {
    winston.log('info', 'connected to database successfully!!!');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', defaultRoute);
app.use('/api/user', user);
app.use('/api/movie', movie);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4200';
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, () => winston.log('info', `API running on localhost:${port}`));

module.exports = app;
