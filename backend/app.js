var createError = require('http-errors');
var express = require('express');
var path = require('path');
const favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public'));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.get('/', (req, res) => {
   res.send('running');
})

app.get('/files', (req, res) => {
   const fs = require('fs');
   fs.readdir(__dirname + "/public/images/", (err, files) => {
      res.json({
         files: files
      })
   })
})

app.post('/upload', (req, res, next) => {
   let imageFile = req.files.file;
   imageFile.mv(`${__dirname}/public/images/${req.body.filename}.jpg`, (err) => {
      if (err) {
         res.json({
            message: "Error while uploading image: " + err.message
         })
      }

      res.json({
         file: `public/images/${req.body.filename}.jpg`
      })
   })
})

// catch 404 and forward to error handler

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8000, () => {
   console.log('8000');
})

module.exports = app;
