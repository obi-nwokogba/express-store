// ===========================
// Dependencies
// ===========================
const router = require('express').Router();
const Sunglass = require('../models/sunglasses.js');

const seedData = require('../models/seedData.js');
router.get('/seed', (req, res) => {
    Sunglass.deleteMany({}, (error, allSunglasses) => {})
    Sunglass.create(seedData, (error, data) => {
        res.redirect('/sunglasses')
    });
});



// =======================================
// ROUTES
// =======================================
// INDEX
// =======================================
router.get('/', (req, res) => {
    Sunglass.find({}, (error, allSunglasses) => {
        res.render('index.ejs', {
            sunglasses: allSunglasses,
        });
    });
});

// =======================================
// NEW
// =======================================
router.get('/new', (req, res) => {
    res.render('new.ejs');
});

// =======================================
// CREATE ROUTE
// =======================================
router.post('/', (req, res) => {
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
router.get('/', (req, res) => {
    Sunglass.find({}, (error, allSunglasses) => {
        res.render('index.ejs', {
            sunglasses: allSunglasses,
        });
    });
});

// =======================================
// NEW ROUTE 
// =======================================
router.get('/new', (req, res) => {
    res.render('new.ejs');
});

// =======================================
// DELETE ROUTE
// =======================================
router.delete('/:id', (req, res) => {
    Sunglass.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/sunglasses');
    });
});

// =======================================
// UPDATE ROUTE
// =======================================
router.put('/:id/edit', (req, res) => {
    Sunglass.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updatedSunglass) => {
        res.redirect(`/sunglasses/${req.params.id}`);
    });
});

// =======================================
// EDIT ROUTE
// =======================================
router.get('/:id/edit', (req, res) => {
	Sunglass.findById(req.params.id, (error, sunglass) => {
		res.render('edit.ejs', {sunglass});
	});
});

// =======================================
// SHOW ROUTE
// =======================================
router.get('/:id', (req, res) => {
    Sunglass.findById(req.params.id, (error, foundSunglass) => {
        res.render('show.ejs', {foundSunglass})
    });
});

// Exports
module.exports = router;