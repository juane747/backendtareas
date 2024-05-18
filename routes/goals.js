var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// abrimos conexion a bd
var connection = mysql.createConnection({
    host:'localhost',
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

let goals =[];

// definimos el get consultar
router.get('/getGoals', function(req, res, next){
    let queryGetGoals = 'SELECT * FROM goals';

    connection.query(queryGetGoals, function(err, results, filds){// ejecutando consulta para crear base de datos
        if(err){
            res.status(500).json(err);
        }else{
          res.status(200).json(results);
        }
      })
})
// definimos el delete 
router.delete('/removeGoals/:id', function(req, res, next){
    //let timestamp = Date.now() + Math.random();
    if(req.params && req.params.id){
        let id = req.params.id;
        //console.log('el id es: '+id);
        //goals = goals.filter(goal=> goal.id !== id)
        //res.status(200).json(goals);
        let queryDeleteGoal='DELETE FROM goals WHERE id="'+id+'"';
        connection.query(queryDeleteGoal, function(err, results, filds){// ejecutando consulta para crear eliminar archivo
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

// definimos agregar
router.post('/addGoals', function(req, res, next){
   // let timestamp = Date.now() + Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        //req.body.id = timestamp.toString;
        //goals.push(req.body);
        //res.status(200).json(goals);
        let queryCreateGoal = 'INSERT INTO goals (name, description, dueDate) \
        VALUES("'+req.body.name+'","'+req.body.description+'","'+req.body.dueDate+'")';
        
        connection.query(queryCreateGoal, function(err, results, filds){// ejecutando consulta para crear base de datos
            if(err){
                res.status(500).json(err);
            }else{
              res.status(200).json(results);
            }
          })
    }else{
        
    }
    
})

module.exports = router;