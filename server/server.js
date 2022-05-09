const express = require('express');
const app = express();

const cors = require("cors"); 

require('dotenv').config({path: "./configure.env"});
const PORT = process.env.PORT
app.use(cors()); 
app.use(express.json())
const routes = require('./routes/routes');

 // connect to databas
const dbo = require("./models/model")

app.listen(PORT, () => {
    dbo.connectToServer(function (err){
        if (err) console.log(err); 
    }); 

    console.log(`Server Started at port ${PORT}`); 
})