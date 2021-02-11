var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//require sequelize
const { sequelize } = require('./models/index.js');

var indexRouter = require('./routes/index');

// DO I NEED THIS??
var usersRouter = require('./routes/users');

//require error handlers
const errorHandlers = require('./errorHandlers');

var app = express();

// set static to public
app.use(express.static(path.join(__dirname, 'public')));

//async IIFE
(async () => {
  await sequelize.sync();
  try {
    await sequelize.authenticate();
    console.log("Connection to DB Went GOOOOD");
  } catch (error){
    console.log("Connection to DB Failed...  Poopy", error);
  }
})();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// DO I NEED THIS
app.use('/users', usersRouter);

// Error Handlers
app.use(errorHandlers.fourOhFour);
app.use(errorHandlers.globalError);

module.exports = app;






// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// (async () => {
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync();
//     console.log("YEEEE!!");
//   } catch {
//     console.log('shit, this aint cool');
//   }
// })();
