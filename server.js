require('dotenv').config();

// =======================================
// DEPENDENCIES
// =======================================
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Sunglass = require('./models/sunglasses');

const methodOverride = require('method-override');
app.set('view engine', 'ejs');

// =======================================
// DATABASE CONNECTION
// =======================================
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const db = mongoose.connection;
// Database Connection Error/Success/Information
db.on('error', (err) => console.log(err.message + ' is MongoDB not running?'));
db.on('connected', () => console.log('MongoDB connected'));
db.on('disconnected', () => console.log('MongoDB disconnected'));

// =======================================
// MIDDLEWARE
// =======================================
//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({
    extended: true
}));

//use method override
app.use(methodOverride('_method')); // allow POST, PUT and DELETE from a form

// =======================================
// HOME ROUTE
// =======================================
app.get('/', (req, res) => {
    Sunglass.find({}, (error, sunglasses) => {
        res.render('index.ejs', { sunglasses});
    });
});

// ===========================
// Mount Controller Middlware
// ===========================
app.use('/sunglasses', require('./controllers/sunglasses'));

// =======================================
// LISTENER / START SERVER
// =======================================
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`);
});