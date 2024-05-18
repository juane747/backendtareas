var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// abrimos conexion a bd como se hizo en goals
var connection = mysql.createConnection({
    host:'localhost',
    user:'usuarioreact',
    password:'clave',
    database: 'desarrolloweb'
  });

//creamos la conexion
  connection.connect(function(err){// si hay error
    if(err){
      console.error('error conecting '+err.stack);// imprimimos el error en consola
      return;
    }
    console.log('Connected as id'+connection.threadId);
  })


let tasks =[];
// definimos usar la ruta creada en app.js
//La funcion definida con req, los datos requeridos, res la respuesta y netx en caso de usar middleware
router.get('/getTasks', function(req, res, next){
    let queryGetTasks = 'SELECT * FROM tasks';
    connection.query(queryGetTasks, function(err, results, filds){
        if(err){
            res.status(500).json(err);
        }else{
          res.status(200).json(results);
        }
      })
})

router.post('/addTask', function(req, res, next){
   if(req.body && req.body.name && req.body.description && req.body.dueDate){
    let queryCreateTask = 'INSERT INTO tasks (name, description, dueDate) \
    VALUES("'+req.body.name+'","'+req.body.description+'","'+req.body.dueDate+'")';
    
    connection.query(queryCreateTask, function(err, results, filds){
        if(err){
            res.status(500).json(err);
        }else{
          res.status(200).json(results);
        }
      })
}else{
    
}
   
})

router.delete('/removeTask/:id', function(req, res, next){
    if(req.params && req.params.id){
        let id = req.params.id;
        let queryDeleteTask='DELETE FROM tasks WHERE id="'+id+'"';
        connection.query(queryDeleteTask, function(err, results, filds){
            if(err){
                res.status(500).json(err);
            }else{
              res.status(200).json(results);
            }
          })

    } else{
        res.status(400).json([{}]);
    }
})
module.exports = router;