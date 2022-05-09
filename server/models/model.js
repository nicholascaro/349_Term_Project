const { MongoClient} = require("mongodb"); 

const dbString = process.env.DATABASE_URL; 

const client = new MongoClient(dbString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
})

var _db;

module.exports = {
    connectToServer: function(callback) {
        client.connect(function (err, db) {
            if (db)
            {
                _db = db.db("349project"); 
                console.log("Successfuly Connected to MongoDB"); 
            }

            return callback(err); 
        }); 
    }, 

    getDb: function () {
        return _db; 
    }, 
}; 







// const { Double } = require('mongodb');
// const mongoose = require('mongoose');



// const subscriptionSchema = new mongoose.Schema({
//     name: {
//         required: true,
//         type: String
//     },
//     price: {
//         required: true,
//         type: Number
//     }, 
//     email: {
//         required: true,
//         type: String
//     }
// })

// // Then, we are simply exporting the schema model.
// module.exports = mongoose.model('Data', subscriptionSchema) 
