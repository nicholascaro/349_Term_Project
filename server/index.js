require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/routes');



// import the contents of our .env file in index.js
const mongoString = process.env.DATABASE_URL 
const PORT = process.env.PORT

// connect the database to our server using Mongoose
mongoose.connect(mongoString); 
const database = mongoose.connection

// throw a success or an error message depending on whether our database connection is successful or fails
// database.on means it will connect to the database, and throws any error if the connection fails
database.on('error', (error) => {
    console.log(error)
})

// database.once means it will run only one time. If it is successful, it will show a message that says Database Connected
database.once('connected', () => { 
    console.log('Database Connected');
})

app.use(express.json());

/*
Here, this app.use takes two things. One is the base endpoint, and the other is the contents of the routes. 
Now, all our endpoints will start from '/api'.
*/
app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`)
})