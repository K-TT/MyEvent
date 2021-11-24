let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');

// Modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');

// Modules for cors
let cors = require('cors');

// Authentication objects
let localStrategy = passportLocal.Strategy; // alias
let User = require('../Models/user');

// Module for auth messaging and error management
let flash = require('connect-flash');

// Attach Router files
let indexRouter = require('../Routes/index');
let eventsRouter = require('../Routes/events');

// App Configuration
let app = express();

// DB Configuration
let DB = require("./db");

let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once("open", () => {
  console.log('Connected to MongoDB at: ' + DB.HostName);
});

//Point mongoose to the db uri
mongoose.connect(DB.RemoteURI, { useNewUrlParser: true, useUnifiedTopology: true });

// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Add support for cors
app.use(cors());

// Setup express session
app.use(session({
  secret: DB.Secret,
  saveUninitialized: false,
  resave: false
}));

// Initialize flash
app.use(flash());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Implement an Auth Strategy
passport.use(User.createStrategy());

// Serialize and deserialize user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use('/', indexRouter);
app.use('/events', eventsRouter);

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
  res.render('error');
});

module.exports = app;
