// allows use of .env file to 'hide' ports and such 
require('dotenv').config();
// aquire express 
const express = require('express');
// aquire mongoose
const mongoose = require('mongoose')
//aquire workout routes
const workoutRoutes = require('./routes/workouts');
// express app
const app = express();

// middle to log req path and method

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

// use the workoutRoutes with app.use 
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true,
    })
    //.then makes app wait until it is connected to database (async) before it listens for inputs
    .then(() => {
        // app is listening
        app.listen(process.env.PORT, () => {
            console.log('Connected to dB on port', process.env.PORT) 
        });
    })
    .catch((error) => {
        console.log(error)
    });





