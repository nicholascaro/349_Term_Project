// const { response } = require('express');
const express = require('express');

const router = express.Router(); 

const Model = require('../models/model');

const ObjectId = require("mongodb").ObjectId
//Here, we are using Router from Express, and we are exporting it too using module.exports.

/* 
In the callback, we have a res and a req. res means response, and req means request. 
We use res for sending responses to our client, like Postman, or any front-end client. 
And we use req for receiving requests from a client app like Postman, or any front-end client. 
*/

//Get All Method
/*
Here, we are using the Model.find method to fetch all the data from the database. 
Then, we are returning it back in JSON format. If we have an error, we will get that too.
*/

// get all objects

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
// router.get('/getAll', async (req, res) => {
//     try{
//         const data = await Model.find();
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

//Get by Name Method
// router.get('/getOne/:name', async (req, res) => {
//     try{
//         const data = await Model.find({"name": req.params.name})
//         // const data = await Model.findOne(req.params.name); 
//         // const data = await Model.findById(req.params.id);
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

//Delete by name Method
// router.delete('/delete/:name', async (req, res) => {
//     try {
//         const name = req.params.name;
//         const data = await Model.deleteMany({"name": name})
//         res.send(`Document with ${data.name} has been deleted..`)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

/*
Our name and age is accepting the name and age from req body. 
We get this data from the client app such as Postman, or any frontend client like React 
We will also create a try-catch block to handle success messages and errors.
*/
// Add New Subscription
// router.post('/post', async (req, res) => {
//     const data = new Model({
//         name: req.body.name,
//         price: req.body.price,
//         email: req.body.email
//     })

//     try{
//         /*
//         In the try block, we are saving the data using data.save(). 
//         Then, we are storing the data in a const called dataToSave.
//         We are also sending the success message with the data in the response body.
//          */
//         const dataToSave = await data.save();
//         res.status(200).json(dataToSave)

//     }
//     catch(error){
//         // in the catch block, we are receiving any errors if we get any.
//         res.status(400).json({message: error.message})
//     }
// })

//Update by name Method
// router.patch('/update/:name', async (req, res) => {
//     try {
//         const name = req.params.name;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Model.findOneAndUpdate(
//             name, updatedData, options
//         )

//         res.send(result)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

