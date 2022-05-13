
const express = require('express');

const router = express.Router(); 

const Model = require('../models/model');

const ObjectId = require("mongodb").ObjectId

router.route("/getAll").get(function (req, res) {
    let db_connect = Model.getDb("project"); 
    db_connect.collection("records").find({}).toArray(function(err, result) {
        if (err) throw err; 
        res.json(result); 
    }); 
}); 

// get a single object by its id 

router.route('/getOne/:id').get(function (req, res) {
    let db_connect = Model.getDb(); 
    let query = { _id: ObjectId( req.params.id)}; 
    db_connect.collection("records").findOne(query, function (err, result) {
        if (err) throw err; 
        res.json(result);
    }); 
}); 

// create a new object 

router.route('/createOne').post(function (req, response){
    let db_connect = Model.getDb(); 
    let newObj = {
        name: req.body.name, 
        cost: req.body.cost, 
        email: req.body.email, 
    }; 

    db_connect.collection('records').insertOne(newObj, function (err, res){
        if (err) throw err; 
        response.json(res); 
    }); 
}); 

// update an existing object by id

router.route('/updateOne/:id').post(function (req, response){
    let db_connect = Model.getDb('project'); 
    let query = { _id: ObjectId(req.params.id)}; // objct we want to update
    let newObject = {
        $set: {
            name: req.body.name, 
            cost: req.body.cost, 
            email: req.body.email, 
        }, 
    }; 

    db_connect
        .collection("records")
        .updateOne(query, newObject, function (err, res){
            if (err) throw err; 
            console.log("1 document updated"); 
            response.json(res); 
        }); 
}); 

// delete an object by id

router.route('/deleteOne/:id').delete((req, responce) => {
    let db_connect = Model.getDb('project'); // remove project if does not work
    let query = { _id: ObjectId( req.params.id )};
    db_connect.collection('records').deleteOne(query, function (err, res){
        if (err) throw err; 
        console.log("A document has been deleted"); 
        responce.json(res); 
    }); 
}); 

module.exports = router;

