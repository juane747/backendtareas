var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = express.Router();// para crear el midlewer

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersTasks = require('./routes/tasks');
var userGoals = require('./routes/goals');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
router.use((req, res, next)=>{
  if(req.headers.authorization && req.headers.authorization==='backendproyecto'){
    next();
  }else{
    res.json({'error':'no se encontro autorizacion'})
  }
});//antes de que se disparen las rutas agregamos

app.use('/', router);// aca indicamos que para pasar por la rutas, se pase por la validacion
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', usersTasks);
app.use('/goals',userGoals);

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
