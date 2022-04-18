const { Double } = require('mongodb');
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    }, 
    email: {
        required: true,
        type: String
    }
})

// Then, we are simply exporting the schema model.
module.exports = mongoose.model('Data', subscriptionSchema) 