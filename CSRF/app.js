var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var index = require('./routes/index');
var app = express();

app.use(bodyParser.urlencoded());
app.use(session({
    secret: 'secret',
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Auth

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs');
  res.end();
});

module.exports = app;
