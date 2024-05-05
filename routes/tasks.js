var express = require('express');
var router = express.Router();

let tasks =[];
// definimos usar la ruta creada en app.js
//La funcion definida con req, los datos requeridos, res la respuesta y netx en caso de usar middleware
router.get('/getTasks', function(req, res, next){
// con lo que estamos creando retornara un Json, antes de inicial 
    res.json(tasks);
})

router.post('/addTask', function(req, res, next){
    // aca se agrega un indice usando la fecha actual y un numero random
    let timestamp = Date.now() + Math.random();
    // evaluamos que exita el body y los parametos que definimos con la comunicacion de postman
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        req.body.id = timestamp.toString;
        tasks.push(req.body);
    }
    res.json(tasks);
})

router.delete('/removeTask/:id', function(req, res, next){
    // aca se agrega un indice usando la fecha actual y un numero random
    let timestamp = Date.now() + Math.random();
    // evaluamos que exita el body y los parametos que definimos
    if(req.params && req.params.id){
        // pedimos que revise que hay parametros y que se envie el id
        let id = req.params.id;
        tasks = tasks.filter(task=> task.id !== id)// recorre el arreglo y si encuentra un id igual al que enviamos
        res.json(tasks);
    } else{
        res.json([{}]);
    }
   
})
module.exports = router;