const express = require('express');
const app = express();
const cors = require("cors"); 

require('dotenv').config({path: "./configure.env"});
const port = process.env.PORT || 3001
app.use(cors()); 
app.use(express.json())
app.use(require("./routes/routes")); 

 // connect to databas
const dbo = require("./models/model")

app.listen(port, () => {
    dbo.connectToServer(function (err){
        if (err) console.log(err); 
    }); 
    console.log(`Server Started at port ${port}`); 
})