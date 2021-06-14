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

const seedData = require('./models/seedData.js');
app.get('/sunglasses/seed', (req, res) => {
    Sunglass.deleteMany({}, (error, allSunglasses) => {})
    Sunglass.create(seedData, (error, data) => {
        res.redirect('/sunglasses')
    })
})


// =======================================
// ROUTES
// =======================================
// INDEX
// =======================================
app.get('/sunglasses', (req, res) => {
    Sunglass.find({}, (error, allSunglasses) => {
        res.render('index.ejs', {
            sunglasses: allSunglasses,
        });
    });
});

// =======================================
// NEW
// =======================================
app.get('/sunglasses/new', (req, res) => {
    res.render('new.ejs');
});


// =======================================
// CREATE ROUTE
// =======================================
app.post('/sunglasses', (req, res) => {
    /*
    if (req.body.completed === true) {
        //if checked, req.body.completed is set to 'on'
        req.body.completed = true;
    } else {
        //if not checked, req.body.completed is undefined
        req.body.completed = false;
    } */
    Sunglass.create(req.body, (error, createdSunglass) => {
        res.redirect('/sunglasses');
    });
});

// ==============
// INDEX
app.get('/sunglasses', (req, res) => {
    Sunglass.find({}, (error, allSunglasses) => {
        res.render('index.ejs', {
            sunglasses: allSunglasses,
        });
    });
});

// =======================================
// HOME ROUTE
// =======================================
app.get('/', (req, res) => {
    Sunglass.find({}, (error, allSunglasses) => {
        res.render('index.ejs', {
            sunglasses: allSunglasses,
        });
    });
});

// NEW
app.get('/sunglassess/new', (req, res) => {
    res.render('new.ejs');
});

// =======================================
// DELETE ROUTE
// =======================================
app.delete('/sunglasses/:id', (req, res) => {
    Sunglass.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/sunglasses');
    });
});

// =======================================
// UPDATE ROUTE
// =======================================
app.put('/sunglasses/:id', (req, res) => {
    Sunglass.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updatedSunglass) => {
        res.redirect(`/sunglasses/${req.params.id}`);
    });
});

// =======================================
// SHOW ROUTE
// =======================================
app.get('/sunglasses/:id', (req, res) => {
    Sunglass.findById(req.params.id, (error, foundSunglass) => {
        res.render('show.ejs', {
            sunglass: foundSunglass
        })
    });
});

// =======================================
// LISTENER / START SERVER
// =======================================
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`);
});