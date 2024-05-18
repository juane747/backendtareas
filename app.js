var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = express.Router();// para crear el midlewer
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var goalsRouter = require('./routes/goals');

const mysql = require('mysql');// definimos la constante 
var connection = mysql.createConnection({
  host:'localhost',// definimos la conexion
  user:'usuarioreact',
  password:'clave',
  database: 'desarrolloweb'
});

connection.connect(function(err){// si hay error
  if(err){
    console.error('error conecting '+err.stack);// imprimimos el error en consola
    return;
  }
  console.log('Connected as id'+connection.threadId);
})



// creacion de bd y tablas

let queryCreateDB = 'CREATE DATABASE IF NOT EXISTS desarrolloweb';// creamos la base de datos
let queryCreateTableGoals = `
CREATE TABLE IF NOT EXISTS goals (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(250) NOT NULL,
  description VARCHAR(250) NOT NULL,
  dueDate VARCHAR(250) NOT NULL,
  PRIMARY KEY (id)
)
`;// creamos tabla goals.


//Creamos tabla tasks
let queryCreateTableTasks = `
CREATE TABLE IF NOT EXISTS tasks (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(250) NOT NULL,
  description VARCHAR(250) NOT NULL,
  dueDate VARCHAR(250) NOT NULL,
  PRIMARY KEY (id)
)
`;

connection.query(queryCreateDB, function(err, results, filds){// ejecutando consulta para crear base de datos
  if(err){
    console.log(err);
    return;
  }else{
    console.log(results);
  }
})


connection.query(queryCreateTableGoals, function(err, results, filds){// ejecutamos consulta para crear tabla goals
  if(err){
    console.log(err);
    return;
  }else{
    console.log(results);
  }
})


connection.query(queryCreateTableTasks, function(err, results, filds){// ejecutamos consulta para crear tabla tasks
  if(err){
    console.log(err);
    return;
  }else{
    console.log(results);
  }
})

//cerramos conexion a base de datos
connection.destroy();

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());// para que relacione nuestro backend con el frontend del mismo domino

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.use((req, res, next)=>{
  if(req.headers.authorization && req.headers.authorization==='backendproyecto'){
    next();
  }else{
    res.status(401).json({'error':'no se encontro autorizacion'}) // aca agregamos status, a la respuesta para cambiar el estado, segun la reaccion del backend
  }
});//antes de que se disparen las rutas agregamos

app.use('/', router);// aca indicamos que para pasar por la rutas, se pase por la validacion
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/goals',goalsRouter);

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
