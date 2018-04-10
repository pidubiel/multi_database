const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

//use sessions for tracking logins
app.use(session({
  secret: 'it is amazing',
  resave: true,
  saveUninitialized: false
}));

// mongodb connection
mongoose.connect("mongodb://localhost:27017/multi-database");
const db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
const routes = require('./routes/register');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const app = express();

// mongoose.connect('mongodb://localhost:27017/multi_database');
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));

// //Parse incoming requests
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // serve static files from /public
// app.use(express.static(__dirname + '/public'));

// //View Engine Setup
// app.set('view engine', 'pug');
// app.set('views', __dirname + '/views');


// //app.use('/api', require('./routes/api'));
// const routes = require('./routes/register');
// app.use('/', routes);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   const err = new Error('File Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// // define as the last app.use callback
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

// app.listen(3000, function(){
//   console.log('now listening for requests');
// });
