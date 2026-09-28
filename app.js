var createError = require('http-errors');
require("dotenv").config();
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');


var usersRouter = require('./routes/users');

var app = express();

mongoose.connect('mongodb://meetdeveloper:meetdeveloper@ac-ekbjltj-shard-00-00.jufzf2d.mongodb.net:27017,ac-ekbjltj-shard-00-01.jufzf2d.mongodb.net:27017,ac-ekbjltj-shard-00-02.jufzf2d.mongodb.net:27017/users?ssl=true&replicaSet=atlas-2moagh-shard-0&authSource=admin&appName=Cluster0')
  .then(() => console.log('connected!'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
