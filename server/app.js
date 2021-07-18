// initializing connection with database
require('./connection');

// imports
var createError = require('http-errors');
var path = require('path');
var passport = require('passport');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cors = require('cors');
var logger = require('morgan');

// route imports
var indexRouter = require('./routes/index');
var authRouter = require('./routes/authorization');
var application = require('./routes/application');
var testAPI = require('./routes/testAPI');
var verification = require('./routes/verification');

// express app
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware
app.use(cors({credentials: true, origin: true}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended:true
})); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000
  }
}))
app.use(cookieParser("secretcode"))
app.use(passport.initialize());
app.use(passport.session());
require('./config/passportConfig')(passport);

// routes
app.use('/', indexRouter);
app.use('/testAPI', testAPI);

// main routes
app.use('/verification', verification);
app.use('/application', application);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;