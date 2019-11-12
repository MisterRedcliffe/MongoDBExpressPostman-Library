var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var bookRouter = require('./routes/Book');


//database setup
let connection_string = "mongodb://127.0.0.1:27017/Harding_library?retryWrites=true&w=majority";
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.connect(connection_string)
    .then((result) => {
        console.log('Connected to MongoDB');
        //create_book();
        find_all_book();
        //update_one_book();
        //delete_one_book();
    })
    .catch((error) => {
        console.log('An error has occurred: ', error);
    });


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/Book', bookRouter);

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