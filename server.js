require('dotenv').config();

// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const db = mongoose.connection;

const methodOverride = require('method-override');

// PORT
const PORT = process.env.PORT || 3000;

//Database
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;



// Database configuration
const DATABASE_URL = `mongodb+srv://admin:abc1234@cluster0.io6ho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// Database Connection
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

// Database Connection Error/Success - optional but can be really helpful
db.on('error', (err) => console.log(err.message + ' is MongoDB not running?'));
db.on('connected', () => console.log('MongoDB connected'));
db.on('disconnected', () => console.log('MongoDB disconnected'));

//Middleware
//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({
    extended: false
})); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method')); // allow POST, PUT and DELETE from a form


// Routes
//localhost:3000
// INDEX
app.get('/', (request, response) => {
    response.render(
        'index.ejs',
        {
           
        }
    );
  });




// App Listener
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));