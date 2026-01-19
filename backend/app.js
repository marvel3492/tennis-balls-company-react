var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sqlite3 = require('sqlite3');

const cors = require('cors');
const fs = require('fs');

// Connect to (or create) database
var db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.log(err);
    exit(1);
  }
});

// Create tables
try {
  let sql = fs.readFileSync('tables.sql', 'utf8');
  db.exec(sql);
} catch (err) {
  console.log(err);
  exit(1);
}

global.db = db;

// Routes
var customerRouter = require("./routes/customer");
var orderDetailRouter = require("./routes/orderdetail");
var productRouter = require('./routes/product');
var promotionRouter = require('./routes/promotion');
var saleOrderRouter = require('./routes/saleorder');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Use routes
app.use("/customer", customerRouter);
app.use("/orderdetail", orderDetailRouter);
app.use("/product", productRouter);
app.use("/promotion", promotionRouter);
app.use("/saleorder", saleOrderRouter);

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
  res.json({error: err});
});

module.exports = app;
